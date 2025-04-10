"use client"

import { useEffect } from "react"
import { useTheme } from "next-themes"
import { useToast } from "@/hooks/use-toast"

export function useThemeEffect(callback?: (theme: string) => void) {
  const { theme, resolvedTheme } = useTheme()
  const { toast } = useToast()

  useEffect(() => {
    if (!resolvedTheme) return

    try {
      // Apply any theme-specific effects
      document.documentElement.style.setProperty("--theme-transition", "all 0.3s ease")

      // Call the callback if provided
      if (callback && typeof callback === "function") {
        callback(resolvedTheme)
      }

      // Optional: Log theme change for debugging
      console.log(`Theme changed to: ${resolvedTheme}`)
    } catch (error) {
      console.error("Error applying theme effects:", error)
      toast({
        title: "Theme application error",
        description: "There was an error applying the theme. Please refresh the page.",
        variant: "destructive",
      })
    }
  }, [resolvedTheme, callback, toast])

  return { currentTheme: resolvedTheme }
}
