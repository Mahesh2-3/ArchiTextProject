import { Space_Grotesk, Inter, Fira_Code } from "next/font/google";
import "./globals.css";
import ThemeProviderClient from "./Providers/ThemeProvider";
import ErrorBoundary from "./Components/ErrorBoundary";
import Script from "next/script";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const firaCode = Fira_Code({
  variable: "--font-fira-code",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata = {
  title: "ArchiText",
  description: "AI Powered Architectural Design Assistant",
  icons: {
    icon: [{ url: "/logo.png", type: "image/png" }],
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${spaceGrotesk.variable} ${inter.variable} ${firaCode.variable} h-screen w-screen overflow-hidden antialiased`}
    >
      <body className="h-[100dvh] w-screen overflow-hidden flex font-sans">
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
