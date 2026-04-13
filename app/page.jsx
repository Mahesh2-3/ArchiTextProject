import React from "react";
import Link from "next/link";
import Image from "next/image";
import ThemeButton from "./Components/ThemeButton";
import { ArrowRight, Comments, ProjectDiagram, SyncAlt } from "./Helpers/icons";

const LandingPage = () => {
  return (
    <div className="min-h-screen w-full bg-[#fafafa] dark:bg-[#080808] text-neutral-900 dark:text-neutral-100 selection:bg-[#FF85BB]/30 selection:text-inherit">
      {/* Noise texture overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-100 opacity-[0.03] dark:opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Nav */}
      <nav className="fixed top-0 w-full z-50 bg-[#fafafa]/80 dark:bg-[#080808]/80 backdrop-blur-sm">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="flex justify-between h-14 items-center">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-6 h-6 bg-[#061d53] dark:bg-[#FF85BB] flex items-center justify-center text-white dark:text-[#061d53] text-[10px] font-bold tracking-tight">
                AT
              </div>
              <span className="text-sm font-semibold tracking-tight">
                archiText
              </span>
            </Link>

            <div className="hidden md:flex items-center gap-6">
              <Link
                href="#features"
                className="text-[13px] text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
              >
                Features
              </Link>
              <Link
                href="#about"
                className="text-[13px] text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
              >
                About
              </Link>
              <div className="w-px h-4 bg-neutral-200 dark:bg-neutral-800" />
              <ThemeButton />
              <Link
                href="/login"
                className="text-[13px] font-medium px-4 py-1.5 bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 hover:opacity-80 transition-opacity"
              >
                Sign in
              </Link>
            </div>

            <div className="md:hidden flex items-center gap-3">
              <ThemeButton />
              <Link
                href="/login"
                className="text-[13px] font-medium px-3 py-1 bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900"
              >
                Sign in
              </Link>
            </div>
          </div>
        </div>
        <div className="h-px bg-neutral-200/60 dark:bg-neutral-800/60" />
      </nav>

      {/* Hero */}
      <section className="pt-28 pb-0 md:pt-36 md:pb-0">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          {/* Eyebrow */}
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-px bg-[#FF85BB]" />
            <span className="text-[11px] font-semibold tracking-[0.15em] uppercase text-neutral-400 dark:text-neutral-500">
              Architecture generation tool
            </span>
          </div>

          {/* Hero grid — text left, nothing right (asymmetry) */}
          <div className="max-w-[720px]">
            <h1
              className="text-[clamp(2.5rem,5.5vw,4.5rem)] font-bold leading-[1.05] tracking-[-0.03em] text-neutral-900 dark:text-neutral-100 mb-6"
              style={{ fontFamily: "var(--font-geist-sans)" }}
            >
              Structure your ideas
              <br />
              <span className="text-neutral-400 dark:text-neutral-500">
                before you write a line.
              </span>
            </h1>

            <p className="text-[17px] leading-[1.7] text-neutral-500 dark:text-neutral-400 max-w-[520px] mb-10">
              archiText turns conversations into structured project
              architectures. Describe what you&apos;re building and get schemas,
              APIs, file trees, and tech stacks back instantly.
            </p>

            <div className="flex items-center gap-4">
              <Link
                href="/login"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#061d53] dark:bg-[#FF85BB] text-white dark:text-[#061d53] text-[14px] font-semibold hover:opacity-90 transition-opacity group"
              >
                Start building
                <ArrowRight className="text-xs group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <Link
                href="#features"
                className="text-[14px] font-medium text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors underline underline-offset-4 decoration-neutral-300 dark:decoration-neutral-700 hover:decoration-neutral-500"
              >
                See how it works
              </Link>
            </div>
          </div>

          {/* Product Screenshot */}
          <div className="mt-16 md:mt-24 -mb-px max-w-4xl mx-auto">
            <div className="border border-neutral-200 dark:border-neutral-800 border-b-0 bg-neutral-100/50 dark:bg-neutral-900/30 p-1.5 pb-0">
              {/* Browser chrome dots */}
              <div className="flex items-center gap-1.5 px-3 py-2">
                <div className="w-2 h-2 rounded-full bg-neutral-300 dark:bg-neutral-700" />
                <div className="w-2 h-2 rounded-full bg-neutral-300 dark:bg-neutral-700" />
                <div className="w-2 h-2 rounded-full bg-neutral-300 dark:bg-neutral-700" />
                <div className="ml-3 flex-1 h-4 rounded-sm bg-neutral-200/80 dark:bg-neutral-800/80 max-w-[220px]" />
              </div>
              <div className="overflow-hidden relative">
                <Image
                  src="/hero.png"
                  alt="archiText — AI architecture generation interface"
                  width={900}
                  height={450}
                  loading="eager"
                  priority
                  className="w-full h-auto block"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Divider strip */}
      <div className="h-px bg-neutral-200 dark:bg-neutral-800" />

      {/* Features */}
      <section id="features" className="py-24 md:py-32">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          {/* Section header — left aligned */}
          <div className="mb-20 max-w-[480px]">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-px bg-[#FF85BB]" />
              <span className="text-[11px] font-semibold tracking-[0.15em] uppercase text-neutral-400 dark:text-neutral-500">
                Capabilities
              </span>
            </div>
            <h2 className="text-[28px] md:text-[36px] font-bold leading-[1.15] tracking-[-0.02em] mb-3">
              Everything you need to
              <br />
              go from idea to structure.
            </h2>
            <p className="text-[15px] text-neutral-500 dark:text-neutral-400 leading-relaxed">
              Three core capabilities that replace hours of planning with
              seconds of conversation.
            </p>
          </div>

          {/* Feature blocks — asymmetric grid */}
          <div className="grid md:grid-cols-12 gap-6">
            {/* Large feature — Mindmap */}
            <div className="md:col-span-7 border border-neutral-200 dark:border-neutral-800 p-8 md:p-10 group">
              <div className="flex items-center gap-3 mb-6">
                <ProjectDiagram className="text-[#FF85BB] text-lg" />
                <span className="text-[11px] font-bold tracking-[0.12em] uppercase text-neutral-400 dark:text-neutral-500">
                  01 — Visual mindmap
                </span>
              </div>
              <h3 className="text-[22px] font-bold tracking-[-0.01em] mb-3">
                Your architecture, visualized
              </h3>
              <p className="text-[15px] text-neutral-500 dark:text-neutral-400 leading-[1.7] max-w-[420px] mb-8">
                Every conversation generates an interactive mindmap and a
                bird&apos;s-eye view of your entire project. See how schemas,
                APIs, tech stack choices, and file structures connect and depend
                on each other in real time.
              </p>
              <div className="h-px bg-neutral-100 dark:bg-neutral-800 group-hover:bg-[#FF85BB]/20 transition-colors" />
            </div>

            {/* Stacked small features */}
            <div className="md:col-span-5 flex flex-col gap-6">
              <div className="border border-neutral-200 dark:border-neutral-800 p-8 flex-1 group">
                <div className="flex items-center gap-3 mb-6">
                  <Comments className="text-[#061d53] dark:text-neutral-400 text-base" />
                  <span className="text-[11px] font-bold tracking-[0.12em] uppercase text-neutral-400 dark:text-neutral-500">
                    02 — Chat-driven
                  </span>
                </div>
                <h3 className="text-[18px] font-bold tracking-[-0.01em] mb-2">
                  Describe, don&apos;t configure
                </h3>
                <p className="text-[14px] text-neutral-500 dark:text-neutral-400 leading-[1.7]">
                  Talk to archiText like a colleague. Explain what you&apos;re
                  building and the AI returns schemas, endpoints, and a full
                  tech stack and reflected instantly on your mindmap.
                </p>
              </div>

              <div className="border border-neutral-200 dark:border-neutral-800 p-8 flex-1 group">
                <div className="flex items-center gap-3 mb-6">
                  <SyncAlt className="text-[#061d53] dark:text-neutral-400 text-base" />
                  <span className="text-[11px] font-bold tracking-[0.12em] uppercase text-neutral-400 dark:text-neutral-500">
                    03 — Iterative
                  </span>
                </div>
                <h3 className="text-[18px] font-bold tracking-[-0.01em] mb-2">
                  Refine as you think
                </h3>
                <p className="text-[14px] text-neutral-500 dark:text-neutral-400 leading-[1.7]">
                  Add constraints, swap technologies, restructure modules. Each
                  follow-up updates the mindmap while preserving your full
                  conversation history.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="about" className="pb-24 md:pb-32">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="border border-neutral-200 dark:border-neutral-800 bg-[#061d53] dark:bg-[#0f0f0f] text-white p-10 md:p-16 relative overflow-hidden">
            {/* Subtle accent line */}
            <div className="absolute top-0 left-0 w-full h-[2px] bg-linear-to-r from-[#FF85BB] via-[#FF85BB]/40 to-transparent" />

            <div className="relative z-10 flex flex-col md:flex-row md:items-end md:justify-between gap-10">
              <div className="max-w-[480px]">
                <h2 className="text-[28px] md:text-[36px] font-bold leading-[1.15] tracking-[-0.02em] mb-4">
                  Skip the planning phase.
                  <br />
                  <span className="text-neutral-400">
                    Start structuring now.
                  </span>
                </h2>
                <p className="text-[15px] text-neutral-400 leading-[1.7]">
                  Free to use. No credit card required.
                  <br />
                  Go from a blank slate to a full project architecture in under
                  a minute.
                </p>
              </div>

              <Link
                href="/login"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-[#061d53] text-[14px] font-bold hover:bg-neutral-100 transition-colors group shrink-0 self-start md:self-auto"
              >
                Get started
                <ArrowRight className="text-xs group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="pb-8">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="h-px bg-neutral-200 dark:bg-neutral-800 mb-8" />
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 bg-[#061d53] dark:bg-neutral-700 flex items-center justify-center text-white text-[8px] font-bold">
                  AT
                </div>
                <span className="text-[13px] font-semibold tracking-tight text-neutral-400">
                  archiText
                </span>
              </div>
              <span className="text-[12px] text-neutral-300 dark:text-neutral-600">
                © {new Date().getFullYear()}
              </span>
            </div>

            <div className="flex gap-6 text-[12px] text-neutral-400 dark:text-neutral-500">
              <Link
                href="#"
                className="hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
              >
                Privacy
              </Link>
              <Link
                href="#"
                className="hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
              >
                Terms
              </Link>
              <Link
                href="#"
                className="hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
              >
                GitHub
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
