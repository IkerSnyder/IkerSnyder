import type { Metadata, Viewport } from "next";
import { GoogleAnalytics } from "@next/third-parties/google";
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

export const viewport: Viewport = {
  themeColor: "#080c10",
  colorScheme: "dark",
};

const gaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        {children}
        {gaMeasurementId ? <GoogleAnalytics gaId={gaMeasurementId} /> : null}
        <Analytics />
      </body>
    </html>
  );
}
