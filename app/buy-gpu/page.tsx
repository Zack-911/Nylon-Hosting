"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CpuIcon as Gpu, MemoryStickIcon as Memory, HardDrive, Zap, Check, ArrowRight, Rocket } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { ToSButton } from "@/components/tos-modal"

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
]

// OS options
const osOptions = [
  {
    id: "ubuntu-22-04",
    name: "Ubuntu 22.04 LTS",
    description: "Latest long-term support release with CUDA drivers pre-installed",
    icon: "/placeholder.svg?height=40&width=40",
    category: "linux",
  },
  {
    id: "ubuntu-20-04",
    name: "Ubuntu 20.04 LTS",
    description: "Stable long-term support release with CUDA drivers pre-installed",
    icon: "/placeholder.svg?height=40&width=40",
    category: "linux",
  },
  {
    id: "debian-11",
    name: "Debian 11",
    description: "Stable Debian release with CUDA drivers pre-installed",
    icon: "/placeholder.svg?height=40&width=40",
    category: "linux",
  },
  {
    id: "windows-server-2022",
    name: "Windows Server 2022",
    description: "Latest Windows Server with CUDA drivers pre-installed",
    icon: "/placeholder.svg?height=40&width=40",
    category: "windows",
  },
  {
    id: "windows-10",
    name: "Windows 10 Pro",
    description: "Windows 10 Professional with CUDA drivers pre-installed",
    icon: "/placeholder.svg?height=40&width=40",
    category: "windows",
  },
  {
    id: "ml-pytorch",
    name: "ML Environment (PyTorch)",
    description: "Ubuntu 22.04 with PyTorch, CUDA, cuDNN, and Jupyter pre-installed",
    icon: "/placeholder.svg?height=40&width=40",
    category: "ml",
  },
  {
    id: "ml-tensorflow",
    name: "ML Environment (TensorFlow)",
    description: "Ubuntu 22.04 with TensorFlow, CUDA, cuDNN, and Jupyter pre-installed",
    icon: "/placeholder.svg?height=40&width=40",
    category: "ml",
  },
  {
    id: "custom-image",
    name: "Custom Image",
    description: "Upload your own disk image or select from your saved images",
    icon: "/placeholder.svg?height=40&width=40",
    category: "custom",
  },
]

// Software options
const softwareOptions = [
  {
    id: "cuda-toolkit",
    name: "CUDA Toolkit",
    versions: ["12.3", "12.2", "11.8", "11.7"],
    description: "NVIDIA CUDA Toolkit for GPU programming",
  },
  {
    id: "pytorch",
    name: "PyTorch",
    versions: ["2.2.0", "2.1.0", "2.0.0"],
    description: "Open source machine learning framework",
  },
  {
    id: "tensorflow",
    name: "TensorFlow",
    versions: ["2.15.0", "2.14.0", "2.13.0"],
    description: "End-to-end open source platform for machine learning",
  },
  {
    id: "jupyter",
    name: "Jupyter Notebook",
    versions: ["Latest"],
    description: "Web-based interactive computing platform",
  },
  {
    id: "docker",
    name: "Docker",
    versions: ["Latest"],
    description: "Platform for developing, shipping, and running applications",
  },
  {
    id: "nvidia-driver",
    name: "NVIDIA Driver",
    versions: ["550", "535", "525"],
    description: "NVIDIA GPU drivers",
  },
]

