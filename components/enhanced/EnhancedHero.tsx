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
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 relative overflow-hidden">
      {/* Background effects */}
      <Stars count={150} />
      <GlowingOrbs count={5} />

      <div className="container relative z-10 px- md:px-2">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12">
          <div className="flex flex-col justify-center space-y-4" data-aos="fade-right">
            <div className="space-y-2">
              <Badge
                className={`inline-flex bg-purple-500/10 text-purple-400 border-purple-500/20 mb-2 ${styles.fadeIn}`}
              >
                {badgeText}
              </Badge>
              <h1
                className={`text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none gradient-text pd-3 ${styles.typingAnimation}`}
              >
                {title}
              </h1>
              <p className={`max-w-[600px] text-slate-400 md:text-xl ${styles.fadeInSlow}`}>{description}</p>
            </div>
            <div
              className={`flex flex-col gap-2 min-[400px]:flex-row ${styles.fadeIn}`}
              style={{ animationDelay: "0.5s" }}
            >
              <Button
                size="lg"
                className={`gradient-purple-blue gradient-purple-blue-hover ${styles.pulseAnimation}`}
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
              className={`flex items-center space-x-4 text-sm text-slate-400 mt-4 ${styles.fadeIn}`}
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

          {showDeploymentCard && (
            <div
              className={`relative flex items-center justify-center glow-effect ${styles.floatingAnimation}`}
              data-aos="fade-left"
            >
              <Card
                className={`w-full bg-[var(--bg-card)]/70 border-slate-800 backdrop-blur-xs relative z-10 ${styles.cardHover}`}
              >
                <Tabs defaultValue="website" className="w-full">
                  <TabsList className="grid w-full grid-cols-3 bg-slate-800/50">
                    <TabsTrigger value="website">Website</TabsTrigger>
                    <TabsTrigger value="bot">Discord Bot</TabsTrigger>
                    <TabsTrigger value="gpu">GPU</TabsTrigger>
                  </TabsList>
                  <TabsContent value="website" className="space-y-4 mt-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Globe className="h-5 w-5 text-blue-500 mr-2" />
                          <span className="text-white">Static Site</span>
                        </div>
                        <Badge className="bg-green-500/20 text-green-400 hover:bg-green-500/30">Free Tier</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Code className="h-5 w-5 text-purple-500 mr-2" />
                          <span className="text-white">Next.js App</span>
                        </div>
                        <Badge className="bg-blue-500/20 text-blue-400 hover:bg-blue-500/30">Popular</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Database className="h-5 w-5 text-yellow-500 mr-2" />
                          <span className="text-white">Full-Stack App</span>
                        </div>
                        <Badge className="bg-purple-500/20 text-purple-400 hover:bg-purple-500/30">Pro</Badge>
                      </div>
                    </div>
                    <Button className="w-full gradient-purple-blue gradient-purple-blue-hover">Deploy Website</Button>
                  </TabsContent>
                  <TabsContent value="bot" className="space-y-4 mt-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Bot className="h-5 w-5 text-indigo-500 mr-2" />
                          <span className="text-white">Discord.js Bot</span>
                        </div>
                        <Badge className="bg-green-500/20 text-green-400 hover:bg-green-500/30">Starter</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Bot className="h-5 w-5 text-indigo-500 mr-2" />
                          <span className="text-white">Python Bot</span>
                        </div>
                        <Badge className="bg-blue-500/20 text-blue-400 hover:bg-blue-500/30">Popular</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Bot className="h-5 w-5 text-indigo-500 mr-2" />
                          <span className="text-white">Custom Bot</span>
                        </div>
                        <Badge className="bg-purple-500/20 text-purple-400 hover:bg-purple-500/30">Pro</Badge>
                      </div>
                    </div>
                    <Button className="w-full gradient-purple-blue gradient-purple-blue-hover">Deploy Bot</Button>
                  </TabsContent>
                  <TabsContent value="gpu" className="space-y-4 mt-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Gpu className="h-5 w-5 text-purple-500 mr-2" />
                          <span className="text-white">RTX 4090</span>
                        </div>
                        <Badge className="bg-green-500/20 text-green-400 hover:bg-green-500/30">Available</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Gpu className="h-5 w-5 text-purple-500 mr-2" />
                          <span className="text-white">A100 80GB</span>
                        </div>
                        <Badge className="bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30">Limited</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Gpu className="h-5 w-5 text-purple-500 mr-2" />
                          <span className="text-white">H100</span>
                        </div>
                        <Badge className="bg-blue-500/20 text-blue-400 hover:bg-blue-500/30">Premium</Badge>
                      </div>
                    </div>
                    <Button className="w-full gradient-purple-blue gradient-purple-blue-hover">Rent GPU</Button>
                  </TabsContent>
                </Tabs>
              </Card>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

