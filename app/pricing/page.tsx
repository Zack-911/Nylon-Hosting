"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CpuIcon as Gpu, MemoryStickIcon as Memory, HardDrive, Zap, Check, Bot, Server, Globe } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import Link from "next/link"

// Import the new filter components
import FilterableServicesGrid from "@/components/enhanced/FilterableServicesGrid"

// Define types for our data structures
interface GPUProduct {
  id: string
  name: string
  memory: string
  cores: string
  bandwidth: string
  tdp: string
  architecture: string
  bestFor: string[]
  image: string
  pricing: {
    hourly: number
    daily: number
    monthly: number
  }
  availability: string
  popular?: boolean
  premium?: boolean
  value?: boolean
  enterprise?: boolean
  professional?: boolean
  reliable?: boolean
  category: string
  hashrate?: string
  efficiency?: string
}

interface ServiceProduct {
  id: string
  name: string
  icon: React.ElementType
  iconColor?: string
  description: string
  features: string[]
  pricing: {
    monthly: number
  }
  availability: string
  popular?: boolean
  category: string
  specs: {
    ram?: string
    cpu?: string
    storage?: string
    bandwidth?: string
    os?: string[]
    botType?: string[]
  }
  tags: string[]
}

// Type guard functions to check product types
function isGPUProduct(product: Product): product is GPUProduct {
  return "cores" in product && "memory" in product
}

function isServiceProduct(product: Product): product is ServiceProduct {
  return "icon" in product && "features" in product
}

// Union type for all product types
type Product = GPUProduct | ServiceProduct

// GPU data
const gpus = [
  {
    id: "rtx-4090",
    name: "NVIDIA RTX 4090",
    memory: "24GB GDDR6X",
    cores: "16,384 CUDA Cores",
    bandwidth: "1,008 GB/s",
    tdp: "450W",
    architecture: "Ada Lovelace",
    bestFor: ["AI Training", "Rendering", "Gaming"],
    image: "/placeholder.svg?height=300&width=400",
    pricing: {
      hourly: 1.2,
      daily: 25.0,
      monthly: 650.0,
    },
    availability: "High",
    popular: true,
    category: "general",
  },
  {
    id: "a100-80gb",
    name: "NVIDIA A100",
    memory: "80GB HBM2e",
    cores: "6,912 CUDA Cores",
    bandwidth: "2,039 GB/s",
    tdp: "400W",
    architecture: "Ampere",
    bestFor: ["AI Research", "HPC", "Data Science"],
    image: "/placeholder.svg?height=300&width=400",
    pricing: {
      hourly: 3.5,
      daily: 75.0,
      monthly: 1950.0,
    },
    availability: "Limited",
    enterprise: true,
    category: "general",
  },
  {
    id: "rtx-3090",
    name: "NVIDIA RTX 3090",
    memory: "24GB GDDR6X",
    cores: "10,496 CUDA Cores",
    bandwidth: "936 GB/s",
    tdp: "350W",
    architecture: "Ampere",
    bestFor: ["3D Rendering", "Gaming", "ML Development"],
    image: "/placeholder.svg?height=300&width=400",
    pricing: {
      hourly: 0.8,
      daily: 18.0,
      monthly: 450.0,
    },
    availability: "High",
    value: true,
    category: "general",
  },
  {
    id: "h100-80gb",
    name: "NVIDIA H100",
    memory: "80GB HBM3",
    cores: "16,896 CUDA Cores",
    bandwidth: "3,350 GB/s",
    tdp: "700W",
    architecture: "Hopper",
    bestFor: ["Large AI Models", "HPC", "Research"],
    image: "/placeholder.svg?height=300&width=400",
    pricing: {
      hourly: 4.2,
      daily: 90.0,
      monthly: 2400.0,
    },
    availability: "Very Limited",
    premium: true,
    category: "general",
  },
  {
    id: "rtx-4080",
    name: "NVIDIA RTX 4080",
    memory: "16GB GDDR6X",
    cores: "9,728 CUDA Cores",
    bandwidth: "716 GB/s",
    tdp: "320W",
    architecture: "Ada Lovelace",
    bestFor: ["Gaming", "Content Creation", "ML Inference"],
    image: "/placeholder.svg?height=300&width=400",
    pricing: {
      hourly: 0.95,
      daily: 20.0,
      monthly: 520.0,
    },
    availability: "High",
    reliable: true,
    category: "general",
  },
  {
    id: "a6000",
    name: "NVIDIA A6000",
    memory: "48GB GDDR6",
    cores: "10,752 CUDA Cores",
    bandwidth: "768 GB/s",
    tdp: "300W",
    architecture: "Ampere",
    bestFor: ["Professional Visualization", "AI", "Rendering"],
    image: "/placeholder.svg?height=300&width=400",
    pricing: {
      hourly: 2.1,
      daily: 45.0,
      monthly: 1200.0,
    },
    availability: "Medium",
    professional: true,
    category: "general",
  },
  {
    id: "rtx-a5000",
    name: "NVIDIA RTX A5000",
    memory: "24GB GDDR6",
    cores: "8,192 CUDA Cores",
    bandwidth: "768 GB/s",
    tdp: "230W",
    architecture: "Ampere",
    bestFor: ["Professional Visualization", "CAD", "3D Modeling"],
    image: "/placeholder.svg?height=300&width=400",
    pricing: {
      hourly: 1.5,
      daily: 32.0,
      monthly: 850.0,
    },
    availability: "Medium",
    category: "general",
  },
  {
    id: "amd-mi250",
    name: "AMD Instinct MI250",
    memory: "128GB HBM2e",
    cores: "13,312 Stream Processors",
    bandwidth: "3,276 GB/s",
    tdp: "560W",
    architecture: "CDNA 2",
    bestFor: ["HPC", "Scientific Computing", "ML Research"],
    image: "/placeholder.svg?height=300&width=400",
    pricing: {
      hourly: 3.8,
      daily: 85.0,
      monthly: 2200.0,
    },
    availability: "Limited",
    category: "general",
  },
  // Mining-optimized GPUs
  {
    id: "mining-rtx-3080",
    name: "NVIDIA RTX 3080 (Mining)",
    memory: "10GB GDDR6X",
    cores: "8,704 CUDA Cores",
    bandwidth: "760 GB/s",
    tdp: "320W",
    architecture: "Ampere",
    bestFor: ["Ethereum Mining", "Cryptocurrency", "Mining Farms"],
    image: "/placeholder.svg?height=300&width=400",
    pricing: {
      hourly: 0.0845,
      daily: 2.028,
      monthly: 56.784,
    },
    availability: "High",
    hashrate: "100 MH/s (ETH)",
    efficiency: "0.31 MH/W",
    category: "mining",
  },
  {
    id: "mining-rtx-3090",
    name: "NVIDIA RTX 3090 (Mining)",
    memory: "24GB GDDR6X",
    cores: "10,496 CUDA Cores",
    bandwidth: "936 GB/s",
    tdp: "350W",
    architecture: "Ampere",
    bestFor: ["Ethereum Mining", "Cryptocurrency", "Mining Farms"],
    image: "/placeholder.svg?height=300&width=400",
    pricing: {
      hourly: 0.11375,
      daily: 2.73,
      monthly: 76.44,
    },
    availability: "High",
    hashrate: "125 MH/s (ETH)",
    efficiency: "0.36 MH/W",
    category: "mining",
  },
  {
    id: "mining-a4000",
    name: "NVIDIA A4000 (Mining)",
    memory: "16GB GDDR6",
    cores: "6,144 CUDA Cores",
    bandwidth: "448 GB/s",
    tdp: "140W",
    architecture: "Ampere",
    bestFor: ["Efficient Mining", "Cryptocurrency", "Low Power"],
    image: "/placeholder.svg?height=300&width=400",
    pricing: {
      hourly: 0.65,
      daily: 14.0,
      monthly: 380.0,
    },
    availability: "Medium",
    hashrate: "65 MH/s (ETH)",
    efficiency: "0.46 MH/W",
    category: "mining",
    value: true,
  },
  {
    id: "mining-cmp-170hx",
    name: "NVIDIA CMP 170HX",
    memory: "8GB HBM2e",
    cores: "4,480 CUDA Cores",
    bandwidth: "1,493 GB/s",
    tdp: "250W",
    architecture: "Ampere",
    bestFor: ["Professional Mining", "Cryptocurrency", "Mining Farms"],
    image: "/placeholder.svg?height=300&width=400",
    pricing: {
      hourly: 1.1,
      daily: 24.0,
      monthly: 580.0,
    },
    availability: "Limited",
    hashrate: "164 MH/s (ETH)",
    efficiency: "0.66 MH/W",
    category: "mining",
    premium: true,
  },
]

