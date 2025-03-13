"use client"

import { SelectItem } from "@/components/ui/select"

import { SelectContent } from "@/components/ui/select"

import { SelectValue } from "@/components/ui/select"

import { SelectTrigger } from "@/components/ui/select"

import { Select } from "@/components/ui/select"

import { Separator } from "@/components/ui/separator"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Server,
  CpuIcon as Gpu,
  Wallet,
  Zap,
  ChevronRight,
  Bitcoin,
  EclipseIcon as Ethereum,
  Settings,
  Bell,
  User,
  LogOut,
  Menu,
  X,
  HardDrive,
  Database,
  BarChart3,
} from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import Stars from "@/components/particles/Stars"
import GlowingOrbs from "@/components/particles/GlowingOrbs"
import styles from "@/styles/modules/animations.module.css"

// Import chart components
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

// Import dashboard components
import DashboardSidebar from "@/components/dashboard/DashboardSidebar"
import DashboardHeader from "@/components/dashboard/DashboardHeader"
import DashboardStats from "@/components/dashboard/DashboardStats"
import { useRouter } from "next/navigation"

// Sample data for servers
const servers = [
  {
    id: "server-1",
    name: "Mining Rig Alpha",
    status: "online",
    uptime: 99.98,
    location: "US East",
    type: "GPU Server",
    lastRestart: "3 days ago",
    cpuUsage: 45,
    ramUsage: 68,
    diskUsage: 32,
    gpus: [
      { name: "NVIDIA RTX 4090", temp: 65, usage: 98, power: 320, mining: "NEXA" },
      { name: "NVIDIA RTX 4090", temp: 67, usage: 97, power: 315, mining: "RVN" },
    ],
  },
  {
    id: "server-2",
    name: "Mining Rig Beta",
    status: "online",
    uptime: 99.95,
    location: "EU Central",
    type: "GPU Server",
    lastRestart: "5 days ago",
    cpuUsage: 38,
    ramUsage: 72,
    diskUsage: 45,
    gpus: [
      { name: "NVIDIA RTX 3090", temp: 72, usage: 99, power: 350, mining: "NEXA" },
      { name: "NVIDIA RTX 3090", temp: 74, usage: 99, power: 345, mining: "NEXA" },
      { name: "NVIDIA RTX 3090", temp: 71, usage: 98, power: 348, mining: "RVN" },
    ],
  },
  {
    id: "server-3",
    name: "Web Hosting",
    status: "maintenance",
    uptime: 98.76,
    location: "Asia Pacific",
    type: "Web Server",
    lastRestart: "1 day ago",
    cpuUsage: 22,
    ramUsage: 45,
    diskUsage: 78,
    gpus: [],
  },
  {
    id: "server-4",
    name: "Discord Bot Host",
    status: "online",
    uptime: 99.99,
    location: "US West",
    type: "Application Server",
    lastRestart: "14 days ago",
    cpuUsage: 15,
    ramUsage: 32,
    diskUsage: 24,
    gpus: [],
  },
  {
    id: "server-5",
    name: "Mining Rig Gamma",
    status: "offline",
    uptime: 92.45,
    location: "EU North",
    type: "GPU Server",
    lastRestart: "2 hours ago",
    cpuUsage: 0,
    ramUsage: 0,
    diskUsage: 45,
    gpus: [
      { name: "AMD Instinct MI250", temp: 0, usage: 0, power: 0, mining: "NONE" },
      { name: "AMD Instinct MI250", temp: 0, usage: 0, power: 0, mining: "NONE" },
    ],
  },
]

// Sample data for mining stats
const miningStats = {
  totalHashrate: 1245.8, // MH/s
  activeWorkers: 7,
  dailyEarnings: 0.00245, // BTC
  weeklyEarnings: 0.01715, // BTC
  monthlyEarnings: 0.0735, // BTC
  totalPaid: 1.245, // BTC
  unpaid: 0.00872, // BTC
  powerConsumption: 3850, // Watts
  efficiency: 0.323, // MH/J
  coins: [
    { name: "Bitcoin", symbol: "BTC", hashrate: 845.2, daily: 0.00245, icon: Bitcoin },
    { name: "Ethereum", symbol: "ETH", hashrate: 400.6, daily: 0.0325, icon: Ethereum },
  ],
  recentPayments: [
    { date: "2025-03-10", amount: 0.0735, status: "completed" },
    { date: "2025-02-10", amount: 0.0682, status: "completed" },
    { date: "2025-01-10", amount: 0.0701, status: "completed" },
  ],
}

