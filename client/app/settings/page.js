"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  User,
  History,
  Robot,
  Database,
  ShieldAlt,
  FileContract,
  ChevronRight,
  ArrowLeft,
  Palette,
  Logout,
} from "../Helpers/icons";
import ThemeDropDown from "../Components/ThemeDropDown";
import { logout } from "../api/Auth";
import { useAppStore } from "../store/useAppStore";
import { toast } from "react-toastify";
import { toastOptions } from "../Helpers/toast";

const settingsLinks = [
  {
    category: "Account",
    items: [
      {
        label: "Profile",
        description: "Manage your personal information",
        href: "/settings/profile",
        icon: User,
      },
      {
        label: "History",
        description: "View your conversation history",
        href: "/settings/history",
        icon: History,
      },
    ],
  },
  {
    category: "Legal",
    items: [
      {
        label: "Privacy Policy",
        description: "Read our privacy policy",
        href: "/settings/privacy-policy",
        icon: ShieldAlt,
      },
      {
        label: "Terms & Conditions",
        description: "Review terms of service",
        href: "/settings/terms-and-conditions",
        icon: FileContract,
      },
    ],
  },
];

const SettingsPage = () => {
  const router = useRouter();
  const setUser = useAppStore((state) => state.setUser);

  const handleLogout = async () => {
    const { success } = await logout();
    if (success) {
      setUser(null);
      router.push("/login");
    } else {
      toast.error("Logout failed. Please try Again.", toastOptions());
    }
  };

  return (
    <div className="w-full h-full overflow-y-auto bg-(--color-main) flex flex-col pb-20">
      {/* Header */}
      <div className="w-full px-6 py-5 flex items-center gap-4 border-b border-gray-300 dark:border-gray-700 bg-(--color-secondary)/40">
        <button
          onClick={() => router.back()}
          className="p-2 rounded-lg hover:bg-black/10 dark:hover:bg-white/10 transition cursor-pointer text-(--text-normal)"
        >
          <ArrowLeft size={18} />
        </button>
        <h1 className="text-2xl font-bold text-(--text-normal) tracking-tight">
          Settings
        </h1>
      </div>

      {/* Content */}
      <div className="w-full max-w-2xl mx-auto px-6 py-8 flex flex-col gap-8">
        {settingsLinks.map((group) => (
          <div key={group.category} className="flex flex-col gap-2">
            {/* Category Label */}
            <span className="text-xs font-semibold uppercase tracking-widest text-(--text-normal)/50 px-1 mb-1">
              {group.category}
            </span>

            {/* Links */}
            <div className="flex flex-col rounded-sm border border-gray-300 dark:border-gray-700 bg-(--color-secondary)/30">
              {group.items.map((item, idx) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`flex items-center gap-4 px-5 py-4 hover:bg-black/5 dark:hover:bg-white/5 transition group cursor-pointer ${
                    idx !== group.items.length - 1
                      ? "border-b border-gray-300 dark:border-gray-700"
                      : ""
                  }`}
                >
                  {/* Icon */}
                  <div className="w-10 h-10 rounded-lg bg-(--color-normal)/20 flex items-center justify-center shrink-0 group-hover:bg-(--color-normal)/30 transition">
                    <item.icon
                      size={18}
                      className="text-(--accent) group-hover:scale-110 transition-transform"
                    />
                  </div>

                  {/* Text */}
                  <div className="flex flex-col flex-1 min-w-0">
                    <span className="font-semibold text-(--text-normal) text-sm">
                      {item.label}
                    </span>
                    <span className="text-xs text-(--text-normal)/60 truncate">
                      {item.description}
                    </span>
                  </div>

                  {/* Chevron */}
                  <ChevronRight
                    size={12}
                    className="text-(--text-normal)/30 group-hover:text-(--text-normal)/60 group-hover:translate-x-0.5 transition-all shrink-0"
                  />
                </Link>
              ))}
              {group.category === "Account" && (
                <ThemeDropDown
                  item={{
                    label: "Theme",
                    description: "Change the theme of the app",
                    icon: Palette,
                  }}
                  isLast={true}
                />
              )}
            </div>
          </div>
        ))}

        {/* Logout Button */}
        <div className="mt-4 flex">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-3 py-4 rounded-sm border border-red-500/30 bg-red-500/10 hover:bg-red-500/20 text-red-500 font-bold transition-colors cursor-pointer group"
          >
            <Logout
              size={20}
              className="group-hover:-translate-x-1 transition-transform"
            />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
