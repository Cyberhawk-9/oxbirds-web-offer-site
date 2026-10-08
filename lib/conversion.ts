import { partner } from "@/lib/partner"

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
    fbq?: (...args: unknown[]) => void
  }
}

const CONVERSION_FLAG = "lead_conversion_fired"

/** Fires configured ad conversions at most once per browser session. */
export function trackLeadConversion(): void {
  try {
    if (window.sessionStorage.getItem(CONVERSION_FLAG)) return
    window.sessionStorage.setItem(CONVERSION_FLAG, "1")
  } catch {
    // Without storage we still fire once for this page view.
  }

  const { googleAds, metaPixelId } = partner.tracking
  if (googleAds.conversionId && googleAds.conversionLabel) {
    window.gtag?.("event", "conversion", {
      send_to: `${googleAds.conversionId}/${googleAds.conversionLabel}`,
    })
  }
  if (metaPixelId) {
    window.fbq?.("track", "Lead")
  }
}
