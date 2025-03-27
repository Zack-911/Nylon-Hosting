"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Globe, Bot, Server, Check } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"

// Hosting plans data
const hostingPlans = {
  web: [
    {
      id: "web-free",
      name: "Free",
      description: "Free plan for those not fussed on domains",
      price: 0.0,
      features: [
        "1 Website",
        "5 GB SSD Storage",
        "Unmetered Bandwidth",
        "1 Database",
        "Daily Backups",
        "24/7 Support",
        "locked to 1 nylon owned subdomain",
      ],
      popular: false,
      type: "Tier I",
      cpu: "E5-2697 v2",
      ddr: "ddr3",
    },
    {
      id: "web-basic",
      name: "Basic",
      description: "Perfect for personal websites and blogs",
      price: 2.49,
      features: [
        "1 Website",
        "10 GB SSD Storage",
        "Unmetered Bandwidth",
        "Free SSL Certificate",
        "1 Database",
        "Daily Backups",
        "24/7 Support",
        "1 nylon owned subdomain",
      ],
      popular: false,
      type: "Tier II",
      cpu: "E5-2690 v4",
      ddr: "ddr4",
    },
    {
      id: "web-plus",
      name: "Plus",
      description: "Great for small businesses and growing websites",
      price: 4.99,
      features: [
        "10 Websites",
        "25 GB SSD Storage",
        "Unmetered Bandwidth",
        "Free SSL Certificates",
        "10 Databases",
        "Daily Backups",
        "Priority Support",
        "2 nylon owned subdomains",
      ],
      popular: true,
      type: "Tier II",
      cpu: "E5-2690 v4",
      ddr: "ddr4",
    },
    {
      id: "web-pro",
      name: "Pro",
      description: "Advanced hosting for high-traffic websites",
      price: 8.99,
      features: [
        "Unlimited Websites",
        "50 GB SSD Storage",
        "Unmetered Bandwidth",
        "Free SSL Certificates",
        "Unlimited Databases",
        "Daily Backups",
        "Priority Support",
        "Staging Environment",
        "Advanced Caching",
        "5 nylon owned subdomains",
      ],
      popular: false,
      type: "Tier II",
      cpu: "E5-2690 v4",
      ddr: "ddr4",
    },
  ],
  discord: [
      {
      id: "discord-1-free",
      name: "Free",
      description: "For testing and small development.",
      price: 0.0,
      features: [
        "1 Bot",
        "1 GB DDR3 RAM",
        "Shared CPU E5-2697 v2",
        "5 GB Storage",
        "Automatic Restarts",
        "16 Hours a Day Uptime",
        "Basic Dashboard",
      ],
      popular: false,
      type: "Tier I",
      cpu: "E5-2697 v2",
      ddr: "ddr3",
    },
    {
      id: "discord-1-basic",
      name: "Tier I Basic",
      description: "For testing and small development.",
      price: 1.99,
      features: [
        "1 Bot",
        "4 GB DDR3 RAM",
        "Shared CPU E5-2697 v2",
        "15 GB Storage",
        "Automatic Restarts",
        "16 Hours a Day Uptime",
        "Basic Dashboard",
      ],
      popular: false,
      type: "Tier I",
      cpu: "E5-2697 v2",
      ddr: "ddr3",
    },
    {
      id: "discord-2-basic",
      name: "Tier II Basic",
      description: "For small Discord bots with basic functionality",
      price: 2.99,
      features: [
        "1 Bot",
        "2 GB DDR4 RAM",
        "Shared CPU E5-2690 v4",
        "15 GB Storage",
        "Automatic Restarts",
        "24/7 Uptime",
        "Basic Dashboard",
      ],
      popular: false,
      type: "Tier II",
      cpu: "E5-2690 v4",
      ddr: "ddr4",
    },
    {
      id: "discord-2-standard",
      name: "Standard",
      description: "For medium-sized Discord bots with more features",
      price: 5.99,
      features: [
        "Unlimited Bots",
        "4 GB DDR4 RAM",
        "1 vCPU E5-2690 v4",
        "25 GB Storage",
        "Automatic Restarts",
        "24/7 Uptime",
        "Advanced Dashboard",
        "Priority Support",
      ],
      popular: true,
      type: "Tier II",
      cpu: "E5-2690 v4",
      ddr: "ddr4",
    },
    {
      id: "discord-2-premium",
      name: "Premium",
      description: "For large Discord bots with high resource needs",
      price: 9.99,
      features: [
        "Unlimited Bot",
        "4 GB DDR4 RAM",
        "2 vCPU E5-2690 v4",
        "50 GB Storage",
        "Automatic Restarts",
        "24/7 Uptime",
        "Advanced Dashboard",
        "Priority Support",
        "Dedicated Resources",
        "Custom Domain",
      ],
      popular: false,
      type: "Tier II",
      cpu: "E5-2690 v4",
      ddr: "ddr4",
    },
  ],
  vps: [
    {
      id: "vps-1-testbench",
      name: "Testbench VPS",
      description: "Small VPS best for testing purposes",
      price: 2.99,
      features: [
        "1 vCPU E5-2690 v4",
        "2 GB DDR4 RAM",
        "15 GB SSD Storage",
        "2 TB Bandwidth @ 2.5GiB",
        "1 IPv4 Address",
        "Linux/Windows",
        "Full Root Access",
        "24/7 Support",
        "Standard Dashboard",
        "Basic Dashboard",
      ],
      popular: false,
      type: "Tier II",
      cpu: "E5-2690 v4",
      ddr: "ddr4",
    },
    {
      id: "vps-2-starter",
      name: "Starter VPS",
      description: "Entry-level VPS for small applications",
      price: 4.99,
      features: [
        "1 vCPU E5-2690 v4",
        "2 GB DDR4 RAM",
        "30 GB SSD Storage",
        "2 TB Bandwidth @ 2.5GiB",
        "1 IPv4 Address",
        "Linux/Windows",
        "Full Root Access",
        "24/7 Support",
        "Advanced Dashboard",
        "Access to 3 Specalized Packages",
        "Basic Dashboard",
      ],
      popular: false,
      type: "Tier II",
      cpu: "E5-2690 v4",
      ddr: "ddr4",
    },
    {
      id: "vps-2-business",
      name: "Business VPS",
      description: "Balanced VPS for websites and applications",
      price: 9.99,
      features: [
        "2 vCPU E5-2690 v4",
        "4 GB RAM DDR4",
        "50 GB SSD Storage",
        "Unlimited Bandwidth @ 2.5GiB",
        "1 IPv4 Address",
        "1 IPv6 Address",
        "Linux/Windows",
        "Full Root Access",
        "Priority Support",
        "Advanced Dashboard",
        "Access to 3 Specalized Packages",
        "1 Backup",
      ],
      popular: true,
      type: "Tier II",
      cpu: "E5-2690 v4",
      ddr: "ddr4",
    },
    {
      id: "vps-2-premium",
      name: "Premium VPS",
      description: "High-performance VPS for demanding workloads",
      price: 14.99,
      features: [
        "4 vCPU E5-2690 v4",
        "8 GB DDR4 RAM",
        "100 GB SSD Storage",
        "Unlimited Bandwidth @ 2.5GiB",
        "1 IPv4 Address",
        "1 IPv6 Address",
        "Linux/Windows",
        "Full Root Access",
        "Priority Support",
        "Advanced Dashboard",
        "Access to 3 Specalized Packages",
        "2 Backup",
        "DDoS Protection",
      ],
      popular: false,
      type: "Tier II",
      cpu: "E5-2690 v4",
      ddr: "ddr4",
    },
    {
      id: "vps-2-deluxe",
      name: "Deluxe VPS",
      description: "High-performance VPS for demanding workloads",
      price: 18.99,
      features: [
        "6 vCPU E5-2690 v4",
        "16 GB DDR4 RAM",
        "150 GB SSD Storage",
        "Unlimited Bandwidth @ 2.5GiB",
        "1 IPv4 Address",
        "1 IPv6 Address",
        "Linux/Windows",
        "Full Root Access",
        "Priority Support",
        "Advanced Dashboard",
        "Access to 3 Specalized Packages",
        "3 Backup",
        "DDoS Protection",
      ],
      popular: false,
      type: "Tier II",
      cpu: "E5-2690 v4",
      ddr: "ddr4",
    },
    {
      id: "vps-1-testbench",
      name: "Testbench VPS (mid-end)",
      description: "Medium-performance VPS for demanding workloads",
      price: 2.14,
      features: [
        "1 vCPU E5-2697 v2",
        "4 GB DDR3 RAM",
        "15 GB SSD Storage",
        "1 Gbps @ Unmetered",
        "1 IPv4 Address",
        "Linux/Windows",
        "Full Root Access",
        "24/7 Support",
        "Standard Dashboard",
      ],
      popular: true,
      type: "Tier I",
      cpu: "E5-2697 v2",
      ddr: "ddr3",
    },
  ],
  minecraft: 
  [ 
    {
      id: "minecraft-dirt",
      name: "Dirt | 1GB",
      description: "Ideal for: Vanilla",
      price: 2.99,
      features: [
        "3+ Players",
        "E5-2690 v4",
        "1 GB DDR4 RAM",
        "30 GB SSD Storage",
        "1 Gbps @ Unmetered",
        "Linux/Windows",
        "24/7 Support",
        "Standard Dashboard",
      ],
      popular: false,
      type: "Tier II",
      cpu: "E5-2690 v4",
      ddr: "ddr4",
    },
    {
      id: "minecraft-dirt-budget",
      name: "Dirt (Budget) | 1GB",
      description: "Ideal for: Vanilla",
      price: 2.24,
      features: [
        "2+ Players",
        "E5-2697 v2",
        "1 GB DDR3 RAM",
        "25 GB SSD Storage",
        "1 Gbps @ Unmetered",
        "Linux/Windows",
        "24/7 Support",
        "Standard Dashboard",
      ],
      popular: false,
      type: "Tier I",
      cpu: "E5-2697 v2",
      ddr: "ddr3",
    },
    {
      id: "minecraft-stone",
      name: "Stone | 2GB",
      description: "Ideal for: Vanilla",
      price: 4.19,
      features: [
        "5+ Players",
        "E5-2690 v4",
        "2 GB DDR4 RAM",
        "50 GB SSD Storage",
        "1 Gbps @ Unmetered",
        "Linux/Windows",
        "24/7 Support",
        "Standard Dashboard",
      ],
      popular: true,
      type: "Tier II",
      cpu: "E5-2690 v4",
      ddr: "ddr4",
    },
    {
      id: "minecraft-stone-budget",
      name: "Stone (Budget) | 2GB",
      description: "Ideal for: Vanilla",
      price: 3.99,
      features: [
        "4+ Players",
        "E5-2697 v2",
        "2 GB DDR3 RAM",
        "40 GB SSD Storage",
        "1 Gbps @ Unmetered",
        "Linux/Windows",
        "24/7 Support",
        "Standard Dashboard",
      ],
      popular: false,
      type: "Tier I",
      cpu: "E5-2697 v2",
      ddr: "ddr3",
    },
    {
      id: "minecraft-iron",
      name: "Iron | 4GB",
      description: "Ideal for: Vanilla",
      price: 7.99,
      features: [
        "15+ Players",
        "E5-2690 v4",
        "4 GB DDR4 RAM",
        "75 GB SSD Storage",
        "1 Gbps @ Unmetered",
        "Linux/Windows",
        "24/7 Support",
        "Standard Dashboard",
      ],
      popular: true,
      type: "Tier II",
      cpu: "E5-2690 v4",
      ddr: "ddr4",
    },
    {
      id: "minecraft-iron-budget",
      name: "Iron (Budget) | 4GB",
      description: "Ideal for: Vanilla",
      price: 7.24,
      features: [
        "15+ Players",
        "E5-2697 v2",
        "4 GB DDR3 RAM",
        "70 GB SSD Storage",
        "1 Gbps @ Unmetered",
        "Linux/Windows",
        "24/7 Support",
        "Standard Dashboard",
      ],
      popular: false,
      type: "Tier I",
      cpu: "E5-2697 v2",
      ddr: "ddr3",
    },
  ],
}

