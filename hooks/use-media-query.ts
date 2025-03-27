"use client"

import { useEffect, useState } from "react"

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState<boolean>(false)

  useEffect(() => {
    const media = window.matchMedia(query)

    // Update the state with the current value
    if (media.matches !== matches) {
      setMatches(media.matches)
    }

    // Create a listener function
    const listener = () => setMatches(media.matches)

    // Try to use the modern API if available
    if (typeof media.addEventListener === "function") {
      media.addEventListener("change", listener)
      return () => media.removeEventListener("change", listener)
    } else {
      // Fallback for older browsers
      media.addListener(listener)
      return () => media.removeListener(listener)
    }
  }, [matches, query])

  return matches
}

