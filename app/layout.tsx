import { ThemeProvider } from "@/components/theme-provider";
import { I18nProvider } from "@/lib/i18n/i18n-context";
import { ThemeColorProvider } from "@/lib/theme/theme-context";
import { Analytics } from "@vercel/analytics/next";
import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import type React from "react";
import "./globals.css";

const geist = Geist({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://dangtrong-dat.dev"),
  title:
    "Đặng Trọng Đạt - Frontend Engineer & UI/UX Designer | React & Next.js Expert",
  description:
    "Frontend Engineer Leader with 4+ years of React & Next.js expertise. Specialized in UI/UX design, component architecture, and performance optimization. Available for projects. Contact: dangdat.dev@gmail.com",
  keywords: [
    "Đặng Trọng Đạt",
    "Dang Trong Dat",
    "Frontend Engineer",
    "React Developer",
    "Next.js",
    "UI/UX Designer",
    "JavaScript",
    "TypeScript",
    "Web Development",
    "Vietnam",
    "Hanoi",
    "dangdat.dev@gmail.com",
    "Senior Frontend Engineer",
    "Galaxy Education JSC",
  ].join(", "),
  openGraph: {
    title: "Đặng Trọng Đạt - Frontend Engineer & UI/UX Designer",
    description:
      "Frontend Engineer with 4+ years specializing in React, Next.js, and modern web technologies.",
    type: "website",
    locale: "vi_VN",
    url: "https://dangtrong-dat.dev",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Đặng Trọng Đạt Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Đặng Trọng Đạt - Frontend Engineer",
    description: "Frontend Engineer with 4+ years of React & Next.js expertise",
  },
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
  },
  alternates: {
    canonical: "https://dangtrong-dat.dev",
    languages: {
      "vi-VN": "https://dangtrong-dat.dev/vi",
      "en-US": "https://dangtrong-dat.dev/en",
    },
  },
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0f1419" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" className="scroll-smooth" suppressHydrationWarning>
      <head>
        {/* Structured Data - JSON-LD for Google */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Đặng Trọng Đạt",
              alternateName: "Dang Trong Dat",
              url: "https://dangtrong-dat.dev",
              jobTitle: "Senior Frontend Engineer",
              worksFor: {
                "@type": "Organization",
                name: "Galaxy Education JSC",
              },
              email: "dangdat.dev@gmail.com",
              telephone: "+84 XXX XXX XXX",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Hanoi",
                addressRegion: "Hanoi Capital",
                addressCountry: "Viet Nam",
              },
              description:
                "Frontend Engineer & UI/UX Designer with 4+ years React & Next.js expertise. Specialized in building high-performance web applications.",
              sameAs: [
                "https://github.com",
                "https://linkedin.com",
                "https://dangdat.dev",
              ],
              knowsAbout: [
                "React",
                "Next.js",
                "TypeScript",
                "UI/UX Design",
                "Frontend Development",
                "Web Performance",
                "Component Architecture",
              ],
              alumniOf: {
                "@type": "EducationalOrganization",
                name: "University",
              },
            }),
          }}
        />
        {/* Additional SEO Meta Tags */}
        <meta name="author" content="Đặng Trọng Đạt" />
        <meta name="contact" content="dangdat.dev@gmail.com" />
        <meta name="geo.region" content="VN-HN" />
        <meta name="geo.placename" content="Hanoi, Vietnam" />
        <meta name="language" content="Vietnamese, English" />
        <meta name="revisit-after" content="7 days" />
        <meta name="distribution" content="global" />
        <meta name="rating" content="general" />
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body className={`${geist.className} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <ThemeColorProvider>
            <I18nProvider>{children}</I18nProvider>
          </ThemeColorProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
