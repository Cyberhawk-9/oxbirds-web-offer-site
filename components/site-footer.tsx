import Image from "next/image"
import { hasPhone, partner, phoneHref } from "@/lib/partner"

export function SiteFooter() {
  const { brand, contact, legal } = partner
  const year = new Date().getFullYear()
  const ownerName = legal.businessName || brand.name

  return (
    <footer className="border-t border-border bg-muted">
      <div className="container max-w-7xl mx-auto flex flex-col gap-10 px-4 py-12 md:px-6 md:py-16">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="flex flex-col gap-4">
            <a href="#top" className="inline-flex items-center">
              <Image
                src={brand.logo || "/placeholder.svg"}
                alt={brand.logoAlt || brand.name}
                width={160}
                height={40}
                className="h-10 w-auto"
              />
            </a>
            <p className="font-display text-lg font-semibold text-foreground">{brand.name}</p>
          </div>

          {(hasPhone || contact.email || contact.hours) && (
            <div className="flex flex-col gap-3 text-sm text-muted-foreground">
              <h2 className="text-sm font-semibold text-foreground">Contact</h2>
              {hasPhone && (
                <a href={phoneHref} className="hover:text-primary transition-colors">
                  {contact.phoneDisplay}
                </a>
              )}
              {contact.email && (
                <a href={`mailto:${contact.email}`} className="hover:text-primary transition-colors">
                  {contact.email}
                </a>
              )}
              {contact.hours && <p>{contact.hours}</p>}
            </div>
          )}

          {(legal.businessName || legal.address) && (
            <div className="flex flex-col gap-3 text-sm text-muted-foreground">
              <h2 className="text-sm font-semibold text-foreground">Company</h2>
              {legal.businessName && <p>{legal.businessName}</p>}
              {legal.address && <address className="not-italic">{legal.address}</address>}
            </div>
          )}
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-border pt-8 md:flex-row">
          <p className="text-xs text-muted-foreground">
            &copy; {year} {ownerName}. All rights reserved.
          </p>
          <nav aria-label="Legal" className="flex items-center gap-6 text-xs text-muted-foreground">
            <a href="#privacy" className="hover:text-primary transition-colors">
              Privacy
            </a>
            <a href="#terms" className="hover:text-primary transition-colors">
              Terms
            </a>
          </nav>
        </div>
      </div>
    </footer>
  )
}
