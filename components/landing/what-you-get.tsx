import { BarChart3, Files, LayoutTemplate, Mail, PenLine, Repeat2, Search, ShieldCheck, Smartphone } from "lucide-react"
import { Reveal } from "@/components/reveal"
import { SectionHeading } from "@/components/landing/section-heading"
import { content } from "@/lib/content"

const icons = [LayoutTemplate, Files, Smartphone, ShieldCheck, Search, Mail, PenLine, BarChart3, Repeat2]

export function WhatYouGet() {
  const { whatYouGet } = content
  return (
    <section aria-labelledby="what-you-get-heading" className="section-tint w-full px-4 py-20 md:px-6 md:py-28">
      <div className="container max-w-6xl mx-auto flex flex-col gap-12">
        <SectionHeading id="what-you-get-heading" title={whatYouGet.title} description={whatYouGet.subtitle} />
        <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {whatYouGet.cards.map((card, index) => {
            const Icon = icons[index]
            return (
              <Reveal as="li" key={card.title} index={index} className="card-surface flex flex-col gap-4 p-6">
                <span className="icon-tile">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="text-lg text-foreground">{card.title}</h3>
                <p className="leading-relaxed text-muted-foreground">{card.body}</p>
              </Reveal>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
