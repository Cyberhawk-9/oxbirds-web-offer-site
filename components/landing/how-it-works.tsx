import { Reveal } from "@/components/reveal"
import { SectionHeading } from "@/components/landing/section-heading"
import { content } from "@/lib/content"

export function HowItWorks() {
  const { howItWorks } = content
  const lastIndex = howItWorks.steps.length - 1
  return (
    <section
      id="how-it-works"
      aria-labelledby="how-it-works-heading"
      className="w-full scroll-mt-20 px-4 py-20 md:px-6 md:py-28"
    >
      <div className="container max-w-6xl mx-auto flex flex-col gap-12">
        <SectionHeading id="how-it-works-heading" title={howItWorks.title} description={howItWorks.subtitle} />
        <ol className="flex flex-col gap-10 lg:grid lg:grid-cols-5 lg:gap-8">
          {howItWorks.steps.map((step, index) => (
            <Reveal as="li" key={step.title} index={index} className="relative pl-14 lg:pl-0 lg:pt-14">
              <span className="step-badge absolute left-0 top-0 font-display" aria-hidden="true">
                {index + 1}
              </span>
              {index !== lastIndex && (
                <span
                  className="absolute left-5 top-12 -bottom-10 w-px bg-brand-line/60 lg:left-14 lg:right-[-2rem] lg:top-5 lg:bottom-auto lg:h-px lg:w-auto"
                  aria-hidden="true"
                />
              )}
              <h3 className="text-lg text-foreground">{step.title}</h3>
              <p className="mt-2 leading-relaxed text-muted-foreground">{step.body}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
