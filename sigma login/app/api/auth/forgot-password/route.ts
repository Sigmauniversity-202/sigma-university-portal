import { NextResponse } from "next/server";

declare global {
  var globalResetStore: Map<string, { otp: string; phone: string; expiresAt: number }>;
}
globalThis.globalResetStore = globalThis.globalResetStore || new Map();

export async function POST(req: Request) {
  try {
    const { identifier } = await req.json().catch(() => ({}));

    if (!identifier) {
      return NextResponse.json({ success: false, message: "Username / ID is required." }, { status: 400 });
    }

    // Default registered phone for demo/testing
    const targetPhone = "9426250051";
    const dynamicOtp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = Date.now() + 10 * 60 * 1000; // 10 mins

    globalThis.globalResetStore.set(identifier, { otp: dynamicOtp, phone: targetPhone, expiresAt });

    const accountSid = process.env.TWILIO_ACCOUNT_SID || "AC599ba7fe7c955bcdf4df8ba1316fb0f3";
    const authToken  = process.env.TWILIO_AUTH_TOKEN  || "fd05c36bc9d0f1b559891aa451caea8c";
    const fromPhone  = process.env.TWILIO_PHONE_NUMBER || "+16268193679";
    const toPhone    = `+91${targetPhone}`;

    let deliveryStatus = "DISPATCHING...";

    try {
      const basicAuth = Buffer.from(`${accountSid}:${authToken}`).toString("base64");
      const postBody = new URLSearchParams({
        To: toPhone,
        From: fromPhone,
        Body: `Sigma University ERP password reset code: ${dynamicOtp}. Do not share this with anyone.`,
      });

      const response = await fetch(
        `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`,
        {
          method: "POST",
          headers: {
            Authorization: `Basic ${basicAuth}`,
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: postBody.toString(),
        }
      );

      const twilioRes = await response.json();
      if (twilioRes.sid && !twilioRes.error_code) {
        deliveryStatus = `TWILIO SMS SENT (SID: ${twilioRes.sid})`;
      } else {
        deliveryStatus = `TWILIO STATUS: ${twilioRes.message || twilioRes.code}`;
      }
    } catch (err: any) {
      deliveryStatus = `TWILIO GATEWAY ERROR: ${err.message}`;
    }

    console.log(`\n======================================================`);
    console.log(`🔑 [SIGMA ERP PASSWORD RESET]`);
    console.log(`👤 Identifier       : ${identifier}`);
    console.log(`📱 Destination      : ${toPhone}`);
    console.log(`🔢 Reset OTP Code   : >>> ${dynamicOtp} <<<`);
    console.log(`📊 Status           : ${deliveryStatus}`);
    console.log(`======================================================\n`);

    return NextResponse.json({
      success: true,
      maskedPhone: `+91 ******${targetPhone.slice(-4)}`,
      message: `Password reset OTP sent to +91 ******${targetPhone.slice(-4)}`,
    });
  } catch (err) {
    return NextResponse.json({ success: false, message: "Failed to dispatch reset code." }, { status: 500 });
  }
}