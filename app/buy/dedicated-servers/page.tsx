"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ServerIcon, HardDrive, Cpu, MemoryStickIcon as Memory, Network, Check, Shield, Zap } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import Link from "next/link"

// Server plans data
const serverPlans = {
  standard: [
    {
      id: "standard-entry",
      name: "Entry Server",
      description: "Perfect for small businesses and development environments",
      price: 99.99,
      specs: {
        cpu: "Intel Xeon E-2276G (6 cores, 3.8GHz)",
        ram: "32GB DDR4 ECC",
        storage: "2 x 1TB NVMe SSD",
        bandwidth: "10TB @ 1Gbps",
      },
      features: [
        "99.9% Uptime SLA",
        "24/7 Technical Support",
        "RAID 1 Configuration",
        "Remote Reboot",
        "1 IPv4 Address",
        "DDoS Protection (Basic)",
      ],
      popular: false,
    },
    {
      id: "standard-business",
      name: "Business Server",
      description: "Ideal for growing businesses and applications",
      price: 199.99,
      specs: {
        cpu: "Intel Xeon Silver 4214 (12 cores, 2.2GHz)",
        ram: "64GB DDR4 ECC",
        storage: "2 x 2TB NVMe SSD",
        bandwidth: "20TB @ 1Gbps",
      },
      features: [
        "99.95% Uptime SLA",
        "24/7 Priority Support",
        "RAID 1 Configuration",
        "Remote Reboot",
        "2 IPv4 Addresses",
        "DDoS Protection (Advanced)",
        "Hardware Monitoring",
        "Automated Backups",
      ],
      popular: true,
    },
    {
      id: "standard-enterprise",
      name: "Enterprise Server",
      description: "For enterprise-grade applications and high traffic websites",
      price: 299.99,
      specs: {
        cpu: "Dual Intel Xeon Silver 4214 (24 cores total, 2.2GHz)",
        ram: "128GB DDR4 ECC",
        storage: "2 x 4TB NVMe SSD",
        bandwidth: "Unlimited @ 10Gbps",
      },
      features: [
        "99.99% Uptime SLA",
        "24/7 Priority Support",
        "RAID 10 Configuration",
        "Remote Reboot",
        "5 IPv4 Addresses",
        "DDoS Protection (Premium)",
        "Hardware Monitoring",
        "Automated Backups",
        "Dedicated Account Manager",
        "Hardware Replacement Guarantee",
      ],
      popular: false,
    },
  ],
  storage: [
    {
      id: "storage-basic",
      name: "Storage Server Basic",
      description: "Cost-effective storage solution for backups and archives",
      price: 149.99,
      specs: {
        cpu: "Intel Xeon E-2236 (6 cores, 3.4GHz)",
        ram: "32GB DDR4 ECC",
        storage: "4 x 4TB SATA HDD (RAID 5)",
        bandwidth: "20TB @ 1Gbps",
      },
      features: [
        "99.9% Uptime SLA",
        "24/7 Technical Support",
        "RAID 5 Configuration",
        "Remote Reboot",
        "1 IPv4 Address",
        "DDoS Protection (Basic)",
        "Hardware Monitoring",
      ],
      popular: false,
    },
    {
      id: "storage-advanced",
      name: "Storage Server Advanced",
      description: "High-capacity storage with improved performance",
      price: 249.99,
      specs: {
        cpu: "Intel Xeon E-2278G (8 cores, 3.4GHz)",
        ram: "64GB DDR4 ECC",
        storage: "8 x 4TB SATA HDD (RAID 10) + 2 x 1TB NVMe SSD (Cache)",
        bandwidth: "30TB @ 1Gbps",
      },
      features: [
        "99.95% Uptime SLA",
        "24/7 Priority Support",
        "RAID 10 Configuration with SSD Cache",
        "Remote Reboot",
        "2 IPv4 Addresses",
        "DDoS Protection (Advanced)",
        "Hardware Monitoring",
        "Automated Backups",
      ],
      popular: true,
    },
    {
      id: "storage-enterprise",
      name: "Storage Server Enterprise",
      description: "Enterprise-grade storage solution with maximum capacity",
      price: 399.99,
      specs: {
        cpu: "Dual Intel Xeon Silver 4210 (20 cores total, 2.2GHz)",
        ram: "128GB DDR4 ECC",
        storage: "12 x 8TB SATA HDD (RAID 10) + 4 x 2TB NVMe SSD (Cache)",
        bandwidth: "Unlimited @ 10Gbps",
      },
      features: [
        "99.99% Uptime SLA",
        "24/7 Priority Support",
        "RAID 10 Configuration with SSD Cache",
        "Remote Reboot",
        "5 IPv4 Addresses",
        "DDoS Protection (Premium)",
        "Hardware Monitoring",
        "Automated Backups",
        "Dedicated Account Manager",
        "Hardware Replacement Guarantee",
      ],
      popular: false,
    },
  ],
  compute: [
    {
      id: "compute-performance",
      name: "Performance Server",
      description: "High-performance computing for CPU-intensive workloads",
      price: 249.99,
      specs: {
        cpu: "AMD EPYC 7302 (16 cores, 3.0GHz)",
        ram: "64GB DDR4 ECC",
        storage: "2 x 2TB NVMe SSD",
        bandwidth: "20TB @ 1Gbps",
      },
      features: [
        "99.95% Uptime SLA",
        "24/7 Priority Support",
        "RAID 1 Configuration",
        "Remote Reboot",
        "2 IPv4 Addresses",
        "DDoS Protection (Advanced)",
        "Hardware Monitoring",
        "Automated Backups",
      ],
      popular: false,
    },
    {
      id: "compute-advanced",
      name: "Advanced Compute",
      description: "For high-performance computing and data processing",
      price: 349.99,
      specs: {
        cpu: "AMD EPYC 7402 (24 cores, 2.8GHz)",
        ram: "128GB DDR4 ECC",
        storage: "2 x 3TB NVMe SSD",
        bandwidth: "30TB @ 10Gbps",
      },
      features: [
        "99.95% Uptime SLA",
        "24/7 Priority Support",
        "RAID 1 Configuration",
        "Remote Reboot",
        "3 IPv4 Addresses",
        "DDoS Protection (Advanced)",
        "Hardware Monitoring",
        "Automated Backups",
        "Priority Resource Allocation",
      ],
      popular: true,
    },
    {
      id: "compute-ultimate",
      name: "Ultimate Compute",
      description: "Maximum computing power for the most demanding workloads",
      price: 499.99,
      specs: {
        cpu: "Dual AMD EPYC 7402 (48 cores total, 2.8GHz)",
        ram: "256GB DDR4 ECC",
        storage: "4 x 3TB NVMe SSD (RAID 10)",
        bandwidth: "Unlimited @ 10Gbps",
      },
      features: [
        "99.99% Uptime SLA",
        "24/7 Priority Support",
        "RAID 10 Configuration",
        "Remote Reboot",
        "5 IPv4 Addresses",
        "DDoS Protection (Premium)",
        "Hardware Monitoring",
        "Automated Backups",
        "Dedicated Account Manager",
        "Hardware Replacement Guarantee",
        "Priority Resource Allocation",
      ],
      popular: false,
    },
  ],
}

