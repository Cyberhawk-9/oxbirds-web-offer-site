import Image from "next/image"
import { CtaButton } from "@/components/cta-button"
import { partner } from "@/lib/partner"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/75 backdrop-blur-xl after:pointer-events-none after:absolute after:inset-x-0 after:-bottom-px after:h-px after:bg-gradient-to-r after:from-transparent after:via-glow/60 after:to-transparent">
      <div className="container max-w-7xl mx-auto flex h-16 items-center justify-between gap-4 px-4 md:px-6">
        <a href="#top" className="logo-plate flex items-center">
          <Image
            src={partner.brand.logo || "/placeholder.svg"}
            alt={partner.brand.logoAlt || partner.brand.name}
            width={160}
            height={40}
            priority
            className="h-7 w-auto sm:h-9"
          />
        </a>

        <CtaButton size="sm" />
      </div>
    </header>
  )
}
