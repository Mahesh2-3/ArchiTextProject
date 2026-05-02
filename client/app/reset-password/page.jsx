"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { toast, ToastContainer } from "react-toastify";
import { toastOptions } from "../Helpers/toast";
import Background from "../Components/Background";

const ResetPasswordContent = () => {
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const emailParam = searchParams.get("email");
    if (emailParam) {
      setEmail(emailParam);
    }
  }, [searchParams]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/reset-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, otp, newPassword }),
        },
      );

      const res = await response.json();

      if (res.success) {
        toast.success(
          "Password reset successfully! Redirecting to login...",
          toastOptions(),
        );
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      } else {
        toast.error(res.message || "Failed to reset password", toastOptions());
      }
    } catch (err) {
      toast.error("Connection error. Please try again later.", toastOptions());
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-dvh w-full items-center justify-center p-4">
      <Background />
      <ToastContainer />
      <div className="w-full max-w-md space-y-8 z-10 bg-(--bg-side)/80 backdrop-blur-md rounded-2xl border border-(--border) p-8 shadow-2xl">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-(--text-main)">
            Reset Password
          </h1>
          <p className="mt-2 text-sm text-(--text-muted) font-medium">
            Enter the OTP sent to your email and a new password
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-(--text-main) mb-1">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-md border border-(--border) bg-(--bg-main) p-3 outline-none transition-all focus:border-(--accent) focus:ring-4 focus:ring-(--accent)/20 text-(--text-main)"
                placeholder="jane@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-(--text-main) mb-1">
                OTP
              </label>
              <input
                type="text"
                required
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full rounded-md border border-(--border) bg-(--bg-main) p-3 outline-none transition-all focus:border-(--accent) focus:ring-4 focus:ring-(--accent)/20 text-(--text-main)"
                placeholder="123456"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-(--text-main) mb-1">
                New Password
              </label>
              <input
                type="password"
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full rounded-md border border-(--border) bg-(--bg-main) p-3 outline-none transition-all focus:border-(--accent) focus:ring-4 focus:ring-(--accent)/20 text-(--text-main)"
                placeholder="New password"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative flex w-full justify-center rounded-md bg-(--accent) py-3 px-4 text-sm font-bold text-(--accent-text) transition-all hover:opacity-90 active:scale-95 disabled:opacity-50 cursor-pointer shadow-lg hover:shadow-xl"
            >
              {loading ? (
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
              ) : (
                "Reset Password"
              )}
            </button>
          </div>
        </form>

        <div className="text-center">
          <p className="text-sm text-(--text-muted) font-medium">
            Remembered your password?{" "}
            <Link
              href="/login"
              className="font-bold text-(--accent) hover:underline transition-all"
            >
              Back to Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

const ResetPasswordPage = () => {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-dvh text-(--text-main)">
          Loading...
        </div>
      }
    >
      <ResetPasswordContent />
    </Suspense>
  );
};

export default ResetPasswordPage;
