import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}