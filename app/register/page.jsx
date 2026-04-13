"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { register } from "../api/Auth";
import { Eye, EyeSlash } from "../Helpers/icons";

const RegisterPage = () => {
  const router = useRouter();

  // Input data
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await register(name, email, password);

      if (res.success) {
        setSuccess(true);
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      } else {
        setError(res.error || "Registration failed");
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
            Join archiText
          </h1>
          <p className="mt-2 text-sm text-(--color-normal) font-medium">
            Create an account to start building architectures
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="rounded-lg bg-red-100 p-3 text-sm text-red-600 border border-red-200">
              {error}
            </div>
          )}
          {success && (
            <div className="rounded-lg bg-green-100 p-3 text-sm text-green-600 border border-green-200">
              Registration successful! Redirecting to login...
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-(--color-last) mb-1">
                Full Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-xl border-2 border-(--color-secondary) bg-white/50 p-3 outline-none transition-all focus:border-(--color-normal) focus:ring-4 focus:ring-(--color-secondary)/30 dark:bg-black/20 text-(--text-normal)"
                placeholder="Jane Doe"
              />
            </div>
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
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-xl border-2 border-(--color-secondary) bg-white/50 p-3 pr-11 outline-none transition-all focus:border-(--color-normal) focus:ring-4 focus:ring-(--color-secondary)/30 dark:bg-black/20 text-(--text-normal)"
                  placeholder="password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-(--color-normal) hover:text-(--color-last) transition-colors cursor-pointer"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeSlash size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading || success}
              className="group relative flex w-full justify-center rounded-xl bg-(--color-last) py-3 px-4 text-sm font-bold text-(--color-main) transition-all hover:opacity-90 active:scale-95 disabled:opacity-50 cursor-pointer shadow-lg hover:shadow-xl"
            >
              {loading ? (
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
              ) : (
                "Sign Up"
              )}
            </button>
          </div>
        </form>

        <div className="text-center">
          <p className="text-sm text-(--color-normal) font-medium">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-bold text-(--color-last) hover:underline transition-all"
            >
              Log in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
