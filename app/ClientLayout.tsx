"use client"

import type React from "react"
import { useEffect } from "react"
import "@/app/globals.css"
import { ThemeProvider } from "next-themes"
import { ToSProvider } from "@/components/tos-modal"
import BackgroundGrid from "@/components/backgroundGrid"
import Stars from "@/components/particles/Stars"
import AOS from "aos"
import "aos/dist/aos.css"

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  useEffect(() => {
    // Initialize AOS
    AOS.init({
      duration: 800,
      once: false,
      mirror: true,
      offset: 50,
      easing: "ease-in-out",
    })
  }, [])

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css" />
      </head>
      <body className="min-h-screen bg-[var(--bg-dark)] font-sans antialiased">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <Stars count={300} />
          <BackgroundGrid />
          <ToSProvider>{children}</ToSProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