// Sample data for GPU inventory
const gpuInventory = [
  {
    id: "gpu-1",
    name: "NVIDIA RTX 4090",
    count: 2,
    totalHashrate: 240.5,
    powerDraw: 640,
    efficiency: 0.376,
    purchaseDate: "2024-09-15",
    warranty: "3 years",
    status: "active",
  },
  {
    id: "gpu-2",
    name: "NVIDIA RTX 3090",
    count: 3,
    totalHashrate: 330.6,
    powerDraw: 1050,
    efficiency: 0.315,
    purchaseDate: "2023-05-22",
    warranty: "3 years",
    status: "active",
  },
  {
    id: "gpu-3",
    name: "AMD Instinct MI250",
    count: 2,
    totalHashrate: 674.7,
    powerDraw: 1100,
    efficiency: 0.613,
    purchaseDate: "2024-01-10",
    warranty: "2 years",
    status: "inactive",
  },
]

// Sample data for charts
const hashrateHistory = [
  { date: "Mar 5", hashrate: 1150 },
  { date: "Mar 6", hashrate: 1180 },
  { date: "Mar 7", hashrate: 1210 },
  { date: "Mar 8", hashrate: 1190 },
  { date: "Mar 9", hashrate: 1220 },
  { date: "Mar 10", hashrate: 1240 },
  { date: "Mar 11", hashrate: 1245 },
]

const earningsHistory = [
  { date: "Mar 5", btc: 0.00235, usd: 142.35 },
  { date: "Mar 6", btc: 0.00242, usd: 146.65 },
  { date: "Mar 7", btc: 0.00251, usd: 152.11 },
  { date: "Mar 8", btc: 0.00238, usd: 144.23 },
  { date: "Mar 9", btc: 0.00244, usd: 147.87 },
  { date: "Mar 10", btc: 0.00245, usd: 148.48 },
  { date: "Mar 11", btc: 0.00248, usd: 150.25 },
]

const coinDistribution = [
  { name: "Bitcoin", value: 68 },
  { name: "Ethereum", value: 32 },
]

const COLORS = ["#f7931a", "#627eea", "#2775ca", "#345d9d", "#16c784"]

// Status badge component
const StatusBadge = ({ status }: { status: string }) => {
  let color = ""
  let text = ""

  switch (status) {
    case "online":
      color = "bg-green-500/20 text-green-400"
      text = "Online"
      break
    case "offline":
      color = "bg-red-500/20 text-red-400"
      text = "Offline"
      break
    case "maintenance":
      color = "bg-yellow-500/20 text-yellow-400"
      text = "Maintenance"
      break
    default:
      color = "bg-slate-500/20 text-slate-400"
      text = status
  }

  return <Badge className={color}>{text}</Badge>
}

