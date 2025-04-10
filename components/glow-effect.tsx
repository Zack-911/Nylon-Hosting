"use client"

import { useEffect, useState } from "react"
import { useTheme } from "next-themes"

export function GlowEffect() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // After mounting, we can safely access the theme
  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
      setIsVisible(true)
    }

    const handleMouseLeave = () => {
      setIsVisible(false)
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches && e.touches[0]) {
        setPosition({ x: e.touches[0].clientX, y: e.touches[0].clientY })
        setIsVisible(true)
      }
    }

    const handleTouchEnd = () => {
      // Keep the glow visible for a moment after touch ends
      setTimeout(() => setIsVisible(false), 1000)
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("mouseleave", handleMouseLeave)
    window.addEventListener("touchmove", handleTouchMove)
    window.addEventListener("touchend", handleTouchEnd)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseleave", handleMouseLeave)
      window.removeEventListener("touchmove", handleTouchMove)
      window.removeEventListener("touchend", handleTouchEnd)
    }
  }, [])

  if (!mounted) return null

  return (
    <>
      {/* Background pattern - lines and dots */}
      <div className="fixed inset-0 -z-10 h-full w-full overflow-hidden transition-colors duration-300">
        <div
          className={`absolute inset-0 ${resolvedTheme === "dark" ? "bg-grid-pattern-dark" : "bg-grid-pattern-light"} opacity-100 transition-opacity duration-300`}
        ></div>
      </div>

      {/* Purple glow effect - significantly larger */}
      <div
        className={`pointer-events-none fixed -z-10 h-[800px] w-[800px] rounded-full bg-gradient-to-r from-purple-500/30 via-purple-400/40 to-fuchsia-500/30 blur-[150px] transition-all duration-300 ${
          isVisible ? "opacity-70" : "opacity-0"
        }`}
        style={{
          left: `${position.x - 400}px`,
          top: `${position.y - 400}px`,
        }}
      />
    </>
  )
}
