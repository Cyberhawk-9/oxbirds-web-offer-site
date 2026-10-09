import { Check } from "lucide-react"
import { CtaButton } from "@/components/cta-button"
import { content, HEADLINE_HIGHLIGHTS } from "@/lib/content"

function HighlightedHeadline({ text }: { text: string }) {
  const pattern = new RegExp(`(${HEADLINE_HIGHLIGHTS.map((phrase) => phrase.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`)
  return (
    <>
      {text.split(pattern).map((part, index) =>
        HEADLINE_HIGHLIGHTS.includes(part) ? (
          <span key={index} className="text-glow">
            {part}
          </span>
        ) : (
          part
        ),
      )}
    </>
  )
}

export function HeroSection() {
  const { hero } = content
  return (
    <section id="top" className="hero-aurora w-full px-4 pt-16 pb-20 md:px-6 md:pt-28 md:pb-32">
      <div className="container max-w-4xl mx-auto flex flex-col items-center gap-8 text-center">
        <h1 className="heading-gradient animate-fade-in-up pb-1 text-4xl leading-tight text-balance sm:text-5xl md:text-6xl">
          <HighlightedHeadline text={hero.headline} />
        </h1>
        <p className="animate-fade-in-up delay-100 max-w-2xl text-lg leading-relaxed text-muted-foreground text-pretty md:text-xl">
          {hero.subhead}
        </p>
        <div className="animate-fade-in-up delay-200 flex flex-col items-center gap-5">
          <CtaButton size="lg" showArrow className="px-8 text-base" />
          <p className="pill px-4 py-2 text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">{hero.pricePill.setup}</span>
            {` ${hero.pricePill.setupLabel} `}
            <span className="font-semibold text-foreground">{hero.pricePill.monthly}</span>
          </p>
          <p className="text-sm text-muted-foreground">{hero.priceNote}</p>
        </div>
        <ul className="animate-fade-in-up delay-300 flex flex-wrap items-center justify-center gap-3">
          {hero.chips.map((item) => (
            <li key={item} className="pill px-4 py-2 text-sm font-medium text-foreground">
              <Check className="h-4 w-4 text-glow" aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
