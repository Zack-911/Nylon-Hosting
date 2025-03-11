"use client"

import { useEffect, useState } from "react"
import styles from "@/styles/modules/particles.module.css"

interface Orb {
  id: number
  size: number
  top: string
  left: string
  type: "purple" | "blue"
  animationDuration: string
  animationDelay: string
}

export default function GlowingOrbs({ count = 5 }: { count?: number }) {
  const [orbs, setOrbs] = useState<Orb[]>([])

  useEffect(() => {
    const generatedOrbs: Orb[] = []

    for (let i = 0; i < count; i++) {
      const size = Math.random() * 200 + 100
      const top = `${Math.random() * 100}%`
      const left = `${Math.random() * 100}%`
      const type = Math.random() > 0.5 ? "purple" : "blue"
      const animationDuration = `${Math.random() * 10 + 5}s`
      const animationDelay = `${Math.random() * 5}s`

      generatedOrbs.push({
        id: i,
        size,
        top,
        left,
        type,
        animationDuration,
        animationDelay,
      })
    }

    setOrbs(generatedOrbs)
  }, [count])

  return (
    <div className={styles.orbsContainer}>
      {orbs.map((orb) => (
        <div
          key={orb.id}
          className={`${styles.orb} ${orb.type === "purple" ? styles.orbPurple : styles.orbBlue}`}
          style={{
            width: `${orb.size}px`,
            height: `${orb.size}px`,
            top: orb.top,
            left: orb.left,
            animationDuration: orb.animationDuration,
            animationDelay: orb.animationDelay,
          }}
        />
      ))}
    </div>
  )
}

