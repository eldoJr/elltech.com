import type { Metadata } from "next";
import React from "react";
import { Syne } from "next/font/google";
import "./globals.css";

const syne = Syne({ subsets: ["latin"], variable: "--font-syne" });


export const metadata: Metadata = {
  title: "Elltech - Design digital systems for scalability.",
  description: "Design digital systems for scalability.",
  icons: { icon: "/logo.svg" },
  openGraph: {
    title: "Elltech - Design digital systems for scalability.",
    description: "Design digital systems for scalability.",
    url: "https://elltech.com",
    siteName: "Elltech",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className="h-full"
      suppressHydrationWarning
    >
      <body className={`${syne.variable} min-h-full flex flex-col`}>
        {children}
      </body>
    </html>
  );
}
