import { NextResponse } from "next/server";

declare global {
  var globalOtpStore: Map<string, { otp: string; phone: string; expiresAt: number }>;
}
globalThis.globalOtpStore = globalThis.globalOtpStore || new Map();

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const staffId = body.identifier || "E1492";
    const rawPhone = body.phone || "9426250051";
    const cleanDigits = rawPhone.toString().replace(/[^0-9]/g, "");
    const targetPhone = cleanDigits.slice(-10);

    const dynamicOtp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiryTimestamp = Date.now() + 10 * 60 * 1000;

    const entry = { otp: dynamicOtp, phone: targetPhone, expiresAt: expiryTimestamp };
    globalThis.globalOtpStore.set(staffId, entry);
    globalThis.globalOtpStore.set(targetPhone, entry);
    globalThis.globalOtpStore.set(`91${targetPhone}`, entry);

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
        Body: `Your Sigma University ERP verification code is: ${dynamicOtp}`,
      });

      const response = await fetch(
        `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`,
        {
          method: "POST",
          headers: {
            "Authorization": `Basic ${basicAuth}`,
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: postBody.toString(),
        }
      );

      const twilioResult = await response.json();
      if (twilioResult.sid && !twilioResult.error_code) {
        deliveryStatus = `TWILIO SMS DELIVERED (SID: ${twilioResult.sid})`;
      } else {
        deliveryStatus = `TWILIO LOG: ${twilioResult.message || twilioResult.code}`;
      }
    } catch (err: any) {
      deliveryStatus = `TWILIO GATEWAY ERROR: ${err.message}`;
    }

    console.log(`\n======================================================`);
    console.log(`📲 [SIGMA ERP 2FA LOGIN]`);
    console.log(`👤 User / ID       : ${staffId}`);
    console.log(`📱 Destination     : ${toPhone}`);
    console.log(`🔑 Live OTP Code   : >>> ${dynamicOtp} <<<`);
    console.log(`📊 Status          : ${deliveryStatus}`);
    console.log(`======================================================\n`);

    return NextResponse.json({
      success: true,
      message: `OTP dispatched to +91 ******${targetPhone.slice(-4)}`
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: "OTP dispatch failed." }, { status: 500 });
  }
}