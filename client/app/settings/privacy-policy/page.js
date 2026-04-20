"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "../../Helpers/icons";

const PrivacyPolicyPage = () => {
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
          Settings / Privacy Policy
        </h1>
      </div>

      {/* Content */}
      <div className="w-full max-w-3xl mx-auto px-6 py-8 flex flex-col gap-6 text-(--text-normal)">
        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold">1. Information We Collect</h2>
          <p className="text-sm text-(--text-normal)/80 leading-relaxed">
            We collect information you provide directly to us when you create an
            account, use our services, or communicate with us. This includes your
            name, email address, password, and the content of your conversations
            and projects created within the application.
          </p>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold">2. How We Use Your Information</h2>
          <p className="text-sm text-(--text-normal)/80 leading-relaxed">
            We use the information we collect to provide, maintain, and improve
            our services, to develop new features, and to protect our users. Your
            conversation data may be processed by AI models to generate responses
            and mind maps, but we do not sell your personal data to third parties.
          </p>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold">3. Data Security</h2>
          <p className="text-sm text-(--text-normal)/80 leading-relaxed">
            We implement appropriate technical and organizational measures to
            protect the security of your personal information. However, please be
            aware that no method of transmission over the internet or method of
            electronic storage is 100% secure.
          </p>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold">4. Your Data Rights</h2>
          <p className="text-sm text-(--text-normal)/80 leading-relaxed">
            You have the right to access, update, or delete your personal
            information at any time. You can manage your data through the account
            settings or by contacting our support team.
          </p>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold">5. Changes to This Policy</h2>
          <p className="text-sm text-(--text-normal)/80 leading-relaxed">
            We may update this privacy policy from time to time. We will notify
            you of any changes by posting the new privacy policy on this page and
            updating the effective date.
          </p>
        </section>

        <div className="mt-8 pt-6 border-t border-gray-300 dark:border-gray-700 text-xs text-(--text-normal)/50">
          Last updated: April 2026
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
