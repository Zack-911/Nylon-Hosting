"use client"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Globe, Code, Database, Bot, CpuIcon as Gpu, Shield, Zap } from "lucide-react"
import Stars from "@/components/particles/Stars"
import GlowingOrbs from "@/components/particles/GlowingOrbs"
import styles from "@/styles/modules/animations.module.css"

interface EnhancedHeroProps {
  title: string
  description: string
  badgeText?: string
  primaryButtonText?: string
  secondaryButtonText?: string
  onPrimaryButtonClick?: () => void
  onSecondaryButtonClick?: () => void
  showDeploymentCard?: boolean
}

export default function EnhancedHero({
  title,
  description,
  badgeText = "All-in-One Hosting Platform",
  primaryButtonText = "Deploy Now",
  secondaryButtonText = "Explore Services",
  onPrimaryButtonClick,
  onSecondaryButtonClick,
  showDeploymentCard = true,
}: EnhancedHeroProps) {
  return (
    <section className="w-full py-4 md:py-8 lg:py-12 xl:py-20 relative overflow-hidden">
      <div className="container relative z-10 px-4 md:px-6">
      <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-10">
        <div className="flex flex-col justify-center space-y-4">
        <div className="space-y-2">
              <Badge
                className={`inline-flex bg-purple-500/10 text-purple-400 border-purple-500/20 mb-2}`}
              >
                {badgeText}
              </Badge>
              <h1
                className={`text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none gradient-text pd-3 ${styles.typingAnimation}`}
              >
                {title}
              </h1>
              <p className={`max-w-[600px] text-slate-400 md:text-xl`}>{description}</p>
            </div>
            <div
              className={`flex flex-col gap-2 min-[400px]:flex-row}`}
              style={{ animationDelay: "0.5s" }}
            >
              <Button
                size="lg"
                className={`gradient-purple-blue gradient-purple-blue-hover`}
                onClick={onPrimaryButtonClick}
              >
                {primaryButtonText}
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white"
                onClick={onSecondaryButtonClick}
              >
                {secondaryButtonText}
              </Button>
            </div>
            <div
              className={`flex items-center space-x-4 text-sm text-slate-400 mt-4}`}
              style={{ animationDelay: "0.8s" }}
            >
              <div className="flex items-center">
                <Shield className="mr-1 h-4 w-4 text-green-500" />
                <span>Secure</span>
              </div>
              <div className="flex items-center">
                <Zap className="mr-1 h-4 w-4 text-yellow-500" />
                <span>High-Performance</span>
              </div>
              <div className="flex items-center">
                <Globe className="mr-1 h-4 w-4 text-blue-500" />
                <span>Global Network</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
