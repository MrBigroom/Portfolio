import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chan Yu Xuan — Full-stack & AI Engineer",
  description:
    "Portfolio of Chan Yu Xuan, a Bachelor of IT student at Quest International University. Building full-stack and AI-integrated applications across web, mobile and ML.",
  metadataBase: new URL("https://chan-portfolio.vercel.app"),
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
