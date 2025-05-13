"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MemoryStickIcon as Memory, HardDrive, Check, Bot, Server, Globe } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import Link from "next/link"

// Import the new filter components
import FilterableServicesGrid from "@/components/enhanced/FilterableServicesGrid"

// Replace the GPU product type and data with server-focused product types
// Replace the following interface definitions at the top of the file:

interface DedicatedServerProduct {
  id: string
  name: string
  description: string
  specs: {
    cpu: string
    cores: number
    ram: string
    storage: string
    bandwidth: string
    location: string[]
  }
  features: string[]
  pricing: {
    hourly: number
    monthly: number
  }
  availability: string
  popular?: boolean
  premium?: boolean
  value?: boolean
  category: string
}

interface CloudStorageProduct {
  id: string
  name: string
  description: string
  specs: {
    capacity: string
    redundancy: string
    maxFileSize: string
    transferLimit: string
  }
  features: string[]
  pricing: {
    monthly: number
    perGB?: number
  }
  availability: string
  popular?: boolean
  premium?: boolean
  value?: boolean
  category: string
}

interface VPSProduct {
  id: string
  name: string
  description: string
  specs: {
    cpu: string
    ram: string
    storage: string
    bandwidth: string
    os: string[]
  }
  features: string[]
  pricing: {
    hourly: number
    monthly: number
  }
  availability: string
  popular?: boolean
  premium?: boolean
  value?: boolean
  category: string
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

// Replace the type guard functions
function isDedicatedServerProduct(product: Product): product is DedicatedServerProduct {
  return "specs" in product && "cores" in product.specs
}

function isCloudStorageProduct(product: Product): product is CloudStorageProduct {
  return "specs" in product && "capacity" in product.specs
}

function isVPSProduct(product: Product): product is VPSProduct {
  return "specs" in product && "os" in product.specs && !("cores" in product.specs)
}

function isServiceProduct(product: Product): product is ServiceProduct {
  return "icon" in product && "tags" in product
}

// Union type for all product types
type Product = DedicatedServerProduct | CloudStorageProduct | VPSProduct | ServiceProduct

// Replace the GPU data with dedicated server data
const dedicatedServers = [
  {
    id: "basic-server",
    name: "Basic Dedicated Server",
    description: "Entry-level dedicated server for small businesses and projects",
    specs: {
      cpu: "Intel Xeon E-2236",
      cores: 6,
      ram: "16GB DDR4",
      storage: "2 x 1TB SSD",
      bandwidth: "10TB",
      location: ["US East", "Europe West"],
    },
    features: ["99.9% Uptime SLA", "DDoS Protection", "24/7 Technical Support", "Root Access", "1 IPv4 Address"],
    pricing: {
      hourly: 0.75,
      monthly: 399,
    },
    availability: "High",
    value: true,
    category: "dedicated",
  },
  {
    id: "standard-server",
    name: "Standard Dedicated Server",
    description: "Balanced performance for medium workloads and applications",
    specs: {
      cpu: "Intel Xeon Silver 4214",
      cores: 12,
      ram: "32GB DDR4",
      storage: "2 x 2TB NVMe SSD",
      bandwidth: "20TB",
      location: ["US East", "US West", "Europe West", "Asia Pacific"],
    },
    features: [
      "99.95% Uptime SLA",
      "Advanced DDoS Protection",
      "24/7 Priority Support",
      "Root Access",
      "2 IPv4 Addresses",
      "IPv6 Support",
      "Automated Backups",
    ],
    pricing: {
      hourly: 1.25,
      monthly: 699,
    },
    availability: "High",
    popular: true,
    category: "dedicated",
  },
  {
    id: "premium-server",
    name: "Premium Dedicated Server",
    description: "High-performance server for demanding workloads",
    specs: {
      cpu: "Intel Xeon Gold 6248R",
      cores: 24,
      ram: "64GB DDR4",
      storage: "4 x 2TB NVMe SSD",
      bandwidth: "30TB",
      location: ["US East", "US West", "Europe West", "Europe North", "Asia Pacific", "Australia"],
    },
    features: [
      "99.99% Uptime SLA",
      "Enterprise DDoS Protection",
      "24/7 Priority Support with Dedicated Manager",
      "Root Access",
      "4 IPv4 Addresses",
      "IPv6 Support",
      "Daily Automated Backups",
      "Hardware Redundancy",
      "Private Network",
    ],
    pricing: {
      hourly: 2.5,
      monthly: 1299,
    },
    availability: "Medium",
    premium: true,
    category: "dedicated",
  },
  {
    id: "enterprise-server",
    name: "Enterprise Dedicated Server",
    description: "Enterprise-grade server for mission-critical applications",
    specs: {
      cpu: "Dual Intel Xeon Platinum 8280",
      cores: 56,
      ram: "256GB DDR4",
      storage: "8 x 2TB NVMe SSD + 2 x 4TB SSD",
      bandwidth: "50TB",
      location: ["US East", "US West", "Europe West", "Europe North", "Asia Pacific", "Australia"],
    },
    features: [
      "99.995% Uptime SLA",
      "Enterprise DDoS Protection",
      "24/7 Priority Support with Dedicated Team",
      "Root Access",
      "8 IPv4 Addresses",
      "IPv6 Support",
      "Hourly Automated Backups",
      "Full Hardware Redundancy",
      "Private Network",
      "Custom RAID Configuration",
      "Load Balancing",
    ],
    pricing: {
      hourly: 5.5,
      monthly: 2999,
    },
    availability: "Limited",
    category: "dedicated",
  },
]

// Add cloud storage data
const cloudStorage = [
  {
    id: "basic-storage",
    name: "Basic Cloud Storage",
    description: "Affordable storage solution for personal and small business use",
    specs: {
      capacity: "500GB",
      redundancy: "3x Replication",
      maxFileSize: "5GB",
      transferLimit: "1TB/month",
    },
    features: [
      "99.9% Uptime SLA",
      "Web-based Control Panel",
      "API Access",
      "Basic Encryption",
      "File Versioning (7 days)",
    ],
    pricing: {
      monthly: 9.99,
      perGB: 0.02,
    },
    availability: "High",
    value: true,
    category: "storage",
  },
  {
    id: "standard-storage",
    name: "Standard Cloud Storage",
    description: "Reliable storage with enhanced features for growing businesses",
    specs: {
      capacity: "2TB",
      redundancy: "3x Replication",
      maxFileSize: "10GB",
      transferLimit: "5TB/month",
    },
    features: [
      "99.95% Uptime SLA",
      "Web-based Control Panel",
      "API Access",
      "Advanced Encryption",
      "File Versioning (30 days)",
      "CDN Integration",
      "Access Controls",
    ],
    pricing: {
      monthly: 29.99,
      perGB: 0.015,
    },
    availability: "High",
    popular: true,
    category: "storage",
  },
  {
    id: "premium-storage",
    name: "Premium Cloud Storage",
    description: "Enterprise-grade storage solution with advanced features",
    specs: {
      capacity: "10TB",
      redundancy: "Geo-redundant",
      maxFileSize: "50GB",
      transferLimit: "20TB/month",
    },
    features: [
      "99.99% Uptime SLA",
      "Web-based Control Panel",
      "API Access",
      "Military-grade Encryption",
      "File Versioning (90 days)",
      "Global CDN Integration",
      "Advanced Access Controls",
      "Audit Logging",
      "Compliance Certifications",
    ],
    pricing: {
      monthly: 99.99,
      perGB: 0.01,
    },
    availability: "High",
    premium: true,
    category: "storage",
  },
  {
    id: "enterprise-storage",
    name: "Enterprise Cloud Storage",
    description: "Unlimited scalable storage for large enterprises with the highest reliability",
    specs: {
      capacity: "Unlimited",
      redundancy: "Multi-region Geo-redundant",
      maxFileSize: "5TB",
      transferLimit: "Unlimited",
    },
    features: [
      "99.999% Uptime SLA",
      "Web-based Control Panel",
      "API Access",
      "Military-grade Encryption",
      "File Versioning (Unlimited)",
      "Global CDN Integration",
      "Advanced Access Controls",
      "Audit Logging",
      "Compliance Certifications",
      "Dedicated Support Team",
      "Custom Integration Services",
    ],
    pricing: {
      monthly: 499.99,
      perGB: 0.008,
    },
    availability: "Medium",
    category: "storage",
  },
]

// Add VPS data
const vpsServers = [
  {
    id: "vps-basic",
    name: "VPS Basic",
    description: "Entry-level VPS for personal projects and development",
    specs: {
      cpu: "2 vCPU",
      ram: "2GB",
      storage: "50GB SSD",
      bandwidth: "2TB",
      os: ["Linux", "Windows"],
    },
    features: ["99.9% Uptime SLA", "Full Root Access", "Instant Deployment", "1 IPv4 Address", "Basic DDoS Protection"],
    pricing: {
      hourly: 0.015,
      monthly: 10.99,
    },
    availability: "High",
    value: true,
    category: "vps",
  },
  {
    id: "vps-standard",
    name: "VPS Standard",
    description: "Balanced VPS for websites and small applications",
    specs: {
      cpu: "4 vCPU",
      ram: "8GB",
      storage: "100GB SSD",
      bandwidth: "4TB",
      os: ["Linux", "Windows"],
    },
    features: [
      "99.95% Uptime SLA",
      "Full Root Access",
      "Instant Deployment",
      "1 IPv4 Address",
      "IPv6 Support",
      "Enhanced DDoS Protection",
      "Weekly Backups",
    ],
    pricing: {
      hourly: 0.03,
      monthly: 21.99,
    },
    availability: "High",
    popular: true,
    category: "vps",
  },
  {
    id: "vps-premium",
    name: "VPS Premium",
    description: "High-performance VPS for business applications",
    specs: {
      cpu: "8 vCPU",
      ram: "16GB",
      storage: "200GB SSD",
      bandwidth: "8TB",
      os: ["Linux", "Windows"],
    },
    features: [
      "99.99% Uptime SLA",
      "Full Root Access",
      "Instant Deployment",
      "2 IPv4 Addresses",
      "IPv6 Support",
      "Advanced DDoS Protection",
      "Daily Backups",
      "Priority Support",
    ],
    pricing: {
      hourly: 0.06,
      monthly: 42.99,
    },
    availability: "High",
    premium: true,
    category: "vps",
  },
  {
    id: "vps-enterprise",
    name: "VPS Enterprise",
    description: "Enterprise-grade VPS for demanding workloads",
    specs: {
      cpu: "16 vCPU",
      ram: "32GB",
      storage: "500GB SSD",
      bandwidth: "12TB",
      os: ["Linux", "Windows"],
    },
    features: [
      "99.99% Uptime SLA",
      "Full Root Access",
      "Instant Deployment",
      "4 IPv4 Addresses",
      "IPv6 Support",
      "Enterprise DDoS Protection",
      "Hourly Backups",
      "Dedicated Support",
      "Load Balancing",
      "Private Network",
    ],
    pricing: {
      hourly: 0.12,
      monthly: 84.99,
    },
    availability: "Medium",
    category: "vps",
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

// Replace the export default function PricingPage() with the following:
export default function PricingPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("dedicated")
  const [pricingView, setPricingView] = useState<string>("monthly")
  const [sortOption, setSortOption] = useState<string>("availability")

  // Filter products based on selected category
  const filteredProducts = (): Product[] => {
    if (selectedCategory === "dedicated") {
      return dedicatedServers as Product[]
    } else if (selectedCategory === "storage") {
      return cloudStorage as Product[]
    } else if (selectedCategory === "vps") {
      return vpsServers as Product[]
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
          const aPrice =
            isDedicatedServerProduct(a) || isVPSProduct(a)
              ? pricingView === "hourly"
                ? a.pricing.hourly
                : a.pricing.monthly
              : isCloudStorageProduct(a)
                ? a.pricing.monthly
                : isServiceProduct(a) && a.pricing
                  ? a.pricing.monthly
                  : 0

          const bPrice =
            isDedicatedServerProduct(b) || isVPSProduct(b)
              ? pricingView === "hourly"
                ? b.pricing.hourly
                : b.pricing.monthly
              : isCloudStorageProduct(b)
                ? b.pricing.monthly
                : isServiceProduct(b) && b.pricing
                  ? b.pricing.monthly
                  : 0

          return aPrice - bPrice
        })
      case "price-high":
        return [...products].sort((a, b) => {
          const aPrice =
            isDedicatedServerProduct(a) || isVPSProduct(a)
              ? pricingView === "hourly"
                ? a.pricing.hourly
                : a.pricing.monthly
              : isCloudStorageProduct(a)
                ? a.pricing.monthly
                : isServiceProduct(a) && a.pricing
                  ? a.pricing.monthly
                  : 0

          const bPrice =
            isDedicatedServerProduct(b) || isVPSProduct(b)
              ? pricingView === "hourly"
                ? b.pricing.hourly
                : b.pricing.monthly
              : isCloudStorageProduct(b)
                ? b.pricing.monthly
                : isServiceProduct(b) && b.pricing
                  ? b.pricing.monthly
                  : 0

          return bPrice - aPrice
        })
      case "performance":
        return [...products].sort((a, b) => {
          // For servers and VPS, use CPU cores or RAM as performance indicators
          if (isDedicatedServerProduct(a) && isDedicatedServerProduct(b)) {
            return b.specs.cores - a.specs.cores
          }

          if (isVPSProduct(a) && isVPSProduct(b)) {
            // Extract the number from vCPU string
            const aVCPU = Number.parseInt(a.specs.cpu.match(/\d+/)?.[0] || "0", 10)
            const bVCPU = Number.parseInt(b.specs.cpu.match(/\d+/)?.[0] || "0", 10)
            return bVCPU - aVCPU
          }

          if (isCloudStorageProduct(a) && isCloudStorageProduct(b)) {
            // Extract the number from capacity string
            const getCapacityInGB = (capacity: string): number => {
              const match = capacity.match(/(\d+)(\w+)/)
              if (!match) return 0
              const [, size, unit] = match
              const numSize = Number.parseInt(size, 10)
              if (unit.toLowerCase().includes("tb")) return numSize * 1024
              if (unit.toLowerCase() === "unlimited") return Number.MAX_SAFE_INTEGER
              return numSize
            }

            return getCapacityInGB(b.specs.capacity) - getCapacityInGB(a.specs.capacity)
          }

          // For other services, use pricing as a proxy for performance
          return isServiceProduct(a) && isServiceProduct(b) && a.pricing && b.pricing
            ? b.pricing.monthly - a.pricing.monthly
            : 0
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

  // Replace the return statement with the updated UI
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 relative overflow-hidden">
          <div className="container relative z-10 px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-4 max-w-3xl mx-auto">
              <Badge className="bg-purple-500/10 text-purple-400 border-purple-500/20">
                Enterprise-Grade Infrastructure
              </Badge>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl md:text-6xl gradient-text">
                Products & Pricing
              </h1>
              <p className="text-xl text-slate-400 max-w-[700px]">
                Scalable infrastructure solutions with flexible pricing options to fit your business needs.
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
                Browse our selection of high-performance infrastructure solutions
              </p>
            </div>

            {/* Category Selection */}
            <div className="flex justify-center mb-8 px-4 sm:px-0">
              <div className="flex flex-wrap bg-slate-800/50 rounded-lg p-1 max-w-full gap-1">
                <Button
                  variant={selectedCategory === "dedicated" ? "default" : "ghost"}
                  className={selectedCategory === "dedicated" ? "gradient-purple-blue text-white" : "text-slate-400"}
                  onClick={() => setSelectedCategory("dedicated")}
                >
                  <Server className="mr-2 h-4 w-4" />
                  Dedicated Servers
                </Button>
                <Button
                  variant={selectedCategory === "vps" ? "default" : "ghost"}
                  className={selectedCategory === "vps" ? "gradient-purple-blue text-white" : "text-slate-400"}
                  onClick={() => setSelectedCategory("vps")}
                >
                  <Server className="mr-2 h-4 w-4" />
                  VPS
                </Button>
                <Button
                  variant={selectedCategory === "storage" ? "default" : "ghost"}
                  className={selectedCategory === "storage" ? "gradient-purple-blue text-white" : "text-slate-400"}
                  onClick={() => setSelectedCategory("storage")}
                >
                  <HardDrive className="mr-2 h-4 w-4" />
                  Cloud Storage
                </Button>
                <Button
                  variant={selectedCategory === "other" ? "default" : "ghost"}
                  className={selectedCategory === "other" ? "gradient-purple-blue text-white" : "text-slate-400"}
                  onClick={() => setSelectedCategory("other")}
                >
                  <Globe className="mr-2 h-4 w-4" />
                  Other Services
                </Button>
              </div>
            </div>

            {selectedCategory !== "other" ? (
              <>
                {/* Filtering and Sorting Controls */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
                  {(selectedCategory === "dedicated" || selectedCategory === "vps") && (
                    <div className="flex gap-3 w-full md:w-auto">
                      <Select defaultValue={pricingView} onValueChange={setPricingView}>
                        <SelectTrigger className="w-full md:w-[180px] bg-[var(--bg-card)] border-slate-700 text-slate-300">
                          <SelectValue placeholder="Pricing" />
                        </SelectTrigger>
                        <SelectContent className="bg-[var(--bg-card)] border-slate-700">
                          <SelectItem value="hourly">Hourly Pricing</SelectItem>
                          <SelectItem value="monthly">Monthly Pricing</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                  <div className="flex gap-3 w-full md:w-auto">
                    <Select defaultValue={sortOption} onValueChange={setSortOption}>
                      <SelectTrigger className="w-full md:w-[180px] bg-[var(--bg-card)] border-slate-700 text-slate-300">
                        <SelectValue placeholder="Sort by" />
                      </SelectTrigger>
                      <SelectContent className="bg-[var(--bg-card)] border-slate-700">
                        <SelectItem value="availability">Availability</SelectItem>
                        <SelectItem value="price-low">Price: Low to High</SelectItem>
                        <SelectItem value="price-high">Price: High to Low</SelectItem>
                        <SelectItem value="performance">Performance</SelectItem>
                        <SelectItem value="popular">Most Popular</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Products Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {sortedProducts().map((product) => (
                    <Card
                      key={product.id}
                      className="bg-[var(--bg-card)] border-slate-800 overflow-hidden flex flex-col"
                    >
                      {isDedicatedServerProduct(product) && (
                        // Dedicated Server Card
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
                              <CardDescription className="text-slate-400">{product.description}</CardDescription>
                            </div>
                          </CardHeader>
                          <CardContent className="text-slate-300 grow">
                            <div className="grid grid-cols-2 gap-3 mb-4">
                              <div className="flex items-start">
                                <Server className="h-4 w-4 text-blue-500 mr-1 mt-0.5" />
                                <span className="text-sm">{product.specs.cpu}</span>
                              </div>
                              <div className="flex items-start">
                                <Memory className="h-4 w-4 text-purple-500 mr-1 mt-0.5" />
                                <span className="text-sm">{product.specs.ram}</span>
                              </div>
                              <div className="flex items-start">
                                <HardDrive className="h-4 w-4 text-green-500 mr-1 mt-0.5" />
                                <span className="text-sm">{product.specs.storage}</span>
                              </div>
                              <div className="flex items-start">
                                <Globe className="h-4 w-4 text-cyan-500 mr-1 mt-0.5" />
                                <span className="text-sm">{product.specs.bandwidth}</span>
                              </div>
                            </div>
                            <div className="mt-2">
                              <p className="text-sm font-medium text-slate-300 mb-1">Key Features:</p>
                              <div className="space-y-1">
                                {product.features.slice(0, 4).map((feature, i) => (
                                  <div key={i} className="flex items-start text-sm">
                                    <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                                    <span>{feature}</span>
                                  </div>
                                ))}
                                {product.features.length > 4 && (
                                  <div className="text-sm text-purple-400">
                                    +{product.features.length - 4} more features
                                  </div>
                                )}
                              </div>
                            </div>
                          </CardContent>
                          <CardFooter className="flex flex-col gap-3">
                            <div className="w-full flex justify-between text-sm text-slate-400 px-1">
                              <span>Hourly: ${product.pricing.hourly.toFixed(2)}</span>
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
                      )}

                      {isVPSProduct(product) && (
                        // VPS Card
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
                              <CardDescription className="text-slate-400">{product.description}</CardDescription>
                            </div>
                          </CardHeader>
                          <CardContent className="text-slate-300 grow">
                            <div className="grid grid-cols-2 gap-3 mb-4">
                              <div className="flex items-start">
                                <Server className="h-4 w-4 text-blue-500 mr-1 mt-0.5" />
                                <span className="text-sm">{product.specs.cpu}</span>
                              </div>
                              <div className="flex items-start">
                                <Memory className="h-4 w-4 text-purple-500 mr-1 mt-0.5" />
                                <span className="text-sm">{product.specs.ram}</span>
                              </div>
                              <div className="flex items-start">
                                <HardDrive className="h-4 w-4 text-green-500 mr-1 mt-0.5" />
                                <span className="text-sm">{product.specs.storage}</span>
                              </div>
                              <div className="flex items-start">
                                <Globe className="h-4 w-4 text-cyan-500 mr-1 mt-0.5" />
                                <span className="text-sm">{product.specs.bandwidth}</span>
                              </div>
                            </div>
                            <div className="mt-2">
                              <p className="text-sm font-medium text-slate-300 mb-1">Key Features:</p>
                              <div className="space-y-1">
                                {product.features.slice(0, 4).map((feature, i) => (
                                  <div key={i} className="flex items-start text-sm">
                                    <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                                    <span>{feature}</span>
                                  </div>
                                ))}
                                {product.features.length > 4 && (
                                  <div className="text-sm text-purple-400">
                                    +{product.features.length - 4} more features
                                  </div>
                                )}
                              </div>
                            </div>
                          </CardContent>
                          <CardFooter className="flex flex-col gap-3">
                            <div className="w-full flex justify-between text-sm text-slate-400 px-1">
                              <span>Hourly: ${product.pricing.hourly.toFixed(2)}</span>
                              <span>Monthly: ${product.pricing.monthly.toFixed(2)}</span>
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
                      )}

                      {isCloudStorageProduct(product) && (
                        // Cloud Storage Card
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
                              <CardDescription className="text-slate-400">{product.description}</CardDescription>
                            </div>
                          </CardHeader>
                          <CardContent className="text-slate-300 grow">
                            <div className="grid grid-cols-2 gap-3 mb-4">
                              <div className="flex items-start">
                                <HardDrive className="h-4 w-4 text-blue-500 mr-1 mt-0.5" />
                                <span className="text-sm">Capacity: {product.specs.capacity}</span>
                              </div>
                              <div className="flex items-start">
                                <Server className="h-4 w-4 text-purple-500 mr-1 mt-0.5" />
                                <span className="text-sm">{product.specs.redundancy}</span>
                              </div>
                              <div className="flex items-start">
                                <HardDrive className="h-4 w-4 text-green-500 mr-1 mt-0.5" />
                                <span className="text-sm">Max File: {product.specs.maxFileSize}</span>
                              </div>
                              <div className="flex items-start">
                                <Globe className="h-4 w-4 text-cyan-500 mr-1 mt-0.5" />
                                <span className="text-sm">Transfer: {product.specs.transferLimit}</span>
                              </div>
                            </div>
                            <div className="mt-2">
                              <p className="text-sm font-medium text-slate-300 mb-1">Key Features:</p>
                              <div className="space-y-1">
                                {product.features.slice(0, 4).map((feature, i) => (
                                  <div key={i} className="flex items-start text-sm">
                                    <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                                    <span>{feature}</span>
                                  </div>
                                ))}
                                {product.features.length > 4 && (
                                  <div className="text-sm text-purple-400">
                                    +{product.features.length - 4} more features
                                  </div>
                                )}
                              </div>
                            </div>
                          </CardContent>
                          <CardFooter className="flex flex-col gap-3">
                            <div className="w-full flex justify-between text-sm text-slate-400 px-1">
                              <span>Monthly: ${product.pricing.monthly.toFixed(2)}</span>
                              <span>Per GB: ${product.pricing.perGB?.toFixed(3) || "N/A"}</span>
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
                      )}

                      {isServiceProduct(product) && (
                        // Other Services Card
                        <>
                          <CardHeader>
                            <div className="flex items-center space-x-2 mb-2">
                              {product.icon && (
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
                            <CardDescription className="text-slate-400 mt-2">{product.description}</CardDescription>
                          </CardHeader>
                          <CardContent className="text-slate-300 grow">
                            <div className="space-y-2">
                              <p className="text-sm font-medium text-slate-300 mb-1">Features:</p>
                              <ul className="space-y-1">
                                {product.features.map((feature: string, i: number) => (
                                  <li key={i} className="flex items-start text-sm">
                                    <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                                    <span>{feature}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </CardContent>
                          <CardFooter className="flex flex-col gap-3">
                            <div className="w-full flex justify-between items-center">
                              <span className="text-sm text-slate-400">Monthly Price</span>
                              <span className="text-xl font-bold text-purple-400">
                                ${product.pricing.monthly.toFixed(2)}
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
                  Compare pricing across different products to find the best option for your needs.
                </p>
              </div>

              <Tabs defaultValue={selectedCategory} className="w-full max-w-5xl mx-auto">
                <TabsList className="grid w-full grid-cols-3 bg-slate-800/50 mb-6">
                  <TabsTrigger value="dedicated">Dedicated Servers</TabsTrigger>
                  <TabsTrigger value="vps">VPS</TabsTrigger>
                  <TabsTrigger value="storage">Cloud Storage</TabsTrigger>
                </TabsList>

                <TabsContent value="dedicated" className="mt-0">
                  <Card className="bg-[var(--bg-card)] border-slate-800">
                    <CardContent className="p-0">
                      <Table>
                        <TableHeader>
                          <TableRow className="border-slate-700 hover:bg-transparent">
                            <TableHead className="text-slate-300">Server</TableHead>
                            <TableHead className="text-slate-300">CPU</TableHead>
                            <TableHead className="text-slate-300">RAM</TableHead>
                            <TableHead className="text-slate-300">Storage</TableHead>
                            <TableHead className="text-slate-300 text-right">Monthly Price</TableHead>
                            <TableHead className="text-slate-300 text-center">Availability</TableHead>
                            <TableHead className="text-slate-300"></TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {dedicatedServers.map((server) => (
                            <TableRow key={server.id} className="border-slate-700 hover:bg-slate-800/30">
                              <TableCell className="font-medium text-white">{server.name}</TableCell>
                              <TableCell>{server.specs.cpu}</TableCell>
                              <TableCell>{server.specs.ram}</TableCell>
                              <TableCell>{server.specs.storage}</TableCell>
                              <TableCell className="text-right font-bold text-purple-400">
                                ${server.pricing.monthly.toFixed(0)}
                              </TableCell>
                              <TableCell className="text-center">
                                <Badge
                                  className={`
                                    ${
                                      server.availability === "High"
                                        ? "bg-green-500/20 text-green-400"
                                        : server.availability === "Medium"
                                          ? "bg-yellow-500/20 text-yellow-400"
                                          : server.availability === "red-500/20 text-red-400"
                                    }
                                  `}
                                >
                                  {server.availability}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                <Link href="/buy/dedicated">
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

                <TabsContent value="vps" className="mt-0">
                  <Card className="bg-[var(--bg-card)] border-slate-800">
                    <CardContent className="p-0">
                      <Table>
                        <TableHeader>
                          <TableRow className="border-slate-700 hover:bg-transparent">
                            <TableHead className="text-slate-300">VPS</TableHead>
                            <TableHead className="text-slate-300">CPU</TableHead>
                            <TableHead className="text-slate-300">RAM</TableHead>
                            <TableHead className="text-slate-300">Storage</TableHead>
                            <TableHead className="text-slate-300 text-right">Monthly Price</TableHead>
                            <TableHead className="text-slate-300 text-center">Availability</TableHead>
                            <TableHead className="text-slate-300"></TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {vpsServers.map((server) => (
                            <TableRow key={server.id} className="border-slate-700 hover:bg-slate-800/30">
                              <TableCell className="font-medium text-white">{server.name}</TableCell>
                              <TableCell>{server.specs.cpu}</TableCell>
                              <TableCell>{server.specs.ram}</TableCell>
                              <TableCell>{server.specs.storage}</TableCell>
                              <TableCell className="text-right font-bold text-purple-400">
                                ${server.pricing.monthly.toFixed(2)}
                              </TableCell>
                              <TableCell className="text-center">
                                <Badge
                                  className={`
                                    ${
                                      server.availability === "High"
                                        ? "bg-green-500/20 text-green-400"
                                        : server.availability === "Medium"
                                          ? "bg-yellow-500/20 text-yellow-400"
                                          : server.availability === "red-500/20 text-red-400"
                                    }
                                  `}
                                >
                                  {server.availability}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                <Link href="/buy/vps">
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

                <TabsContent value="storage" className="mt-0">
                  <Card className="bg-[var(--bg-card)] border-slate-800">
                    <CardContent className="p-0">
                      <Table>
                        <TableHeader>
                          <TableRow className="border-slate-700 hover:bg-transparent">
                            <TableHead className="text-slate-300">Storage Plan</TableHead>
                            <TableHead className="text-slate-300">Capacity</TableHead>
                            <TableHead className="text-slate-300">Redundancy</TableHead>
                            <TableHead className="text-slate-300">Transfer Limit</TableHead>
                            <TableHead className="text-slate-300 text-right">Monthly Price</TableHead>
                            <TableHead className="text-slate-300 text-center">Availability</TableHead>
                            <TableHead className="text-slate-300"></TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {cloudStorage.map((storage) => (
                            <TableRow key={storage.id} className="border-slate-700 hover:bg-slate-800/30">
                              <TableCell className="font-medium text-white">{storage.name}</TableCell>
                              <TableCell>{storage.specs.capacity}</TableCell>
                              <TableCell>{storage.specs.redundancy}</TableCell>
                              <TableCell>{storage.specs.transferLimit}</TableCell>
                              <TableCell className="text-right font-bold text-purple-400">
                                ${storage.pricing.monthly.toFixed(2)}
                              </TableCell>
                              <TableCell className="text-center">
                                <Badge
                                  className={`
                                    ${
                                      storage.availability === "High"
                                        ? "bg-green-500/20 text-green-400"
                                        : storage.availability === "Medium"
                                          ? "bg-yellow-500/20 text-yellow-400"
                                          : storage.availability === "red-500/20 text-red-400"
                                    }
                                  `}
                                >
                                  {storage.availability}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                <Link href="/buy/cloudstorage">
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
                  Ready to scale your infrastructure?
                </h2>
                <p className="text-lg text-slate-400">
                  Deploy your first server in minutes. No long-term commitments required, and you can scale up or down
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
                      Our experts can help you select the right infrastructure for your specific workload.
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
                          Infrastructure Type
                        </label>
                        <select
                          id="workload"
                          className="w-full rounded-md border border-slate-700 bg-[var(--bg-card)] px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:outline-hidden focus:ring-2 focus:ring-purple-500"
                        >
                          <option value="">Select your infrastructure needs</option>
                          <option value="dedicated">Dedicated Server</option>
                          <option value="vps">Virtual Private Server</option>
                          <option value="storage">Cloud Storage</option>
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
