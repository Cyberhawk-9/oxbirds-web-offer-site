import { Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CtaButton } from "@/components/cta-button"
import { hasPhone, phoneHref } from "@/lib/partner"

export function MobileCtaBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-background/95 backdrop-blur md:hidden">
      <div className="flex items-center gap-3 px-4 py-3">
        {hasPhone && (
          <Button variant="outline" className="flex-1 font-semibold" asChild>
            <a href={phoneHref}>
              <Phone className="h-4 w-4" aria-hidden="true" />
              Call
            </a>
          </Button>
        )}
        <CtaButton className="flex-1" />
      </div>
    </div>
  )
}