// Other services data
const otherServices = [
  {
    id: "discord-bot-basic",
    name: "Discord Bot Hosting - Basic",
    icon: Bot,
    iconColor: "text-indigo-500",
    description: "24/7 uptime for your Discord bot with automatic restarts",
    features: ["1 GB RAM", "Shared CPU", "10 GB Storage", "Unlimited Traffic", "Automatic Restarts"],
    pricing: {
      monthly: 5.99,
    },
    availability: "High",
    category: "discord",
    specs: {
      ram: "1 GB",
      cpu: "Shared CPU",
      storage: "10 GB",
      bandwidth: "Unlimited",
      botType: ["Discord"],
    },
    tags: ["restart"],
  },
  {
    id: "discord-bot-standard",
    name: "Discord Bot Hosting - Standard",
    icon: Bot,
    iconColor: "text-indigo-500",
    description: "Enhanced resources for medium-sized Discord bots",
    features: ["2 GB RAM", "1 vCPU", "20 GB Storage", "Unlimited Traffic", "Priority Support"],
    pricing: {
      monthly: 9.99,
    },
    availability: "High",
    popular: true,
    category: "discord",
    specs: {
      ram: "2 GB",
      cpu: "1 vCPU",
      storage: "20 GB",
      bandwidth: "Unlimited",
      botType: ["Discord"],
    },
    tags: ["restart", "monitoring", "priority"],
  },
  {
    id: "discord-bot-premium",
    name: "Discord Bot Hosting - Premium",
    icon: Bot,
    iconColor: "text-indigo-500",
    description: "High-performance hosting for large Discord bots",
    features: ["4 GB RAM", "2 vCPU", "40 GB Storage", "Unlimited Traffic", "24/7 Support"],
    pricing: {
      monthly: 19.99,
    },
    availability: "High",
    category: "discord",
    specs: {
      ram: "4 GB",
      cpu: "2 vCPU",
      storage: "40 GB",
      bandwidth: "Unlimited",
      botType: ["Discord"],
    },
    tags: ["restart", "monitoring", "scaling", "priority", "db"],
  },
  {
    id: "telegram-bot-standard",
    name: "Telegram Bot Hosting",
    icon: Bot,
    iconColor: "text-blue-500",
    description: "Reliable hosting for Telegram bots",
    features: ["2 GB RAM", "1 vCPU", "20 GB Storage", "Unlimited Traffic", "API Webhook Support"],
    pricing: {
      monthly: 11.99,
    },
    availability: "High",
    category: "discord",
    specs: {
      ram: "2 GB",
      cpu: "1 vCPU",
      storage: "20 GB",
      bandwidth: "Unlimited",
      botType: ["Telegram"],
    },
    tags: ["restart", "monitoring"],
  },
  {
    id: "game-server-minecraft",
    name: "Minecraft Server",
    icon: Server,
    iconColor: "text-green-500",
    description: "Dedicated Minecraft server with easy setup",
    features: ["4 GB RAM", "2 vCPU", "50 GB SSD", "Up to 50 Players", "One-Click Mods"],
    pricing: {
      monthly: 14.99,
    },
    availability: "High",
    category: "game",
    specs: {
      ram: "4 GB",
      cpu: "2 vCPU",
      storage: "50 GB",
      bandwidth: "2 TB",
    },
    tags: ["backup", "snapshot"],
  },
  {
    id: "game-server-valheim",
    name: "Valheim Server",
    icon: Server,
    iconColor: "text-green-500",
    description: "Host your Valheim world with friends",
    features: ["6 GB RAM", "2 vCPU", "100 GB SSD", "Up to 20 Players", "Automatic Backups"],
    pricing: {
      monthly: 19.99,
    },
    availability: "High",
    category: "game",
    specs: {
      ram: "6 GB",
      cpu: "2 vCPU",
      storage: "100 GB",
      bandwidth: "5 TB",
    },
    tags: ["backup", "snapshot"],
  },
  {
    id: "vps-basic",
    name: "VPS - Basic",
    icon: Server,
    iconColor: "text-blue-500",
    description: "General purpose virtual private server",
    features: ["2 GB RAM", "1 vCPU", "50 GB SSD", "2 TB Traffic", "Linux/Windows"],
    pricing: {
      monthly: 10.99,
    },
    availability: "High",
    category: "vps",
    specs: {
      ram: "2 GB",
      cpu: "1 vCPU",
      storage: "50 GB",
      bandwidth: "2 TB",
      os: ["Linux", "Windows"],
    },
    tags: ["ssd"],
  },
  {
    id: "vps-standard",
    name: "VPS - Standard",
    icon: Server,
    iconColor: "text-blue-500",
    description: "Enhanced VPS for websites and applications",
    features: ["4 GB RAM", "2 vCPU", "80 GB SSD", "4 TB Traffic", "Linux/Windows"],
    pricing: {
      monthly: 19.99,
    },
    availability: "High",
    popular: true,
    category: "vps",
    specs: {
      ram: "4 GB",
      cpu: "2 vCPU",
      storage: "80 GB",
      bandwidth: "4 TB",
      os: ["Linux", "Windows"],
    },
    tags: ["ssd", "backup", "ddos"],
  },
  {
    id: "vps-premium",
    name: "VPS - Premium",
    icon: Server,
    iconColor: "text-blue-500",
    description: "High-performance VPS with dedicated resources",
    features: ["8 GB RAM", "4 vCPU", "160 GB SSD", "8 TB Traffic", "Premium Support"],
    pricing: {
      monthly: 39.99,
    },
    availability: "Medium",
    category: "vps",
    specs: {
      ram: "8 GB",
      cpu: "4 vCPU",
      storage: "160 GB",
      bandwidth: "8 TB",
      os: ["Linux", "Windows"],
    },
    tags: ["ssd", "backup", "ddos", "ipv6", "snapshot"],
  },
  {
    id: "web-hosting-basic",
    name: "Web Hosting - Basic",
    icon: Globe,
    iconColor: "text-cyan-500",
    description: "Affordable hosting for personal websites",
    features: ["10 GB Storage", "Unlimited Bandwidth", "5 Databases", "Free SSL", "24/7 Support"],
    pricing: {
      monthly: 4.99,
    },
    availability: "High",
    category: "web",
    specs: {
      storage: "10 GB",
      bandwidth: "Unlimited",
    },
    tags: ["ssl"],
  },
  {
    id: "web-hosting-plus",
    name: "Web Hosting - Plus",
    icon: Globe,
    iconColor: "text-cyan-500",
    description: "Ideal for small business websites",
    features: ["25 GB Storage", "Unlimited Bandwidth", "10 Databases", "Free SSL", "Email Accounts"],
    pricing: {
      monthly: 9.99,
    },
    availability: "High",
    popular: true,
    category: "web",
    specs: {
      storage: "25 GB",
      bandwidth: "Unlimited",
    },
    tags: ["ssl", "cpanel", "email"],
  },
  {
    id: "web-hosting-business",
    name: "Web Hosting - Business",
    icon: Globe,
    iconColor: "text-cyan-500",
    description: "Advanced hosting for high-traffic websites",
    features: ["100 GB Storage", "Unlimited Bandwidth", "Unlimited Databases", "Free SSL", "CDN Integration"],
    pricing: {
      monthly: 19.99,
    },
    availability: "High",
    category: "web",
    specs: {
      storage: "100 GB",
      bandwidth: "Unlimited",
    },
    tags: ["ssl", "cpanel", "email", "subdomain", "cdn"],
  },
]

