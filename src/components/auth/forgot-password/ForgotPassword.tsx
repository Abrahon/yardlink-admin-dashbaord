/* eslint-disable react/no-unescaped-entities */
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export const ForgotPassword = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) { setError("Please enter your email address."); return; }
    setLoading(true);
    // Simulate API call
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSent(true);
  };

  const handleResend = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-12"
      style={{ backgroundColor: "var(--color-page-bg)" }}>

      {/* Background decoration */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-32 -right-32 w-120 h-120 rounded-full opacity-[0.06]"
          style={{ background: "radial-gradient(circle, var(--color-primary), transparent)" }} />
        <div className="absolute -bottom-24 -left-24 w-90 h-90 rounded-full opacity-[0.04]"
          style={{ background: "radial-gradient(circle, var(--color-primary), transparent)" }} />
      </div>

      <div className="relative w-full max-w-105">

        {/* Back to login */}
        <Link href="/login"
          className="inline-flex items-center gap-1.5 text-sm mb-8 transition-colors"
          style={{ color: "var(--color-text-muted)" }}
          onMouseOver={e => (e.currentTarget.style.color = "var(--color-text-main)")}
          onMouseOut={e => (e.currentTarget.style.color = "var(--color-text-muted)")}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M19 12H5M12 5l-7 7 7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Back to sign in
        </Link>

        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl mb-4"
            style={{ backgroundColor: sent ? "#F0FDF4" : "#EFF6FF" }}>
            {sent ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6z"
                  stroke="#16A34A" strokeWidth="2" />
                <path d="M22 6l-10 7L2 6" stroke="#16A34A" strokeWidth="2" strokeLinecap="round" />
              </svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <rect x="3" y="11" width="18" height="11" rx="2" stroke="var(--color-primary)" strokeWidth="2" />
                <path d="M7 11V7a5 5 0 0110 0v4" stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round" />
              </svg>
            )}
          </div>
          <h1 className="text-2xl font-semibold tracking-tight"
            style={{ color: "var(--color-text-main)", fontFamily: "var(--font-inter)" }}>
            {sent ? "Check your email" : "Forgot password?"}
          </h1>
          <p className="mt-1.5 text-sm leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
            {sent
              ? <>We've sent a reset link to <strong style={{ color: "var(--color-text-main)" }}>{email}</strong></>
              : "No worries — enter your email and we'll send you a reset link."}
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-(--radius-card) p-8"
          style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.08), 0 8px 24px rgba(0,0,0,0.06)" }}>

          {!sent ? (
            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <div className="px-4 py-3 rounded-lg text-sm flex items-center gap-2"
                  style={{ backgroundColor: "#FEF2F2", color: "#DC2626", border: "1px solid #FECACA" }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                    <line x1="12" y1="8" x2="12" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    <circle cx="12" cy="16" r="1" fill="currentColor" />
                  </svg>
                  {error}
                </div>
              )}

              <div>
                <label className="block text-sm font-medium mb-1.5"
                  style={{ color: "var(--color-text-main)" }}>
                  Email address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={e => { setEmail(e.target.value); setError(""); }}
                  placeholder="you@example.com"
                  autoComplete="email"
                  autoFocus
                  className="w-full px-3.5 py-2.5 rounded-lg text-sm outline-none transition-all duration-150"
                  style={{
                    border: "1px solid var(--color-border-base)",
                    color: "var(--color-text-main)",
                    fontFamily: "var(--font-inter)",
                  }}
                  onFocus={e => e.currentTarget.style.borderColor = "var(--color-primary)"}
                  onBlur={e => e.currentTarget.style.borderColor = "var(--color-border-base)"}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 rounded-lg text-sm font-semibold text-white transition-all duration-150 flex items-center justify-center gap-2"
                style={{
                  backgroundColor: "var(--color-primary)",
                  fontFamily: "var(--font-inter)",
                  opacity: loading ? 0.8 : 1,
                }}
                onMouseOver={e => { if (!loading) e.currentTarget.style.backgroundColor = "var(--color-primary-hover)"; }}
                onMouseOut={e => { if (!loading) e.currentTarget.style.backgroundColor = "var(--color-primary)"; }}
              >
                {loading ? (
                  <>
                    <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeOpacity="0.25" />
                      <path d="M12 2a10 10 0 0110 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                    </svg>
                    Sending…
                  </>
                ) : "Send reset link"}
              </button>
            </form>
          ) : (
            <div className="space-y-4">
              {/* Success steps */}
              <div className="space-y-3">
                {["Check your inbox for an email from us.", "Click the reset link inside the email.", "You'll be directed to set a new password."].map((step, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs font-semibold mt-0.5"
                      style={{ backgroundColor: "#DBEAFE", color: "var(--color-primary)" }}>
                      {i + 1}
                    </div>
                    <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>{step}</p>
                  </div>
                ))}
              </div>

              <div className="pt-2 border-t" style={{ borderColor: "var(--color-border-base)" }}>
                <p className="text-sm text-center" style={{ color: "var(--color-text-muted)" }}>
                  Didn't receive it?{" "}
                  <button
                    onClick={handleResend}
                    disabled={loading}
                    className="font-medium transition-colors"
                    style={{ color: "var(--color-primary)" }}
                    onMouseOver={e => (e.currentTarget.style.color = "var(--color-primary-hover)")}
                    onMouseOut={e => (e.currentTarget.style.color = "var(--color-primary)")}>
                    {loading ? "Resending…" : "Resend email"}
                  </button>
                </p>
              </div>

              <button
                onClick={() => router.push("/verify?mode=reset&email=" + encodeURIComponent(email))}
                className="w-full py-2.5 rounded-lg text-sm font-semibold text-white transition-all duration-150"
                style={{ backgroundColor: "var(--color-primary)", fontFamily: "var(--font-inter)" }}
                onMouseOver={e => (e.currentTarget.style.backgroundColor = "var(--color-primary-hover)")}
                onMouseOut={e => (e.currentTarget.style.backgroundColor = "var(--color-primary)")}>
                I have the code →
              </button>
            </div>
          )}
        </div>

        <p className="text-center mt-6 text-sm" style={{ color: "var(--color-text-muted)" }}>
          Remember your password?{" "}
          <Link href="/login"
            className="font-medium transition-colors"
            style={{ color: "var(--color-primary)" }}
            onMouseOver={e => (e.currentTarget.style.color = "var(--color-primary-hover)")}
            onMouseOut={e => (e.currentTarget.style.color = "var(--color-primary)")}>
            Sign in
          </Link>
        </p>
      </div>
    </main>
  );
}