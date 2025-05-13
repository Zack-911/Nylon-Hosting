"use client"

import { useEffect, useState } from "react"
import styles from "@/styles/modules/particles.module.css"

interface Wave {
  id: number
  bottom: string
  animationDuration: string
  animationDelay: string
  height: string
}

export default function GradientWaves({ count = 3 }: { count?: number }) {
  const [waves, setWaves] = useState<Wave[]>([])

  useEffect(() => {
    const generatedWaves: Wave[] = []

    for (let i = 0; i < count; i++) {
      const bottom = `${Math.random() * 30 - 30}%`
      const animationDuration = `${Math.random() * 10 + 20}s`
      const animationDelay = `${Math.random() * 5}s`
      const height = `${Math.random() * 100 + 100}px`

      generatedWaves.push({
        id: i,
        bottom,
        animationDuration,
        animationDelay,
        height,
      })
    }

    setWaves(generatedWaves)
  }, [count])

  return (
    <div className={styles.waveContainer}>
      {waves.map((wave) => (
        <div
          key={wave.id}
          className={styles.wave}
          style={{
            bottom: wave.bottom,
            height: wave.height,
            animationDuration: wave.animationDuration,
            animationDelay: wave.animationDelay,
          }}
        />
      ))}
    </div>
  )
}
