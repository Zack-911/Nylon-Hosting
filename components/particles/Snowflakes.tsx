"use client"

import { useEffect, useState } from "react"
import styles from "@/styles/modules/particles.module.css"

interface Snowflake {
  id: number
  left: string
  animationDuration: string
  animationDelay: string
  fontSize: string
  opacity: number
}

export default function Snowflakes({ count = 50 }: { count?: number }) {
  const [snowflakes, setSnowflakes] = useState<Snowflake[]>([])

  useEffect(() => {
    const generatedSnowflakes: Snowflake[] = []

    for (let i = 0; i < count; i++) {
      const left = `${Math.random() * 100}%`
      const fallDuration = `${Math.random() * 10 + 5}s`
      const driftDuration = `${Math.random() * 5 + 2}s`
      const animationDuration = `${fallDuration}, ${driftDuration}`
      const animationDelay = `${Math.random() * 5}s`
      const fontSize = `${Math.random() * 0.7 + 0.3}em`
      const opacity = Math.random() * 0.6 + 0.2

      generatedSnowflakes.push({
        id: i,
        left,
        animationDuration,
        animationDelay,
        fontSize,
        opacity,
      })
    }

    setSnowflakes(generatedSnowflakes)
  }, [count])

  return (
    <div className={styles.snowflakesContainer}>
      {snowflakes.map((snowflake) => (
        <div
          key={snowflake.id}
          className={styles.snowflake}
          style={{
            left: snowflake.left,
            animationDuration: snowflake.animationDuration,
            animationDelay: snowflake.animationDelay,
            fontSize: snowflake.fontSize,
            opacity: snowflake.opacity,
          }}
        >
          ❄
        </div>
      ))}
    </div>
  )
}
