"use client"

import { useEffect, useState } from "react"
import styles from "@/styles/modules/particles.module.css"

interface Particle {
  id: number
  size: number
  top: string
  left: string
  animationDuration: string
  animationDelay: string
}

export default function FloatingParticles({ count = 20 }: { count?: number }) {
  const [particles, setParticles] = useState<Particle[]>([])

  useEffect(() => {
    const generatedParticles: Particle[] = []

    for (let i = 0; i < count; i++) {
      const size = Math.random() * 10 + 5
      const top = `${Math.random() * 100}%`
      const left = `${Math.random() * 100}%`
      const animationDuration = `${Math.random() * 20 + 10}s`
      const animationDelay = `${Math.random() * 10}s`

      generatedParticles.push({
        id: i,
        size,
        top,
        left,
        animationDuration,
        animationDelay,
      })
    }

    setParticles(generatedParticles)
  }, [count])

  return (
    <div className={styles.particlesContainer}>
      {particles.map((particle) => (
        <div
          key={particle.id}
          className={styles.particle}
          style={{
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            top: particle.top,
            left: particle.left,
            animationDuration: particle.animationDuration,
            animationDelay: particle.animationDelay,
          }}
        />
      ))}
    </div>
  )
}
