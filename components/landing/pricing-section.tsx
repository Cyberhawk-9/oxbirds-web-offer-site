import { Check } from "lucide-react"
import { Reveal } from "@/components/reveal"
import { CtaButton } from "@/components/cta-button"
import { SectionHeading } from "@/components/landing/section-heading"
import { monthlyPrice, partner, setupPrice } from "@/lib/partner"

const plans = [
  {
    title: `${setupPrice} to get started`,
    caption: "One-time setup",
    bullets: ["Custom site, designed for your business", "Two rounds of changes before launch"],
  },
  {
    title: `${monthlyPrice} a month`,
    caption: "Ongoing",
    bullets: ["Hosting", "Security", "Updates", "Support"],
  },
]

export function PricingSection() {
  return (
    <section aria-labelledby="pricing-heading" className="section-tint w-full px-4 py-20 md:px-6 md:py-28">
      <div className="container max-w-4xl mx-auto flex flex-col gap-12">
        <SectionHeading id="pricing-heading" title="Simple pricing" />
        <div className="grid gap-6 md:grid-cols-2">
          {plans.map((plan, index) => (
            <Reveal
              key={plan.title}
              index={index}
              className={`card-surface flex flex-col gap-6 p-8 ${index === 0 ? "card-featured" : ""}`}
            >
              <div className="flex flex-col gap-2">
                <p className="eyebrow">{plan.caption}</p>
                <h3 className="text-3xl text-foreground">{plan.title}</h3>
              </div>
              <ul className="flex flex-col gap-3">
                {plan.bullets.map((bullet) => (
                  <li key={bullet} className="flex items-start gap-3 text-foreground">
                    <Check className="mt-1 h-4 w-4 shrink-0 text-glow" aria-hidden="true" />
                    <span className="leading-relaxed">{bullet}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
        <Reveal className="flex flex-col items-center gap-6 text-center">
          <p className="text-muted-foreground">{partner.offer.priceNote}</p>
          <CtaButton size="lg" showArrow className="px-8" />
        </Reveal>
      </div>
    </section>
  )
}
