import { Reveal } from "@/components/reveal"
import { CtaButton } from "@/components/cta-button"
import { content } from "@/lib/content"

export function FinalCta() {
  const { finalCta } = content
  return (
    <section aria-labelledby="final-cta-heading" className="w-full px-4 pb-20 md:px-6 md:pb-28">
      <Reveal className="card-surface card-featured container mx-auto flex max-w-3xl flex-col items-center gap-6 p-8 text-center md:p-12">
        <h2 id="final-cta-heading" className="text-3xl text-balance md:text-4xl">
          {finalCta.title}
        </h2>
        <p className="max-w-xl text-lg leading-relaxed text-muted-foreground text-pretty">{finalCta.text}</p>
        <CtaButton size="lg" showArrow className="px-8" />
      </Reveal>
    </section>
  )
}
