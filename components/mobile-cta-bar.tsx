import { CtaButton } from "@/components/cta-button"

export function MobileCtaBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-background/95 backdrop-blur md:hidden">
      <div className="flex items-center px-4 py-3">
        <CtaButton className="w-full" />
      </div>
    </div>
  )
}