// Pricing plans
const pricingPlans = [
  {
    name: "Pay-as-you-go",
    description: "Perfect for occasional use and testing",
    features: ["No minimum commitment", "Billed by the hour", "Access to all GPU types", "Standard support"],
    highlighted: false,
  },
  {
    name: "Reserved Instances",
    description: "Ideal for regular, predictable workloads",
    features: [
      "Up to 40% discount on hourly rates",
      "1-month or 3-month commitments",
      "Priority access to high-demand GPUs",
      "Priority support",
    ],
    highlighted: true,
  },
  {
    name: "Enterprise",
    description: "For organizations with advanced needs",
    features: [
      "Custom pricing based on volume",
      "Dedicated hardware options",
      "SLA guarantees",
      "24/7 dedicated support",
      "Custom integration assistance",
    ],
    highlighted: false,
  },
]

export default function PricingPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [pricingView, setPricingView] = useState<string>("hourly")
  const [sortOption, setSortOption] = useState<string>("availability")

  // Filter GPUs based on selected category
  const filteredProducts = (): Product[] => {
    if (selectedCategory === "all") {
      return gpus.filter((gpu) => gpu.category === "general") as Product[]
    } else if (selectedCategory === "mining") {
      return gpus.filter((gpu) => gpu.category === "mining") as Product[]
    } else if (selectedCategory === "other") {
      return otherServices as Product[]
    }
    return []
  }

  // Sort products based on selected option
  const sortedProducts = (): Product[] => {
    const products = filteredProducts()

    switch (sortOption) {
      case "price-low":
        return [...products].sort((a, b) => {
          const aPrice = isGPUProduct(a)
            ? pricingView === "hourly"
              ? a.pricing.hourly
              : pricingView === "daily"
                ? a.pricing.daily
                : a.pricing.monthly
            : isServiceProduct(a) && a.pricing
              ? a.pricing.monthly
              : 0
          const bPrice = isGPUProduct(b)
            ? pricingView === "hourly"
              ? b.pricing.hourly
              : pricingView === "daily"
                ? b.pricing.daily
                : b.pricing.monthly
            : isServiceProduct(b) && b.pricing
              ? b.pricing.monthly
              : 0
          return aPrice - bPrice
        })
      case "price-high":
        return [...products].sort((a, b) => {
          const aPrice = isGPUProduct(a)
            ? pricingView === "hourly"
              ? a.pricing.hourly
              : pricingView === "daily"
                ? a.pricing.daily
                : a.pricing.monthly
            : isServiceProduct(a) && a.pricing
              ? a.pricing.monthly
              : 0
          const bPrice = isGPUProduct(b)
            ? pricingView === "hourly"
              ? b.pricing.hourly
              : pricingView === "daily"
                ? b.pricing.daily
                : b.pricing.monthly
            : isServiceProduct(b) && b.pricing
              ? b.pricing.monthly
              : 0
          return bPrice - aPrice
        })
      case "memory":
        return [...products].sort((a, b) => {
          if (!isGPUProduct(a) || !isGPUProduct(b)) return 0
          // Extract memory size from the memory string (e.g., "24GB GDDR6X" -> 24)
          const getMemorySize = (item: GPUProduct) => {
            if (!item.memory) return 0
            const match = item.memory.match(/(\d+)GB/)
            return match ? Number.parseInt(match[1], 10) : 0
          }
          return getMemorySize(b) - getMemorySize(a)
        })
      case "performance":
        return [...products].sort((a, b) => {
          // For GPUs, we'll use cores as a rough performance indicator
          const getPerformanceScore = (item: Product) => {
            if (isGPUProduct(item) && item.cores) {
              const match = item.cores.match(/(\d+,?\d*)/)
              return match ? Number.parseInt(match[1].replace(",", ""), 10) : 0
            }
            // For other services, use pricing as a proxy for performance
            return isServiceProduct(item) && item.pricing ? item.pricing.monthly : 0
          }
          return getPerformanceScore(b) - getPerformanceScore(a)
        })
      case "efficiency":
        return [...products].sort((a, b) => {
          // For mining GPUs, use efficiency
          if (isGPUProduct(a) && isGPUProduct(b) && a.efficiency && b.efficiency) {
            const aEff = Number.parseFloat(a.efficiency.split(" ")[0])
            const bEff = Number.parseFloat(b.efficiency.split(" ")[0])
            return bEff - aEff
          }
          return 0
        })
      case "popular":
        return [...products].sort((a, b) => {
          const aPopular = a.popular ? 1 : 0
          const bPopular = b.popular ? 1 : 0
          return bPopular - aPopular
        })
      case "availability":
      default:
        return [...products].sort((a, b) => {
          const availabilityOrder = { High: 0, Medium: 1, Limited: 2, "Very Limited": 3 }
          const aAvail = availabilityOrder[a.availability as keyof typeof availabilityOrder] || 0
          const bAvail = availabilityOrder[b.availability as keyof typeof availabilityOrder] || 0
          return aAvail - bAvail
        })
    }
  }

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
                High-Performance Computing
              </Badge>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl md:text-6xl gradient-text">
                Products & Pricing
              </h1>
              <p className="text-xl text-slate-400 max-w-[700px]">
                Access the latest hardware with flexible pricing options to fit your computational needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Link href="/buy">
                  <Button size="lg" className="gradient-purple-blue gradient-purple-blue-hover">
                    Deploy Now
                  </Button>
                </Link>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white"
                >
                  Compare Specifications
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Plans Section */}
        <section className="w-full py-12 md:py-16 bg-[#030305]">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-4 mb-10">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl gradient-text">Flexible Pricing Plans</h2>
              <p className="text-lg text-slate-400 max-w-[700px]">
                Choose the pricing model that works best for your needs, from hourly rentals to long-term commitments.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {pricingPlans.map((plan, index) => (
                <Card
                  key={index}
                  className={`${plan.highlighted ? "card-gradient border-purple-500/20 relative" : "bg-[var(--bg-card)] border-slate-800"}`}
                >
                  {plan.highlighted && (
                    <div className="absolute -top-4 left-0 right-0 flex justify-center">
                      <Badge className="gradient-purple-blue text-white border-0">Most Popular</Badge>
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle className="text-white">{plan.name}</CardTitle>
                    <CardDescription className="text-slate-400">{plan.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="text-slate-300">
                    <ul className="space-y-2 text-sm">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-start">
                          <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full gradient-purple-blue gradient-purple-blue-hover">
                      {plan.highlighted ? "Get Started" : "Learn More"}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Products Section */}
        <section className="w-full py-12 md:py-24 bg-[var(--bg-dark)]">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-4 mb-10">
              <Badge className="bg-purple-500/10 text-purple-400 border-purple-500/20">Product Selection</Badge>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl gradient-text">Available Products</h2>
              <p className="text-lg text-slate-400 max-w-[700px]">
                Browse our selection of high-performance hardware and services
              </p>
            </div>

            {/* Category Selection */}
            <div className="flex justify-center mb-8">
              <div className="inline-flex bg-slate-800/50 rounded-lg p-1">
                <Button
                  variant={selectedCategory === "all" ? "default" : "ghost"}
                  className={selectedCategory === "all" ? "gradient-purple-blue text-white" : "text-slate-400"}
                  onClick={() => setSelectedCategory("all")}
                >
                  <Gpu className="mr-2 h-4 w-4" />
                  All GPUs
                </Button>
                <Button
                  variant={selectedCategory === "mining" ? "default" : "ghost"}
                  className={selectedCategory === "mining" ? "gradient-purple-blue text-white" : "text-slate-400"}
                  onClick={() => setSelectedCategory("mining")}
                >
                  <Zap className="mr-2 h-4 w-4" />
                  Mining GPUs
                </Button>
                <Button
                  variant={selectedCategory === "other" ? "default" : "ghost"}
                  className={selectedCategory === "other" ? "gradient-purple-blue text-white" : "text-slate-400"}
                  onClick={() => setSelectedCategory("other")}
                >
                  <Server className="mr-2 h-4 w-4" />
                  Other Services
                </Button>
              </div>
            </div>

            {selectedCategory !== "other" ? (
              <>
                {/* Filtering and Sorting Controls for GPUs */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
                  <div className="flex gap-3 w-full md:w-auto">
                    <Select defaultValue={pricingView} onValueChange={setPricingView}>
                      <SelectTrigger className="w-full md:w-[180px] bg-[var(--bg-card)] border-slate-700 text-slate-300">
                        <SelectValue placeholder="Pricing" />
                      </SelectTrigger>
                      <SelectContent className="bg-[var(--bg-card)] border-slate-700">
                        <SelectItem value="hourly">Hourly Pricing</SelectItem>
                        <SelectItem value="daily">Daily Pricing</SelectItem>
                        <SelectItem value="monthly">Monthly Pricing</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex gap-3 w-full md:w-auto">
                    <Select defaultValue={sortOption} onValueChange={setSortOption}>
                      <SelectTrigger className="w-full md:w-[180px] bg-[var(--bg-card)] border-slate-700 text-slate-300">
                        <SelectValue placeholder="Sort by" />
                      </SelectTrigger>
                      <SelectContent className="bg-[var(--bg-card)] border-slate-700">
                        <SelectItem value="availability">Availability</SelectItem>
                        <SelectItem value="price-low">Price: Low to High</SelectItem>
                        <SelectItem value="price-high">Price: High to Low</SelectItem>
                        <SelectItem value="memory">Memory Size</SelectItem>
                        <SelectItem value="performance">Performance</SelectItem>
                        {selectedCategory === "mining" && <SelectItem value="efficiency">Mining Efficiency</SelectItem>}
                        <SelectItem value="popular">Most Popular</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Products Grid for GPUs */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {sortedProducts().map((product) => (
                    <Card
                      key={product.id}
                      className="bg-[var(--bg-card)] border-slate-800 overflow-hidden flex flex-col"
                    >
                      {isGPUProduct(product) ? (
                        // Mining GPU Card
                        <>
                          <div className="p-4 border-b border-slate-700 flex justify-between items-center">
                            {product.popular && (
                              <Badge className="gradient-purple-blue text-white border-0">Popular</Badge>
                            )}
                            {product.premium && <Badge className="bg-purple-600 text-white border-0">Premium</Badge>}
                            {product.value && <Badge className="bg-green-600 text-white border-0">Best Value</Badge>}
                            {!product.popular && !product.premium && !product.value && (
                              <span className="text-transparent">-</span>
                            )}
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Badge
                                    className={`
            ${
              product.availability === "High"
                ? "bg-green-500/20 text-green-400"
                : product.availability === "Medium"
                  ? "bg-yellow-500/20 text-yellow-400"
                  : "bg-red-500/20 text-red-400"
            }
          `}
                                  >
                                    {product.availability}
                                  </Badge>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Current availability status</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </div>
                          <CardHeader>
                            <CardTitle className="text-white">{product.name}</CardTitle>
                            <div className="flex justify-between items-center mt-2">
                              <CardDescription className="text-slate-400">{product.architecture}</CardDescription>
                              <span className="text-lg font-bold text-purple-400">
                                $
                                {pricingView === "hourly"
                                  ? product.pricing.hourly.toFixed(2) + "/hr"
                                  : pricingView === "daily"
                                    ? product.pricing.daily.toFixed(2) + "/day"
                                    : pricingView === "monthly"
                                      ? product.pricing.monthly.toFixed(0) + "/mo"
                                      : null}
                              </span>
                            </div>
                          </CardHeader>
                          <CardContent className="text-slate-300 grow">
                            <div className="grid grid-cols-2 gap-3 mb-4">
                              <div className="flex items-start">
                                <Memory className="h-4 w-4 text-blue-500 mr-1 mt-0.5" />
                                <span className="text-sm">{product.memory}</span>
                              </div>
                              <div className="flex items-start">
                                <Gpu className="h-4 w-4 text-purple-500 mr-1 mt-0.5" />
                                <span className="text-sm">{product.cores}</span>
                              </div>
                              {isGPUProduct(product) && product.hashrate && (
                                <div className="flex items-start">
                                  <Zap className="h-4 w-4 text-yellow-500 mr-1 mt-0.5" />
                                  <span className="text-sm">{product.hashrate}</span>
                                </div>
                              )}
                              {isGPUProduct(product) && product.efficiency && (
                                <div className="flex items-start">
                                  <HardDrive className="h-4 w-4 text-green-500 mr-1 mt-0.5" />
                                  <span className="text-sm">{product.efficiency}</span>
                                </div>
                              )}
                            </div>
                            <div className="mt-2">
                              <p className="text-sm font-medium text-slate-300 mb-1">Best for:</p>
                              <div className="flex flex-wrap gap-1">
                                {product.bestFor &&
                                  product.bestFor.map((use, i) => (
                                    <Badge
                                      key={i}
                                      variant="outline"
                                      className="bg-slate-800/50 text-slate-300 border-slate-700"
                                    >
                                      {use}
                                    </Badge>
                                  ))}
                              </div>
                            </div>
                          </CardContent>
                          <CardFooter className="flex flex-col gap-3">
                            <div className="w-full flex justify-between text-sm text-slate-400 px-1">
                              <span>Hourly: ${product.pricing.hourly.toFixed(2)}</span>
                              <span>Daily: ${product.pricing.daily.toFixed(2)}</span>
                              <span>Monthly: ${product.pricing.monthly.toFixed(0)}</span>
                            </div>
                            <div className="flex gap-2 w-full">
                              <Button className="flex-1 gradient-purple-blue gradient-purple-blue-hover">
                                Deploy Now
                              </Button>
                              <Button
                                variant="outline"
                                className="border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white"
                              >
                                Details
                              </Button>
                            </div>
                          </CardFooter>
                        </>
                      ) : (
                        // Other Services Card
                        !isGPUProduct(product) && (
                          <>
                            <CardHeader>
                              <div className="flex items-center space-x-2 mb-2">
                                {isServiceProduct(product) && product.icon && (
                                  <div className="h-10 w-10 rounded-md bg-slate-800/50 flex items-center justify-center">
                                    <product.icon className={`h-5 w-5 ${product.iconColor || "text-purple-400"}`} />
                                  </div>
                                )}
                                {product.popular && (
                                  <Badge className="gradient-purple-blue text-white border-0">Popular</Badge>
                                )}
                              </div>
                              <div className="flex justify-between items-center">
                                <CardTitle className="text-white">{product.name}</CardTitle>
                                <TooltipProvider>
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <Badge
                                        className={`
                    ${
                      product.availability === "High"
                        ? "bg-green-500/20 text-green-400"
                        : product.availability === "Medium"
                          ? "bg-yellow-500/20 text-yellow-400"
                          : "bg-red-500/20 text-red-400"
                    }
                  `}
                                      >
                                        {product.availability}
                                      </Badge>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <p>Current availability status</p>
                                    </TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                              </div>
                              {isServiceProduct(product) && (
                                <CardDescription className="text-slate-400 mt-2">{product.description}</CardDescription>
                              )}
                            </CardHeader>
                            <CardContent className="text-slate-300 grow">
                              {isServiceProduct(product) && (
                                <div className="space-y-2">
                                  <p className="text-sm font-medium text-slate-300 mb-1">Features:</p>
                                  <ul className="space-y-1">
                                    {product.features &&
                                      product.features.map((feature: string, i: number) => (
                                        <li key={i} className="flex items-start text-sm">
                                          <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                                          <span>{feature}</span>
                                        </li>
                                      ))}
                                  </ul>
                                </div>
                              )}
                            </CardContent>
                            <CardFooter className="flex flex-col gap-3">
                              <div className="w-full flex justify-between items-center">
                                <span className="text-sm text-slate-400">Monthly Price</span>
                                <span className="text-xl font-bold text-purple-400">
                                  $
                                  {product.pricing && product.pricing.monthly
                                    ? product.pricing.monthly.toFixed(2)
                                    : "N/A"}
                                </span>
                              </div>
                              <div className="flex gap-2 w-full">
                                <Button className="flex-1 gradient-purple-blue gradient-purple-blue-hover">
                                  Deploy Now
                                </Button>
                                <Button
                                  variant="outline"
                                  className="border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white"
                                >
                                  Details
                                </Button>
                              </div>
                            </CardFooter>
                          </>
                        )
                      )}
                    </Card>
                  ))}
                </div>
              </>
            ) : (
              /* Filterable Services Grid for other services */
              <FilterableServicesGrid services={otherServices} category="vps" />
            )}

            <div className="flex justify-center mt-10">
              <Link href="/buy">
                <Button size="lg" className="gradient-purple-blue gradient-purple-blue-hover">
                  View All Options
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Pricing Comparison Table */}
        {selectedCategory !== "other" && (
          <section className="w-full py-12 md:py-24 bg-[#030305]">
            <div className="container px-4 md:px-6">
              <div className="flex flex-col items-center text-center space-y-4 mb-10">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl gradient-text">
                  Detailed Pricing Comparison
                </h2>
                <p className="text-lg text-slate-400 max-w-[700px]">
                  Compare pricing across different rental durations to find the best option for your workload.
                </p>
              </div>

              <Tabs defaultValue="hourly" className="w-full max-w-5xl mx-auto">
                <TabsList className="grid w-full grid-cols-3 bg-slate-800/50 mb-6">
                  <TabsTrigger value="hourly">Hourly Pricing</TabsTrigger>
                  <TabsTrigger value="daily">Daily Pricing</TabsTrigger>
                  <TabsTrigger value="monthly">Monthly Pricing</TabsTrigger>
                </TabsList>

                <TabsContent value="hourly" className="mt-0">
                  <Card className="bg-[var(--bg-card)] border-slate-800">
                    <CardContent className="p-0">
                      <Table>
                        <TableHeader>
                          <TableRow className="border-slate-700 hover:bg-transparent">
                            <TableHead className="text-slate-300">GPU Model</TableHead>
                            <TableHead className="text-slate-300">Memory</TableHead>
                            <TableHead className="text-slate-300">Architecture</TableHead>
                            <TableHead className="text-slate-300 text-right">Price (Hourly)</TableHead>
                            <TableHead className="text-slate-300 text-center">Availability</TableHead>
                            <TableHead className="text-slate-300"></TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {selectedCategory === "all"
                            ? gpus
                                .filter((gpu) => gpu.category === "general")
                                .map((gpu) => (
                                  <TableRow key={gpu.id} className="border-slate-700 hover:bg-slate-800/30">
                                    <TableCell className="font-medium text-white">{gpu.name}</TableCell>
                                    <TableCell>{gpu.memory}</TableCell>
                                    <TableCell>{gpu.architecture}</TableCell>
                                    <TableCell className="text-right font-bold text-purple-400">
                                      ${gpu.pricing.hourly.toFixed(2)}
                                    </TableCell>
                                    <TableCell className="text-center">
                                      <Badge
                                        className={`
                                    ${
                                      gpu.availability === "High"
                                        ? "bg-green-500/20 text-green-400"
                                        : gpu.availability === "Medium"
                                          ? "bg-yellow-500/20 text-yellow-400"
                                          : "bg-red-500/20 text-red-400"
                                    }
                                  `}
                                      >
                                        {gpu.availability}
                                      </Badge>
                                    </TableCell>
                                    <TableCell>
                                      <Link href="/buy/gpu">
                                        <Button size="sm" className="gradient-purple-blue gradient-purple-blue-hover">
                                          Deploy
                                        </Button>
                                      </Link>
                                    </TableCell>
                                  </TableRow>
                                ))
                            : gpus
                                .filter((gpu) => gpu.category === "mining")
                                .map((gpu) => (
                                  <TableRow key={gpu.id} className="border-slate-700 hover:bg-slate-800/30">
                                    <TableCell className="font-medium text-white">{gpu.name}</TableCell>
                                    <TableCell>{gpu.memory}</TableCell>
                                    <TableCell>{gpu.architecture}</TableCell>
                                    <TableCell className="text-right font-bold text-purple-400">
                                      ${gpu.pricing.hourly.toFixed(2)}
                                    </TableCell>
                                    <TableCell className="text-center">
                                      <Badge
                                        className={`
                                    ${
                                      gpu.availability === "High"
                                        ? "bg-green-500/20 text-green-400"
                                        : gpu.availability === "Medium"
                                          ? "bg-yellow-500/20 text-yellow-400"
                                          : "bg-red-500/20 text-red-400"
                                    }
                                  `}
                                      >
                                        {gpu.availability}
                                      </Badge>
                                    </TableCell>
                                    <TableCell>
                                      <Link href="/buy/gpu">
                                        <Button size="sm" className="gradient-purple-blue gradient-purple-blue-hover">
                                          Deploy
                                        </Button>
                                      </Link>
                                    </TableCell>
                                  </TableRow>
                                ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="daily" className="mt-0">
                  <Card className="bg-[var(--bg-card)] border-slate-800">
                    <CardContent className="p-0">
                      <Table>
                        <TableHeader>
                          <TableRow className="border-slate-700 hover:bg-transparent">
                            <TableHead className="text-slate-300">GPU Model</TableHead>
                            <TableHead className="text-slate-300">Memory</TableHead>
                            <TableHead className="text-slate-300">Architecture</TableHead>
                            <TableHead className="text-slate-300 text-right">Price (Daily)</TableHead>
                            <TableHead className="text-slate-300 text-center">Availability</TableHead>
                            <TableHead className="text-slate-300"></TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {selectedCategory === "all"
                            ? gpus
                                .filter((gpu) => gpu.category === "general")
                                .map((gpu) => (
                                  <TableRow key={gpu.id} className="border-slate-700 hover:bg-slate-800/30">
                                    <TableCell className="font-medium text-white">{gpu.name}</TableCell>
                                    <TableCell>{gpu.memory}</TableCell>
                                    <TableCell>{gpu.architecture}</TableCell>
                                    <TableCell className="text-right font-bold text-purple-400">
                                      ${gpu.pricing.daily.toFixed(2)}
                                    </TableCell>
                                    <TableCell className="text-center">
                                      <Badge
                                        className={`
                                    ${
                                      gpu.availability === "High"
                                        ? "bg-green-500/20 text-green-400"
                                        : gpu.availability === "Medium"
                                          ? "bg-yellow-500/20 text-yellow-400"
                                          : "bg-red-500/20 text-red-400"
                                    }
                                  `}
                                      >
                                        {gpu.availability}
                                      </Badge>
                                    </TableCell>
                                    <TableCell>
                                      <Link href="/buy/gpu">
                                        <Button size="sm" className="gradient-purple-blue gradient-purple-blue-hover">
                                          Deploy
                                        </Button>
                                      </Link>
                                    </TableCell>
                                  </TableRow>
                                ))
                            : gpus
                                .filter((gpu) => gpu.category === "mining")
                                .map((gpu) => (
                                  <TableRow key={gpu.id} className="border-slate-700 hover:bg-slate-800/30">
                                    <TableCell className="font-medium text-white">{gpu.name}</TableCell>
                                    <TableCell>{gpu.memory}</TableCell>
                                    <TableCell>{gpu.architecture}</TableCell>
                                    <TableCell className="text-right font-bold text-purple-400">
                                      ${gpu.pricing.daily.toFixed(2)}
                                    </TableCell>
                                    <TableCell className="text-center">
                                      <Badge
                                        className={`
                                    ${
                                      gpu.availability === "High"
                                        ? "bg-green-500/20 text-green-400"
                                        : gpu.availability === "Medium"
                                          ? "bg-yellow-500/20 text-yellow-400"
                                          : "bg-red-500/20 text-red-400"
                                    }
                                  `}
                                      >
                                        {gpu.availability}
                                      </Badge>
                                    </TableCell>
                                    <TableCell>
                                      <Link href="/buy/gpu">
                                        <Button size="sm" className="gradient-purple-blue gradient-purple-blue-hover">
                                          Deploy
                                        </Button>
                                      </Link>
                                    </TableCell>
                                  </TableRow>
                                ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="monthly" className="mt-0">
                  <Card className="bg-[var(--bg-card)] border-slate-800">
                    <CardContent className="p-0">
                      <Table>
                        <TableHeader>
                          <TableRow className="border-slate-700 hover:bg-transparent">
                            <TableHead className="text-slate-300">GPU Model</TableHead>
                            <TableHead className="text-slate-300">Memory</TableHead>
                            <TableHead className="text-slate-300">Architecture</TableHead>
                            <TableHead className="text-slate-300 text-right">Price (Monthly)</TableHead>
                            <TableHead className="text-slate-300 text-center">Availability</TableHead>
                            <TableHead className="text-slate-300"></TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {selectedCategory === "all"
                            ? gpus
                                .filter((gpu) => gpu.category === "general")
                                .map((gpu) => (
                                  <TableRow key={gpu.id} className="border-slate-700 hover:bg-slate-800/30">
                                    <TableCell className="font-medium text-white">{gpu.name}</TableCell>
                                    <TableCell>{gpu.memory}</TableCell>
                                    <TableCell>{gpu.architecture}</TableCell>
                                    <TableCell className="text-right font-bold text-purple-400">
                                      ${gpu.pricing.monthly.toFixed(0)}
                                    </TableCell>
                                    <TableCell className="text-center">
                                      <Badge
                                        className={`
                                    ${
                                      gpu.availability === "High"
                                        ? "bg-green-500/20 text-green-400"
                                        : gpu.availability === "Medium"
                                          ? "bg-yellow-500/20 text-yellow-400"
                                          : "bg-red-500/20 text-red-400"
                                    }
                                  `}
                                      >
                                        {gpu.availability}
                                      </Badge>
                                    </TableCell>
                                    <TableCell>
                                      <Link href="/buy/gpu">
                                        <Button size="sm" className="gradient-purple-blue gradient-purple-blue-hover">
                                          Deploy
                                        </Button>
                                      </Link>
                                    </TableCell>
                                  </TableRow>
                                ))
                            : gpus
                                .filter((gpu) => gpu.category === "mining")
                                .map((gpu) => (
                                  <TableRow key={gpu.id} className="border-slate-700 hover:bg-slate-800/30">
                                    <TableCell className="font-medium text-white">{gpu.name}</TableCell>
                                    <TableCell>{gpu.memory}</TableCell>
                                    <TableCell>{gpu.architecture}</TableCell>
                                    <TableCell className="text-right font-bold text-purple-400">
                                      ${gpu.pricing.monthly.toFixed(0)}
                                    </TableCell>
                                    <TableCell className="text-center">
                                      <Badge
                                        className={`
                                    ${
                                      gpu.availability === "High"
                                        ? "bg-green-500/20 text-green-400"
                                        : gpu.availability === "Medium"
                                          ? "bg-yellow-500/20 text-yellow-400"
                                          : "bg-red-500/20 text-red-400"
                                    }
                                  `}
                                      >
                                        {gpu.availability}
                                      </Badge>
                                    </TableCell>
                                    <TableCell>
                                      <Link href="/buy/gpu">
                                        <Button size="sm" className="gradient-purple-blue gradient-purple-blue-hover">
                                          Deploy
                                        </Button>
                                      </Link>
                                    </TableCell>
                                  </TableRow>
                                ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>

              <div className="flex justify-center mt-8">
                <div className="max-w-2xl text-center">
                  <p className="text-sm text-slate-400">
                    * All prices are in USD. Monthly pricing offers up to 30% savings compared to hourly rates. Reserved
                    instances are available for additional discounts on long-term commitments.
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 bg-[#030305]">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col lg:flex-row gap-8 items-center">
              <div className="flex-1 space-y-4">
                <Badge className="bg-purple-500/10 text-purple-400 border-purple-500/20">Get Started Today</Badge>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl gradient-text">
                  Ready to accelerate your workloads?
                </h2>
                <p className="text-lg text-slate-400">
                  Deploy your first instance in minutes. No long-term commitments required, and you can scale up or down
                  as your needs change.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <Link href="/buy">
                    <Button size="lg" className="gradient-purple-blue gradient-purple-blue-hover">
                      Deploy Now
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
              <div className="flex-1 glow-effect">
                <Card className="bg-[var(--bg-card)]/70 border-slate-800 backdrop-blur-xs relative z-10">
                  <CardHeader>
                    <CardTitle className="text-white">Need help choosing?</CardTitle>
                    <CardDescription className="text-slate-400">
                      Our experts can help you select the right hardware for your specific workload.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form className="grid gap-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label htmlFor="name" className="text-sm text-slate-300">
                            Name
                          </label>
                          <input
                            id="name"
                            className="w-full rounded-md border border-slate-700 bg-[var(--bg-card)] px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:outline-hidden focus:ring-2 focus:ring-purple-500"
                            placeholder="Your name"
                          />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="email" className="text-sm text-slate-300">
                            Email
                          </label>
                          <input
                            id="email"
                            type="email"
                            className="w-full rounded-md border border-slate-700 bg-[var(--bg-card)] px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:outline-hidden focus:ring-2 focus:ring-purple-500"
                            placeholder="you@example.com"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="workload" className="text-sm text-slate-300">
                          Workload Type
                        </label>
                        <select
                          id="workload"
                          className="w-full rounded-md border border-slate-700 bg-[var(--bg-card)] px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:outline-hidden focus:ring-2 focus:ring-purple-500"
                        >
                          <option value="">Select your primary workload</option>
                          <option value="ai-training">AI/ML Training</option>
                          <option value="ai-inference">AI/ML Inference</option>
                          <option value="rendering">3D Rendering</option>
                          <option value="mining">Cryptocurrency Mining</option>
                          <option value="gaming">Game Server</option>
                          <option value="web">Web Hosting</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="message" className="text-sm text-slate-300">
                          Additional Details
                        </label>
                        <textarea
                          id="message"
                          className="w-full rounded-md border border-slate-700 bg-[var(--bg-card)] px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:outline-hidden focus:ring-2 focus:ring-purple-500 min-h-[100px]"
                          placeholder="Tell us more about your specific requirements..."
                        />
                      </div>
                      <Button className="w-full gradient-purple-blue gradient-purple-blue-hover">
                        Get Personalized Recommendations
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

