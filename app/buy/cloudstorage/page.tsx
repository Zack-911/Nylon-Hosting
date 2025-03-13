"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Database, HardDrive, Server, Check, Lock, Shield, Zap } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { Slider } from "@/components/ui/slider"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"

// Storage plans data
const storagePlans = {
  object: [
    {
      id: "object-basic",
      name: "Basic",
      description: "Perfect for personal projects and small websites",
      price: 0.02, // per GB
      features: [
        "Pay only for what you use",
        "Unlimited storage capacity",
        "99.9% availability",
        "Standard data transfer rates",
        "Basic security features",
        "Web-based management console",
      ],
      popular: false,
      minStorage: 100,
    },
    {
      id: "object-standard",
      name: "Standard",
      description: "Great for businesses with moderate storage needs",
      price: 0.015, // per GB
      features: [
        "Pay only for what you use",
        "Unlimited storage capacity",
        "99.95% availability",
        "Faster data transfer rates",
        "Enhanced security features",
        "Web-based management console",
        "API access",
        "Basic analytics",
      ],
      popular: true,
      minStorage: 500,
    },
    {
      id: "object-premium",
      name: "Premium",
      description: "For enterprises with high-performance requirements",
      price: 0.01, // per GB
      features: [
        "Pay only for what you use",
        "Unlimited storage capacity",
        "99.99% availability",
        "Highest data transfer rates",
        "Advanced security features",
        "Web-based management console",
        "API access",
        "Advanced analytics",
        "Dedicated support",
        "Multi-region replication",
      ],
      popular: false,
      minStorage: 1000,
    },
  ],
  block: [
    {
      id: "block-basic",
      name: "Basic Block Storage",
      description: "SSD-based block storage for general purpose workloads",
      price: 0.1, // per GB
      features: [
        "SSD-based storage",
        "Up to 3,000 IOPS",
        "99.9% availability",
        "Snapshots and backups",
        "Easy volume management",
      ],
      popular: false,
      minStorage: 50,
    },
    {
      id: "block-performance",
      name: "Performance",
      description: "High-performance block storage for demanding applications",
      price: 0.15, // per GB
      features: [
        "NVMe SSD-based storage",
        "Up to 10,000 IOPS",
        "99.95% availability",
        "Snapshots and backups",
        "Easy volume management",
        "Low latency",
        "High throughput",
      ],
      popular: true,
      minStorage: 100,
    },
    {
      id: "block-enterprise",
      name: "Enterprise",
      description: "Enterprise-grade block storage with maximum reliability",
      price: 0.2, // per GB
      features: [
        "NVMe SSD-based storage",
        "Up to 20,000 IOPS",
        "99.99% availability",
        "Snapshots and backups",
        "Easy volume management",
        "Lowest latency",
        "Highest throughput",
        "Multi-zone replication",
        "Dedicated resources",
      ],
      popular: false,
      minStorage: 200,
    },
  ],
  backup: [
    {
      id: "backup-basic",
      name: "Basic Backup",
      description: "Essential backup solution for small businesses",
      price: 0.01, // per GB
      features: [
        "Daily backups",
        "30-day retention",
        "Web-based management",
        "Basic encryption",
        "Manual and scheduled backups",
      ],
      popular: false,
      minStorage: 100,
    },
    {
      id: "backup-business",
      name: "Business Backup",
      description: "Comprehensive backup solution for growing businesses",
      price: 0.008, // per GB
      features: [
        "Hourly backups",
        "90-day retention",
        "Web-based management",
        "Advanced encryption",
        "Manual and scheduled backups",
        "Incremental backups",
        "Faster recovery times",
      ],
      popular: true,
      minStorage: 500,
    },
    {
      id: "backup-enterprise",
      name: "Enterprise Backup",
      description: "Enterprise-grade backup solution with maximum protection",
      price: 0.006, // per GB
      features: [
        "Continuous backups",
        "365-day retention",
        "Web-based management",
        "Military-grade encryption",
        "Manual and scheduled backups",
        "Incremental backups",
        "Fastest recovery times",
        "Multi-region replication",
        "Compliance features",
      ],
      popular: false,
      minStorage: 1000,
    },
  ],
}

