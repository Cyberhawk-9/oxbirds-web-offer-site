import type { MetadataRoute } from "next"
import { partner } from "@/lib/partner"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: partner.brand.name,
    short_name: partner.brand.name,
    description: partner.offer.subhead,
    start_url: "/",
    display: "standalone",
    background_color: partner.theme.background,
    theme_color: partner.theme.background,
    icons: [{ src: partner.brand.favicon, sizes: "16x16 32x32 48x48", type: "image/x-icon" }],
  }
}
