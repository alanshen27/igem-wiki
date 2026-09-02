import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import { SiteNav } from "@/components/site/site-nav";
import { SiteFooter } from "@/components/site/site-footer";
import { ScrollProgress } from "@/components/motion/scroll-progress";
import { BackToTop } from "@/components/site/back-to-top";
import { SketchDefs } from "@/components/viz/sketch";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://2025.igem.wiki"),
  title: {
    default: "AURA — iGEM 2025 · Milk is quiet. Infection is not.",
    template: "%s · AURA — iGEM 2025",
  },
  description:
    "AURA is an iGEM 2025 project exploring a synthetic biology biosensor approach to earlier, more accessible detection of bovine mastitis — for cow welfare, milk quality, and farm economics.",
  keywords: [
    "iGEM 2025",
    "AURA",
    "mastitis",
    "biosensor",
    "synthetic biology",
    "dairy",
    "early detection",
    "somatic cell count",
  ],
  authors: [{ name: "AURA iGEM 2025 Team" }],
  openGraph: {
    title: "AURA — iGEM 2025",
    description: "Milk is quiet. Infection is not. A synthetic biology approach to earlier mastitis detection.",
    type: "website",
    siteName: "AURA — iGEM 2025",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-milk text-ink">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-ink focus:px-5 focus:py-2.5 focus:text-sm focus:font-medium focus:text-milk"
        >
          Skip to content
        </a>
        <SketchDefs />
        <ScrollProgress />
        <SiteNav />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
        <BackToTop />
      </body>
    </html>
  );
}
