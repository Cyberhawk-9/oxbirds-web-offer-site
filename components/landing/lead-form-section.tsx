import { MessageSquare } from "lucide-react"
import { SectionHeading } from "@/components/landing/section-heading"
import { LEAD_FORM_ID, partner } from "@/lib/partner"

// Placeholder card; the real lead form replaces the card body in a follow-up change.
export function LeadFormSection() {
  return (
    <section
      id={LEAD_FORM_ID}
      aria-labelledby="lead-form-heading"
      className="section-tint w-full px-4 py-20 md:px-6 md:py-28"
    >
      <div className="container max-w-2xl mx-auto flex flex-col gap-10">
        <SectionHeading
          id="lead-form-heading"
          title={partner.offer.ctaLabel}
          description={`${partner.brand.name} will contact you within ${partner.contact.responseTime}.`}
        />
        <div className="card-surface flex flex-col items-center gap-4 p-10 text-center">
          <span className="icon-tile">
            <MessageSquare className="h-5 w-5" aria-hidden="true" />
          </span>
          <p className="text-muted-foreground">The request form will appear here.</p>
        </div>
      </div>
    </section>
  )
}
