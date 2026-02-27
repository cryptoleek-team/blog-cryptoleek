import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Providers } from "@/components/Providers";
import SupportSection from "@/components/SupportSection";
import { siteConfig } from "@/lib/site";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`
  },
  description: siteConfig.description,
  keywords: ["crypto", "AI", "blockchain", "technology", "seedance", "ai video", "prompt engineering"],
  authors: [{ name: "CryptoLeek", url: "https://x.com/cryptoleek" }],
  creator: "CryptoLeek",
  publisher: "CryptoLeek Blog",
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    type: "website",
    locale: "en_US"
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    creator: "@cryptoleek",
    site: "@cryptoleek"
  },
  alternates: {
    canonical: siteConfig.url,
    types: {
      "application/rss+xml": `${siteConfig.url}/feed.xml`
    }
  },
  verification: {
    // Add your Google Search Console verification code here
    // google: "your-verification-code",
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    author: {
      "@type": "Person",
      name: "CryptoLeek",
      url: "https://x.com/cryptoleek"
    }
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen antialiased text-zinc-900 dark:text-zinc-100">
        <Providers>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">{children}</main>
            <SupportSection />
            <Footer />
          </div>
        </Providers>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }} />
      </body>
    </html>
  );
}
