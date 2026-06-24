"use client";

import Link from "next/link";

export const AcceptInviteSuccess = () => {
  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-12"
      style={{ backgroundColor: "var(--color-page-bg)" }}>
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-32 -right-32 w-120 h-120 rounded-full opacity-[0.06]"
          style={{ background: "radial-gradient(circle, var(--color-primary), transparent)" }} />
        <div className="absolute -bottom-24 -left-24 w-90 h-90 rounded-full opacity-[0.04]"
          style={{ background: "radial-gradient(circle, var(--color-primary), transparent)" }} />
      </div>

      <div className="relative w-full max-w-105 text-center">
        <div className="bg-white rounded-(--radius-card) p-10"
          style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.08), 0 8px 24px rgba(0,0,0,0.06)" }}>
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mx-auto mb-6"
            style={{ backgroundColor: "#ECFDF5" }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <path d="M20 6L9 17l-5-5" stroke="#059669" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h1 className="text-3xl font-semibold tracking-tight" style={{ color: "var(--color-text-main)", fontFamily: "var(--font-inter)" }}>
            Invitation accepted
          </h1>
          <p className="mt-3 text-sm leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
            Your account is ready. You can now sign in and access the platform.
          </p>

          <div className="mt-8 space-y-4">
            <Link href="/login"
              className="inline-flex items-center justify-center w-full rounded-lg px-5 py-3 text-sm font-semibold text-white"
              style={{ backgroundColor: "var(--color-primary)", fontFamily: "var(--font-inter)" }}>
              Go to sign in
            </Link>
            <Link href="/"
              className="inline-flex items-center justify-center w-full rounded-lg px-5 py-3 text-sm font-semibold text-slate-700 border border-slate-200 bg-white"
              style={{ fontFamily: "var(--font-inter)" }}>
              Back to home
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};
