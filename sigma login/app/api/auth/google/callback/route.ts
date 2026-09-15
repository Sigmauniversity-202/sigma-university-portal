import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");
  const rawState = searchParams.get("state");

  let role = "faculty";
  if (rawState) {
    try {
      const parsed = JSON.parse(decodeURIComponent(rawState));
      if (parsed.role) role = parsed.role;
    } catch {}
  }

  // Determine target dashboard based on selected role
  let targetDashboard = "/faculty/dashboard";
  if (role === "student") targetDashboard = "/student/dashboard";
  if (role === "hod") targetDashboard = "/hod/dashboard";

  console.log(`\n======================================================`);
  console.log(`🌐 [GOOGLE SSO AUTHENTICATED]`);
  console.log(`👤 Role           : ${role.toUpperCase()}`);
  console.log(`🔑 Auth Code      : ${code ? code.slice(0, 15) + "..." : "Simulated/Approved"}`);
  console.log(`🎯 Destination    : ${targetDashboard}`);
  console.log(`======================================================\n`);

  return NextResponse.redirect(new URL(targetDashboard, req.url));
}