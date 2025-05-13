"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import styles from "@/styles/modules/animations.module.css"

interface EnhancedHeroProps {
  title: string
  description: string
  badge?: string
  primaryButtonText?: string
  primaryButtonLink?: string
  secondaryButtonText?: string
  secondaryButtonLink?: string
  showShootingStars?: boolean
}

export default function EnhancedHero({
  title,
  description,
  badge = "Next-Generation Hosting",
  primaryButtonText = "Get Started",
  primaryButtonLink = "/pricing",
  secondaryButtonText = "Learn More",
  secondaryButtonLink = "/about",
  showShootingStars = true,
}: EnhancedHeroProps) {
  const [shootingStars, setShootingStars] = useState<
    Array<{ id: number; delay: number; duration: number; top: string; left: string; size: number }>
  >([])

  useEffect(() => {
    if (showShootingStars) {
      const stars = Array.from({ length: 5 }, (_, i) => ({
        id: i,
        delay: Math.random() * 15,
        duration: Math.random() * 2 + 2,
        top: `${Math.random() * 70}%`,
        left: `${Math.random() * 70}%`,
        size: Math.random() * 1 + 1,
      }))
      setShootingStars(stars)
    }
  }, [showShootingStars])

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 relative overflow-hidden">
      {showShootingStars &&
        shootingStars.map((star) => (
          <motion.div
            key={star.id}
            className="absolute bg-white"
            style={{
              top: star.top,
              left: star.left,
              width: `${star.size}px`,
              height: `${star.size}px`,
              borderRadius: "50%",
              boxShadow: `0 0 ${star.size * 2}px ${star.size}px rgba(255, 255, 255, 0.8)`,
            }}
            animate={{
              x: [0, 200],
              y: [0, -200],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: star.duration,
              repeat: Number.POSITIVE_INFINITY,
              repeatDelay: star.delay,
              ease: "easeInOut",
            }}
          />
        ))}

      <div className="container relative z-10 px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Badge className="bg-purple-500/10 text-purple-400 border-purple-500/20">{badge}</Badge>
          </motion.div>

          <motion.h1
            className="text-3xl font-bold tracking-tighter sm:text-5xl md:text-6xl gradient-text"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {title}
          </motion.h1>

          <motion.p
            className="max-w-[700px] text-slate-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {description}
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-3 pt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Link href={primaryButtonLink}>
              <Button size="lg" className={`gradient-purple-blue gradient-purple-blue-hover ${styles.buttonHover}`}>
                {primaryButtonText}
              </Button>
            </Link>
            <Link href={secondaryButtonLink}>
              <Button
                size="lg"
                variant="outline"
                className="border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white"
              >
                {secondaryButtonText}
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
