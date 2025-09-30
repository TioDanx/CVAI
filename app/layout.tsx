import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Poppins } from "next/font/google";
import type { Metadata } from "next";

const siteName = "AICV";
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://aicv.example.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: siteName,
  title: {
    default: "AICV | Generate your CV with AI",
    template: "%s | AICV",
  },
  description:
    "Create an ATS-friendly CV in minutes. Paste a job description and get a tailored resume in Spanish or English. Export to PDF.",
  keywords: [
    "AI CV",
    "AI resume",
    "CV generator",
    "Generador de CV",
    "Curriculum Vitae",
    "ATS",
    "Resume builder",
    "PDF",
    "Spanish",
    "English",
  ],
  authors: [{ name: "Daniel Campuzano" }],
  creator: "AICV",
  publisher: "AICV",
  category: "technology",
  alternates: {
    canonical: "/",
    languages: {
      "es-AR": "/es",
      "en-US": "/en",
    },
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName,
    title: "AICV - Generate your CV with AI",
    description:
      "Personalize your CV to any job. Spanish & English. Export to PDF.",
    images: [
      {
        url: "/aicv.jpg", 
        width: 1200,
        height: 630,
        alt: "AICV – AI CV Generator",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "AICV - Generate your CV with AI",
    description:
      "Create an ATS-friendly CV in minutes. Spanish & English. Export to PDF.",
    images: ["aicv.jpg"],
  },
  icons: {
    icon: [
      { url: "/logo.ico", sizes: "any" },
      { url: "/aicv.jpg", type: "image/png", sizes: "32x32" },
      { url: "/aicv.jpg", type: "image/png", sizes: "192x192" },
      { url: "/aicv.jpg", type: "image/png", sizes: "512x512" },
    ],
    apple: [{ url: "/logo.ico", sizes: "180x180" }],
    shortcut: ["/logo.ico"],
  },
  manifest: "/site.webmanifest",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0b0b0b" },
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};
const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.className} antialiased min-h-screenflex flex-col`}
      >
        <Header />
        <main className="flex-grow w-full">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
