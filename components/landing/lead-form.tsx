"use client"

import { useEffect, useRef, useState, type FormEvent } from "react"
import emailjs from "@emailjs/browser"
import { CheckCircle2, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { readAttribution } from "@/lib/attribution"
import { trackLeadConversion } from "@/lib/conversion"
import { fillTemplate, hasPhone, partner, phoneHref } from "@/lib/partner"
import { cn } from "@/lib/utils"

const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ?? ""
const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ?? ""
const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ?? ""
const IS_CONFIGURED = Boolean(SERVICE_ID && TEMPLATE_ID && PUBLIC_KEY)

const COOLDOWN_KEY = "lead_form_last_sent"
const COOLDOWN_MS = 60_000
const TYPE_MAX = 150
const MESSAGE_MAX = 1000

type FieldName = "name" | "phone" | "email" | "business" | "type" | "city" | "hasSite" | "message"
type Values = Record<FieldName, string>
type Errors = Partial<Record<FieldName, string>>
type Status = "idle" | "sending" | "success" | "error"

const INITIAL_VALUES: Values = {
  name: "",
  phone: "",
  email: "",
  business: "",
  type: "",
  city: "",
  hasSite: "",
  message: "",
}

const FIELD_ORDER: FieldName[] = ["name", "phone", "email", "business", "type", "city", "hasSite", "message"]
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

function validateField(field: FieldName, raw: string): string | undefined {
  const value = raw.trim()
  switch (field) {
    case "name":
      return value ? undefined : "Please enter your name."
    case "phone":
      if (!value) return "Please enter your phone number."
      return value.replace(/\D/g, "").length >= 7 ? undefined : "Please enter a phone number with at least 7 digits."
    case "email":
      if (!value) return "Please enter your email."
      return EMAIL_PATTERN.test(value) ? undefined : "Please enter a valid email address."
    case "business":
      return value ? undefined : "Please enter your business name."
    case "type":
      if (!value) return "Please tell us what your business does."
      return value.length <= TYPE_MAX ? undefined : `Please keep this under ${TYPE_MAX} characters.`
    case "message":
      return value.length <= MESSAGE_MAX ? undefined : `Please keep this under ${MESSAGE_MAX} characters.`
    default:
      return undefined
  }
}

function validateAll(values: Values): Errors {
  const errors: Errors = {}
  for (const field of FIELD_ORDER) {
    const error = validateField(field, values[field])
    if (error) errors[field] = error
  }
  return errors
}

function cooldownRemaining(): number {
  try {
    const last = Number(window.sessionStorage.getItem(COOLDOWN_KEY) ?? 0)
    return Math.max(0, COOLDOWN_MS - (Date.now() - last))
  } catch {
    return 0
  }
}

function startCooldown() {
  try {
    window.sessionStorage.setItem(COOLDOWN_KEY, String(Date.now()))
  } catch {
    // Storage blocked; the in-memory success state still prevents a resend.
  }
}

function submittedAt(): string {
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
  return `${new Date().toLocaleString()} (${timeZone})`
}

const dash = (value: string) => value.trim() || "-"

function PhoneFallback({ prefix }: { prefix: string }) {
  if (!hasPhone) return null
  return (
    <>
      {prefix}
      <a href={phoneHref} className="font-semibold text-primary underline-offset-4 hover:underline">
        {partner.contact.phoneDisplay}
      </a>
    </>
  )
}

export function LeadForm() {
  const [values, setValues] = useState<Values>(INITIAL_VALUES)
  const [errors, setErrors] = useState<Errors>({})
  const [status, setStatus] = useState<Status>("idle")
  const [cooldownMessage, setCooldownMessage] = useState("")
  const sendingRef = useRef(false)
  const successRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    if (status !== "success") return
    successRef.current?.focus({ preventScroll: true })
    successRef.current?.scrollIntoView({ behavior: "smooth", block: "center" })
  }, [status])

  function update(field: FieldName, value: string) {
    setValues((current) => ({ ...current, [field]: value }))
    if (errors[field]) {
      setErrors((current) => ({ ...current, [field]: validateField(field, value) }))
    }
  }

  function handleBlur(field: FieldName) {
    if (!values[field]) return
    setErrors((current) => ({ ...current, [field]: validateField(field, values[field]) }))
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!IS_CONFIGURED || sendingRef.current || status === "success") return

    const nextErrors = validateAll(values)
    setErrors(nextErrors)
    const firstInvalid = FIELD_ORDER.find((field) => nextErrors[field])
    if (firstInvalid) {
      formRef.current?.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus()
      return
    }

    const remaining = cooldownRemaining()
    if (remaining > 0) {
      setCooldownMessage(`Please wait ${Math.ceil(remaining / 1000)} seconds before sending another request.`)
      return
    }
    setCooldownMessage("")

    sendingRef.current = true
    setStatus("sending")

    const honeypot = new FormData(event.currentTarget).get("company_website")
    if (typeof honeypot === "string" && honeypot.trim()) {
      startCooldown()
      setStatus("success")
      return
    }

    const attribution = readAttribution()
    const params = {
      partner_name: dash(partner.brand.name),
      lead_name: dash(values.name),
      lead_phone: dash(values.phone),
      lead_email: dash(values.email),
      lead_business: dash(values.business),
      lead_type: dash(values.type),
      lead_city: dash(values.city),
      lead_has_site: dash(values.hasSite),
      lead_message: dash(values.message),
      utm_source: dash(attribution.utm_source),
      utm_medium: dash(attribution.utm_medium),
      utm_campaign: dash(attribution.utm_campaign),
      utm_term: dash(attribution.utm_term),
      utm_content: dash(attribution.utm_content),
      gclid: dash(attribution.gclid),
      fbclid: dash(attribution.fbclid),
      landing_page: dash(attribution.landing_page),
      referrer: dash(attribution.referrer),
      page_url: dash(window.location.href),
      submitted_at: submittedAt(),
    }

    try {
      await emailjs.send(SERVICE_ID, TEMPLATE_ID, params, { publicKey: PUBLIC_KEY })
      startCooldown()
      trackLeadConversion()
      setStatus("success")
    } catch {
      sendingRef.current = false
      setStatus("error")
    }
  }

  if (status === "success") {
    return (
      <div
        ref={successRef}
        tabIndex={-1}
        role="status"
        className="card-surface flex flex-col items-center gap-4 p-8 text-center outline-none focus-visible:ring-2 focus-visible:ring-ring md:p-10"
      >
        <span className="icon-tile">
          <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
        </span>
        <h3 className="text-2xl text-balance">{fillTemplate(partner.leadForm.successTitle)}</h3>
        <p className="leading-relaxed text-muted-foreground text-pretty">{fillTemplate(partner.leadForm.successBody)}</p>
        {hasPhone && (
          <p className="text-muted-foreground">
            <PhoneFallback prefix="Need us sooner? Call " />
          </p>
        )}
      </div>
    )
  }

  const isSending = status === "sending"
  const consent = fillTemplate(partner.leadForm.consentText)

  return (
    <form
      ref={formRef}
      noValidate
      onSubmit={handleSubmit}
      aria-describedby={!IS_CONFIGURED ? "lead-form-unavailable" : undefined}
      className="card-surface flex flex-col gap-6 p-6 md:p-8"
    >
      {!IS_CONFIGURED && (
        <p id="lead-form-unavailable" role="alert" className="rounded-md border border-border bg-muted p-4 text-sm leading-relaxed text-foreground">
          This form is not set up yet.
          <PhoneFallback prefix=" Please call " />
        </p>
      )}

      <fieldset disabled={!IS_CONFIGURED || isSending} className="flex min-w-0 flex-col gap-5 disabled:opacity-90">
        <legend className="sr-only">Your details</legend>
        <div className="grid gap-5 sm:grid-cols-2">
          <TextField label="Name" name="name" required autoComplete="name" values={values} errors={errors} onChange={update} onBlur={handleBlur} />
          <TextField label="Phone" name="phone" type="tel" required autoComplete="tel" inputMode="tel" values={values} errors={errors} onChange={update} onBlur={handleBlur} />
          <TextField label="Email" name="email" type="email" required autoComplete="email" values={values} errors={errors} onChange={update} onBlur={handleBlur} />
          <TextField label="Business name" name="business" required autoComplete="organization" values={values} errors={errors} onChange={update} onBlur={handleBlur} />
        </div>
        <TextField
          label="What does your business do?"
          name="type"
          required
          maxLength={TYPE_MAX}
          values={values}
          errors={errors}
          onChange={update}
          onBlur={handleBlur}
        />
        <div className="grid gap-5 sm:grid-cols-2">
          <TextField label="City" name="city" autoComplete="address-level2" values={values} errors={errors} onChange={update} onBlur={handleBlur} />
          <div className="flex min-w-0 flex-col gap-2">
            <Label htmlFor="lead-hasSite">
              Do you have a website now? <span className="font-normal text-muted-foreground">(optional)</span>
            </Label>
            <select
              id="lead-hasSite"
              name="hasSite"
              value={values.hasSite}
              onChange={(event) => update("hasSite", event.target.value)}
              className="h-11 w-full min-w-0 rounded-md border border-input bg-background px-3 text-base text-foreground shadow-xs outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/30 md:text-sm"
            >
              <option value="">Choose one</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
              <option value="Not sure">Not sure</option>
            </select>
          </div>
        </div>
        <div className="flex min-w-0 flex-col gap-2">
          <Label htmlFor="lead-message">
            Message <span className="font-normal text-muted-foreground">(optional)</span>
          </Label>
          <Textarea
            id="lead-message"
            name="message"
            rows={4}
            maxLength={MESSAGE_MAX}
            value={values.message}
            onChange={(event) => update("message", event.target.value)}
            onBlur={() => handleBlur("message")}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? "lead-message-error lead-message-count" : "lead-message-count"}
            className="min-h-28"
          />
          <div className="flex justify-between gap-4 text-xs">
            <span id="lead-message-error" className="text-destructive">
              {errors.message}
            </span>
            <span id="lead-message-count" className="shrink-0 text-muted-foreground">
              {values.message.length}/{MESSAGE_MAX}
            </span>
          </div>
        </div>

        <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
          <label htmlFor="company_website">Leave this field empty</label>
          <input id="company_website" name="company_website" type="text" tabIndex={-1} autoComplete="off" defaultValue="" />
        </div>

        <div className="flex flex-col gap-3">
          <Button type="submit" variant="solid" size="lg" className="w-full font-semibold" disabled={!IS_CONFIGURED || isSending}>
            {isSending && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
            {isSending ? "Sending..." : partner.offer.ctaLabel}
          </Button>
          <p className="text-xs leading-relaxed text-muted-foreground">{consent}</p>
        </div>
      </fieldset>

      <div aria-live="polite" className="empty:hidden">
        {status === "error" && (
          <p role="alert" className="rounded-md border border-destructive/40 bg-destructive/5 p-4 text-sm leading-relaxed text-foreground">
            Something went wrong. Please try again, or call us
            {hasPhone ? (
              <>
                {" at "}
                <PhoneFallback prefix="" />
              </>
            ) : null}
            .
          </p>
        )}
        {cooldownMessage && <p className="text-sm text-muted-foreground">{cooldownMessage}</p>}
      </div>
    </form>
  )
}

