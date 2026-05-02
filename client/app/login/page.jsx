"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAppStore } from "../store/useAppStore";
import { login } from "../api/Auth";
import { toast, ToastContainer } from "react-toastify";
import { toastOptions } from "../Helpers/toast";
import Background from "../Components/Background";
import ThemeButton from "../Components/ThemeButton";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const setSession = useAppStore((state) => state.setSession);
  const setUser = useAppStore((state) => state.setUser);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // API call to login the user
      const res = await login(email, password);

      // Successful Login: store user data and then redirect
      if (res.success) {
        // Set token in document.cookie for middleware to read
        if (res.token) {
          const secure =
            process.env.NODE_ENV === "production" ? "; Secure" : "";
          const sameSite =
            process.env.NODE_ENV === "production"
              ? "; SameSite=None"
              : "; SameSite=Lax";
          document.cookie = `token=${res.token}; path=/; max-age=86400${secure}${sameSite}`;
        }

        setUser(res.data);
        toast.success(
          "Login successful! Redirecting to home...",
          toastOptions(),
        );

        setTimeout(() => {
          router.push("/home");
        }, 1000);
      } else {
        toast.error("Invalid credentials", toastOptions());
      }
    } catch (err) {
      toast.error("Connection error. Please try again later.", toastOptions());
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-dvh w-full items-center  justify-center p-4">
      <Background />
      <ToastContainer />
      <div className="w-full max-w-md space-y-8 z-10 bg-(--bg-side)/80 backdrop-blur-md rounded-2xl border border-(--border) p-8 shadow-2xl">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-(--text-main)">
            Welcome Back
          </h1>
          <p className="mt-2 text-sm text-(--text-muted) font-medium">
            Log in to continue your architecture journey
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
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-md border border-(--border) bg-(--bg-main) p-3 outline-none transition-all focus:border-(--accent) focus:ring-4 focus:ring-(--accent)/20 text-(--text-main)"
                placeholder="password"
              />
            </div>
          </div>

          <div>
            <div className="flex justify-end mb-2">
              <Link
                href="/forgot-password"
                className="text-sm font-bold text-(--accent) hover:underline"
              >
                Forgot Password?
              </Link>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="group relative flex w-full justify-center rounded-md bg-(--accent) py-3 px-4 text-sm font-bold text-(--accent-text) transition-all hover:opacity-90 active:scale-95 disabled:opacity-50 cursor-pointer shadow-lg hover:shadow-xl"
            >
              {loading ? (
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
              ) : (
                "Sign In"
              )}
            </button>
          </div>
        </form>

        <div className="text-center">
          <p className="text-sm text-(--text-muted) font-medium">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="font-bold text-(--accent) hover:underline transition-all"
            >
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
