"use client";

import React, { useState } from "react";
import { useAppStore } from "../store/useAppStore";
import { useRouter } from "next/navigation";
import Link from "next/link";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const setSession = useAppStore((state) => state.setSession);
  const setUser = useAppStore((state) => state.setUser);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setUser(data.user);
        router.push("/home");
      } else {
        setError(data.error || "Invalid credentials");
      }
    } catch (err) {
      setError("Connection error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-(--color-main) p-4">
      <div className="w-full max-w-md space-y-8 rounded-2xl border-2 border-(--color-secondary) bg-(--color-main) p-8 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.1)] transition-all hover:shadow-[0_20px_50px_-12px_rgba(255,133,187,0.2)] dark:bg-(--color-main)">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-(--color-last)">
            Welcome Back
          </h1>
          <p className="mt-2 text-sm text-(--color-normal) font-medium">
            Log in to continue your architecture journey
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="rounded-lg bg-red-100 p-3 text-sm text-red-600 border border-red-200">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-(--color-last) mb-1">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border-2 border-(--color-secondary) bg-white/50 p-3 outline-none transition-all focus:border-(--color-normal) focus:ring-4 focus:ring-(--color-secondary)/30 dark:bg-black/20 text-(--text-normal)"
                placeholder="jane@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-(--color-last) mb-1">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border-2 border-(--color-secondary) bg-white/50 p-3 outline-none transition-all focus:border-(--color-normal) focus:ring-4 focus:ring-(--color-secondary)/30 dark:bg-black/20 text-(--text-normal)"
                placeholder="••••••••"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative flex w-full justify-center rounded-xl bg-(--color-last) py-3 px-4 text-sm font-bold text-(--color-main) transition-all hover:opacity-90 active:scale-95 disabled:opacity-50 cursor-pointer shadow-lg hover:shadow-xl"
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
          <p className="text-sm text-(--color-normal) font-medium">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="font-bold text-(--color-last) hover:underline transition-all"
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
