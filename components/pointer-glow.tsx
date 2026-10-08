"use client"

import { useEffect } from "react"

/**
 * Feeds the pointer position into the nearest `.card-surface` as --mx / --my so the card's
 * hover spotlight follows the cursor. One delegated listener; skipped on touch-only devices.
 */
export function PointerGlow() {
  useEffect(() => {
    if (window.matchMedia("(hover: none)").matches) return

    let frame = 0
    const onMove = (event: PointerEvent) => {
      const card = (event.target as Element | null)?.closest<HTMLElement>(".card-surface")
      if (!card) return
      const { clientX, clientY } = event
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const rect = card.getBoundingClientRect()
        card.style.setProperty("--mx", `${clientX - rect.left}px`)
        card.style.setProperty("--my", `${clientY - rect.top}px`)
      })
    }

    document.addEventListener("pointermove", onMove, { passive: true })
    return () => {
      cancelAnimationFrame(frame)
      document.removeEventListener("pointermove", onMove)
    }
  }, [])

  return null
}