export default function DashboardPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [selectedTimeframe, setSelectedTimeframe] = useState("24h")
  const router = useRouter()

  // Dashboard sections
  const dashboardSections = [
    { name: "Overview", icon: BarChart3, path: "/dashboard" },
    { name: "GPU Management", icon: Gpu, path: "/dashboard/gpu" },
    { name: "Hosting", icon: Server, path: "/dashboard/hosting" },
    { name: "Cloud Storage", icon: Database, path: "/dashboard/cloudstorage" },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 relative">
        {/* Background effects */}
        <Stars count={100} />
        <GlowingOrbs count={3} />

        <div className="container max-w-7xl px-4 py-8">
          {/* Dashboard Header */}
          <DashboardHeader />

          {/* Dashboard Navigation */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {dashboardSections.map((section, index) => (
              <Card
                key={index}
                className={`bg-[var(--bg-card)] border-slate-800 ${styles.cardHover} cursor-pointer`}
                onClick={() => router.push(section.path)}
              >
                <CardContent className="p-6 flex items-center">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                    <section.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium text-white">{section.name}</h3>
                    <p className="text-sm text-slate-400">
                      {section.name === "Overview" ? "Dashboard Summary" : `Manage your ${section.name.toLowerCase()}`}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Dashboard Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Sidebar */}
            <div className="hidden lg:block lg:col-span-1">
              <DashboardSidebar miningStats={miningStats} />
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden fixed bottom-6 right-6 z-50">
              <Button
                className="h-12 w-12 rounded-full gradient-purple-blue gradient-purple-blue-hover p-0 shadow-lg"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>

            {/* Mobile menu */}
            {mobileMenuOpen && (
              <div className="lg:hidden fixed inset-0 z-40 bg-black/80 backdrop-blur-sm">
                <div className="fixed bottom-20 right-6 w-64 bg-[var(--bg-card)] border border-slate-700 rounded-lg shadow-xl p-4">
                  <div className="space-y-2">
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-slate-300 hover:text-white hover:bg-slate-800/30"
                    >
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-slate-300 hover:text-white hover:bg-slate-800/30"
                    >
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-slate-300 hover:text-white hover:bg-slate-800/30"
                    >
                      <Bell className="mr-2 h-4 w-4" />
                      Notifications
                    </Button>
                    <Separator className="my-2 bg-slate-700" />
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-slate-300 hover:text-white hover:bg-slate-800/30"
                    >
                      <Zap className="mr-2 h-4 w-4 text-yellow-500" />
                      Optimize Mining
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-slate-300 hover:text-white hover:bg-slate-800/30"
                    >
                      <Wallet className="mr-2 h-4 w-4 text-green-500" />
                      Withdraw Earnings
                    </Button>
                    <Separator className="my-2 bg-slate-700" />
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-slate-300 hover:text-white hover:bg-slate-800/30"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Main Content */}
            <div className="lg:col-span-3 space-y-6">
              {/* Stats Overview */}
              <DashboardStats miningStats={miningStats} servers={servers} />

              {/* Hashrate Chart */}
              <Card className={`bg-[var(--bg-card)] border-slate-800 ${styles.cardHover}`} data-aos="fade-up">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="text-white">Hashrate Performance</CardTitle>
                    <CardDescription className="text-slate-400">
                      Monitor your mining performance over time
                    </CardDescription>
                  </div>
                  <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
                    <SelectTrigger className="w-[120px] bg-[var(--bg-card)] border-slate-700 text-slate-300">
                      <SelectValue placeholder="Timeframe" />
                    </SelectTrigger>
                    <SelectContent className="bg-[var(--bg-card)] border-slate-700">
                      <SelectItem value="24h">Last 24 Hours</SelectItem>
                      <SelectItem value="7d">Last 7 Days</SelectItem>
                      <SelectItem value="30d">Last 30 Days</SelectItem>
                      <SelectItem value="90d">Last 90 Days</SelectItem>
                    </SelectContent>
                  </Select>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={hashrateHistory} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                        <defs>
                          <linearGradient id="hashrateGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <XAxis dataKey="date" stroke="#71717a" tick={{ fill: "#a1a1aa" }} />
                        <YAxis stroke="#71717a" tick={{ fill: "#a1a1aa" }} tickFormatter={(value) => `${value} MH/s`} />
                        <CartesianGrid strokeDasharray="3 3" stroke="#1a1730" />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "#0d0b14",
                            borderColor: "#1a1730",
                            color: "#ffffff",
                          }}
                          labelStyle={{ color: "#ffffff" }}
                        />
                        <Area
                          type="monotone"
                          dataKey="hashrate"
                          stroke="#8b5cf6"
                          fillOpacity={1}
                          fill="url(#hashrateGradient)"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Servers List */}
              <Card className={`bg-[var(--bg-card)] border-slate-800 ${styles.cardHover}`} data-aos="fade-up">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="text-white">Your Servers</CardTitle>
                    <CardDescription className="text-slate-400">Manage and monitor your mining servers</CardDescription>
                  </div>
                  <Link href="/dashboard/hosting">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white"
                    >
                      View All
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Button>
                  </Link>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {servers.slice(0, 3).map((server) => (
                      <div
                        key={server.id}
                        className={`p-4 rounded-lg border border-slate-700 bg-slate-800/20 ${styles.cardHover}`}
                      >
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="font-medium text-white">{server.name}</h3>
                              <StatusBadge status={server.status} />
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-2 text-sm">
                              <div>
                                <span className="text-slate-400">Type:</span>{" "}
                                <span className="text-slate-300">{server.type}</span>
                              </div>
                              <div>
                                <span className="text-slate-400">Location:</span>{" "}
                                <span className="text-slate-300">{server.location}</span>
                              </div>
                              <div>
                                <span className="text-slate-400">Uptime:</span>{" "}
                                <span className="text-slate-300">{server.uptime}%</span>
                              </div>
                              <div>
                                <span className="text-slate-400">Last Restart:</span>{" "}
                                <span className="text-slate-300">{server.lastRestart}</span>
                              </div>
                            </div>
                          </div>
                          <Link href={`/dashboard/hosting?server=${server.id}`}>
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white"
                            >
                              Manage
                              <ChevronRight className="ml-1 h-4 w-4" />
                            </Button>
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="border-t border-slate-700 px-6 py-4">
                  <Link href="/dashboard/hosting" className="w-full">
                    <Button className="w-full gradient-purple-blue gradient-purple-blue-hover">
                      <Server className="mr-2 h-4 w-4" />
                      Manage All Servers
                    </Button>
                  </Link>
                </CardFooter>
              </Card>

              {/* Mining Stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6" data-aos="fade-up">
                {/* Earnings Chart */}
                <Card className={`bg-[var(--bg-card)] border-slate-800 ${styles.cardHover}`}>
                  <CardHeader>
                    <CardTitle className="text-white">Daily Earnings</CardTitle>
                    <CardDescription className="text-slate-400">
                      Your mining earnings over the past week
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="h-[250px] w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={earningsHistory} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#1a1730" />
                          <XAxis dataKey="date" stroke="#71717a" tick={{ fill: "#a1a1aa" }} />
                          <YAxis
                            yAxisId="left"
                            stroke="#71717a"
                            tick={{ fill: "#a1a1aa" }}
                            tickFormatter={(value) => `${value} BTC`}
                          />
                          <YAxis
                            yAxisId="right"
                            orientation="right"
                            stroke="#71717a"
                            tick={{ fill: "#a1a1aa" }}
                            tickFormatter={(value) => `$${value}`}
                          />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: "#0d0b14",
                              borderColor: "#1a1730",
                              color: "#ffffff",
                            }}
                            labelStyle={{ color: "#ffffff" }}
                          />
                          <Legend />
                          <Bar yAxisId="left" dataKey="btc" name="BTC" fill="#f7931a" radius={[4, 4, 0, 0]} />
                          <Bar yAxisId="right" dataKey="usd" name="USD" fill="#2775ca" radius={[4, 4, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                {/* Coin Distribution */}
                <Card className={`bg-[var(--bg-card)] border-slate-800 ${styles.cardHover}`}>
                  <CardHeader>
                    <CardTitle className="text-white">Mining Distribution</CardTitle>
                    <CardDescription className="text-slate-400">
                      Distribution of your mining resources by coin
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="h-[250px] w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <RechartsPieChart>
                          <Pie
                            data={coinDistribution}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          >
                            {coinDistribution.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip
                            contentStyle={{
                              backgroundColor: "#0d0b14",
                              borderColor: "#1a1730",
                              color: "#ffffff",
                            }}
                            formatter={(value, name) => [`${value}%`, name]}
                          />
                          <Legend />
                        </RechartsPieChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* GPU Inventory */}
              <Card className={`bg-[var(--bg-card)] border-slate-800 ${styles.cardHover}`} data-aos="fade-up">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="text-white">GPU Inventory</CardTitle>
                    <CardDescription className="text-slate-400">
                      Manage your GPU assets and monitor their performance
                    </CardDescription>
                  </div>
                  <Link href="/dashboard/gpu">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white"
                    >
                      View All
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Button>
                  </Link>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {gpuInventory.slice(0, 2).map((gpu) => (
                      <div
                        key={gpu.id}
                        className={`p-4 rounded-lg border border-slate-700 bg-slate-800/20 ${styles.cardHover}`}
                      >
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="font-medium text-white">{gpu.name}</h3>
                              <Badge
                                className={
                                  gpu.status === "active"
                                    ? "bg-green-500/20 text-green-400"
                                    : "bg-red-500/20 text-red-400"
                                }
                              >
                                {gpu.status === "active" ? "Active" : "Inactive"}
                              </Badge>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-2 text-sm">
                              <div>
                                <span className="text-slate-400">Count:</span>{" "}
                                <span className="text-slate-300">{gpu.count} units</span>
                              </div>
                              <div>
                                <span className="text-slate-400">Hashrate:</span>{" "}
                                <span className="text-slate-300">{gpu.totalHashrate} MH/s</span>
                              </div>
                              <div>
                                <span className="text-slate-400">Power:</span>{" "}
                                <span className="text-slate-300">{gpu.powerDraw}W</span>
                              </div>
                              <div>
                                <span className="text-slate-400">Efficiency:</span>{" "}
                                <span className="text-slate-300">{gpu.efficiency} MH/J</span>
                              </div>
                            </div>
                          </div>
                          <Link href={`/dashboard/gpu?gpu=${gpu.id}`}>
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white"
                            >
                              Details
                              <ChevronRight className="ml-1 h-4 w-4" />
                            </Button>
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="border-t border-slate-700 px-6 py-4">
                  <Link href="/dashboard/gpu" className="w-full">
                    <Button className="w-full gradient-purple-blue gradient-purple-blue-hover">
                      <Gpu className="mr-2 h-4 w-4" />
                      Manage All GPUs
                    </Button>
                  </Link>
                </CardFooter>
              </Card>

              {/* Cloud Storage Preview */}
              <Card className={`bg-[var(--bg-card)] border-slate-800 ${styles.cardHover}`} data-aos="fade-up">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="text-white">Cloud Storage</CardTitle>
                    <CardDescription className="text-slate-400">
                      Manage your files and storage resources
                    </CardDescription>
                  </div>
                  <Link href="/dashboard/cloudstorage">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white"
                    >
                      View All
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Button>
                  </Link>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-slate-800/30 rounded-lg p-4 border border-slate-700">
                      <div className="flex items-center mb-3">
                        <div className="h-8 w-8 rounded-md bg-blue-500/10 flex items-center justify-center mr-3">
                          <HardDrive className="h-4 w-4 text-blue-400" />
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-white">Storage Usage</h4>
                          <p className="text-xs text-slate-400">245 GB / 500 GB</p>
                        </div>
                      </div>
                      <Progress value={49} className="h-2 bg-slate-700" />
                    </div>

                    <div className="bg-slate-800/30 rounded-lg p-4 border border-slate-700">
                      <div className="flex items-center mb-3">
                        <div className="h-8 w-8 rounded-md bg-purple-500/10 flex items-center justify-center mr-3">
                          <Database className="h-4 w-4 text-purple-400" />
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-white">Recent Files</h4>
                          <p className="text-xs text-slate-400">12 files uploaded today</p>
                        </div>
                      </div>
                      <div className="text-xs text-slate-300">mining_data.csv, backup_2025.zip, config.json</div>
                    </div>

                    <div className="bg-slate-800/30 rounded-lg p-4 border border-slate-700">
                      <div className="flex items-center mb-3">
                        <div className="h-8 w-8 rounded-md bg-green-500/10 flex items-center justify-center mr-3">
                          <Server className="h-4 w-4 text-green-400" />
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-white">Backup Status</h4>
                          <p className="text-xs text-slate-400">Last backup: 2 hours ago</p>
                        </div>
                      </div>
                      <div className="text-xs text-green-400 flex items-center">
                        <div className="h-2 w-2 rounded-full bg-green-500 mr-1"></div>
                        All systems operational
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="border-t border-slate-700 px-6 py-4">
                  <Link href="/dashboard/cloudstorage" className="w-full">
                    <Button className="w-full gradient-purple-blue gradient-purple-blue-hover">
                      <Database className="mr-2 h-4 w-4" />
                      Manage Cloud Storage
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}