import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Iker Snyder | Automation & Outreach",
  description:
    "Freelance website for Iker Snyder, focused on LinkedIn outreach systems, email campaigns, and automation workflows.",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
