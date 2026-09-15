import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const { role, identifier, password } = body;

    if (!identifier || !password) {
      return NextResponse.json(
        { success: false, message: "Username and password are required." },
        { status: 400 }
      );
    }

    let targetRedirect = "/faculty/dashboard";
    if (role === "student") targetRedirect = "/student/dashboard";
    if (role === "hod") targetRedirect = "/hod/dashboard";

    return NextResponse.json({
      success: true,
      role,
      identifier,
      redirectUrl: targetRedirect,
      message: "Credentials verified."
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: "Login server exception." }, { status: 500 });
  }
}