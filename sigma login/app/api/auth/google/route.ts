import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const role = searchParams.get("role") || "faculty";

  // Google OAuth Client Credentials
  // Replace with your Google Cloud Console Client ID or set in .env.local
  const clientId = process.env.GOOGLE_CLIENT_ID || "1025537599026-YOUR_CLIENT_ID.apps.googleusercontent.com";
  const redirectUri = "http://localhost:3000/api/auth/google/callback";

  const scope = encodeURIComponent("openid email profile");
  const state = encodeURIComponent(JSON.stringify({ role }));

  // Official Google OAuth 2.0 Account Chooser URL
  const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${clientId}&redirect_uri=${encodeURIComponent(
    redirectUri
  )}&scope=${scope}&state=${state}&prompt=select_account`;

  return NextResponse.redirect(googleAuthUrl);
}