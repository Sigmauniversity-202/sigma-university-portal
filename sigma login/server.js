require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// In-memory OTP storage
const otpStore = new Map();

// Twilio SMS Credentials
const TWILIO_SID = process.env.TWILIO_ACCOUNT_SID || "AC599ba7fe7c955bcdf4df8ba1316fb0f3";
const TWILIO_AUTH = process.env.TWILIO_AUTH_TOKEN || "fd05c36bc9d0f1b559891aa451caea8c";
const TWILIO_FROM = process.env.TWILIO_PHONE_NUMBER || "+16268193679";

// ========== SEND OTP ==========
app.post("/send-otp", async (req, res) => {
  try {
    const { phone } = req.body;
    if (!phone) {
      return res.status(400).json({ success: false, message: "Phone number is required" });
    }

    const cleanDigits = phone.toString().replace(/[^0-9]/g, "");
    const targetPhone = cleanDigits.length === 10 ? `91${cleanDigits}` : cleanDigits;
    const toFormatted = `+${targetPhone}`;

    // 6-digit dynamic OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Store OTP for 5 minutes
    const expiresAt = Date.now() + 5 * 60 * 1000;
    otpStore.set(targetPhone, { otp, expiresAt });
    otpStore.set(phone, { otp, expiresAt });

    let deliveryStatus = "CONSOLE_ONLY";

    // Twilio SMS API call
    try {
      const basicAuth = Buffer.from(`${TWILIO_SID}:${TWILIO_AUTH}`).toString("base64");
      const postParams = new URLSearchParams();
      postParams.append("To", toFormatted);
      postParams.append("From", TWILIO_FROM);
      postParams.append("Body", `Your College Portal OTP is ${otp}. Valid for 5 minutes.`);

      const twilioRes = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${TWILIO_SID}/Messages.json`, {
        method: "POST",
        headers: {
          "Authorization": `Basic ${basicAuth}`,
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: postParams.toString()
      });

      const data = await twilioRes.json();
      deliveryStatus = data.sid && !data.error_code ? "SMS DISPATCHED TO CARRIER ✅" : `TWILIO_LOG: ${data.message || data.code}`;
    } catch (e) {
      deliveryStatus = `DISPATCH_ERROR: ${e.message}`;
    }

    // Terminal log display
    console.log(`\n======================================================`);
    console.log(`📲 [EXPRESS OTP GATEWAY]`);
    console.log(`📱 Recipient Phone : ${toFormatted}`);
    console.log(`🔑 Live OTP Code   : >>> ${otp} <<<`);
    console.log(`📊 Status          : ${deliveryStatus}`);
    console.log(`======================================================\n`);

    return res.json({
      success: true,
      message: "OTP sent successfully! Check your phone."
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to send OTP",
      error: error.message
    });
  }
});

// ========== VERIFY OTP ==========
app.post("/verify-otp", (req, res) => {
  const { phone, otp } = req.body;

  if (!phone || !otp) {
    return res.status(400).json({ success: false, message: "Phone and OTP are required" });
  }

  const cleanDigits = phone.toString().replace(/[^0-9]/g, "");
  const targetPhone = cleanDigits.length === 10 ? `91${cleanDigits}` : cleanDigits;

  const record = otpStore.get(targetPhone) || otpStore.get(phone);

  if (!record) {
    return res.status(400).json({ success: false, message: "OTP not found or expired" });
  }

  if (Date.now() > record.expiresAt) {
    otpStore.delete(targetPhone);
    otpStore.delete(phone);
    return res.status(400).json({ success: false, message: "OTP expired" });
  }

  if (record.otp !== otp.toString().trim()) {
    return res.status(400).json({ success: false, message: "Invalid OTP" });
  }

  // OTP verified successfully
  otpStore.delete(targetPhone);
  otpStore.delete(phone);

  return res.json({
    success: true,
    message: "OTP verified successfully"
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Express OTP Server running on http://localhost:${PORT}`);
});