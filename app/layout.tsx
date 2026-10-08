import type React from "react"
import type { Metadata, Viewport } from "next"
import "./globals.css"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { MobileCtaBar } from "@/components/mobile-cta-bar"
import { ScrollToTopButton } from "@/components/scroll-to-top-button"
import { TrackingScripts } from "@/components/tracking-scripts"
import { AttributionCapture } from "@/components/attribution-capture"
import { brandName, brandNameStart, partner, themeCssVariables } from "@/lib/partner"
import { fontCssVariables, fontVariableClasses } from "@/lib/fonts"
import { ROBOTS_METADATA } from "@/lib/indexing"

const title = `${partner.offer.headline} | ${brandName}`
const description = partner.offer.subhead
const ogImage = {
  url: partner.brand.ogImage,
  width: 1200,
  height: 630,
  alt: `${brandNameStart}: ${partner.offer.headline}`,
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
      className={`${partner.theme.mode} ${fontVariableClasses} scroll-smooth bg-background`}
      style={{ ...themeCssVariables(), ...fontCssVariables() } as React.CSSProperties}
    >
      <head>
        <TrackingScripts />
      </head>
      <body
        className={`font-sans antialiased bg-background text-foreground min-h-screen flex flex-col pb-20 md:pb-0`}
      >
        <div className="flex-1 flex flex-col w-full relative">
          <SiteHeader />
          <main className="flex-1 w-full flex flex-col">{children}</main>
          <SiteFooter />
        </div>
        <MobileCtaBar />
        <ScrollToTopButton />
        <AttributionCapture />
      </body>
    </html>
  )
}