export default function HostingPage() {
  const [hostingType, setHostingType] = useState("web")
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)
  const [billingCycle, setBillingCycle] = useState("monthly")

  // Calculate discount based on billing cycle
  const getDiscountedPrice = (basePrice: number) => {
    switch (billingCycle) {
      case "annually":
        return (basePrice * 12 * 0.8).toFixed(2) // 20% discount for annual
      case "quarterly":
        return (basePrice * 3 * 0.9).toFixed(2) // 10% discount for quarterly
      default:
        return basePrice.toFixed(2) // No discount for monthly
    }
  }

  // Get display price with billing period
  const getDisplayPrice = (basePrice: number) => {
    switch (billingCycle) {
      case "annually":
        return `$${getDiscountedPrice(basePrice)}/year`
      case "quarterly":
        return `$${getDiscountedPrice(basePrice)}/quarter`
      default:
        return `$${basePrice.toFixed(2)}/month`
    }
  }

  // Get monthly equivalent price for display
  const getMonthlyEquivalent = (basePrice: number) => {
    switch (billingCycle) {
      case "annually":
        return (basePrice * 0.8).toFixed(2) // 20% discount
      case "quarterly":
        return (basePrice * 0.9).toFixed(2) // 10% discount
      default:
        return basePrice.toFixed(2)
    }
  }

  // Get current plans based on hosting type
  const getCurrentPlans = () => {
    switch (hostingType) {
      case "discord":
        return hostingPlans.discord
      case "vps":
        return hostingPlans.vps
      default:
        return hostingPlans.web
    }
  }

  // Get icon based on hosting type
  const getHostingIcon = () => {
    switch (hostingType) {
      case "discord":
        return Bot
      case "vps":
        return Server
      default:
        return Globe
    }
  }

  const HostingIcon = getHostingIcon()

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 bg-[var(--bg-dark)] relative overflow-hidden">
          <div className="absolute inset-0 bg-linear-to-r from-purple-900/10 to-blue-900/10 opacity-30"></div>
          <div className="container relative z-10 px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-4 max-w-3xl mx-auto">
              <Badge className="bg-purple-500/10 text-purple-400 border-purple-500/20">
                Reliable Hosting Solutions
              </Badge>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl md:text-6xl gradient-text">
                Web & Application Hosting
              </h1>
              <p className="text-xl text-slate-400 max-w-[700px]">
                Fast, secure, and reliable hosting for your websites, Discord bots, and applications.
              </p>
            </div>
          </div>
        </section>

        {/* Hosting Types Section */}
        <section className="w-full py-12 md:py-16 bg-[#030305]">
          <div className="container px-4 md:px-6">
            <Tabs defaultValue={hostingType} onValueChange={setHostingType} className="w-full">
              <div className="flex justify-center mb-8">
                <TabsList className="grid w-full max-w-md grid-cols-3 bg-slate-800/50">
                  <TabsTrigger value="web">Web Hosting</TabsTrigger>
                  <TabsTrigger value="discord">Discord Bot</TabsTrigger>
                  <TabsTrigger value="vps">VPS</TabsTrigger>
                </TabsList>
              </div>

              <div className="flex justify-center mb-8">
                <RadioGroup
                  defaultValue={billingCycle}
                  onValueChange={setBillingCycle}
                  className="flex bg-slate-800/50 p-1 rounded-lg"
                >
                  <div className="flex items-center space-x-2 px-3 py-1.5 rounded-md cursor-pointer">
                    <RadioGroupItem value="monthly" id="monthly" className="sr-only" />
                    <Label
                      htmlFor="monthly"
                      className={`text-sm cursor-pointer ${
                        billingCycle === "monthly" ? "text-white font-medium" : "text-slate-400"
                      }`}
                    >
                      Monthly
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 px-3 py-1.5 rounded-md cursor-pointer">
                    <RadioGroupItem value="quarterly" id="quarterly" className="sr-only" />
                    <Label
                      htmlFor="quarterly"
                      className={`text-sm cursor-pointer ${
                        billingCycle === "quarterly" ? "text-white font-medium" : "text-slate-400"
                      }`}
                    >
                      Quarterly
                      <Badge className="ml-1.5 bg-green-500/20 text-green-400 text-xs">Save 10%</Badge>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 px-3 py-1.5 rounded-md cursor-pointer">
                    <RadioGroupItem value="annually" id="annually" className="sr-only" />
                    <Label
                      htmlFor="annually"
                      className={`text-sm cursor-pointer ${
                        billingCycle === "annually" ? "text-white font-medium" : "text-slate-400"
                      }`}
                    >
                      Annually
                      <Badge className="ml-1.5 bg-green-500/20 text-green-400 text-xs">Save 20%</Badge>
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <TabsContent value={hostingType} className="space-y-8">
                <div className="grid gap-6 md:grid-cols-3">
                  {getCurrentPlans().map((plan) => (
                    <Card
                      key={plan.id}
                      className={`bg-[var(--bg-card)] border-slate-800 relative ${
                        selectedPlan === plan.id ? "ring-2 ring-purple-500" : ""
                      }`}
                    >
                      {plan.popular && (
                        <div className="absolute -top-4 left-0 right-0 flex justify-center">
                          <Badge className="gradient-purple-blue text-white border-0">Most Popular</Badge>
                        </div>
                      )}
                      <CardHeader className="pb-4">
                        <div className="flex items-center mb-2">
                          <div className="h-10 w-10 rounded-md bg-purple-500/10 flex items-center justify-center mr-3">
                            <HostingIcon className="h-5 w-5 text-purple-400" />
                          </div>
                          <div>
                            <CardTitle className="text-white">{plan.name}</CardTitle>
                            <CardDescription className="text-slate-400">{plan.description}</CardDescription>
                          </div>
                        </div>
                        <div className="mt-2">
                          <div className="text-3xl font-bold text-white">{getDisplayPrice(plan.price)}</div>
                          {billingCycle !== "monthly" && (
                            <div className="text-sm text-slate-400">
                              ${getMonthlyEquivalent(plan.price)} per month, billed {billingCycle}
                            </div>
                          )}
                        </div>
                      </CardHeader>
                      <CardContent className="pb-4">
                        <ul className="space-y-2">
                          {plan.features.map((feature, index) => (
                            <li key={index} className="flex items-start">
                              <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                              <span className="text-slate-300 text-sm">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                      <CardFooter>
                        <Button
                          className="w-full gradient-purple-blue gradient-purple-blue-hover"
                          onClick={() => setSelectedPlan(plan.id)}
                        >
                          Select Plan
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Order Form Section (shows when a plan is selected) */}
        {selectedPlan && (
          <section className="w-full py-12 md:py-24 bg-[var(--bg-dark)]">
            <div className="container px-4 md:px-6">
              <div className="max-w-3xl mx-auto">
                <div className="flex flex-col items-center text-center space-y-4 mb-10">
                  <Badge className="bg-purple-500/10 text-purple-400 border-purple-500/20">Complete Your Order</Badge>
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl gradient-text">
                    Just a Few More Details
                  </h2>
                  <p className="text-lg text-slate-400 max-w-[700px]">
                    Fill out the information below to complete your order
                  </p>
                </div>

                <Card className="bg-[var(--bg-card)] border-slate-800">
                  <CardHeader>
                    <CardTitle className="text-white">Order Details</CardTitle>
                    <CardDescription className="text-slate-400">
                      You&apos;re ordering the {getCurrentPlans().find((p) => p.id === selectedPlan)?.name} plan with{" "}
                      {billingCycle} billing
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Domain Section (for web hosting) */}
                    {hostingType === "web" && (
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium text-white">Domain</h3>
                        <div className="space-y-4">
                          <RadioGroup defaultValue="use-existing" className="space-y-3">
                            <div className="flex items-start space-x-3">
                              <RadioGroupItem value="use-existing" id="use-existing" className="mt-1 text-purple-500" />
                              <div>
                                <Label htmlFor="use-existing" className="text-white">
                                  I&apos;ll use my existing domain
                                </Label>
                                <div className="mt-2">
                                  <Input
                                    placeholder="yourdomain.com"
                                    className="bg-[var(--bg-card)] border-slate-700 text-white focus-visible:ring-purple-500"
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="flex items-start space-x-3">
                              <RadioGroupItem value="register-new" id="register-new" className="mt-1 text-purple-500" />
                              <div>
                                <Label htmlFor="register-new" className="text-white">
                                  Register a FREE new domain
                                </Label>
                                <div className="mt-2 flex gap-2">
                                  <Input
                                    placeholder="mynewdomain"
                                    className="bg-[var(--bg-card)] border-slate-700 text-white focus-visible:ring-purple-500"
                                  />
                                  <Select defaultValue=".com">
                                    <SelectTrigger className="w-[100px] bg-[var(--bg-card)] border-slate-700 text-white">
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent className="bg-[var(--bg-card)] border-slate-700">
                                      <SelectItem value=".com">.nylonhosting.net</SelectItem>
                                      <SelectItem value=".net">.nylondevelopments.org</SelectItem>
                                      <SelectItem value=".org">.nylonstudios.org</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                              </div>
                            </div>
                          </RadioGroup>
                        </div>
                      </div>
                    )}

                    {/* Bot Details (for Discord hosting) */}
                    {hostingType === "discord" && (
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium text-white">Bot Details</h3>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="bot-name" className="text-slate-300">
                              Bot Name
                            </Label>
                            <Input
                              id="bot-name"
                              placeholder="My Awesome Bot"
                              className="bg-[var(--bg-card)] border-slate-700 text-white focus-visible:ring-purple-500"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="bot-language" className="text-slate-300">
                              Programming Language
                            </Label>
                            <Select defaultValue="nodejs">
                              <SelectTrigger
                                id="bot-language"
                                className="bg-[var(--bg-card)] border-slate-700 text-white"
                              >
                                <SelectValue placeholder="Select language" />
                              </SelectTrigger>
                              <SelectContent className="bg-[var(--bg-card)] border-slate-700">
                                <SelectItem value="nodejs">Node.js (Discord.js)</SelectItem>
                                <SelectItem value="python">Python (discord.py)</SelectItem>
                                <SelectItem value="java">Java (JDA)</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* VPS Details */}
                    {hostingType === "vps" && (
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium text-white">VPS Configuration</h3>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="vps-os" className="text-slate-300">
                              Operating System
                            </Label>
                            <Select defaultValue="ubuntu">
                              <SelectTrigger id="vps-os" className="bg-[var(--bg-card)] border-slate-700 text-white">
                                <SelectValue placeholder="Select OS" />
                              </SelectTrigger>
                              <SelectContent className="bg-[var(--bg-card)] border-slate-700">
                                <SelectItem value="ubuntu">Ubuntu 22.04 LTS</SelectItem>
                                <SelectItem value="debian">Debian 11</SelectItem>
                                <SelectItem value="centos">CentOS Stream 9</SelectItem>
                                <SelectItem value="windows">Windows Server 2022</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="vps-hostname" className="text-slate-300">
                              Hostname
                            </Label>
                            <Input
                              id="vps-hostname"
                              placeholder="my-server"
                              className="bg-[var(--bg-card)] border-slate-700 text-white focus-visible:ring-purple-500"
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    <Separator className="bg-slate-700" />

                    {/* Account Information */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium text-white">Account Information</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="first-name" className="text-slate-300">
                            First Name
                          </Label>
                          <Input
                            id="first-name"
                            className="bg-[var(--bg-card)] border-slate-700 text-white focus-visible:ring-purple-500"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="last-name" className="text-slate-300">
                            Last Name
                          </Label>
                          <Input
                            id="last-name"
                            className="bg-[var(--bg-card)] border-slate-700 text-white focus-visible:ring-purple-500"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-slate-300">
                          Email
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          className="bg-[var(--bg-card)] border-slate-700 text-white focus-visible:ring-purple-500"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="password" className="text-slate-300">
                          Password
                        </Label>
                        <Input
                          id="password"
                          type="password"
                          className="bg-[var(--bg-card)] border-slate-700 text-white focus-visible:ring-purple-500"
                        />
                      </div>
                    </div>

                    <Separator className="bg-slate-700" />

                    {/* Payment Information */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium text-white">Payment Information</h3>
                      <div className="space-y-2">
                        <Label htmlFor="card-number" className="text-slate-300">
                          Card Number
                        </Label>
                        <Input
                          id="card-number"
                          placeholder="1234 5678 9012 3456"
                          className="bg-[var(--bg-card)] border-slate-700 text-white focus-visible:ring-purple-500"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="expiry" className="text-slate-300">
                            Expiry Date
                          </Label>
                          <Input
                            id="expiry"
                            placeholder="MM/YY"
                            className="bg-[var(--bg-card)] border-slate-700 text-white focus-visible:ring-purple-500"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="cvc" className="text-slate-300">
                            CVC
                          </Label>
                          <Input
                            id="cvc"
                            placeholder="123"
                            className="bg-[var(--bg-card)] border-slate-700 text-white focus-visible:ring-purple-500"
                          />
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="save-card"
                          className="data-[state=checked]:bg-purple-500 data-[state=checked]:border-purple-500"
                        />
                        <Label htmlFor="save-card" className="text-slate-300">
                          Save card for future payments
                        </Label>
                      </div>
                    </div>

                    <Separator className="bg-slate-700" />

                    {/* Order Summary */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium text-white">Order Summary</h3>
                      <div className="bg-slate-800/50 rounded-lg p-4 space-y-2">
                        <div className="flex justify-between">
                          <span className="text-slate-300">
                            {getCurrentPlans().find((p) => p.id === selectedPlan)?.name} Plan ({billingCycle})
                          </span>
                          <span className="font-medium text-white">
                            ${getDiscountedPrice(getCurrentPlans().find((p) => p.id === selectedPlan)?.price || 0)}
                          </span>
                        </div>
                        {hostingType === "web" && (
                          <div className="flex justify-between">
                            <span className="text-slate-300">Domain Registration</span>
                            <span className="font-medium text-white">$12.99</span>
                          </div>
                        )}
                        <Separator className="my-2 bg-slate-700" />
                        <div className="flex justify-between">
                          <span className="text-white font-medium">Total</span>
                          <span className="font-bold text-white">
                            $
                            {(
                              Number.parseFloat(
                                getDiscountedPrice(getCurrentPlans().find((p) => p.id === selectedPlan)?.price || 0),
                              ) + (hostingType === "web" ? 12.99 : 0)
                            ).toFixed(2)}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="agree-terms"
                          className="data-[state=checked]:bg-purple-500 data-[state=checked]:border-purple-500"
                        />
                        <Label htmlFor="agree-terms" className="text-slate-300">
                          I agree to the Terms of Service and Privacy Policy
                        </Label>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex flex-col space-y-4">
                    <Button className="w-full gradient-purple-blue gradient-purple-blue-hover">
                      Complete Purchase
                    </Button>

                    <Button
                      variant="outline"
                      className="w-full border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white"
                      onClick={() => setSelectedPlan(null)}
                    >
                      Back to Plans
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </section>
        )}

        {/* Features Section */}
        <section className="w-full py-12 md:py-24 bg-[#030305]">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-4 mb-10">
              <Badge className="bg-purple-500/10 text-purple-400 border-purple-500/20">Why Choose Us</Badge>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl gradient-text">
                Hosting Features You&apos;ll Love
              </h2>
              <p className="text-lg text-slate-400 max-w-[700px]">
                Our hosting solutions come packed with features to ensure your online presence is fast, secure, and
                reliable.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  title: "99.9% Uptime Guarantee",
                  description:
                    "We guarantee 99.9% uptime for all our hosting services, ensuring your website or application is always available.",
                  icon: "⚡",
                },
                {
                  title: "24/7 Expert Support",
                  description:
                    "Our support team is available 24/7 to help you with any issues or questions you may have.",
                  icon: "🛟",
                },
                {
                  title: "Free SSL Certificates",
                  description:
                    "All hosting plans include free SSL certificates to keep your website secure and improve SEO rankings.",
                  icon: "🔒",
                },
                {
                  title: "Daily Backups",
                  description: "We perform daily backups of your data to ensure you never lose important information.",
                  icon: "💾",
                },
                {
                  title: "One-Click Installations",
                  description: "Install popular applications like WordPress, Joomla, and more with just one click.",
                  icon: "🚀",
                },
                {
                  title: "Global CDN",
                  description:
                    "Our global content delivery network ensures fast loading times for visitors from anywhere in the world.",
                  icon: "🌐",
                },
              ].map((feature, index) => (
                <Card key={index} className="bg-[var(--bg-card)] border-slate-800">
                  <CardHeader>
                    <div className="text-3xl mb-2">{feature.icon}</div>
                    <CardTitle className="text-white">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-300">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 bg-[var(--bg-dark)]">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-4 max-w-3xl mx-auto">
              <Badge className="bg-purple-500/10 text-purple-400 border-purple-500/20">Get Started Today</Badge>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl gradient-text">
                Ready to launch your project?
              </h2>
              <p className="text-lg text-slate-400 max-w-[700px]">
                Choose the hosting solution that fits your needs and deploy in minutes. No long-term commitments
                required.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Link href="#" onClick={() => window.scrollTo(0, 0)}>
                  <Button size="lg" className="gradient-purple-blue gradient-purple-blue-hover">
                    View All Plans
                  </Button>
                </Link>
                <Link href="/support">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white"
                  >
                    Contact Sales
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