export default function CloudStoragePage() {
  const [storageType, setStorageType] = useState("object")
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)
  const [storageAmount, setStorageAmount] = useState(500)
  const [billingCycle, setBillingCycle] = useState("monthly")

  // Get current plans based on storage type
  const getCurrentPlans = () => {
    switch (storageType) {
      case "block":
        return storagePlans.block
      case "backup":
        return storagePlans.backup
      default:
        return storagePlans.object
    }
  }

  // Get selected plan details
  const getSelectedPlan = () => {
    return getCurrentPlans().find((plan) => plan.id === selectedPlan)
  }

  // Calculate price based on storage amount and plan
  const calculatePrice = (plan: any) => {
    if (!plan) return 0
    const basePrice = plan.price * storageAmount

    // Apply discount based on billing cycle
    switch (billingCycle) {
      case "annually":
        return basePrice * 12 * 0.8 // 20% discount for annual
      case "quarterly":
        return basePrice * 3 * 0.9 // 10% discount for quarterly
      default:
        return basePrice // No discount for monthly
    }
  }

  // Get display price with billing period
  const getDisplayPrice = (plan: any) => {
    if (!plan) return "$0.00"

    const price = calculatePrice(plan)

    switch (billingCycle) {
      case "annually":
        return `$${price.toFixed(2)}/year`
      case "quarterly":
        return `$${price.toFixed(2)}/quarter`
      default:
        return `$${price.toFixed(2)}/month`
    }
  }

  // Get monthly equivalent price for display
  const getMonthlyEquivalent = (plan: any) => {
    if (!plan) return "$0.00"

    const basePrice = plan.price * storageAmount

    switch (billingCycle) {
      case "annually":
        return (basePrice * 0.8).toFixed(2) // 20% discount
      case "quarterly":
        return (basePrice * 0.9).toFixed(2) // 10% discount
      default:
        return basePrice.toFixed(2)
    }
  }

  // Get icon based on storage type
  const getStorageIcon = () => {
    switch (storageType) {
      case "block":
        return HardDrive
      case "backup":
        return Server
      default:
        return Database
    }
  }

  const StorageIcon = getStorageIcon()

  // Get minimum storage for the selected plan
  const getMinStorage = () => {
    const selectedPlanDetails = getSelectedPlan()
    return selectedPlanDetails ? selectedPlanDetails.minStorage : 100
  }

  // Update storage amount when plan changes
  const handlePlanChange = (planId: string) => {
    setSelectedPlan(planId)
    const plan = getCurrentPlans().find((p) => p.id === planId)
    if (plan && storageAmount < plan.minStorage) {
      setStorageAmount(plan.minStorage)
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
              <Badge className="bg-purple-500/10 text-purple-400 border-purple-500/20">Secure Cloud Storage</Badge>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl md:text-6xl gradient-text">
                Cloud Storage Solutions
              </h1>
              <p className="text-xl text-slate-400 max-w-[700px]">
                Secure, scalable, and reliable cloud storage for all your data needs.
              </p>
            </div>
          </div>
        </section>

        {/* Storage Types Section */}
        <section className="w-full py-12 md:py-16 bg-[#030305]">
          <div className="container px-4 md:px-6">
            <Tabs defaultValue={storageType} onValueChange={setStorageType} className="w-full">
              <div className="flex justify-center mb-8">
                <TabsList className="grid w-full max-w-md grid-cols-3 bg-slate-800/50">
                  <TabsTrigger value="object">Object Storage</TabsTrigger>
                  <TabsTrigger value="block">Block Storage</TabsTrigger>
                  <TabsTrigger value="backup">Backup Storage</TabsTrigger>
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

              <TabsContent value={storageType} className="space-y-8">
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
                            <StorageIcon className="h-5 w-5 text-purple-400" />
                          </div>
                          <div>
                            <CardTitle className="text-white">{plan.name}</CardTitle>
                            <CardDescription className="text-slate-400">{plan.description}</CardDescription>
                          </div>
                        </div>
                        <div className="mt-2">
                          <div className="text-3xl font-bold text-white">${plan.price.toFixed(3)}/GB</div>
                          <div className="text-sm text-slate-400">Minimum {plan.minStorage} GB</div>
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
                          onClick={() => handlePlanChange(plan.id)}
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

        {/* Storage Calculator Section (shows when a plan is selected) */}
        {selectedPlan && (
          <section className="w-full py-12 md:py-24 bg-[var(--bg-dark)]">
            <div className="container px-4 md:px-6">
              <div className="max-w-3xl mx-auto">
                <div className="flex flex-col items-center text-center space-y-4 mb-10">
                  <Badge className="bg-purple-500/10 text-purple-400 border-purple-500/20">Storage Calculator</Badge>
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl gradient-text">
                    Customize Your Storage
                  </h2>
                  <p className="text-lg text-slate-400 max-w-[700px]">Adjust the amount of storage to fit your needs</p>
                </div>

                <Card className="bg-[var(--bg-card)] border-slate-800">
                  <CardHeader>
                    <CardTitle className="text-white">Storage Configuration</CardTitle>
                    <CardDescription className="text-slate-400">
                      You&apos;ve selected the {getSelectedPlan()?.name} plan with {billingCycle} billing
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-medium text-white">Storage Amount</h3>
                        <span className="text-white font-medium">{storageAmount} GB</span>
                      </div>
                      <Slider
                        min={getMinStorage()}
                        max={10000}
                        step={100}
                        value={[storageAmount]}
                        onValueChange={(value) => setStorageAmount(value[0])}
                        className="[&>span:first-child]:bg-slate-700 [&>span:last-child]:bg-purple-500"
                      />
                      <div className="flex justify-between text-xs text-slate-400">
                        <span>{getMinStorage()} GB</span>
                        <span>10,000 GB</span>
                      </div>

                      <div className="bg-slate-800/50 rounded-lg p-4 space-y-4">
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-slate-300">Storage Cost</span>
                            <span className="font-medium text-white">
                              ${(getSelectedPlan()?.price || 0 * storageAmount).toFixed(2)} / month
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-300">Billing Cycle</span>
                            <span className="font-medium text-white capitalize">{billingCycle}</span>
                          </div>
                          {billingCycle !== "monthly" && (
                            <div className="flex justify-between">
                              <span className="text-slate-300">Discount</span>
                              <span className="font-medium text-green-400">
                                {billingCycle === "annually" ? "20%" : "10%"}
                              </span>
                            </div>
                          )}
                          <Separator className="my-2 bg-slate-700" />
                          <div className="flex justify-between">
                            <span className="text-white font-medium">Total</span>
                            <div className="text-right">
                              <div className="font-bold text-white">{getDisplayPrice(getSelectedPlan())}</div>
                              {billingCycle !== "monthly" && (
                                <div className="text-sm text-slate-400">
                                  (${getMonthlyEquivalent(getSelectedPlan())} per month)
                                </div>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="pt-2">
                          <Progress value={(storageAmount / 10000) * 100} className="h-2 bg-slate-700" />
                          <div className="flex justify-between mt-2 text-xs text-slate-400">
                            <span>Current Usage</span>
                            <span>{((storageAmount / 10000) * 100).toFixed(1)}% of maximum</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <Separator className="bg-slate-700" />

                    <div className="space-y-4">
                      <h3 className="text-lg font-medium text-white">Additional Options</h3>

                      <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="multi-region"
                            className="data-[state=checked]:bg-purple-500 data-[state=checked]:border-purple-500"
                          />
                          <div>
                            <Label htmlFor="multi-region" className="text-white">
                              Multi-Region Replication
                            </Label>
                            <p className="text-xs text-slate-400">
                              Replicate your data across multiple geographic regions for increased availability (+25%)
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="enhanced-security"
                            className="data-[state=checked]:bg-purple-500 data-[state=checked]:border-purple-500"
                          />
                          <div>
                            <Label htmlFor="enhanced-security" className="text-white">
                              Enhanced Security
                            </Label>
                            <p className="text-xs text-slate-400">
                              Additional security features including encryption at rest and in transit (+10%)
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="auto-scaling"
                            className="data-[state=checked]:bg-purple-500 data-[state=checked]:border-purple-500"
                          />
                          <div>
                            <Label htmlFor="auto-scaling" className="text-white">
                              Auto-Scaling
                            </Label>
                            <p className="text-xs text-slate-400">
                              Automatically scale your storage up or down based on usage (+5%)
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex flex-col space-y-4">
                    <Button className="w-full gradient-purple-blue gradient-purple-blue-hover">
                      Proceed to Checkout
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
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl gradient-text">Cloud Storage Features</h2>
              <p className="text-lg text-slate-400 max-w-[700px]">
                Our cloud storage solutions come packed with features to ensure your data is secure, accessible, and
                reliable.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  title: "Enterprise-Grade Security",
                  description:
                    "Your data is protected with military-grade encryption, both at rest and in transit, ensuring maximum security.",
                  icon: Lock,
                },
                {
                  title: "99.99% Availability",
                  description: "Our redundant infrastructure ensures your data is always available when you need it.",
                  icon: Shield,
                },
                {
                  title: "High-Speed Access",
                  description:
                    "Access your data quickly with our high-performance storage infrastructure and global network.",
                  icon: Zap,
                },
                {
                  title: "Scalable Storage",
                  description:
                    "Easily scale your storage up or down as your needs change, without any service interruptions.",
                  icon: Database,
                },
                {
                  title: "Data Redundancy",
                  description: "Your data is automatically replicated across multiple devices to prevent data loss.",
                  icon: Server,
                },
                {
                  title: "Easy Integration",
                  description: "Integrate with your existing applications using our comprehensive API and SDKs.",
                  icon: HardDrive,
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

        {/* Use Cases Section */}
        <section className="w-full py-12 md:py-24 bg-[var(--bg-dark)]">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-4 mb-10">
              <Badge className="bg-purple-500/10 text-purple-400 border-purple-500/20">Use Cases</Badge>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl gradient-text">
                Perfect For Any Industry
              </h2>
              <p className="text-lg text-slate-400 max-w-[700px]">
                Our cloud storage solutions are designed to meet the needs of various industries and use cases.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  title: "Media & Entertainment",
                  description: "Store and distribute large media files with high-speed access and global availability.",
                  image: "/placeholder.svg?height=200&width=400",
                },
                {
                  title: "Healthcare",
                  description: "Securely store patient data and medical images with HIPAA-compliant storage solutions.",
                  image: "/placeholder.svg?height=200&width=400",
                },
                {
                  title: "Financial Services",
                  description:
                    "Keep financial records secure and accessible with our enterprise-grade security features.",
                  image: "/placeholder.svg?height=200&width=400",
                },
                {
                  title: "E-commerce",
                  description: "Store product images, videos, and customer data with scalable storage solutions.",
                  image: "/placeholder.svg?height=200&width=400",
                },
                {
                  title: "Education",
                  description:
                    "Provide students and faculty with reliable storage for educational materials and research data.",
                  image: "/placeholder.svg?height=200&width=400",
                },
                {
                  title: "Software Development",
                  description:
                    "Store code repositories, backups, and deployment artifacts with version control integration.",
                  image: "/placeholder.svg?height=200&width=400",
                },
              ].map((useCase, index) => (
                <Card key={index} className="bg-[var(--bg-card)] border-slate-800 overflow-hidden">
                  <div className="h-48 relative">
                    <Image
                      src={useCase.image || "/placeholder.svg"}
                      alt={useCase.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle className="text-white">{useCase.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-300">{useCase.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 bg-[#030305]">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-4 max-w-3xl mx-auto">
              <Badge className="bg-purple-500/10 text-purple-400 border-purple-500/20">Get Started Today</Badge>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl gradient-text">
                Ready to secure your data?
              </h2>
              <p className="text-lg text-slate-400 max-w-[700px]">
                Choose the storage solution that fits your needs and deploy in minutes. No long-term commitments
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

