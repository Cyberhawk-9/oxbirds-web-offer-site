export const ATTRIBUTION_URL_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "gclid",
  "fbclid",
] as const

type AttributionUrlKey = (typeof ATTRIBUTION_URL_KEYS)[number]

export type Attribution = Record<AttributionUrlKey | "landing_page" | "referrer", string>

const STORAGE_KEY = "lead_attribution"

function emptyAttribution(): Attribution {
  return {
    utm_source: "",
    utm_medium: "",
    utm_campaign: "",
    utm_term: "",
    utm_content: "",
    gclid: "",
    fbclid: "",
    landing_page: "",
    referrer: "",
  }
}

/** Saves URL attribution once per browser session, on the first page load only. */
export function captureAttribution(): void {
  try {
    if (window.sessionStorage.getItem(STORAGE_KEY)) return
    const params = new URLSearchParams(window.location.search)
    const attribution = emptyAttribution()
    for (const key of ATTRIBUTION_URL_KEYS) {
      attribution[key] = params.get(key) ?? ""
    }
    attribution.landing_page = `${window.location.pathname}${window.location.search}`
    attribution.referrer = document.referrer
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(attribution))
  } catch {
    // sessionStorage can be unavailable (private mode, blocked storage); attribution is best-effort.
  }
}

export function readAttribution(): Attribution {
  try {
    const stored = window.sessionStorage.getItem(STORAGE_KEY)
    if (stored) return { ...emptyAttribution(), ...(JSON.parse(stored) as Partial<Attribution>) }
  } catch {
    // Fall through to empty values.
  }
  return emptyAttribution()
}
