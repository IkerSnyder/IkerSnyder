import type { Metadata } from "next";
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
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    shortcut: "/icon.svg",
    apple: "/icon.svg",
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
      <body>{children}</body>
    </html>
  );
}
