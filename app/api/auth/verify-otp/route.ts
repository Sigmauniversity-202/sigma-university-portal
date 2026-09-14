import { NextResponse } from "next/server";

globalThis.otpStore = globalThis.otpStore || new Map<string, { code: string; expires: number }>();

export async function POST(req: Request) {
  try {
    const { identifier, email, otp } = await req.json();
    const key = identifier || email || "sigmauni202@gmail.com";
    const submittedOtp = (otp || "").toString().trim();

    // 1. Instant testing bypass
    if (submittedOtp === "123456") {
      console.log("[AUTH VERIFY] 123456 demo bypass accepted.");
      return NextResponse.json({ success: true, message: "Demo verification bypass accepted" });
    }

    const record = globalThis.otpStore.get(key);

    // 2. Validate existence
    if (!record) {
      return NextResponse.json({ success: false, error: "OTP has expired or was not requested." }, { status: 400 });
    }

    // 3. Validate expiration
    if (Date.now() > record.expires) {
      globalThis.otpStore.delete(key);
      return NextResponse.json({ success: false, error: "OTP expired. Please request a new code." }, { status: 400 });
    }

    // 4. Validate matching digits
    if (record.code !== submittedOtp) {
      return NextResponse.json({ success: false, error: "Invalid verification code. Please try again." }, { status: 400 });
    }

    // Clear after single use
    globalThis.otpStore.delete(key);
    console.log(`[AUTH VERIFY] Code successfully validated for ${key}`);

    return NextResponse.json({ success: true, message: "Verification successful" });
  } catch (error: any) {
    console.error("[VERIFY ERROR]:", error.message || error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}