"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import ThemeButton from "./Components/ThemeButton";
import { ArrowRight, Comments, ProjectDiagram, SyncAlt } from "./Helpers/icons";
import { useAppStore } from "./store/useAppStore";
import { useRouter } from "next/navigation";

const LandingPage = () => {
  const user = useAppStore((state) => state.user);
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/home");
    }
  }, [user]);

  return (
    <div className="min-h-screen w-full bg-(--bg-main) text-(--text-main) selection:bg-(--accent)/30 selection:text-inherit">
      {/* Noise texture overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-100 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Nav */}
      <nav className="fixed top-0 w-full z-50 bg-(--bg-main)/80 backdrop-blur-md border-b border-(--border)">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="flex justify-between h-14 items-center">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-6 h-6 bg-(--accent) flex items-center justify-center text-(--accent-text) text-[10px] font-bold tracking-tight">
                AT
              </div>
              <span className="text-lg font-semibold tracking-tight text-(--text-main)">
                ArchiText
              </span>
            </Link>

            <div className="hidden md:flex items-center gap-6 font-semibold">
              <Link
                href="#features"
                className="text-[13px] text-(--text-muted) hover:text-(--text-main) transition-colors"
              >
                Features
              </Link>
              <Link
                href="#about"
                className="text-[13px] text-(--text-muted) hover:text-(--text-main) transition-colors"
              >
                About
              </Link>
              <div className="w-px h-4 bg-(--border)" />
              <ThemeButton />
              <Link
                href="/login"
                className="text-[13px] font-medium px-4 py-1.5 bg-(--accent) text-(--accent-text) hover:opacity-80 transition-opacity"
              >
                Sign in
              </Link>
            </div>

            <div className="md:hidden flex items-center gap-3">
              <ThemeButton />
              <Link
                href="/login"
                className="text-[13px] font-medium px-3 py-1 bg-(--accent) text-(--accent-text)"
              >
                Sign in
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-28 pb-0 md:pt-36 md:pb-0">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          {/* Eyebrow */}
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-px bg-(--accent)" />
            <span className="text-[11px] font-semibold tracking-[0.15em] uppercase text-(--text-muted)">
              Architecture generation tool
            </span>
          </div>

          {/* Hero grid — text left, nothing right (asymmetry) */}
          <div className="max-w-[720px]">
            <h1
              className="text-[clamp(2.5rem,5.5vw,4.5rem)] font-bold leading-[1.05] tracking-[-0.03em] text-(--accent) mb-6"
              style={{ fontFamily: "var(--font-geist-sans)" }}
            >
              Structure your ideas
              <br />
              <span className="opacity-70">before you write a line.</span>
            </h1>

            <p className="text-[17px] leading-[1.7] text-(--text-muted) max-w-[520px] mb-10">
              archiText turns conversations into structured project
              architectures. Describe what you&apos;re building and get schemas,
              APIs, file trees, and tech stacks back instantly.
            </p>

            <div className="flex items-center gap-4">
              <Link
                href="/login"
                className="inline-flex items-center gap-2 px-6 py-3 bg-(--accent) text-(--accent-text) text-[14px] font-semibold hover:opacity-90 transition-opacity group"
              >
                Start building
                <ArrowRight className="text-xs group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <Link
                href="#features"
                className="text-[14px] font-medium text-(--text-light)/40 hover:text-(--text-light) transition-colors underline underline-offset-4"
              >
                See how it works
              </Link>
            </div>
          </div>

          {/* Product Screenshot */}
          <div className="mt-16 md:mt-24 -mb-px max-w-4xl mx-auto">
            <div className="border border-(--border) border-b-0 bg-(--bg-side)/30 p-1.5 pb-0">
              {/* Browser chrome dots */}
              <div className="flex items-center gap-1.5 px-3 py-2">
                <div className="w-2 h-2 rounded-full bg-(--text-main)/20" />
                <div className="w-2 h-2 rounded-full bg-(--text-main)/20" />
                <div className="w-2 h-2 rounded-full bg-(--text-main)/20" />
                <div className="ml-3 flex-1 h-4 rounded-sm bg-(--text-main)/10 max-w-[220px]" />
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
      <div className="h-px bg-(--border)" />

      {/* Features */}
      <section id="features" className="py-24 md:py-32">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          {/* Section header — left aligned */}
          <div className="mb-20 max-w-[480px]">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-px bg-(--accent)" />
              <span className="text-[11px] font-semibold tracking-[0.15em] uppercase text-(--text-muted)">
                Capabilities
              </span>
            </div>
            <h2 className="text-[28px] md:text-[36px] font-bold leading-[1.15] tracking-[-0.02em] mb-3 text-(--text-main)">
              Everything you need to
              <br />
              go from idea to structure.
            </h2>
            <p className="text-[15px] text-(--text-muted) leading-relaxed">
              Three core capabilities that replace hours of planning with
              seconds of conversation.
            </p>
          </div>

          {/* Feature blocks — asymmetric grid */}
          <div className="grid md:grid-cols-12 gap-6">
            {/* Large feature — Mindmap */}
            <div className="md:col-span-7 border border-(--border) bg-(--bg-side)/20 p-8 md:p-10 group rounded-lg">
              <div className="flex items-center gap-3 mb-6">
                <ProjectDiagram className="text-(--accent) text-lg" />
                <span className="text-[11px] font-bold tracking-[0.12em] uppercase text-(--text-muted)">
                  01 — Visual mindmap
                </span>
              </div>
              <h3 className="text-[22px] font-bold tracking-[-0.01em] mb-3 text-(--accent)">
                Your architecture, visualized
              </h3>
              <p className="text-[15px] text-(--text-muted) leading-[1.7] max-w-[420px] mb-8">
                Every conversation generates an interactive mindmap and a
                bird&apos;s-eye view of your entire project. See how schemas,
                APIs, tech stack choices, and file structures connect and depend
                on each other in real time.
              </p>
              <div className="h-px bg-(--border) group-hover:bg-(--accent)/20 transition-colors" />
            </div>

            {/* Stacked small features */}
            <div className="md:col-span-5 flex flex-col gap-6">
              <div className="border border-(--border) bg-(--bg-side)/20 p-8 flex-1 group rounded-lg">
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-(--text-main) text-base">
                    <Comments />
                  </span>
                  <span className="text-[11px] font-bold tracking-[0.12em] uppercase text-(--text-muted)">
                    02 — Chat-driven
                  </span>
                </div>
                <h3 className="text-[18px] font-bold tracking-[-0.01em] mb-2 text-(--accent)">
                  Describe, don&apos;t configure
                </h3>
                <p className="text-[14px] text-(--text-muted) leading-[1.7]">
                  Talk to archiText like a colleague. Explain what you&apos;re
                  building and the AI returns schemas, endpoints, and a full
                  tech stack and reflected instantly on your mindmap.
                </p>
              </div>

              <div className="border border-(--border) bg-(--bg-side)/20 p-8 flex-1 group rounded-lg">
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-(--text-main) text-base">
                    <SyncAlt />
                  </span>
                  <span className="text-[11px] font-bold tracking-[0.12em] uppercase text-(--text-muted)">
                    03 — Iterative
                  </span>
                </div>
                <h3 className="text-[18px] font-bold tracking-[-0.01em] mb-2 text-(--accent)">
                  Refine as you think
                </h3>
                <p className="text-[14px] text-(--text-muted) leading-[1.7]">
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
          <div className="border border-(--border) bg-(--bg-side) text-(--text-main) p-10 md:p-16 relative overflow-hidden rounded-2xl">
            {/* Subtle accent line */}
            <div className="absolute top-0 left-0 w-full h-[2px] bg-linear-to-r from-(--accent) via-(--accent)/40 to-transparent opacity-30" />

            <div className="relative z-10 flex flex-col md:flex-row md:items-end md:justify-between gap-10">
              <div className="max-w-[480px]">
                <h2 className="text-[28px] md:text-[36px] font-bold leading-[1.15] tracking-[-0.02em] mb-4">
                  Skip the planning phase.
                  <br />
                  <span className="opacity-50">Start structuring now.</span>
                </h2>
                <p className="text-[15px] text-(--text-muted) leading-[1.7]">
                  Free to use. No credit card required.
                  <br />
                  Go from a blank slate to a full project architecture in under
                  a minute.
                </p>
              </div>

              <Link
                href="/login"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-(--accent) text-(--accent-text) text-[14px] font-bold hover:opacity-90 transition-colors group shrink-0 self-start md:self-auto rounded-md"
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
          <div className="h-px bg-(--border) mb-8" />
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 bg-(--accent) flex items-center justify-center text-(--accent-text) text-[8px] font-bold">
                  AT
                </div>
                <span className="text-[13px] font-semibold tracking-tight text-(--text-muted)">
                  archiText
                </span>
              </div>
              <span className="text-[12px] text-(--text-muted)/50">
                © {new Date().getFullYear()}
              </span>
            </div>

            <div className="flex gap-6 text-[12px] text-(--text-muted)">
              <Link
                href="#"
                className="hover:text-(--text-main) transition-colors"
              >
                Privacy
              </Link>
              <Link
                href="#"
                className="hover:text-(--text-main) transition-colors"
              >
                Terms
              </Link>
              <Link
                href="#"
                className="hover:text-(--text-main) transition-colors"
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
