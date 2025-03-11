import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CpuIcon as Gpu, MemoryStickIcon as Memory, HardDrive, Zap, Filter, Check, Info } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

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
                GPU Products & Pricing
              </h1>
              <p className="text-xl text-slate-400 max-w-[700px]">
                Access the latest NVIDIA and AMD GPUs with flexible pricing options to fit your computational needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Button size="lg" className="gradient-purple-blue gradient-purple-blue-hover">
                  Deploy a GPU Instance
                </Button>
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

        {/* GPU Products Section */}
        <section className="w-full py-12 md:py-24 bg-[var(--bg-dark)]">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-4 mb-10">
              <Badge className="bg-purple-500/10 text-purple-400 border-purple-500/20">GPU Selection</Badge>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl gradient-text">Available GPU Models</h2>
              <p className="text-lg text-slate-400 max-w-[700px]">
                Browse our selection of high-performance GPUs for AI, machine learning, rendering, and more.
              </p>
            </div>

            {/* Filtering and Sorting Controls */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
              <div className="flex flex-wrap gap-3 w-full md:w-auto">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white"
                >
                  <Filter className="h-4 w-4 mr-2" />
                  All GPUs
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white"
                >
                  NVIDIA
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white"
                >
                  AMD
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white"
                >
                  AI/ML
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white"
                >
                  Rendering
                </Button>
              </div>
              <div className="flex gap-3 w-full md:w-auto">
                <Select defaultValue="availability">
                  <SelectTrigger className="w-full md:w-[180px] bg-[var(--bg-card)] border-slate-700 text-slate-300">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent className="bg-[var(--bg-card)] border-slate-700">
                    <SelectItem value="availability">Availability</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="memory">Memory Size</SelectItem>
                    <SelectItem value="performance">Performance</SelectItem>
                  </SelectContent>
                </Select>
                <Select defaultValue="hourly">
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
            </div>

            {/* GPU Cards Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {gpus.map((gpu) => (
                <Card key={gpu.id} className="bg-[var(--bg-card)] border-slate-800 overflow-hidden flex flex-col">
                  <div className="relative">
                    <Image
                      src={gpu.image || "/placeholder.svg"}
                      width={400}
                      height={300}
                      alt={gpu.name}
                      className="w-full h-48 object-cover"
                    />
                    {gpu.popular && (
                      <Badge className="absolute top-2 right-2 gradient-purple-blue text-white border-0">Popular</Badge>
                    )}
                    {gpu.enterprise && (
                      <Badge className="absolute top-2 right-2 bg-blue-600 text-white border-0">Enterprise</Badge>
                    )}
                    {gpu.premium && (
                      <Badge className="absolute top-2 right-2 bg-purple-600 text-white border-0">Premium</Badge>
                    )}
                    {gpu.value && (
                      <Badge className="absolute top-2 right-2 bg-green-600 text-white border-0">Best Value</Badge>
                    )}
                  </div>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-white">{gpu.name}</CardTitle>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
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
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Current availability status</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <CardDescription className="text-slate-400">{gpu.architecture}</CardDescription>
                      <span className="text-lg font-bold text-purple-400">${gpu.pricing.hourly.toFixed(2)}/hr</span>
                    </div>
                  </CardHeader>
                  <CardContent className="text-slate-300 grow">
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="flex items-start">
                        <Memory className="h-4 w-4 text-blue-500 mr-1 mt-0.5" />
                        <span className="text-sm">{gpu.memory}</span>
                      </div>
                      <div className="flex items-start">
                        <Gpu className="h-4 w-4 text-purple-500 mr-1 mt-0.5" />
                        <span className="text-sm">{gpu.cores}</span>
                      </div>
                      <div className="flex items-start">
                        <Zap className="h-4 w-4 text-yellow-500 mr-1 mt-0.5" />
                        <span className="text-sm">{gpu.tdp}</span>
                      </div>
                      <div className="flex items-start">
                        <HardDrive className="h-4 w-4 text-green-500 mr-1 mt-0.5" />
                        <span className="text-sm">{gpu.bandwidth}</span>
                      </div>
                    </div>
                    <div className="mt-2">
                      <p className="text-sm font-medium text-slate-300 mb-1">Best for:</p>
                      <div className="flex flex-wrap gap-1">
                        {gpu.bestFor.map((use, i) => (
                          <Badge key={i} variant="outline" className="bg-slate-800/50 text-slate-300 border-slate-700">
                            {use}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex flex-col gap-3">
                    <div className="w-full flex justify-between text-sm text-slate-400 px-1">
                      <span>Hourly: ${gpu.pricing.hourly.toFixed(2)}</span>
                      <span>Daily: ${gpu.pricing.daily.toFixed(2)}</span>
                      <span>Monthly: ${gpu.pricing.monthly.toFixed(0)}</span>
                    </div>
                    <div className="flex gap-2 w-full">
                      <Button className="flex-1 gradient-purple-blue gradient-purple-blue-hover">Deploy Now</Button>
                      <Button
                        variant="outline"
                        className="border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white"
                      >
                        Details
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>

            <div className="flex justify-center mt-10">
              <Button size="lg" className="gradient-purple-blue gradient-purple-blue-hover">
                View All GPU Options
              </Button>
            </div>
          </div>
        </section>

        {/* Pricing Comparison Table */}
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
                        {gpus.map((gpu) => (
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
                              <Button size="sm" className="gradient-purple-blue gradient-purple-blue-hover">
                                Deploy
                              </Button>
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
                        {gpus.map((gpu) => (
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
                              <Button size="sm" className="gradient-purple-blue gradient-purple-blue-hover">
                                Deploy
                              </Button>
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
                        {gpus.map((gpu) => (
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
                              <Button size="sm" className="gradient-purple-blue gradient-purple-blue-hover">
                                Deploy
                              </Button>
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

        {/* Technical Specifications Section */}
        <section className="w-full py-12 md:py-24 bg-[var(--bg-dark)]">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-4 mb-10">
              <Badge className="bg-purple-500/10 text-purple-400 border-purple-500/20">Technical Details</Badge>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl gradient-text">GPU Specifications</h2>
              <p className="text-lg text-slate-400 max-w-[700px]">
                Detailed technical specifications to help you choose the right GPU for your workload.
              </p>
            </div>

            <div className="overflow-hidden rounded-lg border border-slate-700 bg-[var(--bg-card)]">
              <Table>
                <TableHeader>
                  <TableRow className="border-slate-700 hover:bg-transparent">
                    <TableHead className="text-slate-300">GPU Model</TableHead>
                    <TableHead className="text-slate-300">Memory</TableHead>
                    <TableHead className="text-slate-300">CUDA Cores</TableHead>
                    <TableHead className="text-slate-300">Memory Bandwidth</TableHead>
                    <TableHead className="text-slate-300">TDP</TableHead>
                    <TableHead className="text-slate-300">Architecture</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {gpus.map((gpu) => (
                    <TableRow key={gpu.id} className="border-slate-700 hover:bg-slate-800/30">
                      <TableCell className="font-medium text-white">{gpu.name}</TableCell>
                      <TableCell>{gpu.memory}</TableCell>
                      <TableCell>{gpu.cores}</TableCell>
                      <TableCell>{gpu.bandwidth}</TableCell>
                      <TableCell>{gpu.tdp}</TableCell>
                      <TableCell>{gpu.architecture}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <div className="mt-10 space-y-6 max-w-3xl mx-auto">
              <div className="bg-[var(--bg-card)] border border-slate-700 rounded-lg p-6">
                <h3 className="text-xl font-bold text-white mb-4">Performance Comparison</h3>
                <p className="text-slate-400 mb-4">
                  The following chart provides a relative performance comparison for common workloads:
                </p>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-slate-300">AI Training</span>
                      <span className="text-sm text-slate-400">
                        H100 &gt; A100 &gt; RTX 4090 &gt; A6000 &gt; RTX 4080
                      </span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-2.5">
                      <div
                        className="bg-linear-to-r from-purple-600 to-blue-600 h-2.5 rounded-full"
                        style={{ width: "100%" }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-slate-300">3D Rendering</span>
                      <span className="text-sm text-slate-400">
                        RTX 4090 &gt; A6000 &gt; RTX 3090 &gt; RTX 4080 &gt; A5000
                      </span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-2.5">
                      <div
                        className="bg-linear-to-r from-purple-600 to-blue-600 h-2.5 rounded-full"
                        style={{ width: "90%" }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-slate-300">Scientific Computing</span>
                      <span className="text-sm text-slate-400">MI250 &gt; H100 &gt; A100 &gt; A6000 &gt; RTX 4090</span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-2.5">
                      <div
                        className="bg-linear-to-r from-purple-600 to-blue-600 h-2.5 rounded-full"
                        style={{ width: "85%" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-[var(--bg-card)] border border-slate-700 rounded-lg p-6">
                <h3 className="text-xl font-bold text-white mb-4">Software Compatibility</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-lg font-medium text-white mb-2">NVIDIA GPUs</h4>
                    <ul className="space-y-1 text-slate-400">
                      <li className="flex items-start">
                        <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                        CUDA Toolkit (11.x, 12.x)
                      </li>
                      <li className="flex items-start">
                        <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                        TensorRT, cuDNN
                      </li>
                      <li className="flex items-start">
                        <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                        PyTorch, TensorFlow, JAX
                      </li>
                      <li className="flex items-start">
                        <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                        NVIDIA Container Runtime
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-white mb-2">AMD GPUs</h4>
                    <ul className="space-y-1 text-slate-400">
                      <li className="flex items-start">
                        <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                        ROCm Platform
                      </li>
                      <li className="flex items-start">
                        <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                        HIP (Heterogeneous-Compute Interface)
                      </li>
                      <li className="flex items-start">
                        <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                        PyTorch for ROCm
                      </li>
                      <li className="flex items-start">
                        <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                        TensorFlow for ROCm
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

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
                  Deploy your first GPU instance in minutes. No long-term commitments required, and you can scale up or
                  down as your needs change.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <Button size="lg" className="gradient-purple-blue gradient-purple-blue-hover">
                    Deploy a GPU Instance
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white"
                  >
                    Contact Sales
                  </Button>
                </div>
              </div>
              <div className="flex-1 glow-effect">
                <Card className="bg-[var(--bg-card)]/70 border-slate-800 backdrop-blur-xs relative z-10">
                  <CardHeader>
                    <CardTitle className="text-white">Need help choosing?</CardTitle>
                    <CardDescription className="text-slate-400">
                      Our GPU experts can help you select the right hardware for your specific workload.
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
                          <option value="scientific">Scientific Computing</option>
                          <option value="gaming">Game Development</option>
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

        {/* FAQ Section */}
        <section className="w-full py-12 md:py-24 bg-[var(--bg-dark)]">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-4 mb-10">
              <Badge className="bg-purple-500/10 text-purple-400 border-purple-500/20">
                Frequently Asked Questions
              </Badge>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl gradient-text">
                Common Questions About GPU Hosting
              </h2>
              <p className="text-lg text-slate-400 max-w-[700px]">
                Find answers to the most common questions about our GPU products and pricing.
              </p>
            </div>

            <div className="max-w-3xl mx-auto space-y-4">
              {[
                {
                  question: "How do I choose the right GPU for my workload?",
                  answer:
                    "Consider your specific requirements: For AI training, H100 or A100 GPUs offer the best performance. For rendering, RTX 4090 or A6000 are excellent choices. For general ML development, RTX 4080 or RTX 3090 provide good value. Our team can provide personalized recommendations based on your specific needs.",
                },
                {
                  question: "What operating systems are supported?",
                  answer:
                    "We support a wide range of operating systems including Ubuntu 20.04/22.04, CentOS 7/8, Windows Server 2019/2022, and custom images with pre-installed ML frameworks like PyTorch, TensorFlow, and CUDA toolkit.",
                },
                {
                  question: "How is billing calculated?",
                  answer:
                    "For hourly billing, you're charged only for the time your instance is running. Daily rates apply for instances running more than 12 hours in a 24-hour period. Monthly rates provide the best value for continuous usage and are billed upfront for a 30-day period.",
                },
                {
                  question: "Can I upgrade or downgrade my GPU?",
                  answer:
                    "Yes, you can upgrade or downgrade your GPU at any time. For upgrades, the change is typically immediate (subject to availability). For downgrades, changes take effect at the next billing cycle to avoid disruption to your workloads.",
                },
                {
                  question: "What support is included?",
                  answer:
                    "All plans include standard technical support via email with 24-hour response time. Professional and Enterprise plans include priority support with faster response times and direct access to our GPU specialists. Enterprise plans also include a dedicated account manager.",
                },
              ].map((faq, index) => (
                <Card key={index} className="bg-[var(--bg-card)] border-slate-800">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <Info className="h-5 w-5 text-purple-500 mr-2" />
                      {faq.question}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-300">{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="flex justify-center mt-10">
              <Button variant="outline" className="border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white">
                View All FAQs
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

