import type { MetadataRoute } from "next"
import { partner } from "@/lib/partner"
import { ALLOW_INDEXING } from "@/lib/indexing"

export default function sitemap(): MetadataRoute.Sitemap {
  if (!ALLOW_INDEXING) return []
  return [{ url: `${partner.brand.siteUrl}/`, changeFrequency: "monthly", priority: 1 }]
}
