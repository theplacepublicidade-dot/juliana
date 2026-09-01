import { redirect } from "next/navigation";
import { getAuthorizedAdmin } from "../../lib/admin-auth";
import AdminDashboard from "./AdminDashboard";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const user = await getAuthorizedAdmin();
  if (!user) redirect("/admin/login");

  return <AdminDashboard userEmail={user.email} displayName={user.displayName} />;
}
