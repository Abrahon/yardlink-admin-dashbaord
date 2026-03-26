/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLogin } from "@/api/auth";

export const Login = () => {
  const router = useRouter();
  const loginMutation = useLogin();
  
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      const response = await loginMutation.mutateAsync(form);
      
      // Check if 2FA is required
      if (response.admin_2fa_required) {
        router.push(`/verify?mode=2fa&email=${encodeURIComponent(response.email)}`);
      } else {
        // If no 2FA required, tokens should be in response
        // You might want to handle this case differently based on your API
        router.push("/dashboard");
      }
    } catch (err: any) {
      setError(err?.response?.data?.message || err?.message || "Login failed. Please try again.");
    }
  };

  const isLoading = loginMutation.isPending;

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

        {/* Logo / Brand */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl mb-4"
            style={{ backgroundColor: "var(--color-primary)" }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-white">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
                stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h1 className="text-2xl font-semibold tracking-tight"
            style={{ color: "var(--color-text-main)", fontFamily: "var(--font-inter)" }}>
            Welcome back
          </h1>
          <p className="mt-1 text-sm" style={{ color: "var(--color-text-muted)" }}>
            Sign in to your account to continue
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-(--radius-card) p-8"
          style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.08), 0 8px 24px rgba(0,0,0,0.06)" }}>

          {error && (
            <div className="mb-5 px-4 py-3 rounded-lg text-sm flex items-center gap-2"
              style={{ backgroundColor: "#FEF2F2", color: "#DC2626", border: "1px solid #FECACA" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                <line x1="12" y1="8" x2="12" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <circle cx="12" cy="16" r="1" fill="currentColor" />
              </svg>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium mb-1.5"
                style={{ color: "var(--color-text-main)" }}>
                Email address
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                autoComplete="email"
                disabled={isLoading}
                className="w-full px-3.5 py-2.5 rounded-lg text-sm outline-none transition-all duration-150"
                style={{
                  border: "1px solid var(--color-border-base)",
                  color: "var(--color-text-main)",
                  fontFamily: "var(--font-inter)",
                  opacity: isLoading ? 0.6 : 1,
                }}
                onFocus={e => e.currentTarget.style.borderColor = "var(--color-primary)"}
                onBlur={e => e.currentTarget.style.borderColor = "var(--color-border-base)"}
              />
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-sm font-medium"
                  style={{ color: "var(--color-text-main)" }}>
                  Password
                </label>
                <Link href="/forgot-password"
                  className="text-xs font-medium transition-colors"
                  style={{ color: "var(--color-primary)" }}
                  onMouseOver={e => (e.currentTarget.style.color = "var(--color-primary-hover)")}
                  onMouseOut={e => (e.currentTarget.style.color = "var(--color-primary)")}>
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  disabled={isLoading}
                  className="w-full px-3.5 py-2.5 pr-10 rounded-lg text-sm outline-none transition-all duration-150"
                  style={{
                    border: "1px solid var(--color-border-base)",
                    color: "var(--color-text-main)",
                    fontFamily: "var(--font-inter)",
                    opacity: isLoading ? 0.6 : 1,
                  }}
                  onFocus={e => e.currentTarget.style.borderColor = "var(--color-primary)"}
                  onBlur={e => e.currentTarget.style.borderColor = "var(--color-border-base)"}
                />
                <button 
                  type="button" 
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLoading}
                  className="absolute right-3 top-1/2 -translate-y-1/2 transition-colors"
                  style={{ color: "var(--color-text-muted)" }}>
                  {showPassword ? (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"
                        stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      <line x1="1" y1="1" x2="23" y2="23" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  ) : (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" strokeWidth="2" />
                      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2.5 rounded-lg text-sm font-semibold text-white transition-all duration-150 flex items-center justify-center gap-2"
              style={{
                backgroundColor: isLoading ? "var(--color-primary-hover)" : "var(--color-primary)",
                fontFamily: "var(--font-inter)",
                opacity: isLoading ? 0.8 : 1,
              }}
              onMouseOver={e => { if (!isLoading) e.currentTarget.style.backgroundColor = "var(--color-primary-hover)"; }}
              onMouseOut={e => { if (!isLoading) e.currentTarget.style.backgroundColor = "var(--color-primary)"; }}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeOpacity="0.25" />
                    <path d="M12 2a10 10 0 0110 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                  </svg>
                  Signing in…
                </>
              ) : "Sign in"}
            </button>
          </form>

        </div>
      </div>
    </main>
  );
}