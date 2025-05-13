"use client"

import { useEffect, useState, useRef } from "react"
import styles from "@/styles/modules/particles.module.css"

interface Star {
  id: number
  size: "small" | "medium" | "large"
  top: string
  left: string
  animationDuration: string
  animationDelay: string
  opacity: number
}

export default function Stars({ count = 100 }: { count?: number }) {
  const [stars, setStars] = useState<Star[]>([])
  const containerRef = useRef<HTMLDivElement>(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  // Update dimensions on resize
  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight * 3, // Make stars cover more than viewport height for scrolling
      })
    }

    updateDimensions()
    window.addEventListener("resize", updateDimensions)
    return () => window.removeEventListener("resize", updateDimensions)
  }, [])

  // Generate stars based on dimensions
  useEffect(() => {
    if (dimensions.width === 0 || dimensions.height === 0) return

    const generatedStars: Star[] = []

    for (let i = 0; i < count; i++) {
      const size = Math.random() > 0.8 ? "large" : Math.random() > 0.5 ? "medium" : "small"
      const top = `${Math.random() * dimensions.height}px`
      const left = `${Math.random() * dimensions.width}px`
      const animationDuration = `${Math.random() * 3 + 1}s`
      const animationDelay = `${Math.random() * 3}s`
      const opacity = Math.random() * 0.5 + 0.3 // Varying opacity for depth effect

      generatedStars.push({
        id: i,
        size,
        top,
        left,
        animationDuration,
        animationDelay,
        opacity,
      })
    }

    setStars(generatedStars)
  }, [count, dimensions])

  // Parallax effect on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const scrollY = window.scrollY
        containerRef.current.style.transform = `translateY(${scrollY * 0.1}px)`
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className={styles.starsContainer} ref={containerRef}>
      {stars.map((star) => (
        <div
          key={star.id}
          className={`${styles.star} ${styles[`star${star.size.charAt(0).toUpperCase() + star.size.slice(1)}`]}`}
          style={{
            top: star.top,
            left: star.left,
            animationDuration: star.animationDuration,
            animationDelay: star.animationDelay,
            opacity: star.opacity,
          }}
        />
      ))}
    </div>
  )
}
