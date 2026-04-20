"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "../../Helpers/icons";

const DataControlsPage = () => {
  const router = useRouter();

  return (
    <div className="w-full min-h-screen bg-(--color-main) flex flex-col">
      {/* Header */}
      <div className="w-full px-6 py-5 flex items-center gap-4 border-b border-gray-300 dark:border-gray-700 bg-(--color-secondary)/40">
        <button
          onClick={() => router.back()}
          className="p-2 rounded-lg hover:bg-black/10 dark:hover:bg-white/10 transition cursor-pointer text-(--text-normal)"
        >
          <ArrowLeft size={18} />
        </button>
        <h1 className="text-2xl font-bold text-(--text-normal) tracking-tight">
          Settings / Data Controls
        </h1>
      </div>

      {/* Content */}
      <div className="w-full max-w-2xl mx-auto px-6 py-8 flex flex-col gap-6">
        <p className="text-(--text-normal)/60 text-sm">
          Manage how your data is stored, shared, and used within ArchiText.
        </p>

        {/* Data options */}
        <div className="flex flex-col rounded-sm overflow-hidden border border-gray-300 dark:border-gray-700 bg-(--color-secondary)/30">
          {/* Chat History Storage */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-300 dark:border-gray-700">
            <div className="flex flex-col gap-1">
              <span className="font-semibold text-(--text-normal) text-sm">
                Save Chat History
              </span>
              <span className="text-xs text-(--text-normal)/60">
                Store conversations for future reference.
              </span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" defaultChecked className="sr-only peer" />
              <div className="w-10 h-5 bg-gray-400 peer-checked:bg-(--color-normal) rounded-full transition-colors after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-5"></div>
            </label>
          </div>

          {/* Data Sharing */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-300 dark:border-gray-700">
            <div className="flex flex-col gap-1">
              <span className="font-semibold text-(--text-normal) text-sm">
                Improve AI for Everyone
              </span>
              <span className="text-xs text-(--text-normal)/60">
                Allow your data to help improve the AI model.
              </span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-10 h-5 bg-gray-400 peer-checked:bg-(--color-normal) rounded-full transition-colors after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-5"></div>
            </label>
          </div>

          {/* Delete All Data */}
          <div className="flex items-center justify-between px-5 py-4">
            <div className="flex flex-col gap-1">
              <span className="font-semibold text-(--text-normal) text-sm">
                Delete All Data
              </span>
              <span className="text-xs text-(--text-normal)/60">
                Permanently remove all your conversations and project data.
              </span>
            </div>
            <button className="px-4 py-1.5 rounded-md bg-red-500/15 text-red-500 text-sm font-semibold hover:bg-red-500/25 transition cursor-pointer">
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataControlsPage;
