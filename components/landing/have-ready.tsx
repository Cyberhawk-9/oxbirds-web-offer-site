import { Check } from "lucide-react"
import { Reveal } from "@/components/reveal"
import { SectionHeading } from "@/components/landing/section-heading"
import { content } from "@/lib/content"

export function HaveReady() {
  const { ready } = content
  return (
    <section aria-labelledby="have-ready-heading" className="section-tint w-full px-4 py-20 md:px-6 md:py-28">
      <div className="container max-w-4xl mx-auto flex flex-col gap-10">
        <SectionHeading id="have-ready-heading" title={ready.title} description={ready.text} />
        <Reveal>
          <ul className="card-surface grid gap-4 p-8 sm:grid-cols-2">
            {ready.items.map((item) => (
              <li key={item} className="flex items-start gap-3 text-foreground">
                <Check className="mt-1 h-4 w-4 shrink-0 text-glow" aria-hidden="true" />
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal>
          <p className="text-center text-muted-foreground">{ready.footnote}</p>
        </Reveal>
      </div>
    </section>
  )
}
