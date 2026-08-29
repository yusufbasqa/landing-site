"use client";

import { useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// Confirmed against the live API: POST {base}/api/reset-password with
// { email, token, password, password_confirmation }, returning 422 with a
// { message } (or { errors }) body for an invalid/expired token.
const RESET_PASSWORD_PATH = "/api/reset-password";

type Status = "idle" | "submitting" | "success" | "error";

async function extractErrorMessage(res: Response): Promise<string> {
  try {
    const data = await res.json();
    if (typeof data?.message === "string" && data.message) {
      return data.message;
    }
    const firstFieldError = data?.errors && Object.values(data.errors)[0];
    if (Array.isArray(firstFieldError) && typeof firstFieldError[0] === "string") {
      return firstFieldError[0];
    }
  } catch {
    // response wasn't JSON — fall through to a generic message
  }
  return res.status === 400 || res.status === 401 || res.status === 422
    ? "This reset link is invalid or has expired. Request a new one from the app."
    : "Something went wrong. Please try again.";
}

export function ResetPasswordForm({
  token,
  email,
}: {
  token?: string;
  email?: string;
}) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const linkIsValid = Boolean(token && email);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (password.length < 8) {
      setStatus("error");
      setErrorMessage("Password must be at least 8 characters.");
      return;
    }
    if (password !== confirmPassword) {
      setStatus("error");
      setErrorMessage("Passwords don't match.");
      return;
    }
    if (!API_BASE_URL) {
      setStatus("error");
      setErrorMessage("Reset service isn't configured. Contact support.");
      return;
    }

    setStatus("submitting");

    try {
      const res = await fetch(`${API_BASE_URL}${RESET_PASSWORD_PATH}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          token,
          password,
          password_confirmation: confirmPassword,
        }),
      });

      if (!res.ok) {
        setErrorMessage(await extractErrorMessage(res));
        setStatus("error");
        return;
      }

      setStatus("success");
    } catch {
      setErrorMessage("Couldn't reach the server. Check your connection and try again.");
      setStatus("error");
    }
  }

  return (
    <div className="w-full max-w-md">
      <div className="mb-6 text-center">
        <div className="mx-auto mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-border bg-surface-raised/80 px-3 py-1 font-mono text-xs uppercase tracking-[0.14em] text-ink/60">
          <span className="h-1.5 w-1.5 rounded-full bg-brand" />
          Account security
        </div>
        <h1 className="font-display text-[clamp(1.75rem,3vw,2.25rem)] font-semibold leading-tight tracking-tight text-ink">
          Reset your password
        </h1>
        {linkIsValid && (
          <p className="mt-2 text-sm text-ink/60">
            Setting a new password for{" "}
            <span className="font-medium text-ink">{email}</span>
          </p>
        )}
      </div>

      <div className="overflow-hidden rounded-2xl border border-border bg-surface-raised/80 p-7 shadow-[0_30px_90px_-30px_rgba(99,102,241,0.35)] backdrop-blur-md">
        <AnimatePresence mode="wait">
          {!linkIsValid ? (
            <motion.div
              key="invalid-link"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="py-2 text-center"
            >
              <p className="text-lg font-semibold text-ink">
                This reset link is missing information.
              </p>
              <p className="mt-1.5 text-sm text-ink/60">
                Request a new password reset link from the app and open it
                directly on your device.
              </p>
            </motion.div>
          ) : status === "success" ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="py-4 text-center"
            >
              <div className="mx-auto flex items-center justify-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-accent-green" />
                <p className="font-mono text-[11px] uppercase tracking-wide text-ink/45">
                  Password updated
                </p>
              </div>
              <p className="mt-3 text-lg font-semibold text-ink">
                You&rsquo;re all set.
              </p>
              <p className="mt-1.5 text-sm text-ink/60">
                Return to the app and log in with your new password.
              </p>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              onSubmit={handleSubmit}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col gap-4"
            >
              {status === "error" && errorMessage && (
                <div className="rounded-lg border border-red-200 bg-red-50 px-3.5 py-2.5 text-sm text-red-700">
                  {errorMessage}
                </div>
              )}

              <div>
                <label
                  htmlFor="password"
                  className="font-mono text-[11px] uppercase tracking-wide text-ink/45"
                >
                  New password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  minLength={8}
                  autoComplete="new-password"
                  placeholder="At least 8 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1.5 w-full rounded-lg border border-border bg-surface px-3.5 py-2.5 text-sm text-ink placeholder:text-ink/35 focus:border-brand/50 focus:outline-none focus:ring-2 focus:ring-brand/30"
                />
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="font-mono text-[11px] uppercase tracking-wide text-ink/45"
                >
                  Confirm password
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  minLength={8}
                  autoComplete="new-password"
                  placeholder="Re-enter your new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="mt-1.5 w-full rounded-lg border border-border bg-surface px-3.5 py-2.5 text-sm text-ink placeholder:text-ink/35 focus:border-brand/50 focus:outline-none focus:ring-2 focus:ring-brand/30"
                />
              </div>

              <button
                type="submit"
                disabled={status === "submitting"}
                className="mt-2 rounded-[10px] bg-brand px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-brand-deep disabled:cursor-not-allowed disabled:opacity-60"
              >
                {status === "submitting" ? "Resetting…" : "Reset password"}
              </button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
