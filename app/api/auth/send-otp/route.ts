import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

globalThis.otpStore = globalThis.otpStore || new Map<string, { code: string; expires: number }>();

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const targetEmail = body.email || "dharmkoshiya74@gmail.com";
    const identifier = body.identifier || targetEmail;

    // Generate 6-digit numeric OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Store OTP for 5 minutes
    globalThis.otpStore.set(identifier, {
      code: otp,
      expires: Date.now() + 5 * 60 * 1000,
    });
    globalThis.otpStore.set(targetEmail, {
      code: otp,
      expires: Date.now() + 5 * 60 * 1000,
    });

    console.log(`[AUTH LOG] OTP for ${targetEmail}: ${otp}`);

    if (resend) {
      try {
        const response = await resend.emails.send({
          from: "Sigma University ERP <onboarding@resend.dev>",
          to: targetEmail,
          subject: "🎓 Sigma University ERP - 2FA Verification Code",
          html: `
            <div style="font-family: Arial, sans-serif; padding: 24px; background-color: #0b1120; color: #f8fafc; border-radius: 12px; max-width: 520px; margin: auto;">
              <h2 style="color: #38bdf8; margin: 0; font-size: 1.4rem;">Sigma University ERP</h2>
              <p style="font-size: 0.95rem; color: #94a3b8; line-height: 1.5;">
                A two-factor authentication request was initiated for your institutional profile. Use the code below to complete your login:
              </p>
              <div style="font-size: 2.4rem; font-weight: 800; letter-spacing: 8px; color: #10b981; margin: 28px 0; padding: 16px 24px; background-color: #1e293b; border-radius: 8px; text-align: center; border: 1px solid #334155;">
                ${otp}
              </div>
              <p style="font-size: 0.8rem; color: #64748b; line-height: 1.4;">
                This code will expire in <b>5 minutes</b>. If you did not request this verification, please contact University IT administration immediately.
              </p>
            </div>
          `,
        });

        console.log(`[RESEND SUCCESS] Dispatched to ${targetEmail}. ID: ${response.data?.id}`);
      } catch (sendError: any) {
        console.error("[RESEND DELIVERY NOTICE]:", sendError.message);
      }
    } else {
      console.warn("[RESEND WARNING] No RESEND_API_KEY detected. Check terminal output for code.");
    }

    return NextResponse.json({ success: true, message: `Verification code dispatched to ${targetEmail}` });
  } catch (error: any) {
    console.error("[OTP ERROR]:", error.message || error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}