export default function DedicatedServersPage() {
  const [serverType, setServerType] = useState("standard")
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

  // Get current plans based on server type
  const getCurrentPlans = () => {
    switch (serverType) {
      case "storage":
        return serverPlans.storage
      case "compute":
        return serverPlans.compute
      default:
        return serverPlans.standard
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
              <Badge className="bg-purple-500/10 text-purple-400 border-purple-500/20">Enterprise Hardware</Badge>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl md:text-6xl gradient-text">
                Dedicated Servers
              </h1>
              <p className="text-xl text-slate-400 max-w-[700px]">
                High-performance dedicated servers with full control and customization options.
              </p>
            </div>
          </div>
        </section>

        {/* Server Types Section */}
        <section className="w-full py-12 md:py-16 bg-[#030305]">
          <div className="container px-4 md:px-6">
            <Tabs defaultValue={serverType} onValueChange={setServerType} className="w-full">
              <div className="flex justify-center mb-8">
                <TabsList className="grid w-full max-w-md grid-cols-3 bg-slate-800/50">
                  <TabsTrigger value="standard">Standard</TabsTrigger>
                  <TabsTrigger value="storage">Storage</TabsTrigger>
                  <TabsTrigger value="compute">Compute</TabsTrigger>
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

              <TabsContent value={serverType} className="space-y-8">
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
                            <ServerIcon className="h-5 w-5 text-purple-400" />
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
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl gradient-text">
                    Configure Your Server
                  </h2>
                  <p className="text-lg text-slate-400 max-w-[700px]">
                    Customize your dedicated server with the options below
                  </p>
                </div>

                <Card className="bg-[var(--bg-card)] border-slate-800">
                  <CardHeader>
                    <CardTitle className="text-white">Server Configuration</CardTitle>
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
                            id="managed-services"
                            className="data-[state=checked]:bg-purple-500 data-[state=checked]:border-purple-500"
                          />
                          <div>
                            <Label htmlFor="managed-services" className="text-white">
                              Managed Services
                            </Label>
                            <p className="text-xs text-slate-400">
                              Our team handles server maintenance, updates, and security (+$99/month)
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
                            <p className="text-xs text-slate-400">Daily backups with 30-day retention (+$49/month)</p>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="ddos-protection"
                            className="data-[state=checked]:bg-purple-500 data-[state=checked]:border-purple-500"
                          />
                          <div>
                            <Label htmlFor="ddos-protection" className="text-white">
                              Advanced DDoS Protection
                            </Label>
                            <p className="text-xs text-slate-400">
                              Enterprise-grade DDoS protection with 24/7 monitoring (+$79/month)
                            </p>
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
                        <Label htmlFor="company" className="text-slate-300">
                          Company (Optional)
                        </Label>
                        <Input
                          id="company"
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
                          <span className="font-medium text-white">$49.99</span>
                        </div>
                        <Separator className="my-2 bg-slate-700" />
                        <div className="flex justify-between">
                          <span className="text-white font-medium">Total</span>
                          <span className="font-bold text-white">
                            ${(Number.parseFloat(getDiscountedPrice(getSelectedPlan()?.price || 0)) + 49.99).toFixed(2)}
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
                Dedicated Server Features
              </h2>
              <p className="text-lg text-slate-400 max-w-[700px]">
                Our dedicated servers come packed with features to ensure maximum performance, reliability, and
                security.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  title: "Enterprise-Grade Hardware",
                  description:
                    "All our servers feature the latest Intel Xeon or AMD EPYC processors, ECC memory, and NVMe SSDs.",
                  icon: ServerIcon,
                },
                {
                  title: "99.99% Uptime Guarantee",
                  description:
                    "We guarantee 99.99% uptime for all our dedicated servers, backed by our service level agreement.",
                  icon: Shield,
                },
                {
                  title: "Full Root Access",
                  description:
                    "Get complete control over your server with full root access and your choice of operating system.",
                  icon: Cpu,
                },
                {
                  title: "DDoS Protection",
                  description:
                    "All servers include DDoS protection to keep your applications and services safe from attacks.",
                  icon: Shield,
                },
                {
                  title: "24/7 Technical Support",
                  description:
                    "Our expert support team is available 24/7 to help you with any issues or questions you may have.",
                  icon: Zap,
                },
                {
                  title: "Global Data Centers",
                  description:
                    "Choose from multiple data center locations around the world to minimize latency for your users.",
                  icon: Network,
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
                Ready to power your applications?
              </h2>
              <p className="text-lg text-slate-400 max-w-[700px]">
                Choose the dedicated server that fits your needs and deploy in minutes. No long-term commitments
                required.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Link href="#" onClick={() => window.scrollTo(0, 0)}>
                  <Button size="lg" className="gradient-purple-blue gradient-purple-blue-hover">
                    View All Servers
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
