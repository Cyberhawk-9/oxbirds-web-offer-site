"use client"

import { useEffect, useState, type ReactNode } from "react"
import { ChevronDown } from "lucide-react"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { hasPhone, partner, phoneHref } from "@/lib/partner"

const LAST_UPDATED = "October 8, 2026"

type PanelId = "privacy" | "terms"
const PANEL_IDS: PanelId[] = ["privacy", "terms"]

const { brand, contact, legal, tracking } = partner
const ownerName = legal.businessName || brand.name
const privacyEmail = legal.privacyEmail || contact.email
const usesGoogle = Boolean(tracking.ga4MeasurementId || tracking.googleAds.conversionId)
const usesMeta = Boolean(tracking.metaPixelId)
const hasTracking = usesGoogle || usesMeta

function ContactLine() {
  if (privacyEmail) {
    return (
      <a href={`mailto:${privacyEmail}`} className="text-primary underline-offset-4 hover:underline">
        {privacyEmail}
      </a>
    )
  }
  if (hasPhone) {
    return (
      <a href={phoneHref} className="text-primary underline-offset-4 hover:underline">
        {contact.phoneDisplay}
      </a>
    )
  }
  return <>the request form on this page</>
}

function Block({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-base font-semibold text-foreground">{title}</h3>
      <div className="flex flex-col gap-2 leading-relaxed text-muted-foreground">{children}</div>
    </div>
  )
}

function PrivacyContent() {
  const thirdParties = [usesGoogle && "Google", usesMeta && "Meta"].filter(Boolean).join(" and ")
  return (
    <>
      <Block title="Who we are">
        <p>
          This page is run by {ownerName}
          {legal.address ? `, ${legal.address}` : ""}.
        </p>
      </Block>
      <Block title="What we collect">
        <p>When you send a request, we collect the details you enter: your name, phone, email, business name, what your business does, city, whether you have a website, and your message.</p>
        <p>We also record how you found this page, such as campaign tags in the link you followed, ad click identifiers, the first page you landed on, and the site that referred you.</p>
        <p>Like most websites, our hosting provider receives technical data such as your browser type, device, and IP address when you visit.</p>
      </Block>
      <Block title="Why we collect it">
        <p>We use this information to respond to your request and to improve this page.</p>
      </Block>
      <Block title="Who sees it">
        <p>
          Your information is seen by {ownerName} and the service providers that help run this page, such as email delivery and hosting.
          {thirdParties && ` This page also uses advertising and analytics tools from ${thirdParties}, which receive information about your visit.`}
        </p>
      </Block>
      {hasTracking && (
        <Block title="Cookies">
          <p>
            This page uses cookies and similar technologies from {thirdParties} to measure visits and the results of ads. You can block or delete cookies in your browser settings.
          </p>
        </Block>
      )}
      <Block title="Your choices">
        <p>
          To ask about, correct, or delete your information, or to stop being contacted, reach us at <ContactLine />.
        </p>
      </Block>
      <p className="text-sm text-muted-foreground">Last updated: {LAST_UPDATED}</p>
    </>
  )
}

function TermsContent() {
  return (
    <>
      <Block title="Information only">
        <p>This page describes a website service offered by {ownerName}. It is for general information only and is not an offer that creates a contract.</p>
      </Block>
      <Block title="Prices and offers">
        <p>Prices, features, and offers shown here may change at any time without notice.</p>
      </Block>
      <Block title="No guarantee of results">
        <p>We do not guarantee any particular result from your website, including search rankings, visitors, calls, or sales.</p>
      </Block>
      <Block title="Approval and agreement">
        <p>Sending a request does not guarantee service. Every project is subject to approval and to a separate written agreement with {ownerName}.</p>
      </Block>
      <Block title="Contact">
        <p>
          Questions about these terms? Reach us at <ContactLine />
          {hasPhone && privacyEmail && (
            <>
              {" or "}
              <a href={phoneHref} className="text-primary underline-offset-4 hover:underline">
                {contact.phoneDisplay}
              </a>
            </>
          )}
          .
        </p>
      </Block>
      <p className="text-sm text-muted-foreground">Last updated: {LAST_UPDATED}</p>
    </>
  )
}

const PANELS: Record<PanelId, { title: string; content: () => ReactNode }> = {
  privacy: { title: "Privacy", content: PrivacyContent },
  terms: { title: "Terms", content: TermsContent },
}

export function LegalSections() {
  const [open, setOpen] = useState<Record<PanelId, boolean>>({ privacy: false, terms: false })

  useEffect(() => {
    const openPanel = (id: string) => {
      if (!PANEL_IDS.includes(id as PanelId)) return
      setOpen((current) => ({ ...current, [id]: true }))
    }
    const onHashChange = () => openPanel(window.location.hash.slice(1))
    const onClick = (event: MouseEvent) => {
      const link = (event.target as Element | null)?.closest?.('a[href="#privacy"], a[href="#terms"]')
      if (link) openPanel(link.getAttribute("href")!.slice(1))
    }
    onHashChange()
    window.addEventListener("hashchange", onHashChange)
    document.addEventListener("click", onClick)
    return () => {
      window.removeEventListener("hashchange", onHashChange)
      document.removeEventListener("click", onClick)
    }
  }, [])

  return (
    <div className="w-full border-t border-border px-4 py-12 md:px-6">
      <div className="container max-w-3xl mx-auto flex flex-col gap-4">
        {PANEL_IDS.map((id) => {
          const { title, content: Content } = PANELS[id]
          return (
            <section key={id} id={id} aria-labelledby={`${id}-heading`} className="scroll-mt-20">
              <Collapsible
                open={open[id]}
                onOpenChange={(isOpen) => setOpen((current) => ({ ...current, [id]: isOpen }))}
                className="rounded-card border border-border bg-card shadow-xs"
              >
                <h2 id={`${id}-heading`} className="text-lg">
                  <CollapsibleTrigger className="group flex w-full items-center justify-between gap-4 rounded-card px-6 py-5 text-left font-semibold text-foreground outline-none hover:text-primary focus-visible:ring-2 focus-visible:ring-ring data-[state=open]:text-primary">
                    {title}
                    <ChevronDown className="h-5 w-5 shrink-0 transition-transform group-data-[state=open]:rotate-180" aria-hidden="true" />
                  </CollapsibleTrigger>
                </h2>
                <CollapsibleContent forceMount className="data-[state=closed]:hidden">
                  <div className="flex flex-col gap-6 border-t border-border px-6 py-6 text-sm md:text-base">
                    <Content />
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </section>
          )
        })}
      </div>
    </div>
  )
}
