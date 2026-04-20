"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "../../Helpers/icons";

const AIPage = () => {
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
          Settings / AI
        </h1>
      </div>

      {/* Content */}
      <div className="w-full max-w-2xl mx-auto px-6 py-8 flex flex-col gap-6">
        <p className="text-(--text-normal)/60 text-sm">
          Configure how the AI model behaves and responds to your queries.
        </p>

        {/* Settings cards */}
        <div className="flex flex-col rounded-sm overflow-hidden border border-gray-300 dark:border-gray-700 bg-(--color-secondary)/30">
          {/* Model Selection */}
          <div className="flex flex-col gap-2 px-5 py-4 border-b border-gray-300 dark:border-gray-700">
            <span className="font-semibold text-(--text-normal) text-sm">
              Model
            </span>
            <span className="text-xs text-(--text-normal)/60">
              Select which AI model to use for architecture generation.
            </span>
            <select className="mt-2 px-3 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-(--color-main) text-(--text-normal) text-sm outline-none cursor-pointer">
              <option>Default</option>
              <option>GPT-4</option>
              <option>GPT-3.5 Turbo</option>
            </select>
          </div>

          {/* Response Style */}
          <div className="flex flex-col gap-2 px-5 py-4">
            <span className="font-semibold text-(--text-normal) text-sm">
              Response Style
            </span>
            <span className="text-xs text-(--text-normal)/60">
              Choose how detailed the AI responses should be.
            </span>
            <select className="mt-2 px-3 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-(--color-main) text-(--text-normal) text-sm outline-none cursor-pointer">
              <option>Concise</option>
              <option>Balanced</option>
              <option>Detailed</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIPage;
