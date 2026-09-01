import { clearAdminSessionCookie } from "../../../../lib/admin-auth";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  return new Response(null, {
    status: 303,
    headers: {
      Location: new URL("/admin/login", request.url).toString(),
      "Set-Cookie": clearAdminSessionCookie(),
      "Cache-Control": "no-store",
    },
  });
}
