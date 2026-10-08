import { LayoutTemplate, Mail, PenLine, ShieldCheck, Smartphone, Files } from "lucide-react"
import { Reveal } from "@/components/reveal"
import { SectionHeading } from "@/components/landing/section-heading"
import { partner } from "@/lib/partner"

const features = [
  { icon: LayoutTemplate, title: "Custom design", body: "Built for your business, not a template." },
  {
    icon: Files,
    title: "A page for each main service",
    body: "Each of your main services or products gets its own page.",
  },
  { icon: Smartphone, title: "Looks great on phones", body: "Easy to read and use on any screen." },
  { icon: ShieldCheck, title: "Hosting and security included", body: "We keep your site online and protected." },
  {
    icon: PenLine,
    title: "Updates when you need them",
    body: `Changes to text, photos, and hours are ${partner.promises.edits}.`,
  },
  { icon: Mail, title: "A contact form", body: "Messages go straight to your email." },
]

export function WhatYouGet() {
  return (
    <section aria-labelledby="what-you-get-heading" className="section-tint w-full px-4 py-20 md:px-6 md:py-28">
      <div className="container max-w-6xl mx-auto flex flex-col gap-12">
        <SectionHeading id="what-you-get-heading" title="What you get" />
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map(({ icon: Icon, title, body }, index) => (
            <Reveal as="li" key={title} index={index} className="card-surface flex flex-col gap-4 p-6">
              <span className="icon-tile">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <h3 className="text-lg text-foreground">{title}</h3>
              <p className="leading-relaxed text-muted-foreground">{body}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
