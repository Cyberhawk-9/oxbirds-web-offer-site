import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { LEAD_FORM_ID, partner } from "@/lib/partner"
import { cn } from "@/lib/utils"

interface CtaButtonProps {
  size?: "sm" | "default" | "lg"
  showArrow?: boolean
  className?: string
}

export function CtaButton({ size = "default", showArrow = false, className }: CtaButtonProps) {
  return (
    <Button variant="solid" size={size} className={cn("font-semibold", className)} asChild>
      <a href={`#${LEAD_FORM_ID}`}>
        {partner.offer.ctaLabel}
        {showArrow && <ArrowRight className="h-4 w-4" aria-hidden="true" />}
      </a>
    </Button>
  )
}
