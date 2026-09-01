import { createAdminSessionCookie, verifyAdminCredentials } from "../../../../lib/admin-auth";

export const dynamic = "force-dynamic";

const INVALID_LOGIN_DELAY_MS = 450;

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as { email?: unknown; password?: unknown };
    const email = typeof payload.email === "string" ? payload.email : "";
    const password = typeof payload.password === "string" ? payload.password : "";
    const valid = await verifyAdminCredentials(email, password);

    if (!valid) {
      await new Promise((resolve) => setTimeout(resolve, INVALID_LOGIN_DELAY_MS));
      return Response.json({ error: "E-mail ou senha incorretos." }, { status: 401 });
    }

    return Response.json(
      { ok: true },
      { headers: { "Set-Cookie": await createAdminSessionCookie(), "Cache-Control": "no-store" } },
    );
  } catch {
    return Response.json({ error: "Não foi possível entrar agora. Tente novamente." }, { status: 400 });
  }
}
