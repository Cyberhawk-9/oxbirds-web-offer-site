"use client"

import * as React from "react"
import { ArrowUp } from "lucide-react"

/**
 * Floating circular button that appears after 600px of scroll and smooth-scrolls
 * to the top of the page.
 */
export function ScrollToTopButton() {
  const [visible, setVisible] = React.useState(false)

  React.useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 600)
    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label="Scroll to top"
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
      className={`scroll-top-button fixed bottom-24 right-4 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-primary bg-background/60 backdrop-blur focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring md:bottom-6 md:right-6 ${
        visible ? "scroll-top-button--visible" : "scroll-top-button--hidden pointer-events-none"
      }`}
    >
      <ArrowUp className="h-5 w-5 text-primary" />
    </button>
  )
}
