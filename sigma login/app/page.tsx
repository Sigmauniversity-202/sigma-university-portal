"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import "./login.css";

const SLIDES = [
  { src: "/images/campus-1.png", alt: "Sanjeevani Bhavan" },
  { src: "/images/campus-2.jpeg", alt: "Saraswati Bhavan" },
  { src: "/images/campus-3.jpeg", alt: "Saraswati Temple Entrance" },
  { src: "/images/campus-4.jpeg", alt: "Campus Pathway" },
];

export default function LoginPage() {
  const router = useRouter();
  const [role, setRole] = useState<"faculty" | "hod" | "student">("faculty");
  const [identifier, setIdentifier] = useState("E1492");
  const [password, setPassword] = useState("Sigma@123");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const [currentSlide, setCurrentSlide] = useState(0);

  // Captcha state for Student
  const [captchaText, setCaptchaText] = useState("");
  const [captchaInput, setCaptchaInput] = useState("");

  // 2FA modal state for Faculty & HOD
  const [isOtpStep, setIsOtpStep] = useState(false);
  const [enteredOtp, setEnteredOtp] = useState("");
  const [maskedPhone, setMaskedPhone] = useState("+91 ******5051");

  // Forgot Password state: "none" | "enter_id" | "verify_reset"
  const [forgotStep, setForgotStep] = useState<"none" | "enter_id" | "verify_reset">("none");
  const [resetId, setResetId] = useState("");
  const [resetOtp, setResetOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [errorMsg, setErrorMsg] = useState("");
  const [infoMsg, setInfoMsg] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const generateCaptcha = () => {
    const chars = "23456789ABCDEFGHJKLMNPQRSTUVWXYZ";
    let code = "";
    for (let i = 0; i < 5; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptchaText(code);
    setCaptchaInput("");
  };

  useEffect(() => {
    setIsOtpStep(false);
    setForgotStep("none");
    setErrorMsg("");
    setInfoMsg("");

    if (role === "student") {
      generateCaptcha();
      if (identifier === "E1492" || identifier === "HOD-CSE-01") setIdentifier("210101001");
    } else if (role === "hod") {
      if (identifier === "210101001" || identifier === "E1492") setIdentifier("HOD-CSE-01");
    } else {
      if (identifier === "210101001" || identifier === "HOD-CSE-01") setIdentifier("E1492");
    }
  }, [role]);

  // Handle Standard Sign-In
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setInfoMsg("");

    if (role === "student") {
      if (captchaInput.trim().toUpperCase() !== captchaText) {
        setErrorMsg("Invalid captcha code. Please try again.");
        generateCaptcha();
        return;
      }
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role, identifier, password, rememberMe }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.message || "Invalid credentials.");
        setLoading(false);
        return;
      }

      if (role === "student") {
        router.push(data.redirectUrl || "/student/dashboard");
        return;
      }

      const otpRes = await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier, phone: "9426250051" }),
      });

      const otpData = await otpRes.json();

      if (otpRes.ok) {
        setMaskedPhone(otpData.maskedPhone || "+91 ******5051");
        setIsOtpStep(true);
        setInfoMsg(`A 6-digit OTP has been sent via SMS to ${otpData.maskedPhone || "+91 ******5051"}.`);
      } else {
        setErrorMsg(otpData.message || "Failed to dispatch OTP. Please try again.");
      }
    } catch (err: any) {
      setErrorMsg("Network error. Please verify the server is running.");
    } finally {
      setLoading(false);
    }
  };

  // Handle 2FA OTP Verify
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          identifier,
          phone: "9426250051",
          otp: enteredOtp.trim(),
        }),
      });

      const data = await res.json();

      if (res.ok) {
        const destination = role === "hod" ? "/hod/dashboard" : "/faculty/dashboard";
        router.push(data.redirectUrl || destination);
      } else {
        setErrorMsg(data.message || "Invalid or expired OTP code.");
      }
    } catch (err) {
      setErrorMsg("Verification failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Forgot Password: Step 1 - Send Reset OTP
  const handleRequestReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setInfoMsg("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier: resetId.trim() || identifier }),
      });

      const data = await res.json();
      if (res.ok) {
        setMaskedPhone(data.maskedPhone || "+91 ******5051");
        setForgotStep("verify_reset");
        setInfoMsg(`Reset code sent to ${data.maskedPhone || "+91 ******5051"}.`);
      } else {
        setErrorMsg(data.message || "Could not dispatch reset code.");
      }
    } catch (err) {
      setErrorMsg("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Forgot Password: Step 2 - Verify OTP & Set New Password
  const handleConfirmReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setInfoMsg("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          identifier: resetId.trim() || identifier,
          otp: resetOtp.trim(),
          newPassword: newPassword,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setPassword(newPassword);
        setForgotStep("none");
        setInfoMsg("Password successfully reset! You can now sign in.");
      } else {
        setErrorMsg(data.message || "Invalid or expired OTP.");
      }
    } catch (err) {
      setErrorMsg("Reset failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Sign In with Google Handler
  const handleGoogleSignIn = () => {
    window.location.href = `/api/auth/google?role=${role}`;
  };

  return (
    <div className="login-split-page">
      {/* Left Campus Slideshow Hero */}
      <div className="left-campus-hero">
        {SLIDES.map((slide, idx) => (
          <img
            key={slide.src}
            src={slide.src}
            alt={slide.alt}
            className={`hero-slide ${idx === currentSlide ? "active" : ""}`}
          />
        ))}

        <div className="hero-dark-overlay" />

        <div className="hero-meta-z">
          <span className="brand-heading-text">SIGMA UNIVERSITY</span>
        </div>

        <div className="hero-meta-z">
          <h1 className="hero-quote-heading">
            Sapno Se <br />
            <span>Safalta Tak</span>
          </h1>
          <div className="hero-tag-badge">#ChooseYourAchieveYourWay</div>
          <div className="hero-motto-row">
            <span>LEARN</span> &bull; <span>EXCEL</span> &bull; <span>REACH</span>
          </div>

          <div className="slideshow-dots">
            {SLIDES.map((_, i) => (
              <span
                key={i}
                onClick={() => setCurrentSlide(i)}
                className={`slide-dot ${i === currentSlide ? "active" : ""}`}
              />
            ))}
          </div>
        </div>

        <div className="hero-meta-z hero-footer-copy">
          &copy; 2026 Sigma University. All rights reserved.
        </div>
      </div>

      {/* Right Login / 2FA / Forgot Password Panel */}
      <div className="right-form-panel">
        <div className="form-card-container">
          <div className="logo-center-wrapper">
            <img
              src="/images/sigma-logo.jpg"
              alt="Sigma University Vadodara"
              className="portal-crest-logo"
            />
          </div>

          <span className="role-section-label">Role</span>

          <div className="role-tabs-segment">
            <button
              type="button"
              disabled={isOtpStep || forgotStep !== "none"}
              onClick={() => setRole("faculty")}
              className={`segment-tab-btn ${role === "faculty" ? "active" : ""}`}
            >
              Faculty
            </button>
            <button
              type="button"
              disabled={isOtpStep || forgotStep !== "none"}
              onClick={() => setRole("hod")}
              className={`segment-tab-btn ${role === "hod" ? "active" : ""}`}
            >
              HOD
            </button>
            <button
              type="button"
              disabled={isOtpStep || forgotStep !== "none"}
              onClick={() => setRole("student")}
              className={`segment-tab-btn ${role === "student" ? "active" : ""}`}
            >
              Student
            </button>
          </div>

          {infoMsg && (
            <div style={{ background: "#eff6ff", border: "1px solid #bfdbfe", color: "#1e40af", fontSize: "0.8rem", padding: "8px 10px", borderRadius: "6px", marginBottom: "12px" }}>
              {infoMsg}
            </div>
          )}

          {errorMsg && (
            <div style={{ background: "#fee2e2", border: "1px solid #fca5a5", color: "#b91c1c", fontSize: "0.8rem", padding: "8px 10px", borderRadius: "6px", marginBottom: "12px" }}>
              {errorMsg}
            </div>
          )}

          {/* VIEW 1: Forgot Password - Request OTP */}
          {forgotStep === "enter_id" && (
            <form onSubmit={handleRequestReset}>
              <div style={{ textAlign: "center", marginBottom: "14px" }}>
                <div style={{ fontSize: "1rem", fontWeight: 700, color: "#0f172a" }}>
                  Reset Account Password
                </div>
                <div style={{ fontSize: "0.78rem", color: "#64748b", marginTop: "4px" }}>
                  Enter your Username or ID to receive a verification code.
                </div>
              </div>

              <div className="login-input-row">
                <label className="input-field-label">Username / ID</label>
                <input
                  type="text"
                  required
                  value={resetId || identifier}
                  onChange={(e) => setResetId(e.target.value)}
                  placeholder="e.g. E1492 or 210101001"
                  className="login-text-control"
                />
              </div>

              <button type="submit" disabled={loading} className="btn-primary-signin">
                {loading ? "Sending Code..." : "Send Reset Code →"}
              </button>

              <div style={{ textAlign: "center", marginTop: "14px" }}>
                <button
                  type="button"
                  onClick={() => setForgotStep("none")}
                  style={{ background: "none", border: "none", color: "#64748b", cursor: "pointer", fontSize: "0.8rem" }}
                >
                  ← Back to Login
                </button>
              </div>
            </form>
          )}

          {/* VIEW 2: Forgot Password - Confirm Code & Set Password */}
          {forgotStep === "verify_reset" && (
            <form onSubmit={handleConfirmReset}>
              <div style={{ textAlign: "center", marginBottom: "14px" }}>
                <div style={{ fontSize: "1rem", fontWeight: 700, color: "#0f172a" }}>
                  Create New Password
                </div>
                <div style={{ fontSize: "0.78rem", color: "#64748b", marginTop: "4px" }}>
                  Verification code sent to <strong>{maskedPhone}</strong>
                </div>
              </div>

              <div className="login-input-row">
                <label className="input-field-label">6-Digit Reset Code</label>
                <input
                  type="text"
                  required
                  maxLength={6}
                  value={resetOtp}
                  onChange={(e) => setResetOtp(e.target.value.replace(/[^0-9]/g, ""))}
                  placeholder="• • • • • •"
                  className="login-text-control"
                  style={{ textAlign: "center", fontSize: "1.2rem", letterSpacing: "6px", fontWeight: "700" }}
                />
              </div>

              <div className="login-input-row">
                <label className="input-field-label">New Password</label>
                <input
                  type="password"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password"
                  className="login-text-control"
                />
              </div>

              <button type="submit" disabled={loading || resetOtp.length < 6} className="btn-primary-signin">
                {loading ? "Updating..." : "Update Password & Return"}
              </button>

              <div style={{ textAlign: "center", marginTop: "14px" }}>
                <button
                  type="button"
                  onClick={() => setForgotStep("none")}
                  style={{ background: "none", border: "none", color: "#64748b", cursor: "pointer", fontSize: "0.8rem" }}
                >
                  Cancel
                </button>
              </div>
            </form>
          )}

          {/* VIEW 3: 2FA OTP Step */}
          {forgotStep === "none" && isOtpStep && (
            <form onSubmit={handleVerifyOtp}>
              <div style={{ textAlign: "center", marginBottom: "14px" }}>
                <div style={{ fontSize: "1.05rem", fontWeight: 700, color: "#0f172a" }}>
                  Two-Factor Authentication
                </div>
                <div style={{ fontSize: "0.78rem", color: "#64748b", marginTop: "4px" }}>
                  Enter the 6-digit code delivered to <strong>{maskedPhone}</strong>
                </div>
              </div>

              <div className="login-input-row">
                <label className="input-field-label">Verification Code (OTP)</label>
                <input
                  type="text"
                  required
                  maxLength={6}
                  value={enteredOtp}
                  onChange={(e) => setEnteredOtp(e.target.value.replace(/[^0-9]/g, ""))}
                  placeholder="• • • • • •"
                  className="login-text-control"
                  style={{ textAlign: "center", fontSize: "1.3rem", letterSpacing: "8px", fontWeight: "700" }}
                  autoFocus
                />
              </div>

              <button type="submit" disabled={loading || enteredOtp.length < 6} className="btn-primary-signin">
                {loading ? "Verifying OTP..." : "Verify & Sign In →"}
              </button>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "14px", fontSize: "0.8rem" }}>
                <button
                  type="button"
                  onClick={() => handleSubmit({ preventDefault: () => {} } as any)}
                  style={{ background: "none", border: "none", color: "#2563eb", cursor: "pointer", fontWeight: "600" }}
                >
                  Resend OTP
                </button>
                <button
                  type="button"
                  onClick={() => setIsOtpStep(false)}
                  style={{ background: "none", border: "none", color: "#64748b", cursor: "pointer" }}
                >
                  Back to Login
                </button>
              </div>
            </form>
          )}

          {/* VIEW 4: Main Login Form */}
          {forgotStep === "none" && !isOtpStep && (
            <>
              <form onSubmit={handleSubmit}>
                <div className="login-input-row">
                  <label className="input-field-label">
                    {role === "student"
                      ? "Student Username / Enrollment No"
                      : role === "hod"
                      ? "Username / HOD ID"
                      : "Username / Staff ID"}
                  </label>
                  <input
                    type="text"
                    required
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    placeholder={
                      role === "student"
                        ? "Enter Student Username"
                        : role === "hod"
                        ? "Enter HOD ID"
                        : "Enter Staff ID"
                    }
                    className="login-text-control"
                  />
                </div>

                <div className="login-input-row">
                  <label className="input-field-label">Password</label>
                  <div className="password-box-rel">
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••••••"
                      className="login-text-control"
                      style={{ paddingRight: "36px" }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="password-eye-icon"
                    >
                      {showPassword ? "🙈" : "👁️"}
                    </button>
                  </div>
                </div>

                {role === "student" && (
                  <div className="login-input-row">
                    <label className="input-field-label">Captcha</label>
                    <div className="captcha-container-box">
                      <div className="captcha-rendered-text">{captchaText}</div>
                      <button
                        type="button"
                        onClick={generateCaptcha}
                        className="captcha-btn-refresh"
                        title="Refresh Captcha"
                      >
                        🔄
                      </button>
                    </div>
                    <input
                      type="text"
                      required
                      value={captchaInput}
                      onChange={(e) => setCaptchaInput(e.target.value)}
                      placeholder="Enter captcha code"
                      className="login-text-control"
                      style={{ marginTop: "8px", textTransform: "uppercase", letterSpacing: "1px" }}
                    />
                  </div>
                )}

                <div className="options-meta-row">
                  <label style={{ display: "flex", alignItems: "center", gap: "6px", cursor: "pointer", color: "#475569" }}>
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                    />
                    Remember me
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      setResetId(identifier);
                      setForgotStep("enter_id");
                      setErrorMsg("");
                      setInfoMsg("");
                    }}
                    style={{ background: "none", border: "none", color: "#2563eb", cursor: "pointer", fontSize: "0.8rem" }}
                  >
                    Forgot Password?
                  </button>
                </div>

                <button type="submit" disabled={loading} className="btn-primary-signin">
                  {loading ? "Verifying..." : "Sign In →"}
                </button>
              </form>

              <div className="divider-text-or">OR</div>

              <button type="button" onClick={handleGoogleSignIn} className="btn-google-sign">
                <svg width="16" height="16" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                </svg>
                Sign in with Google
              </button>

              <div className="maintenance-alert-card">
                <strong>⚠️ System Maintenance</strong>
                <p style={{ marginTop: "2px" }}>
                  The system will be under maintenance everyday between 11:50 PM to 12:30 AM.
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}