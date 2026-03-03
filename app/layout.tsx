import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Iker Snyder | Automation & Outreach",
  description:
    "Freelance website for Iker Snyder, focused on LinkedIn outreach systems, email campaigns, and automation workflows.",
  metadataBase: new URL("https://ikersnyder.com"),
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
  openGraph: {
    title: "Iker Snyder | Automation & Outreach",
    description:
      "LinkedIn outreach systems, email campaigns, and automation workflows built to generate real conversations.",
    url: "https://ikersnyder.com",
    siteName: "Iker Snyder",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Iker Snyder website preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Iker Snyder | Automation & Outreach",
    description:
      "LinkedIn outreach systems, email campaigns, and automation workflows built to generate real conversations.",
    images: ["/opengraph-image"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
