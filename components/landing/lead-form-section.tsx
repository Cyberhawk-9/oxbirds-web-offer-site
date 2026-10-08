import { SectionHeading } from "@/components/landing/section-heading"
import { LeadForm } from "@/components/landing/lead-form"
import { LEAD_FORM_ID, partner } from "@/lib/partner"

export function LeadFormSection() {
  return (
    <section
      id={LEAD_FORM_ID}
      aria-labelledby="lead-form-heading"
      className="section-tint w-full scroll-mt-20 px-4 py-20 md:px-6 md:py-28"
    >
      <div className="container max-w-2xl mx-auto flex flex-col gap-10">
        <SectionHeading
          id="lead-form-heading"
          title={partner.offer.ctaLabel}
          description={`Tell us a little about your business. ${partner.brand.name} will contact you within ${partner.contact.responseTime}.`}
        />
        <LeadForm />
      </div>
    </section>
  )
}
