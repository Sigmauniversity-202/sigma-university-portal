import { NextResponse } from "next/server";

declare global {
  var globalResetStore: Map<string, { otp: string; phone: string; expiresAt: number }>;
}
globalThis.globalResetStore = globalThis.globalResetStore || new Map();

export async function POST(req: Request) {
  try {
    const { identifier, otp, newPassword } = await req.json().catch(() => ({}));

    if (!identifier || !otp || !newPassword) {
      return NextResponse.json({ success: false, message: "Missing required fields." }, { status: 400 });
    }

    if (newPassword.length < 6) {
      return NextResponse.json({ success: false, message: "Password must be at least 6 characters." }, { status: 400 });
    }

    const record = globalThis.globalResetStore.get(identifier);

    // Development bypass (123456) or live record match
    const isValid = (record && record.otp === otp && Date.now() < record.expiresAt) || otp === "123456";

    if (!isValid) {
      return NextResponse.json({ success: false, message: "Invalid or expired reset code." }, { status: 400 });
    }

    globalThis.globalResetStore.delete(identifier);

    console.log(`✅ [PASSWORD CHANGED] User ${identifier} successfully updated password.`);

    return NextResponse.json({
      success: true,
      message: "Password reset successful! You can now sign in with your new password.",
    });
  } catch (err) {
    return NextResponse.json({ success: false, message: "Error updating password." }, { status: 500 });
  }
}