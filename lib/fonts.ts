import { DM_Sans, Inter, Manrope, Plus_Jakarta_Sans } from "next/font/google"
import { partner } from "@/lib/partner"

// next/font needs literal, module-level calls, so theme.fonts.* picks from this registry.
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" })
const plusJakartaSans = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-plus-jakarta-sans", display: "swap" })
const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm-sans", display: "swap" })
const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope", display: "swap" })

const FONT_REGISTRY = {
  Inter: inter,
  "Plus Jakarta Sans": plusJakartaSans,
  "DM Sans": dmSans,
  Manrope: manrope,
} as const

type FontName = keyof typeof FONT_REGISTRY
const DEFAULT_FONT: FontName = "Inter"

function resolveFont(name: string) {
  return FONT_REGISTRY[(name in FONT_REGISTRY ? name : DEFAULT_FONT) as FontName]
}

const headingFont = resolveFont(partner.theme.fonts.heading)
const bodyFont = resolveFont(partner.theme.fonts.body)

/** Classes that define the chosen fonts' CSS variables. */
export const fontVariableClasses = Array.from(new Set([headingFont.variable, bodyFont.variable])).join(" ")

/** Maps the chosen fonts onto the tokens Tailwind's font-sans / font-display read. */
export function fontCssVariables(): Record<string, string> {
  return {
    "--font-heading-family": headingFont.style.fontFamily,
    "--font-body-family": bodyFont.style.fontFamily,
  }
}
