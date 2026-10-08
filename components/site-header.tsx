import Image from "next/image"
import { Phone } from "lucide-react"
import { CtaButton } from "@/components/cta-button"
import { hasPhone, partner, phoneHref } from "@/lib/partner"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur">
      <div className="container max-w-7xl mx-auto flex h-16 items-center justify-between gap-4 px-4 md:px-6">
        <a href="#top" className="flex items-center">
          <Image
            src={partner.brand.logo || "/placeholder.svg"}
            alt={partner.brand.logoAlt || partner.brand.name}
            width={160}
            height={40}
            priority
            className="h-8 w-auto sm:h-10"
          />
        </a>

        <div className="flex items-center gap-5">
          {hasPhone && (
            <a
              href={phoneHref}
              className="nav-link hidden items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground sm:inline-flex"
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              {partner.contact.phoneDisplay}
            </a>
          )}
          <CtaButton size="sm" className="hidden md:inline-flex" />
        </div>
      </div>
    </header>
  )
}
