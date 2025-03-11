"use client"

import { useEffect, useState } from "react"
import styles from "@/styles/modules/particles.module.css"

interface MatrixColumn {
  id: number
  left: string
  animationDuration: string
  animationDelay: string
  content: string
}

export default function MatrixRain({ count = 20 }: { count?: number }) {
  const [columns, setColumns] = useState<MatrixColumn[]>([])

  useEffect(() => {
    const generatedColumns: MatrixColumn[] = []
    const characters = "01"

    for (let i = 0; i < count; i++) {
      const left = `${Math.random() * 100}%`
      const animationDuration = `${Math.random() * 10 + 5}s`
      const animationDelay = `${Math.random() * 5}s`

      // Generate random matrix column content
      let content = ""
      const length = Math.floor(Math.random() * 20) + 10
      for (let j = 0; j < length; j++) {
        content += characters.charAt(Math.floor(Math.random() * characters.length))
      }

      generatedColumns.push({
        id: i,
        left,
        animationDuration,
        animationDelay,
        content,
      })
    }

    setColumns(generatedColumns)
  }, [count])

  return (
    <div className={styles.matrixContainer}>
      {columns.map((column) => (
        <div
          key={column.id}
          className={styles.matrixColumn}
          style={{
            left: column.left,
            animationDuration: column.animationDuration,
            animationDelay: column.animationDelay,
          }}
        >
          {column.content.split("").map((char, index) => (
            <div key={index} style={{ opacity: Math.random() * 0.5 + 0.5 }}>
              {char}
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

