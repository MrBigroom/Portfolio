import "./globals.css";
import type { Metadata, Viewport } from "next";
import AshField from "@/components/ui/AshField";
import MotionProvider from "@/components/ui/MotionProvider";

export const metadata: Metadata = {
  title: "Chan Yu Xuan — AI Platform Engineer",
  description:
    "Portfolio of Chan Yu Xuan — AI platform engineer. Render orchestration across seven GPU services at SNS Network, a control plane for coding agents, local-first RAG on an 8 GB card, and 124 GB of models served off one consumer GPU.",
  metadataBase: new URL("https://portfolio-five-khaki-60.vercel.app"),
};

export const viewport: Viewport = {
  themeColor: "#070605",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="relative">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body className="relative min-h-screen bg-void-950 text-bone-100 antialiased">
        <div
          aria-hidden
          className="ambient pointer-events-none fixed inset-0 z-0 overflow-hidden"
        >
          <div className="fog-a" />
          <div className="fog-b" />
          <div className="fog-c" />
        </div>
        <AshField />
        <div aria-hidden className="soot" />
        <div aria-hidden className="ash-veil" />
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
