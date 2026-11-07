import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chan Yu Xuan — AI Platform Engineer",
  description:
    "Portfolio of Chan Yu Xuan — AI platform engineer. Render orchestration across seven GPU services at SNS Network, a control plane for coding agents, local-first RAG on an 8 GB card, and 124 GB of models served off one consumer GPU.",
  metadataBase: new URL("https://portfolio-five-khaki-60.vercel.app"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="grain bg-ink-950 text-bone-50">{children}</body>
    </html>
  );
}
