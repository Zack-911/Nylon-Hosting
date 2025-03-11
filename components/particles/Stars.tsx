"use client"

import { useEffect, useState } from "react"
import styles from "@/styles/modules/particles.module.css"

interface Star {
  id: number
  size: "small" | "medium" | "large"
  top: string
  left: string
  animationDuration: string
  animationDelay: string
}

export default function Stars({ count = 100 }: { count?: number }) {
  const [stars, setStars] = useState<Star[]>([])

  useEffect(() => {
    const generatedStars: Star[] = []

    for (let i = 0; i < count; i++) {
      const size = Math.random() > 0.8 ? "large" : Math.random() > 0.5 ? "medium" : "small"
      const top = `${Math.random() * 100}%`
      const left = `${Math.random() * 100}%`
      const animationDuration = `${Math.random() * 3 + 1}s`
      const animationDelay = `${Math.random() * 3}s`

      generatedStars.push({
        id: i,
        size,
        top,
        left,
        animationDuration,
        animationDelay,
      })
    }

    setStars(generatedStars)
  }, [count])

  return (
    <div className={styles.starsContainer}>
      {stars.map((star) => (
        <div
          key={star.id}
          className={`${styles.star} ${styles[`star${star.size.charAt(0).toUpperCase() + star.size.slice(1)}`]}`}
          style={{
            top: star.top,
            left: star.left,
            animationDuration: star.animationDuration,
            animationDelay: star.animationDelay,
          }}
        />
      ))}
    </div>
  )
}

