import { Check } from "lucide-react"
import { Reveal } from "@/components/reveal"
import { SectionHeading } from "@/components/landing/section-heading"
import { content } from "@/lib/content"

export function GoodFit() {
  const { goodFit } = content
  return (
    <section aria-labelledby="good-fit-heading" className="w-full px-4 py-20 md:px-6 md:py-28">
      <div className="container max-w-3xl mx-auto flex flex-col gap-12">
        <SectionHeading id="good-fit-heading" title={goodFit.title} />
        <Reveal>
          <ul className="card-surface flex flex-col gap-5 p-8">
            {goodFit.items.map((item) => (
              <li key={item} className="flex items-start gap-3 text-lg text-foreground">
                <Check className="mt-1.5 h-5 w-5 shrink-0 text-glow" aria-hidden="true" />
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}
