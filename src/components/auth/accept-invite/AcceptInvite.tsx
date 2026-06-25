"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAcceptInvite } from "@/api/auth";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { AcceptInviteRequest } from "@/types/auth";

export const AcceptInvite = ({ token }: { token: string }) => {
  const router = useRouter();
  const acceptInviteMutation = useAcceptInvite();
  const [form, setForm] = useState<AcceptInviteRequest>({
    name: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!form.name || !form.password) {
      setError("Name and password are required.");
      return;
    }

    try {
      await acceptInviteMutation.mutateAsync({
        token,
        payload: form,
      });
      router.push("/accept-invite/success");
    } catch (err: any) {
      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Unable to accept invitation. Please try again."
      );
    }
  };

  const isLoading = acceptInviteMutation.isPending

  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-12"
      style={{ backgroundColor: "var(--color-page-bg)" }}>
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-32 -right-32 w-120 h-120 rounded-full opacity-[0.06]"
          style={{ background: "radial-gradient(circle, var(--color-primary), transparent)" }} />
        <div className="absolute -bottom-24 -left-24 w-90 h-90 rounded-full opacity-[0.04]"
          style={{ background: "radial-gradient(circle, var(--color-primary), transparent)" }} />
      </div>

      <div className="relative w-full max-w-105">
        <Link href="/login"
          className="inline-flex items-center gap-1.5 text-sm mb-8 transition-colors"
          style={{ color: "var(--color-text-muted)" }}
          onMouseOver={e => (e.currentTarget.style.color = "var(--color-text-main)")}
          onMouseOut={e => (e.currentTarget.style.color = "var(--color-text-muted)")}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M19 12H5M12 5l-7 7 7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Back to sign in
        </Link>

        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl mb-4"
            style={{ backgroundColor: "#EFF6FF" }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
                stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h1 className="text-2xl font-semibold tracking-tight"
            style={{ color: "var(--color-text-main)", fontFamily: "var(--font-inter)" }}>
            Accept invitation
          </h1>
          <p className="mt-1.5 text-sm leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
            Complete your account setup by choosing your name and password.
          </p>
        </div>

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
            <div>
              <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--color-text-main)" }}>
                Full name
              </label>
              <Input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="B worker"
                autoFocus
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--color-text-main)" }}>
                Create password
              </label>
              <Input
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Test123@#"
              />
            </div>

            <Button type="submit" fullWidth disabled={isLoading}>
              {isLoading ? "Accepting invitation…" : "Accept invitation"}
            </Button>
          </form>
        </div>
      </div>
    </main>
  );
};
