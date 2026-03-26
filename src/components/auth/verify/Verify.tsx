/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import type { VerifyOtpResponse } from "@/types/auth";
import { useVerifyOtp } from "@/api/auth";
import { setTokens } from "@/lib/cookie/cookie";

const CODE_LENGTH = 6;

export const Verify = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const mode = searchParams.get("mode") ?? "2fa"; // "2fa" | "reset"
  const email = searchParams.get("email") ?? "you@example.com";

  const verifyOtpMutation = useVerifyOtp();

  const [digits, setDigits] = useState<string[]>(Array(CODE_LENGTH).fill(""));
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [error, setError] = useState("");
  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Countdown timer
  useEffect(() => {
    if (countdown <= 0) {
      setCanResend(true);
      return;
    }
    const t = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [countdown]);

  const focusNext = (index: number) => {
    if (index < CODE_LENGTH - 1) inputRefs.current[index + 1]?.focus();
  };
  const focusPrev = (index: number) => {
    if (index > 0) inputRefs.current[index - 1]?.focus();
  };

  const handleChange = (index: number, value: string) => {
    setError("");
    // Allow paste of full code
    if (value.length > 1) {
      const pasted = value.replace(/\D/g, "").slice(0, CODE_LENGTH);
      const next = [...digits];
      pasted.split("").forEach((ch, i) => {
        if (index + i < CODE_LENGTH) next[index + i] = ch;
      });
      setDigits(next);
      const lastFilled = Math.min(index + pasted.length - 1, CODE_LENGTH - 1);
      inputRefs.current[lastFilled]?.focus();
      return;
    }
    if (!/^\d?$/.test(value)) return;
    const next = [...digits];
    next[index] = value;
    setDigits(next);
    if (value) focusNext(index);
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace") {
      if (!digits[index]) focusPrev(index);
      else {
        const next = [...digits];
        next[index] = "";
        setDigits(next);
      }
    } else if (e.key === "ArrowLeft") focusPrev(index);
    else if (e.key === "ArrowRight") focusNext(index);
  };

  const code = digits.join("");
  const isComplete = code.length === CODE_LENGTH && digits.every(Boolean);

  const handleSubmit = useCallback(
    async (e?: React.FormEvent) => {
      e?.preventDefault();
      if (!isComplete) {
        setError("Please enter all 6 digits.");
        return;
      }

      setLoading(true);
      setError("");

      try {
        if (mode === "2fa") {
          // Verify OTP for 2FA
          const response: VerifyOtpResponse =
            await verifyOtpMutation.mutateAsync({
              email,
              otp: code,
            });

          // Store tokens in cookies
          if (response.token) {
            setTokens(response.token.access, response.token.refresh);
          }

          // Store user info if needed (you might want to use a state management solution)
          // For now, you could store in localStorage or context
          localStorage.setItem("user", JSON.stringify(response.user));

          // Redirect to dashboard
          router.push("/overview");
        } else {
          // For password reset flow
          router.push(
            "/reset-password?email=" +
              encodeURIComponent(email) +
              "&token=" +
              code,
          );
        }
      } catch (err: any) {
        setError(
          err?.response?.data?.message ||
            err?.message ||
            "Verification failed. Please try again.",
        );
      } finally {
        setLoading(false);
      }
    },
    [isComplete, mode, router, email, code, verifyOtpMutation],
  );

  // Auto-submit when all digits filled
  useEffect(() => {
    if (isComplete && !loading && !error && !verifyOtpMutation.isPending) {
      handleSubmit();
    }
  }, [isComplete]); // eslint-disable-line

  const handleResend = async () => {
    setResending(true);
    try {
      // You'll need to implement resend OTP API call here
      // await resendOtp({ email });

      // Simulate API call
      await new Promise((r) => setTimeout(r, 1000));

      setDigits(Array(CODE_LENGTH).fill(""));
      setCountdown(60);
      setCanResend(false);
      inputRefs.current[0]?.focus();
    } catch (err: any) {
      setError(err?.response?.data?.message || "Failed to resend code");
    } finally {
      setResending(false);
    }
  };

  const is2FA = mode === "2fa";
  const maskedEmail = email.replace(/(.{2}).*(@.*)/, "$1••••$2");
  const isLoading = loading || verifyOtpMutation.isPending;

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
        {/* Back link */}
        <Link
          href={is2FA ? "/login" : "/forgot-password"}
          className="inline-flex items-center gap-1.5 text-sm mb-8 transition-colors"
          style={{ color: "var(--color-text-muted)" }}
          onMouseOver={(e) =>
            (e.currentTarget.style.color = "var(--color-text-main)")
          }
          onMouseOut={(e) =>
            (e.currentTarget.style.color = "var(--color-text-muted)")
          }
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path
              d="M19 12H5M12 5l-7 7 7 7"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          {is2FA ? "Back to sign in" : "Back to forgot password"}
        </Link>

        {/* Header */}
        <div className="text-center mb-8">
          <div
            className="inline-flex items-center justify-center w-12 h-12 rounded-xl mb-4"
            style={{ backgroundColor: "#EFF6FF" }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
                stroke="var(--color-primary)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <h1
            className="text-2xl font-semibold tracking-tight"
            style={{
              color: "var(--color-text-main)",
              fontFamily: "var(--font-inter)",
            }}
          >
            {is2FA ? "Two-factor authentication" : "Verify your email"}
          </h1>
          <p
            className="mt-1.5 text-sm leading-relaxed"
            style={{ color: "var(--color-text-muted)" }}
          >
            {is2FA ? (
              <>
                Enter the 6-digit code from your{" "}
                <strong style={{ color: "var(--color-text-main)" }}>
                  authenticator app
                </strong>
              </>
            ) : (
              <>
                Enter the 6-digit code we sent to{" "}
                <strong style={{ color: "var(--color-text-main)" }}>
                  {maskedEmail}
                </strong>
              </>
            )}
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
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Mode badge */}
            <div className="flex items-center justify-center">
              <span
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium"
                style={{
                  backgroundColor: is2FA ? "#F0FDF4" : "#EFF6FF",
                  color: is2FA ? "#16A34A" : "var(--color-primary)",
                }}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                  {is2FA ? (
                    <path
                      d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                  ) : (
                    <path
                      d="M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6z"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                  )}
                </svg>
                {is2FA ? "Authenticator App" : "Email Verification"}
              </span>
            </div>

            {/* OTP Inputs */}
            <div>
              <div className="flex items-center justify-center gap-2.5">
                {digits.map((digit, i) => (
                  <input
                    key={i}
                    ref={(el) => {
                      inputRefs.current[i] = el;
                    }}
                    type="text"
                    inputMode="numeric"
                    maxLength={6}
                    value={digit}
                    onChange={(e) => handleChange(i, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(i, e)}
                    onFocus={(e) => e.target.select()}
                    disabled={isLoading}
                    className="w-11 h-13 text-center text-xl font-semibold rounded-lg outline-none transition-all duration-150 select-none"
                    style={{
                      height: "52px",
                      border: error
                        ? "1px solid #DC2626"
                        : digit
                          ? "2px solid var(--color-primary)"
                          : "1px solid var(--color-border-base)",
                      color: "var(--color-text-main)",
                      backgroundColor: digit ? "#EFF6FF" : "white",
                      fontFamily: "var(--font-inter)",
                      opacity: isLoading ? 0.6 : 1,
                    }}
                  />
                ))}
              </div>

              {/* Progress dots */}
              <div className="flex items-center justify-center gap-1.5 mt-4">
                {digits.map((d, i) => (
                  <div
                    key={i}
                    className="rounded-full transition-all duration-200"
                    style={{
                      width: d ? "20px" : "6px",
                      height: "4px",
                      backgroundColor: d
                        ? "var(--color-primary)"
                        : "var(--color-border-base)",
                    }}
                  />
                ))}
              </div>
            </div>

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

            <button
              type="submit"
              disabled={isLoading || !isComplete}
              className="w-full py-2.5 rounded-lg text-sm font-semibold text-white transition-all duration-150 flex items-center justify-center gap-2"
              style={{
                backgroundColor: "var(--color-primary)",
                fontFamily: "var(--font-inter)",
                opacity: isLoading || !isComplete ? 0.6 : 1,
                cursor: !isComplete || isLoading ? "not-allowed" : "pointer",
              }}
              onMouseOver={(e) => {
                if (!isLoading && isComplete)
                  e.currentTarget.style.backgroundColor =
                    "var(--color-primary-hover)";
              }}
              onMouseOut={(e) =>
                (e.currentTarget.style.backgroundColor = "var(--color-primary)")
              }
            >
              {isLoading ? (
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
                  Verifying…
                </>
              ) : is2FA ? (
                "Verify & sign in"
              ) : (
                "Verify & continue"
              )}
            </button>

            {/* Resend (email mode only) */}
            {!is2FA && (
              <div className="text-center">
                {canResend ? (
                  <button
                    type="button"
                    onClick={handleResend}
                    disabled={resending}
                    className="text-sm font-medium transition-colors"
                    style={{ color: "var(--color-primary)" }}
                    onMouseOver={(e) =>
                      (e.currentTarget.style.color =
                        "var(--color-primary-hover)")
                    }
                    onMouseOut={(e) =>
                      (e.currentTarget.style.color = "var(--color-primary)")
                    }
                  >
                    {resending ? "Resending…" : "Resend code"}
                  </button>
                ) : (
                  <p
                    className="text-sm"
                    style={{ color: "var(--color-text-muted)" }}
                  >
                    Resend code in{" "}
                    <span
                      className="font-medium tabular-nums"
                      style={{ color: "var(--color-text-main)" }}
                    >
                      {countdown}s
                    </span>
                  </p>
                )}
              </div>
            )}
          </form>
        </div>

        {is2FA && (
          <p
            className="text-center mt-6 text-sm"
            style={{ color: "var(--color-text-muted)" }}
          >
            Lost access to your app?{" "}
            <Link
              href="/support"
              className="font-medium transition-colors"
              style={{ color: "var(--color-primary)" }}
              onMouseOver={(e) =>
                (e.currentTarget.style.color = "var(--color-primary-hover)")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.color = "var(--color-primary)")
              }
            >
              Get help
            </Link>
          </p>
        )}
      </div>
    </main>
  );
};