interface TextFieldProps {
  label: string
  name: FieldName
  type?: string
  required?: boolean
  autoComplete?: string
  inputMode?: "tel" | "email" | "text"
  maxLength?: number
  values: Values
  errors: Errors
  onChange: (field: FieldName, value: string) => void
  onBlur: (field: FieldName) => void
}

function TextField({ label, name, type = "text", required, autoComplete, inputMode, maxLength, values, errors, onChange, onBlur }: TextFieldProps) {
  const id = `lead-${name}`
  const error = errors[name]
  return (
    <div className="flex min-w-0 flex-col gap-2">
      <Label htmlFor={id}>
        {label}
        {required ? (
          <span aria-hidden="true" className="text-primary">
            *
          </span>
        ) : (
          <span className="font-normal text-muted-foreground">(optional)</span>
        )}
      </Label>
      <Input
        id={id}
        name={name}
        type={type}
        required={required}
        aria-required={required}
        autoComplete={autoComplete}
        inputMode={inputMode}
        maxLength={maxLength}
        value={values[name]}
        onChange={(event) => onChange(name, event.target.value)}
        onBlur={() => onBlur(name)}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className={cn("h-11 bg-background focus-visible:ring-ring/30")}
      />
      {error && (
        <p id={`${id}-error`} className="text-xs text-destructive">
          {error}
        </p>
      )}
    </div>
  )
}
