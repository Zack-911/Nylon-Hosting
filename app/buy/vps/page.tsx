"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ServerIcon, HardDrive, Cpu, MemoryStickIcon as Memory, Network, Check, Shield, Zap, Globe } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import Link from "next/link"

// VPS plans data
const vpsPlans = {
  standard: [
    {
      id: "vps-testbench",
      name: "Testbench VPS",
      description: "Small VPS best for testing purposes",
      price: 2.99,
      specs: {
        cpu: "1 vCPU",
        ram: "2 GB RAM",
        storage: "15 GB SSD Storage",
        bandwidth: "2 TB Bandwidth @ 2.5GiB",
      },
      features: [
        "1 IPv4 Address",
        "Linux/Windows",
        "Full Root Access",
        "24/7 Support",
        "Standard Dashboard",
        "Basic Dashboard",
      ],
      popular: false,
    },
    {
      id: "vps-starter",
      name: "Starter VPS",
      description: "Entry-level VPS for small applications",
      price: 4.99,
      specs: {
        cpu: "1 vCPU",
        ram: "2 GB RAM",
        storage: "30 GB SSD Storage",
        bandwidth: "2 TB Bandwidth @ 2.5GiB",
      },
      features: [
        "1 IPv4 Address",
        "Linux/Windows",
        "Full Root Access",
        "24/7 Support",
        "Advanced Dashboard",
        "Access to 3 Specialized Packages",
        "Basic Dashboard",
      ],
      popular: false,
    },
    {
      id: "vps-business",
      name: "Business VPS",
      description: "Balanced VPS for websites and applications",
      price: 9.99,
      specs: {
        cpu: "2 vCPU",
        ram: "4 GB RAM",
        storage: "50 GB SSD Storage",
        bandwidth: "Unlimited @ 2.5GiB",
      },
      features: [
        "1 IPv4 Address",
        "Linux/Windows",
        "Full Root Access",
        "Priority Support",
        "Advanced Dashboard",
        "Access to 3 Specialized Packages",
        "1 Backup",
      ],
      popular: true,
    },
    {
      id: "vps-premium",
      name: "Premium VPS",
      description: "High-performance VPS for demanding workloads",
      price: 14.99,
      specs: {
        cpu: "4 vCPU",
        ram: "8 GB RAM",
        storage: "100 GB SSD Storage",
        bandwidth: "Unlimited @ 2.5GiB",
      },
      features: [
        "1 IPv4 Address",
        "Linux/Windows",
        "Full Root Access",
        "Priority Support",
        "Advanced Dashboard",
        "Access to 3 Specialized Packages",
        "2 Backup",
        "DDoS Protection",
      ],
      popular: false,
    },
    {
      id: "vps-deluxe",
      name: "Deluxe VPS",
      description: "High-performance VPS for demanding workloads",
      price: 18.99,
      specs: {
        cpu: "6 vCPU",
        ram: "16 GB RAM",
        storage: "150 GB SSD Storage",
        bandwidth: "Unlimited @ 2.5GiB",
      },
      features: [
        "1 IPv4 Address",
        "Linux/Windows",
        "Full Root Access",
        "Priority Support",
        "Advanced Dashboard",
        "Access to 3 Specialized Packages",
        "3 Backup",
        "DDoS Protection",
      ],
      popular: false,
    },
  ],
  managed: [
    {
      id: "managed-basic",
      name: "Managed Basic",
      description: "Fully managed VPS with basic resources",
      price: 9.99,
      specs: {
        cpu: "1 vCPU",
        ram: "2 GB RAM",
        storage: "30 GB SSD Storage",
        bandwidth: "2 TB Bandwidth @ 2.5GiB",
      },
      features: [
        "1 IPv4 Address",
        "Linux/Windows",
        "Control Panel",
        "24/7 Support",
        "Server Monitoring",
        "Security Updates",
        "Weekly Backups",
      ],
      popular: false,
    },
    {
      id: "managed-plus",
      name: "Managed Plus",
      description: "Managed VPS with enhanced resources",
      price: 19.99,
      specs: {
        cpu: "2 vCPU",
        ram: "4 GB RAM",
        storage: "60 GB SSD Storage",
        bandwidth: "3 TB Bandwidth @ 2.5GiB",
      },
      features: [
        "1 IPv4 Address",
        "Linux/Windows",
        "Control Panel",
        "24/7 Priority Support",
        "Server Monitoring",
        "Security Updates",
        "Daily Backups",
        "Performance Optimization",
        "Malware Scanning",
      ],
      popular: true,
    },
    {
      id: "managed-pro",
      name: "Managed Pro",
      description: "Premium managed VPS for business applications",
      price: 29.99,
      specs: {
        cpu: "4 vCPU",
        ram: "8 GB RAM",
        storage: "120 GB SSD Storage",
        bandwidth: "5 TB Bandwidth @ 2.5GiB",
      },
      features: [
        "1 IPv4 Address",
        "Linux/Windows",
        "Control Panel",
        "24/7 Priority Support",
        "Server Monitoring",
        "Security Updates",
        "Daily Backups",
        "Performance Optimization",
        "Malware Scanning",
        "DDoS Protection",
        "Dedicated Account Manager",
      ],
      popular: false,
    },
  ],
  highcpu: [
    {
      id: "highcpu-basic",
      name: "High-CPU Basic",
      description: "CPU-optimized VPS for compute-intensive workloads",
      price: 14.99,
      specs: {
        cpu: "4 vCPU (High Performance)",
        ram: "4 GB RAM",
        storage: "40 GB SSD Storage",
        bandwidth: "3 TB Bandwidth @ 2.5GiB",
      },
      features: [
        "1 IPv4 Address",
        "Linux/Windows",
        "Full Root Access",
        "24/7 Support",
        "Advanced Dashboard",
        "CPU Burst Capability",
      ],
      popular: false,
    },
    {
      id: "highcpu-plus",
      name: "High-CPU Plus",
      description: "Enhanced CPU performance for demanding applications",
      price: 24.99,
      specs: {
        cpu: "6 vCPU (High Performance)",
        ram: "8 GB RAM",
        storage: "80 GB SSD Storage",
        bandwidth: "4 TB Bandwidth @ 2.5GiB",
      },
      features: [
        "1 IPv4 Address",
        "Linux/Windows",
        "Full Root Access",
        "24/7 Priority Support",
        "Advanced Dashboard",
        "CPU Burst Capability",
        "1 Backup",
        "DDoS Protection",
      ],
      popular: true,
    },
    {
      id: "highcpu-pro",
      name: "High-CPU Pro",
      description: "Maximum CPU power for high-performance computing",
      price: 39.99,
      specs: {
        cpu: "8 vCPU (High Performance)",
        ram: "16 GB RAM",
        storage: "160 GB SSD Storage",
        bandwidth: "5 TB Bandwidth @ 2.5GiB",
      },
      features: [
        "1 IPv4 Address",
        "Linux/Windows",
        "Full Root Access",
        "24/7 Priority Support",
        "Advanced Dashboard",
        "CPU Burst Capability",
        "2 Backups",
        "DDoS Protection",
        "Dedicated Resources",
      ],
      popular: false,
    },
  ],
}

