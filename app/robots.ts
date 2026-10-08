import type { MetadataRoute } from "next"
import { partner } from "@/lib/partner"
import { ALLOW_INDEXING } from "@/lib/indexing"

// Crawling stays allowed so search engines can read the noindex signal sent on every page.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    ...(ALLOW_INDEXING ? { sitemap: `${partner.brand.siteUrl}/sitemap.xml` } : {}),
  }
}
