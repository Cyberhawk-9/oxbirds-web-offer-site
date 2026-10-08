import rawConfig from "@/config/partner.config.json"

export interface PartnerSample {
  title: string
  image?: string
  url?: string
  description?: string
}

export interface PartnerConfig {
  schemaVersion: string
  brand: {
    name: string
    logo: string
    logoAlt: string
    favicon: string
    ogImage: string
    websiteUrl: string
    siteUrl: string
  }
  theme: {
    mode: "dark" | "light"
    primary: string
    primaryText: string
    background: string
    surface: string
    text: string
    muted: string
    border: string
    /** Corner radius of buttons and inputs, in pixels. Cards use radius + 8. */
    radius: number
    fonts: {
      heading: string
      body: string
    }
  }
  contact: {
    phoneDisplay: string
    phoneLink: string
    email: string
    hours: string
    responseTime: string
  }
  legal: {
    businessName: string
    address: string
    privacyEmail: string
  }
  offer: {
    setupPrice: number
    monthlyPrice: number
    headline: string
    subhead: string
    ctaLabel: string
    priceNote: string
  }
  promises: {
    firstVersion: string
    edits: string
    cancellation: string
  }
  samples: PartnerSample[]
  leadForm: {
    consentText: string
    successTitle: string
    successBody: string
  }
  tracking: {
    ga4MeasurementId: string
    googleAds: { conversionId: string; conversionLabel: string }
    metaPixelId: string
  }
  indexing: boolean
}

const PLACEHOLDER_PREFIX = "REPLACE"

/** Recursively blanks any string that starts with "REPLACE" so unset values render as empty. */
function stripPlaceholders<T>(value: T): T {
  if (typeof value === "string") {
    return (value.trim().toUpperCase().startsWith(PLACEHOLDER_PREFIX) ? "" : value) as T
  }
  if (Array.isArray(value)) {
    return value.map(stripPlaceholders) as T
  }
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value as Record<string, unknown>).map(([key, entry]) => [key, stripPlaceholders(entry)]),
    ) as T
  }
  return value
}

export const partner: PartnerConfig = stripPlaceholders(rawConfig as PartnerConfig)

export function formatPrice(amount: number): string {
  return `$${amount.toLocaleString("en-US")}`
}

export const setupPrice = formatPrice(partner.offer.setupPrice)
export const monthlyPrice = formatPrice(partner.offer.monthlyPrice)

export const phoneHref = partner.contact.phoneLink
  ? partner.contact.phoneLink.startsWith("tel:")
    ? partner.contact.phoneLink
    : `tel:${partner.contact.phoneLink}`
  : ""

export const hasPhone = Boolean(partner.contact.phoneDisplay && phoneHref)

/** The brand name as written mid-sentence (exactly as configured, e.g. "oxbird"). */
export const brandName = partner.brand.name

/** The brand name as written at the start of a sentence (e.g. "Oxbird"). */
export const brandNameStart = brandName.charAt(0).toUpperCase() + brandName.slice(1)

/**
 * Fills {partnerName} and {responseTime} tokens in lead-form copy. {partnerName} is
 * capitalized when it starts the text or follows a sentence-ending mark.
 */
export function fillTemplate(template: string): string {
  return template
    .replace(/(^|[.!?]\s+)\{partnerName\}/g, (_, lead: string) => `${lead}${brandNameStart}`)
    .replaceAll("{partnerName}", brandName)
    .replaceAll("{responseTime}", partner.contact.responseTime)
}

export const LEAD_FORM_ID = "lead-form"

export function themeCssVariables(): Record<string, string> {
  const { theme } = partner
  return {
    "--brand": theme.primary,
    "--brand-foreground": theme.primaryText,
    "--bg": theme.background,
    "--surface": theme.surface,
    "--text": theme.text,
    "--text-muted": theme.muted,
    "--line": theme.border,
    "--radius": `${theme.radius}px`,
  }
}
