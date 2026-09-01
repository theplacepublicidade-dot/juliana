import { redirect } from "next/navigation";
import { getAuthorizedAdmin } from "../../../lib/admin-auth";
import LoginForm from "./LoginForm";

export const dynamic = "force-dynamic";

export default async function AdminLoginPage() {
  const user = await getAuthorizedAdmin();
  if (user) redirect("/admin");

  return (
    <main className="admin-login-page">
      <div className="admin-login-brand">
        <img src="/media/juliana-logo.png" alt="Juliana 1020" />
        <span>Central de materiais</span>
      </div>
      <LoginForm />
      <small className="admin-login-footer">Acesso restrito à equipe autorizada.</small>
    </main>
  );
}
