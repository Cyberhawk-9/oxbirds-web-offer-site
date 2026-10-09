import { BadgeCheck, Eye, MessageSquareText } from "lucide-react"
import { Reveal } from "@/components/reveal"
import { SectionHeading } from "@/components/landing/section-heading"
import { content } from "@/lib/content"

const icons = [Eye, BadgeCheck, MessageSquareText]

export function WhyWebsite() {
  const { why } = content
  return (
    <section aria-labelledby="why-heading" className="w-full px-4 py-20 md:px-6 md:py-28">
      <div className="container max-w-6xl mx-auto flex flex-col gap-12">
        <SectionHeading id="why-heading" title={why.title} description={why.text} />
        <ul className="grid gap-6 md:grid-cols-3">
          {why.items.map((item, index) => {
            const Icon = icons[index]
            return (
              <Reveal as="li" key={item.title} index={index} className="card-surface flex flex-col gap-4 p-6">
                <span className="icon-tile">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="text-lg text-foreground">{item.title}</h3>
                <p className="leading-relaxed text-muted-foreground">{item.body}</p>
              </Reveal>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
