import { CtaButton } from "@/components/cta-button"

export function MobileCtaBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-brand-line bg-background/80 backdrop-blur-xl md:hidden">
      <div className="flex items-center px-4 py-3">
        <CtaButton className="w-full" />
      </div>
    </div>
  )
}
