import { HeroSection } from "@/components/landing/hero-section"
import { WhyWebsite } from "@/components/landing/why-website"
import { WhatYouGet } from "@/components/landing/what-you-get"
import { GoodFit } from "@/components/landing/good-fit"
import { PricingSection } from "@/components/landing/pricing-section"
import { HowItWorks } from "@/components/landing/how-it-works"
import { HaveReady } from "@/components/landing/have-ready"
import { FaqSection } from "@/components/landing/faq-section"
import { FinalCta } from "@/components/landing/final-cta"
import { LeadFormSection } from "@/components/landing/lead-form-section"
import { LegalSections } from "@/components/landing/legal-sections"

export default function Home() {
  return (
    <>
      <HeroSection />
      <WhyWebsite />
      <WhatYouGet />
      <GoodFit />
      <PricingSection />
      <HowItWorks />
      <HaveReady />
      <FaqSection />
      <FinalCta />
      <LeadFormSection />
      <LegalSections />
    </>
  )
}