export default function CreateInstancePage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedGpu, setSelectedGpu] = useState<string | null>(null)
  const [selectedOs, setSelectedOs] = useState<string | null>(null)
  const [osCategory, setOsCategory] = useState("linux")
  const [instanceName, setInstanceName] = useState("")
  const [storageSize, setStorageSize] = useState(100)
  const [billingCycle, setBillingCycle] = useState("hourly")

  const totalSteps = 4

  const handleNextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
      window.scrollTo(0, 0)
    }
  }

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
      window.scrollTo(0, 0)
    }
  }

  const getSelectedGpuDetails = () => {
    return gpus.find((gpu) => gpu.id === selectedGpu)
  }

  const getSelectedOsDetails = () => {
    return osOptions.find((os) => os.id === selectedOs)
  }

  const calculateEstimatedCost = () => {
    const gpu = getSelectedGpuDetails()
    if (!gpu) return { hourly: 0, daily: 0, monthly: 0 }

    // Add storage cost ($0.10 per GB per month)
    const storageCostMonthly = storageSize * 0.1
    const storageCostDaily = storageCostMonthly / 30
    const storageCostHourly = storageCostDaily / 24

    return {
      hourly: gpu.pricing.hourly + storageCostHourly,
      daily: gpu.pricing.daily + storageCostDaily,
      monthly: gpu.pricing.monthly + storageCostMonthly,
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="container max-w-6xl px-4 py-12 md:py-16 lg:py-24">
          <div className="space-y-8">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl gradient-text">
                Create GPU Instance
              </h1>
              <p className="text-lg text-slate-400">
                Configure and deploy your high-performance GPU instance in minutes
              </p>
            </div>
            {/* Progress Steps */}
            <div className="relative mt-6">
              <div className="absolute inset-x-0 top-1/2 transform -translate-y-1/2 h-0.5 bg-slate-700"></div>
              <ol className="relative z-10 flex justify-between">
                {[
                  { step: 1, title: "GPU" },
                  { step: 2, title: "OS & Software" },
                  { step: 3, title: "Storage & Network" },
                  { step: 4, title: "Review & Deploy" },
                ].map((item) => (
                  <li key={item.step} className="flex items-center space-x-2">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-full border-2 ${
                        currentStep === item.step
                          ? "gradient-purple-blue text-white border-transparent"
                          : currentStep > item.step
                            ? "bg-green-600 text-white border-transparent"
                            : "bg-slate-800 text-slate-400 border-slate-600"
                      }`}
                    >
                      {currentStep > item.step ? <Check className="h-5 w-5" /> : <span>{item.step}</span>}
                    </div>
                    <span
                      className={`hidden md:block text-sm font-medium ${
                        currentStep === item.step
                          ? "text-white"
                          : currentStep > item.step
                            ? "text-green-400"
                            : "text-slate-400"
                      }`}
                    >
                      {item.title}
                    </span>
                  </li>
                ))}
              </ol>
            </div>

            {/* Step 1: GPU Selection */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold text-white">Select GPU</h2>
                  <p className="text-slate-400">Choose the GPU that best fits your workload requirements</p>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {gpus.map((gpu) => (
                    <Card
                      key={gpu.id}
                      className={`bg-[var(--bg-card)] border-slate-800 overflow-hidden cursor-pointer transition-all ${
                        selectedGpu === gpu.id ? "ring-2 ring-purple-500 border-transparent" : "hover:border-slate-700"
                      }`}
                      onClick={() => setSelectedGpu(gpu.id)}
                    >
                      <div className="relative">
                        <Image
                          src={gpu.image || "/placeholder.svg"}
                          width={400}
                          height={200}
                          alt={gpu.name}
                          className="w-full h-40 object-cover"
                        />
                        {gpu.popular && (
                          <Badge className="absolute top-2 right-2 gradient-purple-blue text-white border-0">
                            Popular
                          </Badge>
                        )}
                        {gpu.enterprise && (
                          <Badge className="absolute top-2 right-2 bg-blue-600 text-white border-0">Enterprise</Badge>
                        )}
                        {gpu.value && (
                          <Badge className="absolute top-2 right-2 bg-green-600 text-white border-0">Best Value</Badge>
                        )}
                        {selectedGpu === gpu.id && (
                          <div className="absolute top-2 left-2 h-6 w-6 rounded-full bg-purple-500 flex items-center justify-center">
                            <Check className="h-4 w-4 text-white" />
                          </div>
                        )}
                      </div>
                      <CardHeader>
                        <div className="flex justify-between items-center">
                          <CardTitle className="text-white">{gpu.name}</CardTitle>
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
                        </div>
                        <div className="flex justify-between items-center mt-2">
                          <CardDescription className="text-slate-400">{gpu.architecture}</CardDescription>
                          <span className="text-lg font-bold text-purple-400">${gpu.pricing.hourly.toFixed(2)}/hr</span>
                        </div>
                      </CardHeader>
                      <CardContent className="text-slate-300">
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
                    </Card>
                  ))}
                </div>

                <div className="flex justify-between pt-6">
                  <Button
                    variant="outline"
                    className="border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white"
                    onClick={() => window.history.back()}
                  >
                    Cancel
                  </Button>
                  <Button
                    className="gradient-purple-blue gradient-purple-blue-hover"
                    onClick={handleNextStep}
                    disabled={!selectedGpu}
                  >
                    Continue
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}

            {/* Step 2: OS & Software Selection */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold text-white">Select Operating System & Software</h2>
                  <p className="text-slate-400">Choose the operating system and software packages for your instance</p>
                </div>

                <div className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-xl font-medium text-white">Operating System</h3>

                    <Tabs defaultValue={osCategory} onValueChange={setOsCategory} className="w-full">
                      <TabsList className="grid w-full grid-cols-4 bg-slate-800/50">
                        <TabsTrigger value="linux">Linux</TabsTrigger>
                        <TabsTrigger value="windows">Windows</TabsTrigger>
                        <TabsTrigger value="ml">ML Environments</TabsTrigger>
                        <TabsTrigger value="custom">Custom</TabsTrigger>
                      </TabsList>

                      <div className="mt-6 grid gap-4 md:grid-cols-2">
                        {osOptions
                          .filter((os) => os.category === osCategory)
                          .map((os) => (
                            <Card
                              key={os.id}
                              className={`bg-[var(--bg-card)] border-slate-800 cursor-pointer transition-all ${
                                selectedOs === os.id
                                  ? "ring-2 ring-purple-500 border-transparent"
                                  : "hover:border-slate-700"
                              }`}
                              onClick={() => setSelectedOs(os.id)}
                            >
                              <CardContent className="p-4 flex items-center space-x-4">
                                <div className="h-12 w-12 rounded bg-slate-800 flex items-center justify-center">
                                  <Image
                                    src={os.icon || "/placeholder.svg"}
                                    width={40}
                                    height={40}
                                    alt={os.name}
                                    className="w-8 h-8 object-contain"
                                  />
                                </div>
                                <div className="flex-1">
                                  <h4 className="text-white font-medium">{os.name}</h4>
                                  <p className="text-sm text-slate-400">{os.description}</p>
                                </div>
                                {selectedOs === os.id && (
                                  <div className="h-6 w-6 rounded-full bg-purple-500 flex items-center justify-center">
                                    <Check className="h-4 w-4 text-white" />
                                  </div>
                                )}
                              </CardContent>
                            </Card>
                          ))}
                      </div>
                    </Tabs>
                  </div>

                  <Separator className="my-6 bg-slate-700" />

                  <div className="space-y-4">
                    <h3 className="text-xl font-medium text-white">Software Packages</h3>
                    <p className="text-slate-400">Select additional software packages to install on your instance</p>

                    <div className="grid gap-4 md:grid-cols-2">
                      {softwareOptions.map((software) => (
                        <Card key={software.id} className="bg-[var(--bg-card)] border-slate-800">
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center space-x-2">
                                <Checkbox
                                  id={software.id}
                                  className="data-[state=checked]:bg-purple-500 data-[state=checked]:border-purple-500"
                                />
                                <Label htmlFor={software.id} className="text-white font-medium">
                                  {software.name}
                                </Label>
                              </div>
                              <Select defaultValue={software.versions[0]}>
                                <SelectTrigger className="w-[100px] bg-[var(--bg-card)] border-slate-700 text-slate-300 h-8">
                                  <SelectValue placeholder="Version" />
                                </SelectTrigger>
                                <SelectContent className="bg-[var(--bg-card)] border-slate-700">
                                  {software.versions.map((version) => (
                                    <SelectItem key={version} value={version}>
                                      {version}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                            <p className="text-sm text-slate-400 ml-6">{software.description}</p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>

                  <Separator className="my-6 bg-slate-700" />

                  <div className="space-y-4">
                    <h3 className="text-xl font-medium text-white">Startup Script (Optional)</h3>
                    <p className="text-slate-400">Add a script to run when your instance starts</p>

                    <div className="bg-[var(--bg-card)] border border-slate-700 rounded-md p-4">
                      <div className="flex items-center justify-between mb-2">
                        <Label htmlFor="startup-script" className="text-white font-medium">
                          Startup Script
                        </Label>
                        <Select defaultValue="bash">
                          <SelectTrigger className="w-[120px] bg-[var(--bg-card)] border-slate-700 text-slate-300 h-8">
                            <SelectValue placeholder="Script Type" />
                          </SelectTrigger>
                          <SelectContent className="bg-[var(--bg-card)] border-slate-700">
                            <SelectItem value="bash">Bash</SelectItem>
                            <SelectItem value="powershell">PowerShell</SelectItem>
                            <SelectItem value="python">Python</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <textarea
                        id="startup-script"
                        className="w-full h-32 rounded-md border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:outline-hidden focus:ring-2 focus:ring-purple-500 font-mono"
                        placeholder="#!/bin/bash
# Your startup script here
echo 'Instance started' > /tmp/startup.log"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-between pt-6">
                  <Button
                    variant="outline"
                    className="border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white"
                    onClick={handlePreviousStep}
                  >
                    Back
                  </Button>
                  <Button
                    className="gradient-purple-blue gradient-purple-blue-hover"
                    onClick={handleNextStep}
                    disabled={!selectedOs}
                  >
                    Continue
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}

            {/* Step 3: Storage & Network */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold text-white">Configure Storage & Network</h2>
                  <p className="text-slate-400">Set up storage volumes and network settings for your instance</p>
                </div>

                <div className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-xl font-medium text-white">Instance Details</h3>

                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="instance-name" className="text-slate-300">
                          Instance Name
                        </Label>
                        <Input
                          id="instance-name"
                          value={instanceName}
                          onChange={(e) => setInstanceName(e.target.value)}
                          placeholder="my-gpu-instance"
                          className="bg-[var(--bg-card)] border-slate-700 text-white focus-visible:ring-purple-500"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="instance-region" className="text-slate-300">
                          Region
                        </Label>
                        <Select defaultValue="us-east">
                          <SelectTrigger
                            id="instance-region"
                            className="bg-[var(--bg-card)] border-slate-700 text-white focus:ring-purple-500"
                          >
                            <SelectValue placeholder="Select region" />
                          </SelectTrigger>
                          <SelectContent className="bg-[var(--bg-card)] border-slate-700">
                            <SelectItem value="us-east">US East (N. Virginia)</SelectItem>
                            <SelectItem value="us-west">US West (Oregon)</SelectItem>
                            <SelectItem value="eu-central">EU Central (Frankfurt)</SelectItem>
                            <SelectItem value="eu-west">EU West (Ireland)</SelectItem>
                            <SelectItem value="ap-southeast">Asia Pacific (Singapore)</SelectItem>
                            <SelectItem value="ap-northeast">Asia Pacific (Tokyo)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  <Separator className="my-6 bg-slate-700" />

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-medium text-white">Storage Configuration</h3>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white"
                      >
                        Add Volume
                      </Button>
                    </div>

                    <Card className="bg-[var(--bg-card)] border-slate-800">
                      <CardHeader>
                        <CardTitle className="text-white text-lg">Root Volume</CardTitle>
                        <CardDescription className="text-slate-400">
                          Primary storage for your operating system and software
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <Label htmlFor="storage-size" className="text-slate-300">
                              Storage Size (GB)
                            </Label>
                            <span className="text-white font-medium">{storageSize} GB</span>
                          </div>
                          <Slider
                            id="storage-size"
                            min={50}
                            max={2000}
                            step={10}
                            value={[storageSize]}
                            onValueChange={(value) => setStorageSize(value[0])}
                            className="[&>span:first-child]:bg-slate-700 [&>span:last-child]:bg-purple-500"
                          />
                          <div className="flex justify-between text-xs text-slate-400">
                            <span>50 GB</span>
                            <span>2000 GB</span>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="storage-type" className="text-slate-300">
                            Storage Type
                          </Label>
                          <Select defaultValue="ssd">
                            <SelectTrigger
                              id="storage-type"
                              className="bg-[var(--bg-card)] border-slate-700 text-white focus:ring-purple-500"
                            >
                              <SelectValue placeholder="Select storage type" />
                            </SelectTrigger>
                            <SelectContent className="bg-[var(--bg-card)] border-slate-700">
                              <SelectItem value="ssd">SSD (General Purpose)</SelectItem>
                              <SelectItem value="premium-ssd">Premium SSD (High Performance)</SelectItem>
                              <SelectItem value="standard">Standard (HDD)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="delete-on-termination"
                            defaultChecked
                            className="data-[state=checked]:bg-purple-500 data-[state=checked]:border-purple-500"
                          />
                          <Label htmlFor="delete-on-termination" className="text-slate-300">
                            Delete on instance termination
                          </Label>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <Separator className="my-6 bg-slate-700" />

                  <div className="space-y-4">
                    <h3 className="text-xl font-medium text-white">Network Settings</h3>

                    <div className="grid gap-4 md:grid-cols-2">
                      <Card className="bg-[var(--bg-card)] border-slate-800">
                        <CardHeader>
                          <CardTitle className="text-white text-lg">Network Access</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <RadioGroup defaultValue="public" className="space-y-3">
                            <div className="flex items-start space-x-3">
                              <RadioGroupItem value="public" id="public" className="mt-1 text-purple-500" />
                              <div>
                                <Label htmlFor="public" className="text-white">
                                  Public Network
                                </Label>
                                <p className="text-sm text-slate-400">
                                  Instance will have a public IP address and internet access
                                </p>
                              </div>
                            </div>
                            <div className="flex items-start space-x-3">
                              <RadioGroupItem value="private" id="private" className="mt-1 text-purple-500" />
                              <div>
                                <Label htmlFor="private" className="text-white">
                                  Private Network Only
                                </Label>
                                <p className="text-sm text-slate-400">
                                  Instance will only have internal network access
                                </p>
                              </div>
                            </div>
                          </RadioGroup>

                          <div className="space-y-2">
                            <Label htmlFor="bandwidth" className="text-slate-300">
                              Bandwidth Allocation
                            </Label>
                            <Select defaultValue="standard">
                              <SelectTrigger
                                id="bandwidth"
                                className="bg-[var(--bg-card)] border-slate-700 text-white focus:ring-purple-500"
                              >
                                <SelectValue placeholder="Select bandwidth" />
                              </SelectTrigger>
                              <SelectContent className="bg-[var(--bg-card)] border-slate-700">
                                <SelectItem value="standard">Standard (1 Gbps)</SelectItem>
                                <SelectItem value="high">High Performance (5 Gbps)</SelectItem>
                                <SelectItem value="premium">Premium (10 Gbps)</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="bg-[var(--bg-card)] border-slate-800">
                        <CardHeader>
                          <CardTitle className="text-white text-lg">Security</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="security-group" className="text-slate-300">
                              Security Group
                            </Label>
                            <Select defaultValue="default">
                              <SelectTrigger
                                id="security-group"
                                className="bg-[var(--bg-card)] border-slate-700 text-white focus:ring-purple-500"
                              >
                                <SelectValue placeholder="Select security group" />
                              </SelectTrigger>
                              <SelectContent className="bg-[var(--bg-card)] border-slate-700">
                                <SelectItem value="default">Default</SelectItem>
                                <SelectItem value="web-server">Web Server</SelectItem>
                                <SelectItem value="ml-workload">ML Workload</SelectItem>
                                <SelectItem value="custom">Custom</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <Label htmlFor="ssh-key" className="text-slate-300">
                                SSH Key
                              </Label>
                              <Button variant="link" className="text-purple-400 hover:text-purple-300 p-0 h-auto">
                                Create New
                              </Button>
                            </div>
                            <Select defaultValue="my-key">
                              <SelectTrigger
                                id="ssh-key"
                                className="bg-[var(--bg-card)] border-slate-700 text-white focus:ring-purple-500"
                              >
                                <SelectValue placeholder="Select SSH key" />
                              </SelectTrigger>
                              <SelectContent className="bg-[var(--bg-card)] border-slate-700">
                                <SelectItem value="my-key">my-key-pair</SelectItem>
                                <SelectItem value="work-key">work-key-pair</SelectItem>
                                <SelectItem value="none">None (Not Recommended)</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="enable-firewall"
                              defaultChecked
                              className="data-[state=checked]:bg-purple-500 data-[state=checked]:border-purple-500"
                            />
                            <Label htmlFor="enable-firewall" className="text-slate-300">
                              Enable basic firewall protection
                            </Label>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between pt-6">
                  <Button
                    variant="outline"
                    className="border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white"
                    onClick={handlePreviousStep}
                  >
                    Back
                  </Button>
                  <Button
                    className="gradient-purple-blue gradient-purple-blue-hover"
                    onClick={handleNextStep}
                    disabled={!instanceName}
                  >
                    Continue
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}

            {/* Step 4: Review & Deploy */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold text-white">Review & Deploy</h2>
                  <p className="text-slate-400">Review your configuration and deploy your GPU instance</p>
                </div>

                <div className="space-y-6">
                  <Card className="bg-[var(--bg-card)] border-slate-800">
                    <CardHeader>
                      <CardTitle className="text-white">Instance Summary</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-3">
                          <div>
                            <h4 className="text-sm font-medium text-slate-400">Instance Name</h4>
                            <p className="text-white">{instanceName || "my-gpu-instance"}</p>
                          </div>
                          <div>
                            <h4 className="text-sm font-medium text-slate-400">Region</h4>
                            <p className="text-white">US East (N. Virginia)</p>
                          </div>
                          <div>
                            <h4 className="text-sm font-medium text-slate-400">GPU</h4>
                            <p className="text-white">{getSelectedGpuDetails()?.name || "Not selected"}</p>
                          </div>
                          <div>
                            <h4 className="text-sm font-medium text-slate-400">Operating System</h4>
                            <p className="text-white">{getSelectedOsDetails()?.name || "Not selected"}</p>
                          </div>
                        </div>
                        <div className="space-y-3">
                          <div>
                            <h4 className="text-sm font-medium text-slate-400">Storage</h4>
                            <p className="text-white">{storageSize} GB SSD (General Purpose)</p>
                          </div>
                          <div>
                            <h4 className="text-sm font-medium text-slate-400">Network</h4>
                            <p className="text-white">Public Network, Standard Bandwidth (1 Gbps)</p>
                          </div>
                          <div>
                            <h4 className="text-sm font-medium text-slate-400">Security</h4>
                            <p className="text-white">Default Security Group, SSH Key: my-key-pair</p>
                          </div>
                          <div>
                            <h4 className="text-sm font-medium text-slate-400">Software</h4>
                            <p className="text-white">CUDA Toolkit 12.3, PyTorch 2.2.0</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-[var(--bg-card)] border-slate-800">
                    <CardHeader>
                      <CardTitle className="text-white">Billing Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <RadioGroup
                        defaultValue={billingCycle}
                        onValueChange={setBillingCycle}
                        className="grid grid-cols-3 gap-4"
                      >
                        <div
                          className={`flex flex-col p-4 rounded-lg border ${
                            billingCycle === "hourly"
                              ? "border-purple-500 bg-purple-500/10"
                              : "border-slate-700 bg-slate-800/50"
                          }`}
                        >
                          <RadioGroupItem value="hourly" id="hourly" className="sr-only" />
                          <Label htmlFor="hourly" className="text-white font-medium cursor-pointer">
                            Hourly
                          </Label>
                          <p className="text-2xl font-bold text-white mt-2">
                            ${calculateEstimatedCost().hourly.toFixed(2)}
                          </p>
                          <p className="text-sm text-slate-400">per hour</p>
                        </div>
                        <div
                          className={`flex flex-col p-4 rounded-lg border ${
                            billingCycle === "daily"
                              ? "border-purple-500 bg-purple-500/10"
                              : "border-slate-700 bg-slate-800/50"
                          }`}
                        >
                          <RadioGroupItem value="daily" id="daily" className="sr-only" />
                          <Label htmlFor="daily" className="text-white font-medium cursor-pointer">
                            Daily
                          </Label>
                          <p className="text-2xl font-bold text-white mt-2">
                            ${calculateEstimatedCost().daily.toFixed(2)}
                          </p>
                          <p className="text-sm text-slate-400">per day</p>
                        </div>
                        <div
                          className={`flex flex-col p-4 rounded-lg border ${
                            billingCycle === "monthly"
                              ? "border-purple-500 bg-purple-500/10"
                              : "border-slate-700 bg-slate-800/50"
                          }`}
                        >
                          <RadioGroupItem value="monthly" id="monthly" className="sr-only" />
                          <Label htmlFor="monthly" className="text-white font-medium cursor-pointer">
                            Monthly
                          </Label>
                          <p className="text-2xl font-bold text-white mt-2">
                            ${calculateEstimatedCost().monthly.toFixed(2)}
                          </p>
                          <p className="text-sm text-slate-400">per month</p>
                        </div>
                      </RadioGroup>

                      <div className="bg-slate-800/50 rounded-lg p-4 space-y-2">
                        <div className="flex justify-between">
                          <span className="text-slate-300">GPU Cost</span>
                          <span className="font-medium text-white">
                            $
                            {billingCycle === "hourly"
                              ? getSelectedGpuDetails()?.pricing.hourly.toFixed(2)
                              : billingCycle === "daily"
                                ? getSelectedGpuDetails()?.pricing.daily.toFixed(2)
                                : getSelectedGpuDetails()?.pricing.monthly.toFixed(2)}{" "}
                            / {billingCycle === "hourly" ? "hour" : billingCycle === "daily" ? "day" : "month"}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-300">Storage Cost</span>
                          <span className="font-medium text-white">
                            $
                            {billingCycle === "hourly"
                              ? ((storageSize * 0.1) / 30 / 24).toFixed(2)
                              : billingCycle === "daily"
                                ? ((storageSize * 0.1) / 30).toFixed(2)
                                : (storageSize * 0.1).toFixed(2)}{" "}
                            / {billingCycle === "hourly" ? "hour" : billingCycle === "daily" ? "day" : "month"}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-300">Network Cost</span>
                          <span className="font-medium text-white">Included</span>
                        </div>
                        <Separator className="my-2 bg-slate-700" />
                        <div className="flex justify-between">
                          <span className="text-white font-medium">Estimated Total</span>
                          <span className="font-bold text-white">
                            $
                            {billingCycle === "hourly"
                              ? calculateEstimatedCost().hourly.toFixed(2)
                              : billingCycle === "daily"
                                ? calculateEstimatedCost().daily.toFixed(2)
                                : calculateEstimatedCost().monthly.toFixed(2)}{" "}
                            / {billingCycle === "hourly" ? "hour" : billingCycle === "daily" ? "day" : "month"}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="agree-terms"
                          className="data-[state=checked]:bg-purple-500 data-[state=checked]:border-purple-500"
                        />
                        <Label htmlFor="agree-terms" className="text-slate-300">
                          I agree to the <ToSButton /> and understand the billing terms
                        </Label>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="flex justify-between pt-6">
                  <Button
                    variant="outline"
                    className="border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white"
                    onClick={handlePreviousStep}
                  >
                    Back
                  </Button>
                  <Button className="gradient-purple-blue gradient-purple-blue-hover" size="lg">
                    <Rocket className="mr-2 h-4 w-4" />
                    Deploy Instance
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