export default function VPSPage() {
  const [vpsType, setVpsType] = useState("standard")
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

  // Get current plans based on VPS type
  const getCurrentPlans = () => {
    switch (vpsType) {
      case "managed":
        return vpsPlans.managed
      case "highcpu":
        return vpsPlans.highcpu
      default:
        return vpsPlans.standard
    }
  }

  // Get selected plan details
  const getSelectedPlan = () => {
    return getCurrentPlans().find((plan) => plan.id === selectedPlan)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 relative overflow-hidden">
          <div className="container relative z-10 px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-4 max-w-3xl mx-auto">
              <Badge className="bg-purple-500/10 text-purple-400 border-purple-500/20">Scalable Virtual Servers</Badge>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl md:text-6xl gradient-text">
                Virtual Private Servers
              </h1>
              <p className="text-xl text-slate-400 max-w-[700px]">
                Powerful, flexible VPS solutions with dedicated resources and full root access.
              </p>
            </div>
          </div>
        </section>

        {/* VPS Types Section */}
        <section className="w-full py-12 md:py-16 bg-[#030305]">
          <div className="container px-4 md:px-6">
            <Tabs defaultValue={vpsType} onValueChange={setVpsType} className="w-full">
              <div className="flex justify-center mb-8">
                <TabsList className="grid w-full max-w-md grid-cols-3 bg-slate-800/50">
                  <TabsTrigger value="standard">Standard</TabsTrigger>
                  <TabsTrigger value="managed">Managed</TabsTrigger>
                  <TabsTrigger value="highcpu">High-CPU</TabsTrigger>
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

              <TabsContent value={vpsType} className="space-y-8">
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
                            <Globe className="h-5 w-5 text-purple-400" />
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
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <div className="flex items-center">
                              <Cpu className="h-4 w-4 text-purple-400 mr-2" />
                              <span className="text-sm font-medium text-white">CPU</span>
                            </div>
                            <p className="text-sm text-slate-300 pl-6">{plan.specs.cpu}</p>
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center">
                              <Memory className="h-4 w-4 text-purple-400 mr-2" />
                              <span className="text-sm font-medium text-white">Memory</span>
                            </div>
                            <p className="text-sm text-slate-300 pl-6">{plan.specs.ram}</p>
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center">
                              <HardDrive className="h-4 w-4 text-purple-400 mr-2" />
                              <span className="text-sm font-medium text-white">Storage</span>
                            </div>
                            <p className="text-sm text-slate-300 pl-6">{plan.specs.storage}</p>
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center">
                              <Network className="h-4 w-4 text-purple-400 mr-2" />
                              <span className="text-sm font-medium text-white">Bandwidth</span>
                            </div>
                            <p className="text-sm text-slate-300 pl-6">{plan.specs.bandwidth}</p>
                          </div>
                        </div>

                        <Separator className="my-4 bg-slate-700" />

                        <div>
                          <h4 className="text-sm font-medium text-white mb-2">Features</h4>
                          <ul className="space-y-2">
                            {plan.features.slice(0, 5).map((feature, index) => (
                              <li key={index} className="flex items-start">
                                <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                                <span className="text-slate-300 text-sm">{feature}</span>
                              </li>
                            ))}
                            {plan.features.length > 5 && (
                              <li className="text-sm text-purple-400">+{plan.features.length - 5} more features</li>
                            )}
                          </ul>
                        </div>
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
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl gradient-text">Configure Your VPS</h2>
                  <p className="text-lg text-slate-400 max-w-[700px]">
                    Customize your virtual private server with the options below
                  </p>
                </div>

                <Card className="bg-[var(--bg-card)] border-slate-800">
                  <CardHeader>
                    <CardTitle className="text-white">VPS Configuration</CardTitle>
                    <CardDescription className="text-slate-400">
                      You&apos;ve selected the {getSelectedPlan()?.name} with {billingCycle} billing
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Operating System */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium text-white">Operating System</h3>
                      <div className="space-y-2">
                        <Select defaultValue="ubuntu">
                          <SelectTrigger className="bg-[var(--bg-card)] border-slate-700 text-white">
                            <SelectValue placeholder="Select OS" />
                          </SelectTrigger>
                          <SelectContent className="bg-[var(--bg-card)] border-slate-700">
                            <SelectItem value="ubuntu">Ubuntu Server 22.04 LTS</SelectItem>
                            <SelectItem value="debian">Debian 11</SelectItem>
                            <SelectItem value="centos">CentOS Stream 9</SelectItem>
                            <SelectItem value="windows">Windows Server 2022</SelectItem>
                            <SelectItem value="custom">Custom OS (ISO)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Additional Options */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium text-white">Additional Options</h3>

                      <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="control-panel"
                            className="data-[state=checked]:bg-purple-500 data-[state=checked]:border-purple-500"
                          />
                          <div>
                            <Label htmlFor="control-panel" className="text-white">
                              Control Panel
                            </Label>
                            <p className="text-xs text-slate-400">
                              cPanel/WHM or Plesk Obsidian Web Host Edition (+$10/month)
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="backup-service"
                            className="data-[state=checked]:bg-purple-500 data-[state=checked]:border-purple-500"
                          />
                          <div>
                            <Label htmlFor="backup-service" className="text-white">
                              Backup Service
                            </Label>
                            <p className="text-xs text-slate-400">Daily backups with 7-day retention (+$5/month)</p>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="ddos-protection"
                            className="data-[state=checked]:bg-purple-500 data-[state=checked]:border-purple-500"
                          />
                          <div>
                            <Label htmlFor="ddos-protection" className="text-white">
                              DDoS Protection
                            </Label>
                            <p className="text-xs text-slate-400">Advanced DDoS protection for your VPS (+$7/month)</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <Separator className="bg-slate-700" />

                    {/* Data Center Location */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium text-white">Data Center Location</h3>
                      <div className="space-y-2">
                        <Select defaultValue="us-east">
                          <SelectTrigger className="bg-[var(--bg-card)] border-slate-700 text-white">
                            <SelectValue placeholder="Select Location" />
                          </SelectTrigger>
                          <SelectContent className="bg-[var(--bg-card)] border-slate-700">
                            <SelectItem value="us-east">US East (New York)</SelectItem>
                            <SelectItem value="us-west">US West (Los Angeles)</SelectItem>
                            <SelectItem value="eu-central">EU Central (Frankfurt)</SelectItem>
                            <SelectItem value="eu-west">EU West (London)</SelectItem>
                            <SelectItem value="asia-east">Asia East (Singapore)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

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
                    </div>

                    <Separator className="bg-slate-700" />

                    {/* Order Summary */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium text-white">Order Summary</h3>
                      <div className="bg-slate-800/50 rounded-lg p-4 space-y-2">
                        <div className="flex justify-between">
                          <span className="text-slate-300">
                            {getSelectedPlan()?.name} ({billingCycle})
                          </span>
                          <span className="font-medium text-white">
                            ${getDiscountedPrice(getSelectedPlan()?.price || 0)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-300">Setup Fee</span>
                          <span className="font-medium text-white">$0.00</span>
                        </div>
                        <Separator className="my-2 bg-slate-700" />
                        <div className="flex justify-between">
                          <span className="text-white font-medium">Total</span>
                          <span className="font-bold text-white">
                            ${Number.parseFloat(getDiscountedPrice(getSelectedPlan()?.price || 0)).toFixed(2)}
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
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl gradient-text">VPS Features</h2>
              <p className="text-lg text-slate-400 max-w-[700px]">
                Our virtual private servers come packed with features to ensure maximum performance, reliability, and
                security.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  title: "High-Performance SSD Storage",
                  description: "All our VPS plans include fast SSD storage for improved performance and reliability.",
                  icon: HardDrive,
                },
                {
                  title: "Full Root Access",
                  description:
                    "Get complete control over your server with full root access and your choice of operating system.",
                  icon: Cpu,
                },
                {
                  title: "Instant Deployment",
                  description:
                    "Your VPS is deployed instantly after purchase, allowing you to start working right away.",
                  icon: Zap,
                },
                {
                  title: "99.9% Uptime Guarantee",
                  description:
                    "We guarantee 99.9% uptime for all our VPS plans, backed by our service level agreement.",
                  icon: Shield,
                },
                {
                  title: "24/7 Technical Support",
                  description:
                    "Our expert support team is available 24/7 to help you with any issues or questions you may have.",
                  icon: ServerIcon,
                },
                {
                  title: "Global Data Centers",
                  description:
                    "Choose from multiple data center locations around the world to minimize latency for your users.",
                  icon: Globe,
                },
              ].map((feature, index) => (
                <Card key={index} className="bg-[var(--bg-card)] border-slate-800">
                  <CardHeader>
                    <div className="h-10 w-10 rounded-md bg-purple-500/10 flex items-center justify-center mb-2">
                      <feature.icon className="h-5 w-5 text-purple-400" />
                    </div>
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
                Ready to launch your VPS?
              </h2>
              <p className="text-lg text-slate-400 max-w-[700px]">
                Choose the VPS plan that fits your needs and deploy in minutes. No long-term commitments required.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Link href="#" onClick={() => window.scrollTo(0, 0)}>
                  <Button size="lg" className="gradient-purple-blue gradient-purple-blue-hover">
                    View All VPS Plans
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
