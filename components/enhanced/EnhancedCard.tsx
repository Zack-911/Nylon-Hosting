"use client"

import type React from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { LucideIcon } from "lucide-react"
import styles from "@/styles/modules/animations.module.css"

interface EnhancedCardProps {
  title: string
  description?: string
  icon?: LucideIcon
  iconColor?: string
  content?: React.ReactNode
  footer?: React.ReactNode
  badge?: string
  badgeVariant?: "default" | "popular" | "premium" | "value"
  buttonText?: string
  buttonVariant?: "default" | "outline" | "ghost"
  onClick?: () => void
  animationDelay?: string
  className?: string
  dataAos?: string
}

export default function EnhancedCard({
  title,
  description,
  icon: Icon,
  iconColor = "text-purple-500",
  content,
  footer,
  badge,
  badgeVariant = "default",
  buttonText,
  buttonVariant = "default",
  onClick,
  animationDelay = "0s",
  className = "",
  dataAos = "fade-up",
}: EnhancedCardProps) {
  const getBadgeClass = () => {
    switch (badgeVariant) {
      case "popular":
        return "gradient-purple-blue text-white border-0"
      case "premium":
        return "bg-purple-600 text-white border-0"
      case "value":
        return "bg-green-600 text-white border-0"
      default:
        return "bg-slate-800/50 text-slate-400 border-slate-700"
    }
  }

  const getButtonClass = () => {
    switch (buttonVariant) {
      case "outline":
        return "border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white"
      case "ghost":
        return "text-slate-400 hover:text-white hover:bg-slate-800/30"
      default:
        return "gradient-purple-blue gradient-purple-blue-hover"
    }
  }

  return (
    <Card
      className={`bg-[var(--bg-card)] border-slate-800 ${styles.cardHover} ${className}`}
      data-aos={dataAos}
      style={{ animationDelay }}
    >
      <CardHeader>
        {Icon && (
          <div
            className={`h-10 w-10 rounded-md bg-purple-500/10 flex items-center justify-center mb-2 ${styles.pulseAnimation}`}
          >
            <Icon className={`h-5 w-5 ${iconColor}`} />
          </div>
        )}
        {badge && <Badge className={getBadgeClass()}>{badge}</Badge>}
        <CardTitle className="text-white">{title}</CardTitle>
        {description && <CardDescription className="text-slate-400">{description}</CardDescription>}
      </CardHeader>
      {content && <CardContent>{content}</CardContent>}
      {(footer || buttonText) && (
        <CardFooter>
          {footer || (
            <Button className={`w-full ${getButtonClass()}`} onClick={onClick}>
              {buttonText}
            </Button>
          )}
        </CardFooter>
      )}
    </Card>
  )
}

