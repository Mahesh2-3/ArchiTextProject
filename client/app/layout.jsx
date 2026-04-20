import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ThemeProviderClient from "./Providers/ThemeProvider";
import ErrorBoundary from "./Components/ErrorBoundary";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "ArchiText",
  description: "AI Powered Architectural Design Assistant",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex">
        <Script id="theme-script" strategy="beforeInteractive">
          {`(function () {
    try {
      const saved = localStorage.getItem("theme");
      if (saved) {
        document.documentElement.setAttribute("data-theme", saved);
      } else {
        const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        document.documentElement.setAttribute("data-theme", systemDark ? "dark" : "light");
      }
    } catch (e) {
      document.documentElement.setAttribute("data-theme", "light");
    }
  })();`}
        </Script>
        <ThemeProviderClient>
          <ErrorBoundary>{children}</ErrorBoundary>
        </ThemeProviderClient>
      </body>
    </html>
  );
}
