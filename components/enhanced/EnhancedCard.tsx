"use client"

import type React from "react"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import type { LucideIcon } from "lucide-react"
import { motion } from "framer-motion"
import styles from "@/styles/modules/animations.module.css"

interface EnhancedCardProps {
  title: string
  description: string
  icon: LucideIcon
  iconColor?: string
  content?: React.ReactNode
  footer?: React.ReactNode
  delay?: number
}

export default function EnhancedCard({
  title,
  description,
  icon: Icon,
  iconColor = "text-purple-500",
  content,
  footer,
  delay = 0,
}: EnhancedCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: delay * 0.1 }}
      whileHover={{ y: -10, transition: { duration: 0.3 } }}
      className={`glow-effect ${styles.cardHover}`}
    >
      <Card className="h-full bg-[var(--bg-card)] border-slate-800 relative z-10">
        <CardHeader>
          <div className="flex items-center gap-3 mb-2">
            <div
              className={`h-10 w-10 rounded-md bg-${iconColor.split("-")[1]}-500/10 flex items-center justify-center ${styles.pulseAnimation}`}
            >
              <Icon className={`h-5 w-5 ${iconColor}`} />
            </div>
          </div>
          <CardTitle className="text-white">{title}</CardTitle>
          <CardDescription className="text-slate-400">{description}</CardDescription>
        </CardHeader>
        {content && <CardContent className="text-slate-300">{content}</CardContent>}
        {footer && <CardFooter>{footer}</CardFooter>}
      </Card>
    </motion.div>
  )
}
