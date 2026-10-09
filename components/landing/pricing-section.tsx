import { Check } from "lucide-react"
import { Reveal } from "@/components/reveal"
import { CtaButton } from "@/components/cta-button"
import { SectionHeading } from "@/components/landing/section-heading"
import { content } from "@/lib/content"

export function PricingSection() {
  const { pricing } = content
  return (
    <section
      id="pricing"
      aria-labelledby="pricing-heading"
      className="section-tint w-full scroll-mt-20 px-4 py-20 md:px-6 md:py-28"
    >
      <div className="container max-w-4xl mx-auto flex flex-col gap-12">
        <SectionHeading id="pricing-heading" title={pricing.title} description={pricing.subtitle} />
        <div className="grid gap-6 md:grid-cols-2">
          {pricing.plans.map((plan, index) => (
            <Reveal
              key={plan.caption}
              index={index}
              className={`card-surface flex flex-col gap-6 p-8 ${index === 0 ? "card-featured" : ""}`}
            >
              <div className="flex flex-col gap-2">
                <h3 className="text-4xl text-foreground">{plan.price}</h3>
                <p className="eyebrow">{plan.caption}</p>
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
        <Reveal className="rounded-xl border border-brand-line/60 bg-background/40 p-6">
          <h3 className="text-base text-foreground">{pricing.notIncluded.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{pricing.notIncluded.body}</p>
        </Reveal>
        <Reveal className="flex justify-center">
          <CtaButton size="lg" showArrow className="px-8" />
        </Reveal>
      </div>
    </section>
  )
}
