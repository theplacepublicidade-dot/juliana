import { LockKeyhole, LogOut } from "lucide-react";
import { chatGPTSignOutPath, requireChatGPTUser } from "../chatgpt-auth";
import { getAdminEmail } from "../../lib/material-storage";
import AdminDashboard from "./AdminDashboard";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const user = await requireChatGPTUser("/admin");
  const authorized = user.email.trim().toLowerCase() === getAdminEmail();

  if (!authorized) {
    return (
      <main className="admin-access-denied">
        <div>
          <span><LockKeyhole /></span>
          <h1>Acesso não autorizado</h1>
          <p>Esta conta não possui permissão para administrar os materiais da Central Juliana.</p>
          <small>Conta conectada: {user.email}</small>
          <a href={chatGPTSignOutPath("/admin")}><LogOut size={17} /> Entrar com outra conta</a>
        </div>
      </main>
    );
  }

  return <AdminDashboard userEmail={user.email} displayName={user.displayName} />;
}
