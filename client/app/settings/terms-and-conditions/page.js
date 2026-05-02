"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "../../Helpers/icons";

const TermsAndConditionsPage = () => {
  const router = useRouter();

  return (
    <div className="w-full min-h-dvh bg-(--color-main) flex flex-col">
      {/* Header */}
      <div className="w-full px-6 py-5 flex items-center gap-4 border-b border-gray-300 dark:border-gray-700 bg-(--color-secondary)/40">
        <button
          onClick={() => router.back()}
          className="p-2 rounded-lg hover:bg-black/10 dark:hover:bg-white/10 transition cursor-pointer text-(--text-normal)"
        >
          <ArrowLeft size={18} />
        </button>
        <h1 className="text-2xl font-bold text-(--text-normal) tracking-tight">
          Settings / Terms & Conditions
        </h1>
      </div>

      {/* Content */}
      <div className="w-full max-w-3xl mx-auto px-6 py-8 flex flex-col gap-6 text-(--text-normal)">
        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold">1. Acceptance of Terms</h2>
          <p className="text-sm text-(--text-normal)/80 leading-relaxed">
            By accessing or using our application, you agree to be bound by
            these Terms and Conditions and all applicable laws and regulations.
            If you do not agree with any part of these terms, you may not use
            our services.
          </p>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold">2. User Accounts</h2>
          <p className="text-sm text-(--text-normal)/80 leading-relaxed">
            You are responsible for safeguarding the password that you use to
            access the service and for any activities or actions under your
            password. You must not disclose your password to any third party.
            You must notify us immediately upon becoming aware of any breach of
            security or unauthorized use of your account.
          </p>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold">3. Acceptable Use</h2>
          <p className="text-sm text-(--text-normal)/80 leading-relaxed">
            You agree not to use the service to generate, upload, or transmit
            any content that is illegal, harmful, threatening, abusive,
            harassing, defamatory, vulgar, obscene, or invasive of
            another&apos;s privacy. We reserve the right to terminate accounts
            that violate these guidelines.
          </p>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold">4. Intellectual Property</h2>
          <p className="text-sm text-(--text-normal)/80 leading-relaxed">
            The service and its original content, features, and functionality
            are and will remain the exclusive property of ArchiText and its
            licensors. The service is protected by copyright, trademark, and
            other laws of both the United States and foreign countries.
          </p>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold">5. Limitation of Liability</h2>
          <p className="text-sm text-(--text-normal)/80 leading-relaxed">
            In no event shall ArchiText, nor its directors, employees, partners,
            agents, suppliers, or affiliates, be liable for any indirect,
            incidental, special, consequential or punitive damages, including
            without limitation, loss of profits, data, use, goodwill, or other
            intangible losses, resulting from your access to or use of or
            inability to access or use the service.
          </p>
        </section>

        <div className="mt-8 pt-6 border-t border-gray-300 dark:border-gray-700 text-xs text-(--text-normal)/50">
          Last updated: April 2026
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditionsPage;
