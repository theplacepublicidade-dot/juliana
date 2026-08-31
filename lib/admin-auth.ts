import { getChatGPTUser } from "../app/chatgpt-auth";
import { getAdminEmail } from "./material-storage";

export async function getAuthorizedAdmin() {
  const user = await getChatGPTUser();
  if (!user || user.email.trim().toLowerCase() !== getAdminEmail()) return null;
  return user;
}

export async function requireAdminApi() {
  const user = await getAuthorizedAdmin();
  if (!user) {
    return {
      user: null,
      response: Response.json({ error: "Acesso administrativo não autorizado." }, { status: 403 }),
    } as const;
  }
  return { user, response: null } as const;
}
