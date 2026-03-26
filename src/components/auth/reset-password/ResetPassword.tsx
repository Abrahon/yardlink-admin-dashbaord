"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

type Strength = "empty" | "weak" | "fair" | "strong" | "great";

function getStrength(password: string): {
  level: Strength;
  score: number;
  label: string;
  color: string;
} {
  if (!password)
    return { level: "empty", score: 0, label: "", color: "#E2E8F0" };
  let score = 0;
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (score <= 1)
    return { level: "weak", score: 1, label: "Weak", color: "#EF4444" };
  if (score === 2)
    return { level: "fair", score: 2, label: "Fair", color: "#F59E0B" };
  if (score === 3)
    return { level: "strong", score: 3, label: "Strong", color: "#3B82F6" };
  return { level: "great", score: 4, label: "Great", color: "#10B981" };
}

export const ResetPassword = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") ?? "you@example.com";

  const [form, setForm] = useState({ password: "", confirm: "" });
  const [show, setShow] = useState({ password: false, confirm: false });
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  const strength = getStrength(form.password);

  const requirements = [
    { label: "At least 8 characters", met: form.password.length >= 8 },
    { label: "One uppercase letter", met: /[A-Z]/.test(form.password) },
    { label: "One number", met: /[0-9]/.test(form.password) },
    { label: "One special character", met: /[^A-Za-z0-9]/.test(form.password) },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.password || !form.confirm) {
      setError("Please fill in all fields.");
      return;
    }
    if (form.password !== form.confirm) {
      setError("Passwords do not match.");
      return;
    }
    if (strength.score < 2) {
      setError("Please choose a stronger password.");
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1400));
    setLoading(false);
    setDone(true);
  };

  return (
    <main
      className="min-h-screen flex items-center justify-center px-4 py-12"
      style={{ backgroundColor: "var(--color-page-bg)" }}
    >
      {/* Background decoration */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div
          className="absolute -top-32 -right-32 w-120 h-120 rounded-full opacity-[0.06]"
          style={{
            background:
              "radial-gradient(circle, var(--color-primary), transparent)",
          }}
        />
        <div
          className="absolute -bottom-24 -left-24 w-90 h-90 rounded-full opacity-[0.04]"
          style={{
            background:
              "radial-gradient(circle, var(--color-primary), transparent)",
          }}
        />
      </div>

      <div className="relative w-full max-w-105">
        {/* Header */}
        <div className="text-center mb-8">
          <div
            className="inline-flex items-center justify-center w-12 h-12 rounded-xl mb-4"
            style={{ backgroundColor: done ? "#F0FDF4" : "#EFF6FF" }}
          >
            {done ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M22 11.08V12a10 10 0 11-5.93-9.14"
                  stroke="#16A34A"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <polyline
                  points="22 4 12 14.01 9 11.01"
                  stroke="#16A34A"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 11-7.778 7.778 5.5 5.5 0 017.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"
                  stroke="var(--color-primary)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </div>
          <h1
            className="text-2xl font-semibold tracking-tight"
            style={{
              color: "var(--color-text-main)",
              fontFamily: "var(--font-inter)",
            }}
          >
            {done ? "Password reset!" : "Set new password"}
          </h1>
          <p
            className="mt-1.5 text-sm"
            style={{ color: "var(--color-text-muted)" }}
          >
            {done
              ? "Your password has been reset successfully."
              : `Create a new secure password for ${email}`}
          </p>
        </div>

        {/* Card */}
        <div
          className="bg-white rounded-(--radius-card) p-8"
          style={{
            boxShadow:
              "0 1px 3px rgba(0,0,0,0.08), 0 8px 24px rgba(0,0,0,0.06)",
          }}
        >
          {!done ? (
            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <div
                  className="px-4 py-3 rounded-lg text-sm flex items-center gap-2"
                  style={{
                    backgroundColor: "#FEF2F2",
                    color: "#DC2626",
                    border: "1px solid #FECACA",
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <circle
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                    <line
                      x1="12"
                      y1="8"
                      x2="12"
                      y2="12"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <circle cx="12" cy="16" r="1" fill="currentColor" />
                  </svg>
                  {error}
                </div>
              )}

              {/* New Password */}
              <div>
                <label
                  className="block text-sm font-medium mb-1.5"
                  style={{ color: "var(--color-text-main)" }}
                >
                  New password
                </label>
                <div className="relative">
                  <input
                    type={show.password ? "text" : "password"}
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Create a strong password"
                    autoFocus
                    className="w-full px-3.5 py-2.5 pr-10 rounded-lg text-sm outline-none transition-all duration-150"
                    style={{
                      border: "1px solid var(--color-border-base)",
                      color: "var(--color-text-main)",
                      fontFamily: "var(--font-inter)",
                    }}
                    onFocus={(e) =>
                      (e.currentTarget.style.borderColor =
                        "var(--color-primary)")
                    }
                    onBlur={(e) =>
                      (e.currentTarget.style.borderColor =
                        "var(--color-border-base)")
                    }
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setShow((s) => ({ ...s, password: !s.password }))
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 transition-colors"
                    style={{ color: "var(--color-text-muted)" }}
                  >
                    {show.password ? (
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                        <line
                          x1="1"
                          y1="1"
                          x2="23"
                          y2="23"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </svg>
                    ) : (
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"
                          stroke="currentColor"
                          strokeWidth="2"
                        />
                        <circle
                          cx="12"
                          cy="12"
                          r="3"
                          stroke="currentColor"
                          strokeWidth="2"
                        />
                      </svg>
                    )}
                  </button>
                </div>

                {/* Strength meter */}
                {form.password && (
                  <div className="mt-2.5 space-y-2">
                    <div className="flex gap-1">
                      {[1, 2, 3, 4].map((i) => (
                        <div
                          key={i}
                          className="flex-1 h-1 rounded-full transition-all duration-300"
                          style={{
                            backgroundColor:
                              i <= strength.score
                                ? strength.color
                                : "var(--color-border-base)",
                          }}
                        />
                      ))}
                    </div>
                    <p
                      className="text-xs font-medium"
                      style={{ color: strength.color }}
                    >
                      {strength.label} password
                    </p>
                  </div>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <label
                  className="block text-sm font-medium mb-1.5"
                  style={{ color: "var(--color-text-main)" }}
                >
                  Confirm password
                </label>
                <div className="relative">
                  <input
                    type={show.confirm ? "text" : "password"}
                    name="confirm"
                    value={form.confirm}
                    onChange={handleChange}
                    placeholder="Repeat your password"
                    className="w-full px-3.5 py-2.5 pr-10 rounded-lg text-sm outline-none transition-all duration-150"
                    style={{
                      border:
                        form.confirm && form.confirm !== form.password
                          ? "1px solid #EF4444"
                          : form.confirm && form.confirm === form.password
                            ? "1px solid #10B981"
                            : "1px solid var(--color-border-base)",
                      color: "var(--color-text-main)",
                      fontFamily: "var(--font-inter)",
                    }}
                    onFocus={(e) => {
                      if (!form.confirm || form.confirm === form.password) {
                        e.currentTarget.style.borderColor =
                          "var(--color-primary)";
                      }
                    }}
                    onBlur={(e) => {
                      if (!form.confirm)
                        e.currentTarget.style.borderColor =
                          "var(--color-border-base)";
                      else if (form.confirm !== form.password)
                        e.currentTarget.style.borderColor = "#EF4444";
                      else e.currentTarget.style.borderColor = "#10B981";
                    }}
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setShow((s) => ({ ...s, confirm: !s.confirm }))
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 transition-colors"
                    style={{ color: "var(--color-text-muted)" }}
                  >
                    {show.confirm ? (
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                        <line
                          x1="1"
                          y1="1"
                          x2="23"
                          y2="23"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </svg>
                    ) : (
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"
                          stroke="currentColor"
                          strokeWidth="2"
                        />
                        <circle
                          cx="12"
                          cy="12"
                          r="3"
                          stroke="currentColor"
                          strokeWidth="2"
                        />
                      </svg>
                    )}
                  </button>
                </div>
                {form.confirm && form.confirm === form.password && (
                  <p
                    className="mt-1.5 text-xs flex items-center gap-1"
                    style={{ color: "#10B981" }}
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                      <polyline
                        points="20 6 9 17 4 12"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    Passwords match
                  </p>
                )}
              </div>

              {/* Requirements */}
              {form.password && (
                <div
                  className="p-3.5 rounded-lg space-y-2"
                  style={{
                    backgroundColor: "var(--color-page-bg)",
                    border: "1px solid var(--color-border-base)",
                  }}
                >
                  <p
                    className="text-xs font-medium"
                    style={{ color: "var(--color-text-muted)" }}
                  >
                    Password requirements
                  </p>
                  {requirements.map((req, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div
                        className="shrink-0 w-4 h-4 rounded-full flex items-center justify-center transition-all duration-200"
                        style={{
                          backgroundColor: req.met ? "#DCFCE7" : "#F1F5F9",
                        }}
                      >
                        {req.met ? (
                          <svg
                            width="8"
                            height="8"
                            viewBox="0 0 24 24"
                            fill="none"
                          >
                            <polyline
                              points="20 6 9 17 4 12"
                              stroke="#16A34A"
                              strokeWidth="3"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        ) : (
                          <div
                            className="w-1.5 h-1.5 rounded-full"
                            style={{
                              backgroundColor: "var(--color-border-base)",
                            }}
                          />
                        )}
                      </div>
                      <span
                        className="text-xs transition-colors"
                        style={{
                          color: req.met
                            ? "#16A34A"
                            : "var(--color-text-muted)",
                        }}
                      >
                        {req.label}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 rounded-lg text-sm font-semibold text-white transition-all duration-150 flex items-center justify-center gap-2"
                style={{
                  backgroundColor: "var(--color-primary)",
                  fontFamily: "var(--font-inter)",
                  opacity: loading ? 0.8 : 1,
                }}
                onMouseOver={(e) => {
                  if (!loading)
                    e.currentTarget.style.backgroundColor =
                      "var(--color-primary-hover)";
                }}
                onMouseOut={(e) => {
                  if (!loading)
                    e.currentTarget.style.backgroundColor =
                      "var(--color-primary)";
                }}
              >
                {loading ? (
                  <>
                    <svg
                      className="animate-spin"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <circle
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeOpacity="0.25"
                      />
                      <path
                        d="M12 2a10 10 0 0110 10"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                      />
                    </svg>
                    Resetting password…
                  </>
                ) : (
                  "Reset password"
                )}
              </button>
            </form>
          ) : (
            /* Success state */
            <div className="space-y-5 text-center">
              <div
                className="inline-flex items-center justify-center w-16 h-16 rounded-full"
                style={{ backgroundColor: "#DCFCE7" }}
              >
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                  <polyline
                    points="20 6 9 17 4 12"
                    stroke="#16A34A"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div>
                <h2
                  className="font-semibold text-lg mb-1"
                  style={{ color: "var(--color-text-main)" }}
                >
                  All done!
                </h2>
                <p
                  className="text-sm"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  Your password has been updated. You can now sign in with your
                  new password.
                </p>
              </div>
              <button
                onClick={() => router.push("/login")}
                className="w-full py-2.5 rounded-lg text-sm font-semibold text-white transition-all duration-150"
                style={{
                  backgroundColor: "var(--color-primary)",
                  fontFamily: "var(--font-inter)",
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.backgroundColor =
                    "var(--color-primary-hover)")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.backgroundColor =
                    "var(--color-primary)")
                }
              >
                Back to sign in
              </button>
            </div>
          )}
        </div>

        {!done && (
          <p
            className="text-center mt-6 text-sm"
            style={{ color: "var(--color-text-muted)" }}
          >
            Remember your password?{" "}
            <Link
              href="/login"
              className="font-medium transition-colors"
              style={{ color: "var(--color-primary)" }}
              onMouseOver={(e) =>
                (e.currentTarget.style.color = "var(--color-primary-hover)")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.color = "var(--color-primary)")
              }
            >
              Sign in
            </Link>
          </p>
        )}
      </div>
    </main>
  );
};
