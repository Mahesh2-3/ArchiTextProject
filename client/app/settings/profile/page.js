"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "../../Helpers/icons";
import { useAppStore } from "../../store/useAppStore";
import { toast, ToastContainer } from "react-toastify";
import { toastOptions } from "../../Helpers/toast";
import {
  updateProfile,
  changePassword,
  sendOtp,
  resetPasswordWithOtp,
} from "../../api/User";

const ProfilePage = () => {
  const router = useRouter();
  const user = useAppStore((state) => state.getUser());
  const setUser = useAppStore((state) => state.setUser);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [otpMode, setOtpMode] = useState(false);
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setEmail(user.email || "");
    }
  }, [user]);

  const handleUpdateName = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    setLoading(true);
    const res = await updateProfile(name);
    setLoading(false);
    if (res.success) {
      setUser({ ...user, name: res.data.name });
      toast.success(res.message || "Profile updated!", toastOptions());
    } else {
      toast.error(res.message || "Failed to update profile", toastOptions());
    }
  };

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    if (!newPassword.trim()) {
      toast.error("New password is required", toastOptions());
      return;
    }

    setLoading(true);
    let res;
    if (otpMode) {
      res = await resetPasswordWithOtp(otp, newPassword);
    } else {
      res = await changePassword(oldPassword, newPassword);
    }
    setLoading(false);

    if (res.success) {
      toast.success(
        res.message || "Password updated successfully!",
        toastOptions(),
      );
      setOldPassword("");
      setNewPassword("");
      setOtp("");
      setOtpMode(false);
    } else {
      toast.error(res.message || "Failed to update password", toastOptions());
    }
  };

  const handleSendOtp = async () => {
    setLoading(true);
    const res = await sendOtp();
    setLoading(false);
    if (res.success) {
      toast.success(res.message || "OTP sent to your email", toastOptions());
      setOtpMode(true);
    } else {
      toast.error(res.message || "Failed to send OTP", toastOptions());
    }
  };

  return (
    <div className="w-full min-h-dvh bg-(--color-main) flex flex-col">
      <ToastContainer />
      {/* Header */}
      <div className="w-full px-6 py-5 flex items-center gap-4 border-b border-gray-300 dark:border-gray-700 bg-(--color-secondary)/40">
        <button
          onClick={() => router.back()}
          className="p-2 rounded-lg hover:bg-black/10 dark:hover:bg-white/10 transition cursor-pointer text-(--text-normal)"
        >
          <ArrowLeft size={18} />
        </button>
        <h1 className="text-2xl font-bold text-(--text-normal) tracking-tight">
          Settings / Profile
        </h1>
      </div>

      {/* Content */}
      <div className="w-full max-w-2xl mx-auto px-6 py-8 flex flex-col gap-10">
        {/* Profile Info Section */}
        <div className="p-6 rounded-lg border border-gray-300 dark:border-gray-700 bg-(--color-secondary)/20 flex flex-col gap-4">
          <h2 className="text-xl font-bold text-(--text-normal)">
            Personal Information
          </h2>
          <form onSubmit={handleUpdateName} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-sm text-(--text-normal)/70 font-medium">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                disabled
                className="p-3 rounded-md bg-(--color-main) border border-gray-300 dark:border-gray-700 text-(--text-normal) opacity-60 cursor-not-allowed"
              />
              <span className="text-xs text-(--text-normal)/50">
                Email cannot be changed.
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm text-(--text-normal)/70 font-medium">
                Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="p-3 rounded-md bg-(--color-main) border border-gray-300 dark:border-gray-700 text-(--text-normal) focus:outline-none focus:border-(--accent)"
              />
            </div>
            <div className="flex justify-end mt-2">
              <button
                type="submit"
                disabled={loading || name === user?.name}
                className="px-4 py-2 bg-(--accent) text-white font-medium rounded-md hover:opacity-90 disabled:opacity-50 transition cursor-pointer disabled:cursor-not-allowed"
              >
                {loading ? "Updating..." : "Update Details"}
              </button>
            </div>
          </form>
        </div>

        {/* Change Password Section */}
        <div className="p-6 rounded-lg border border-gray-300 dark:border-gray-700 bg-(--color-secondary)/20 flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-(--text-normal)">
              Change Password
            </h2>
            {!otpMode && (
              <button
                onClick={handleSendOtp}
                disabled={loading}
                className="text-sm text-(--accent) hover:underline cursor-pointer"
              >
                Forgot Password? Send OTP
              </button>
            )}
            {otpMode && (
              <button
                onClick={() => setOtpMode(false)}
                className="text-sm text-(--accent) hover:underline cursor-pointer"
              >
                Use Old Password Instead
              </button>
            )}
          </div>

          <form
            onSubmit={handlePasswordUpdate}
            className="flex flex-col gap-4 mt-2"
          >
            {!otpMode ? (
              <div className="flex flex-col gap-1">
                <label className="text-sm text-(--text-normal)/70 font-medium">
                  Old Password
                </label>
                <input
                  type="password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  placeholder="Enter current password"
                  className="p-3 rounded-md bg-(--color-main) border border-gray-300 dark:border-gray-700 text-(--text-normal) focus:outline-none focus:border-(--accent)"
                  required
                />
              </div>
            ) : (
              <div className="flex flex-col gap-1">
                <label className="text-sm text-(--text-normal)/70 font-medium">
                  OTP (Sent to Email)
                </label>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="Enter 6-digit OTP"
                  className="p-3 rounded-md bg-(--color-main) border border-gray-300 dark:border-gray-700 text-(--text-normal) focus:outline-none focus:border-(--accent)"
                  required
                />
              </div>
            )}

            <div className="flex flex-col gap-1">
              <label className="text-sm text-(--text-normal)/70 font-medium">
                New Password
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
                className="p-3 rounded-md bg-(--color-main) border border-gray-300 dark:border-gray-700 text-(--text-normal) focus:outline-none focus:border-(--accent)"
                required
              />
            </div>

            <div className="flex justify-end mt-2">
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 bg-(--accent) text-white font-medium rounded-md hover:opacity-90 disabled:opacity-50 transition cursor-pointer disabled:cursor-not-allowed"
              >
                {loading ? "Updating..." : "Update Password"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
