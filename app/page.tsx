import { HeroSection } from "@/components/landing/hero-section"
import { WhatYouGet } from "@/components/landing/what-you-get"
import { HowItWorks } from "@/components/landing/how-it-works"
import { SamplesSection } from "@/components/landing/samples-section"
import { PricingSection } from "@/components/landing/pricing-section"
import { FaqSection } from "@/components/landing/faq-section"
import { LeadFormSection } from "@/components/landing/lead-form-section"
import { LegalSections } from "@/components/landing/legal-sections"

export default function Home() {
  return (
    <>
      <HeroSection />
      <WhatYouGet />
      <HowItWorks />
      <SamplesSection />
      <PricingSection />
      <FaqSection />
      <LeadFormSection />
      <LegalSections />
    </>
  )
}
