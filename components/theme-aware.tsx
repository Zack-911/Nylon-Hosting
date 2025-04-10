"use client"

import { type ReactNode, useEffect, useState } from "react"
import { useTheme } from "next-themes"

interface ThemeAwareProps {
  children: ReactNode
  lightClass?: string
  darkClass?: string
  className?: string
}

export function ThemeAware({ children, lightClass = "", darkClass = "", className = "" }: ThemeAwareProps) {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    // Return a placeholder with the same dimensions during SSR
    return <div className={className}>{children}</div>
  }

  const themeClass = resolvedTheme === "dark" ? darkClass : lightClass

  return <div className={`${className} ${themeClass} transition-all duration-300`}>{children}</div>
}
