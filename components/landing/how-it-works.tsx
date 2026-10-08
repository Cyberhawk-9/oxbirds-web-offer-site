import { Reveal } from "@/components/reveal"
import { SectionHeading } from "@/components/landing/section-heading"
import { partner } from "@/lib/partner"

const steps = [
  { title: "Tell us about your business", body: "Request a call. We'll answer your questions." },
  {
    title: "We build your site",
    body: `You share a few details. Your first version is ${partner.promises.firstVersion}.`,
  },
  { title: "Review and launch", body: "Two rounds of changes, then it goes live on your own domain." },
]

export function HowItWorks() {
  return (
    <section aria-labelledby="how-it-works-heading" className="w-full px-4 py-20 md:px-6 md:py-28">
      <div className="container max-w-6xl mx-auto flex flex-col gap-12">
        <SectionHeading id="how-it-works-heading" title="How it works" />
        <ol className="grid gap-6 md:grid-cols-3">
          {steps.map((step, index) => (
            <Reveal as="li" key={step.title} index={index} className="card-surface flex flex-col gap-4 p-6">
              <span
                className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-soft font-display text-lg font-bold text-primary"
                aria-hidden="true"
              >
                {index + 1}
              </span>
              <h3 className="text-lg text-foreground">{step.title}</h3>
              <p className="leading-relaxed text-muted-foreground">{step.body}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
