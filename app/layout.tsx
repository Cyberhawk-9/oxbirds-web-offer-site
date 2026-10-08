import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter, Sora } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { MobileCtaBar } from "@/components/mobile-cta-bar"
import { ScrollToTopButton } from "@/components/scroll-to-top-button"
import { TrackingScripts } from "@/components/tracking-scripts"
import { partner, themeCssVariables } from "@/lib/partner"
import { ROBOTS_METADATA } from "@/lib/indexing"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
})

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-display",
})

const title = `${partner.offer.headline} | ${partner.brand.name}`
const description = partner.offer.subhead
const ogImage = {
  url: partner.brand.ogImage,
  width: 1200,
  height: 630,
  alt: `${partner.brand.name}: ${partner.offer.headline}`,
}

export const metadata: Metadata = {
  metadataBase: new URL(partner.brand.siteUrl),
  title,
  description,
  applicationName: partner.brand.name,
  robots: ROBOTS_METADATA,
  alternates: { canonical: "/" },
  icons: { icon: [{ url: partner.brand.favicon, sizes: "any" }] },
  openGraph: {
    siteName: partner.brand.name,
    type: "website",
    url: "/",
    title,
    description,
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [partner.brand.ogImage],
  },
}

export const viewport: Viewport = {
  themeColor: partner.theme.background,
  colorScheme: partner.theme.mode,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${partner.theme.mode} scroll-smooth bg-background`}
      style={themeCssVariables() as React.CSSProperties}
    >
      <head>
        <TrackingScripts />
      </head>
      <body
        className={`${inter.variable} ${sora.variable} font-sans antialiased bg-background text-foreground min-h-screen flex flex-col pb-20 md:pb-0`}
      >
        <div className="flex-1 flex flex-col w-full relative">
          <SiteHeader />
          <main className="flex-1 w-full flex flex-col">{children}</main>
          <SiteFooter />
        </div>
        <MobileCtaBar />
        <ScrollToTopButton />
        <Analytics />
      </body>
    </html>
  )
}
