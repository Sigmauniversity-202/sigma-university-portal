import { NextResponse } from "next/server";

declare global {
  var globalOtpStore: Map<string, { otp: string; phone: string; expiresAt: number }>;
}
globalThis.globalOtpStore = globalThis.globalOtpStore || new Map();

export async function POST(req: Request) {
  try {
    const { phone, otp } = await req.json();
    const cleanPhone = phone ? phone.toString().replace(/[^0-9]/g, "") : "";
    const cleanOtp = otp ? otp.toString().trim() : "";

    const record = globalThis.globalOtpStore.get(cleanPhone);

    if (!record) {
      return NextResponse.json({ success: false, message: "No OTP requested for this phone number." });
    }

    if (Date.now() > record.expiresAt) {
      globalThis.globalOtpStore.delete(cleanPhone);
      return NextResponse.json({ success: false, message: "OTP has expired. Please request a new one." });
    }

    if (record.otp !== cleanOtp) {
      return NextResponse.json({ success: false, message: "Invalid OTP. Please try again." });
    }

    // Success: remove used OTP
    globalThis.globalOtpStore.delete(cleanPhone);

    return NextResponse.json({
      success: true,
      message: "OTP Verified Successfully! Redirecting..."
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: "Verification failed." }, { status: 500 });
  }
}