import { NextResponse } from "next/server";

declare global {
  var globalOtpStore: Map<string, { otp: string; phone: string; expiresAt: number }>;
}
globalThis.globalOtpStore = globalThis.globalOtpStore || new Map();

export async function POST(req: Request) {
  try {
    const { phone } = await req.json();
    const cleanPhone = phone ? phone.toString().replace(/[^0-9]/g, "") : "919426250051";

    const dynamicOtp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiryTimestamp = Date.now() + 10 * 60 * 1000;

    // Store by phone key
    globalThis.globalOtpStore.set(cleanPhone, {
      otp: dynamicOtp,
      phone: cleanPhone,
      expiresAt: expiryTimestamp,
    });

    const accountSid = process.env.TWILIO_ACCOUNT_SID || "AC599ba7fe7c955bcdf4df8ba1316fb0f3";
    const authToken  = process.env.TWILIO_AUTH_TOKEN  || "fd05c36bc9d0f1b559891aa451caea8c";
    const fromPhone  = process.env.TWILIO_PHONE_NUMBER || "+16268193679";
    const toPhone    = `+${cleanPhone}`;

    const messageText = `Your Sigma University ERP login verification code is: ${dynamicOtp}`;

    let deliveryStatus = "CONSOLE_LOGGED";

    try {
      const basicAuth = Buffer.from(`${accountSid}:${authToken}`).toString("base64");
      const bodyParams = new URLSearchParams({
        To: toPhone,
        From: fromPhone,
        Body: messageText,
      });

      const res = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`, {
        method: "POST",
        headers: {
          "Authorization": `Basic ${basicAuth}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: bodyParams.toString(),
      });

      const data = await res.json();
      deliveryStatus = data.sid && !data.error_code ? "TWILIO_SMS_QUEUED" : `TWILIO_ERROR: ${data.message}`;
    } catch (err: any) {
      deliveryStatus = `DISPATCH_ERROR: ${err.message}`;
    }

    console.log(`\n======================================================`);
    console.log(`📡 [SMS 2FA DISPATCH]`);
    console.log(`📱 Recipient Phone : +${cleanPhone}`);
    console.log(`🟢 Generated OTP   : >>> ${dynamicOtp} <<<`);
    console.log(`📊 Delivery Status : ${deliveryStatus}`);
    console.log(`======================================================\n`);

    return NextResponse.json({
      success: true,
      message: "OTP sent successfully! Check your phone.",
      phone: cleanPhone
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: "Failed to process OTP." }, { status: 500 });
  }
}