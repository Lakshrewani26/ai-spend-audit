import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "AI Spend Audit — Find out if you're overpaying for AI tools",
  description: "Free audit tool that analyzes your AI tool spend and shows you exactly where you're overpaying and how much you could save.",
  openGraph: {
    title: "AI Spend Audit — Find out if you're overpaying for AI tools",
    description: "Free audit tool that analyzes your AI tool spend and shows you exactly where you're overpaying and how much you could save.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Spend Audit — Find out if you're overpaying for AI tools",
    description: "Free audit tool that analyzes your AI tool spend and shows you exactly where you're overpaying and how much you could save.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={dmSans.variable}>
      <body>{children}</body>
    </html>
  );
}