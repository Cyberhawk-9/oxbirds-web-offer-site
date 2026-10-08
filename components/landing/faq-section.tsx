import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Reveal } from "@/components/reveal"
import { SectionHeading } from "@/components/landing/section-heading"
import { monthlyPrice, partner, setupPrice } from "@/lib/partner"

const { offer, promises } = partner

const faqs = [
  {
    question: "How much does it cost?",
    answer: `${setupPrice} to get started, then ${monthlyPrice} a month. That includes hosting, security, and updates. ${offer.priceNote}`,
  },
  {
    question: "What's included?",
    answer:
      "A custom-designed website, a page for each of your main services or products, a version that works on phones, hosting and security, a contact form that sends leads to your email, and help connecting your domain.",
  },
  {
    question: "How long does it take?",
    answer: `Your first version is ${promises.firstVersion}. After that you get two rounds of changes before launch.`,
  },
  {
    question: "Do I own my website?",
    answer:
      "You own your domain name and your content, such as your logo, text, and photos. The website itself is a managed service, so it stays online while your subscription is active.",
  },
  {
    question: "What if I need changes later?",
    answer: `Send us a request for changes to text, photos, hours, or contact details. These are ${promises.edits}. Bigger changes, like new pages or features, are quoted separately.`,
  },
  { question: "Can I cancel?", answer: promises.cancellation },
  {
    question: "Will I show up on Google?",
    answer:
      "We build every site with search-friendly structure, but no one can promise rankings or a certain number of customers.",
  },
  {
    question: "Do I need a domain name?",
    answer: "Yes, you'll need your own domain. If you don't have one, we'll help you choose one and connect it.",
  },
  {
    question: "How does the contact form work?",
    answer:
      "When someone fills in your site's form, the message goes straight to your email. We help you set up the free email service that powers it.",
  },
]

export function FaqSection() {
  return (
    <section aria-labelledby="faq-heading" className="w-full px-4 py-20 md:px-6 md:py-28">
      <div className="container max-w-3xl mx-auto flex flex-col gap-12">
        <SectionHeading id="faq-heading" title="Questions" />
        <Reveal>
          <Accordion type="single" collapsible className="card-surface px-6">
            {faqs.map((faq, index) => (
              <AccordionItem key={faq.question} value={`item-${index}`}>
                <AccordionTrigger className="text-left text-base font-semibold text-foreground hover:no-underline hover:text-primary">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-base leading-relaxed text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  )
}
