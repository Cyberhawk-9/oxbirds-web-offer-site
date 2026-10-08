import { Check } from "lucide-react"
import { CtaButton } from "@/components/cta-button"
import { monthlyPrice, partner, setupPrice } from "@/lib/partner"

const highlights = ["Custom design", "Works on every phone", "Hosting included"]

export function HeroSection() {
  return (
    <section id="top" className="w-full px-4 pt-16 pb-20 md:px-6 md:pt-28 md:pb-28">
      <div className="container max-w-4xl mx-auto flex flex-col items-center gap-8 text-center">
        <h1 className="animate-fade-in-up text-4xl leading-tight text-balance sm:text-5xl md:text-6xl">
          {partner.offer.headline}
        </h1>
        <p className="animate-fade-in-up delay-100 max-w-2xl text-lg leading-relaxed text-muted-foreground text-pretty md:text-xl">
          {partner.offer.subhead}
        </p>
        <div className="animate-fade-in-up delay-200 flex flex-col items-center gap-4">
          <CtaButton size="lg" showArrow className="px-8 text-base" />
          <p className="text-sm text-muted-foreground">
            {"Starting at "}
            <span className="font-semibold text-foreground">{setupPrice}</span>
            {" to get started, then "}
            <span className="font-semibold text-foreground">{monthlyPrice}/month</span>
          </p>
        </div>
        <ul className="animate-fade-in-up delay-300 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
          {highlights.map((item) => (
            <li key={item} className="flex items-center gap-2 text-sm font-medium text-foreground">
              <Check className="h-4 w-4 text-primary" aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
