import { headers } from "next/headers";
import {
  getAdminEmail,
  getAdminPasswordHash,
  getAdminSessionSecret,
} from "./material-storage";

const SESSION_COOKIE = "juliana_admin_session";
const SESSION_DURATION_SECONDS = 60 * 60 * 24 * 7;
const encoder = new TextEncoder();

type AdminSessionPayload = {
  email: string;
  exp: number;
};

function bytesToBase64Url(bytes: Uint8Array) {
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function base64UrlToBytes(value: string) {
  const base64 = value.replace(/-/g, "+").replace(/_/g, "/").padEnd(Math.ceil(value.length / 4) * 4, "=");
  const binary = atob(base64);
  return Uint8Array.from(binary, (character) => character.charCodeAt(0));
}

function constantTimeEqual(left: string, right: string) {
  const maxLength = Math.max(left.length, right.length);
  let difference = left.length ^ right.length;
  for (let index = 0; index < maxLength; index += 1) {
    difference |= (left.charCodeAt(index) || 0) ^ (right.charCodeAt(index) || 0);
  }
  return difference === 0;
}

async function importSessionKey() {
  const secret = getAdminSessionSecret();
  if (!secret) return null;
  return crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"],
  );
}

async function sign(value: string) {
  const key = await importSessionKey();
  if (!key) return null;
  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(value));
  return bytesToBase64Url(new Uint8Array(signature));
}

async function verifySessionToken(token: string) {
  const separator = token.lastIndexOf(".");
  if (separator < 1) return null;
  const encodedPayload = token.slice(0, separator);
  const encodedSignature = token.slice(separator + 1);
  const key = await importSessionKey();
  if (!key) return null;

  try {
    const validSignature = await crypto.subtle.verify(
      "HMAC",
      key,
      base64UrlToBytes(encodedSignature),
      encoder.encode(encodedPayload),
    );
    if (!validSignature) return null;
    const payload = JSON.parse(new TextDecoder().decode(base64UrlToBytes(encodedPayload))) as AdminSessionPayload;
    if (payload.email !== getAdminEmail() || !Number.isFinite(payload.exp) || payload.exp <= Date.now()) return null;
    return payload;
  } catch {
    return null;
  }
}

function sessionCookieFromHeaders(cookieHeader: string | null) {
  if (!cookieHeader) return null;
  for (const part of cookieHeader.split(";")) {
    const [name, ...valueParts] = part.trim().split("=");
    if (name === SESSION_COOKIE) return valueParts.join("=");
  }
  return null;
}

export async function verifyAdminCredentials(email: string, password: string) {
  const configuredHash = getAdminPasswordHash();
  if (!configuredHash || !getAdminSessionSecret()) return false;
  const passwordDigest = await crypto.subtle.digest("SHA-256", encoder.encode(password));
  const suppliedHash = Array.from(new Uint8Array(passwordDigest), (byte) => byte.toString(16).padStart(2, "0")).join("");
  return constantTimeEqual(email.trim().toLowerCase(), getAdminEmail()) && constantTimeEqual(suppliedHash, configuredHash);
}

export async function createAdminSessionCookie() {
  const payload: AdminSessionPayload = {
    email: getAdminEmail(),
    exp: Date.now() + SESSION_DURATION_SECONDS * 1000,
  };
  const encodedPayload = bytesToBase64Url(encoder.encode(JSON.stringify(payload)));
  const signature = await sign(encodedPayload);
  if (!signature) throw new Error("A autenticação administrativa não está configurada.");
  return `${SESSION_COOKIE}=${encodedPayload}.${signature}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${SESSION_DURATION_SECONDS}`;
}

export function clearAdminSessionCookie() {
  return `${SESSION_COOKIE}=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0`;
}

export async function getAuthorizedAdmin() {
  const requestHeaders = await headers();
  const token = sessionCookieFromHeaders(requestHeaders.get("cookie"));
  if (!token) return null;
  const payload = await verifySessionToken(token);
  if (!payload) return null;
  return {
    email: payload.email,
    displayName: "The Place Publicidade",
  };
}

export async function requireAdminApi() {
  const user = await getAuthorizedAdmin();
  if (!user) {
    return {
      user: null,
      response: Response.json({ error: "Faça login para acessar o painel administrativo." }, { status: 401 }),
    } as const;
  }
  return { user, response: null } as const;
}
