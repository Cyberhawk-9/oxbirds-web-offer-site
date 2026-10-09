import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Reveal } from "@/components/reveal"
import { SectionHeading } from "@/components/landing/section-heading"
import { content } from "@/lib/content"

export function FaqSection() {
  const { faq } = content
  return (
    <section id="faq" aria-labelledby="faq-heading" className="w-full scroll-mt-20 px-4 py-20 md:px-6 md:py-28">
      <div className="container max-w-3xl mx-auto flex flex-col gap-12">
        <SectionHeading id="faq-heading" title={faq.title} />
        <Reveal>
          <Accordion type="single" collapsible className="card-surface px-6">
            {faq.items.map((item, index) => (
              <AccordionItem key={item.question} value={`item-${index}`}>
                <AccordionTrigger className="text-left text-base font-semibold text-foreground hover:no-underline hover:text-glow focus-visible:ring-ring data-[state=open]:text-glow">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-base leading-relaxed text-muted-foreground">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  )
}
