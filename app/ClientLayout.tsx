"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { ThemeProvider } from "@/components/theme-provider"
import Stars from "@/components/particles/Stars"
import { ToSProvider } from "@/components/tos-modal"

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-[var(--bg-dark)] font-sans antialiased">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <ToSProvider>
            <div className="relative">
              <div className="fixed inset-0 z-0 overflow-hidden">
                <Stars />
              </div>
              <div className="relative z-10">{children}</div>
            </div>
          </ToSProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
