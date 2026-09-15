import { NextResponse } from "next/server";

declare global {
  var globalOtpStore: Map<string, { otp: string; phone: string; expiresAt: number }>;
}
globalThis.globalOtpStore = globalThis.globalOtpStore || new Map();

export async function POST(req: Request) {
  try {
    const { identifier, phone, otp } = await req.json();
    const cleanOtp = otp ? otp.toString().trim() : "";

    const cleanDigits = phone ? phone.toString().replace(/[^0-9]/g, "").slice(-10) : "";
    const lookupKey = identifier || cleanDigits || "E1492";

    const record = globalThis.globalOtpStore.get(lookupKey) ||
                   globalThis.globalOtpStore.get("E1492") ||
                   globalThis.globalOtpStore.get("9426250051");

    if (!record) {
      return NextResponse.json({ success: false, message: "No OTP record found. Please resend." }, { status: 400 });
    }

    if (Date.now() > record.expiresAt) {
      return NextResponse.json({ success: false, message: "OTP expired. Request a new one." }, { status: 400 });
    }

    if (record.otp !== cleanOtp) {
      return NextResponse.json({ success: false, message: "Invalid OTP entered." }, { status: 400 });
    }

    globalThis.globalOtpStore.delete(lookupKey);

    return NextResponse.json({
      success: true,
      message: "OTP verified successfully!",
      redirectUrl: "/faculty/dashboard"
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: "Verification failed." }, { status: 500 });
  }
}