"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import {
  Server,
  CpuIcon as Gpu,
  Activity,
  Wallet,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  Zap,
  Thermometer,
  RefreshCw,
  ChevronRight,
  Bitcoin,
  EclipseIcon as Ethereum,
  Settings,
  Bell,
  User,
  LogOut,
  Menu,
  X,
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
      { name: "NVIDIA RTX 4090", temp: 65, usage: 98, power: 320 },
      { name: "NVIDIA RTX 4090", temp: 67, usage: 97, power: 315 },
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
      { name: "NVIDIA RTX 3090", temp: 72, usage: 99, power: 350 },
      { name: "NVIDIA RTX 3090", temp: 74, usage: 99, power: 345 },
      { name: "NVIDIA RTX 3090", temp: 71, usage: 98, power: 348 },
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
      { name: "AMD Instinct MI250", temp: 0, usage: 0, power: 0 },
      { name: "AMD Instinct MI250", temp: 0, usage: 0, power: 0 },
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

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 relative">
        {/* Background effects */}
        <Stars count={100} />
        <GlowingOrbs count={3} />

        <div className="container max-w-7xl px-4 py-8">
          {/* Dashboard Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8" data-aos="fade-down">
            <div>
              <h1 className="text-3xl font-bold tracking-tighter gradient-text">Mining Dashboard</h1>
              <p className="text-slate-400 mt-1">Monitor your servers, mining performance, and GPU inventory</p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" className="border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white">
                <RefreshCw className="mr-2 h-4 w-4" />
                Refresh
              </Button>
              <Button className="gradient-purple-blue gradient-purple-blue-hover">
                <Plus className="mr-2 h-4 w-4" />
                Add Server
              </Button>
            </div>
          </div>

          {/* Dashboard Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Sidebar */}
            <div className="hidden lg:block lg:col-span-1">
              <div className="space-y-6 sticky top-20">
                {/* User Profile Card */}
                <Card className={`bg-[var(--bg-card)] border-slate-800 ${styles.cardHover}`} data-aos="fade-right">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="relative h-12 w-12 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center">
                        <span className="text-white font-bold text-lg">JD</span>
                      </div>
                      <div>
                        <h3 className="font-medium text-white">John Doe</h3>
                        <p className="text-sm text-slate-400">Premium Miner</p>
                      </div>
                    </div>

                    <Separator className="my-4 bg-slate-700" />

                    <div className="space-y-1">
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
                      <Button
                        variant="ghost"
                        className="w-full justify-start text-slate-300 hover:text-white hover:bg-slate-800/30"
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        Logout
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Mining Summary Card */}
                <Card
                  className={`bg-[var(--bg-card)] border-slate-800 ${styles.cardHover}`}
                  data-aos="fade-right"
                  data-aos-delay="100"
                >
                  <CardHeader>
                    <CardTitle className="text-white">Mining Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Total Hashrate</span>
                        <span className="font-medium text-white">{miningStats.totalHashrate} MH/s</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Active Workers</span>
                        <span className="font-medium text-white">{miningStats.activeWorkers}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Daily Earnings</span>
                        <span className="font-medium text-white">{miningStats.dailyEarnings} BTC</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Power Consumption</span>
                        <span className="font-medium text-white">{miningStats.powerConsumption} W</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Efficiency</span>
                        <span className="font-medium text-white">{miningStats.efficiency} MH/J</span>
                      </div>
                    </div>

                    <Separator className="bg-slate-700" />

                    <div className="pt-2">
                      <Button
                        variant="outline"
                        className="w-full border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white"
                      >
                        View Detailed Stats
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Actions Card */}
                <Card
                  className={`bg-[var(--bg-card)] border-slate-800 ${styles.cardHover}`}
                  data-aos="fade-right"
                  data-aos-delay="200"
                >
                  <CardHeader>
                    <CardTitle className="text-white">Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <Button
                      variant="outline"
                      className="w-full justify-start border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white"
                    >
                      <Zap className="mr-2 h-4 w-4 text-yellow-500" />
                      Optimize Mining
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white"
                    >
                      <Wallet className="mr-2 h-4 w-4 text-green-500" />
                      Withdraw Earnings
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white"
                    >
                      <Server className="mr-2 h-4 w-4 text-blue-500" />
                      Add New Server
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white"
                    >
                      <Gpu className="mr-2 h-4 w-4 text-purple-500" />
                      Add New GPU
                    </Button>
                  </CardContent>
                </Card>
              </div>
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
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4" data-aos="fade-up">
                <Card className={`bg-[var(--bg-card)] border-slate-800 ${styles.cardHover}`}>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm text-slate-400">Total Hashrate</p>
                        <h3 className="text-2xl font-bold text-white mt-1">{miningStats.totalHashrate} MH/s</h3>
                        <p className="text-sm text-green-400 flex items-center mt-1">
                          <ArrowUpRight className="h-3 w-3 mr-1" />
                          +5.2% from yesterday
                        </p>
                      </div>
                      <div className={`p-3 rounded-full bg-blue-500/10 ${styles.pulseAnimation}`}>
                        <Activity className="h-5 w-5 text-blue-500" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className={`bg-[var(--bg-card)] border-slate-800 ${styles.cardHover}`}>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm text-slate-400">Daily Earnings</p>
                        <h3 className="text-2xl font-bold text-white mt-1">{miningStats.dailyEarnings} BTC</h3>
                        <p className="text-sm text-green-400 flex items-center mt-1">
                          <ArrowUpRight className="h-3 w-3 mr-1" />
                          +1.2% from yesterday
                        </p>
                      </div>
                      <div className={`p-3 rounded-full bg-yellow-500/10 ${styles.pulseAnimation}`}>
                        <Bitcoin className="h-5 w-5 text-yellow-500" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className={`bg-[var(--bg-card)] border-slate-800 ${styles.cardHover}`}>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm text-slate-400">Active Servers</p>
                        <h3 className="text-2xl font-bold text-white mt-1">
                          {servers.filter((s) => s.status === "online").length}/{servers.length}
                        </h3>
                        <p className="text-sm text-red-400 flex items-center mt-1">
                          <ArrowDownRight className="h-3 w-3 mr-1" />1 server offline
                        </p>
                      </div>
                      <div className={`p-3 rounded-full bg-green-500/10 ${styles.pulseAnimation}`}>
                        <Server className="h-5 w-5 text-green-500" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

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
                <CardHeader>
                  <CardTitle className="text-white">Your Servers</CardTitle>
                  <CardDescription className="text-slate-400">Manage and monitor your mining servers</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {servers.map((server) => (
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
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white"
                          >
                            Manage
                            <ChevronRight className="ml-1 h-4 w-4" />
                          </Button>
                        </div>

                        {server.status !== "offline" && (
                          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="space-y-2">
                              <div className="flex justify-between text-sm">
                                <span className="text-slate-400">CPU Usage</span>
                                <span className="text-slate-300">{server.cpuUsage}%</span>
                              </div>
                              <Progress value={server.cpuUsage} className="h-2 bg-slate-700">
                                <div
                                  className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                                  style={{ width: `${server.cpuUsage}%` }}
                                />
                              </Progress>
                            </div>
                            <div className="space-y-2">
                              <div className="flex justify-between text-sm">
                                <span className="text-slate-400">RAM Usage</span>
                                <span className="text-slate-300">{server.ramUsage}%</span>
                              </div>
                              <Progress value={server.ramUsage} className="h-2 bg-slate-700">
                                <div
                                  className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"
                                  style={{ width: `${server.ramUsage}%` }}
                                />
                              </Progress>
                            </div>
                            <div className="space-y-2">
                              <div className="flex justify-between text-sm">
                                <span className="text-slate-400">Disk Usage</span>
                                <span className="text-slate-300">{server.diskUsage}%</span>
                              </div>
                              <Progress value={server.diskUsage} className="h-2 bg-slate-700">
                                <div
                                  className="h-full bg-gradient-to-r from-yellow-500 to-amber-500 rounded-full"
                                  style={{ width: `${server.diskUsage}%` }}
                                />
                              </Progress>
                            </div>
                          </div>
                        )}

                        {server.gpus.length > 0 && server.status !== "offline" && (
                          <div className="mt-4">
                            <h4 className="text-sm font-medium text-slate-300 mb-2">GPUs</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              {server.gpus.map((gpu, index) => (
                                <div key={index} className="p-3 rounded-md bg-slate-800/40 border border-slate-700">
                                  <div className="flex justify-between items-center mb-2">
                                    <span className="text-sm text-white">{gpu.name}</span>
                                    <Badge className="bg-purple-500/20 text-purple-400">{gpu.usage}%</Badge>
                                  </div>
                                  <div className="grid grid-cols-3 gap-2 text-xs">
                                    <div className="flex items-center">
                                      <Thermometer className="h-3 w-3 text-red-400 mr-1" />
                                      <span className="text-slate-300">{gpu.temp}°C</span>
                                    </div>
                                    <div className="flex items-center">
                                      <Zap className="h-3 w-3 text-yellow-400 mr-1" />
                                      <span className="text-slate-300">{gpu.power}W</span>
                                    </div>
                                    <div className="flex items-center">
                                      <Activity className="h-3 w-3 text-blue-400 mr-1" />
                                      <span className="text-slate-300">Active</span>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="border-t border-slate-700 px-6 py-4">
                  <Button className="w-full gradient-purple-blue gradient-purple-blue-hover">
                    <Server className="mr-2 h-4 w-4" />
                    Add New Server
                  </Button>
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

              {/* Cryptocurrency Mining Stats */}
              <Card className={`bg-[var(--bg-card)] border-slate-800 ${styles.cardHover}`} data-aos="fade-up">
                <CardHeader>
                  <CardTitle className="text-white">Cryptocurrency Mining</CardTitle>
                  <CardDescription className="text-slate-400">
                    Performance metrics for each cryptocurrency you&apos;re mining
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-6">
                    {miningStats.coins.map((coin, index) => {
                      const Icon = coin.icon
                      return (
                        <div key={index} className="p-4 rounded-lg border border-slate-700 bg-slate-800/20">
                          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                            <div className="flex items-center">
                              <div
                                className={`p-3 rounded-full ${coin.symbol === "BTC" ? "bg-yellow-500/10" : "bg-blue-500/10"} mr-4 ${styles.pulseAnimation}`}
                              >
                                <Icon
                                  className={`h-6 w-6 ${coin.symbol === "BTC" ? "text-yellow-500" : "text-blue-500"}`}
                                />
                              </div>
                              <div>
                                <h3 className="font-medium text-white">{coin.name}</h3>
                                <p className="text-sm text-slate-400">{coin.symbol}</p>
                              </div>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                              <div>
                                <p className="text-sm text-slate-400">Hashrate</p>
                                <p className="text-lg font-medium text-white">{coin.hashrate} MH/s</p>
                              </div>
                              <div>
                                <p className="text-sm text-slate-400">Daily Earnings</p>
                                <p className="text-lg font-medium text-white">
                                  {coin.daily} {coin.symbol}
                                </p>
                              </div>
                              <div>
                                <p className="text-sm text-slate-400">Status</p>
                                <Badge className="bg-green-500/20 text-green-400">Active</Badge>
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* GPU Inventory */}
              <Card className={`bg-[var(--bg-card)] border-slate-800 ${styles.cardHover}`} data-aos="fade-up">
                <CardHeader>
                  <CardTitle className="text-white">GPU Inventory</CardTitle>
                  <CardDescription className="text-slate-400">
                    Manage your GPU assets and monitor their performance
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {gpuInventory.map((gpu) => (
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
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white"
                          >
                            Details
                            <ChevronRight className="ml-1 h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="border-t border-slate-700 px-6 py-4">
                  <Button className="w-full gradient-purple-blue gradient-purple-blue-hover">
                    <Gpu className="mr-2 h-4 w-4" />
                    Add New GPU
                  </Button>
                </CardFooter>
              </Card>

              {/* Recent Payments */}
              <Card className={`bg-[var(--bg-card)] border-slate-800 ${styles.cardHover}`} data-aos="fade-up">
                <CardHeader>
                  <CardTitle className="text-white">Recent Payments</CardTitle>
                  <CardDescription className="text-slate-400">Your recent mining payouts</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {miningStats.recentPayments.map((payment, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 rounded-lg border border-slate-700 bg-slate-800/20"
                      >
                        <div className="flex items-center">
                          <div className="p-2 rounded-full bg-yellow-500/10 mr-3">
                            <Bitcoin className="h-5 w-5 text-yellow-500" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-white">BTC Payment</p>
                            <p className="text-xs text-slate-400">{payment.date}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-white">{payment.amount} BTC</p>
                          <Badge className="bg-green-500/20 text-green-400">{payment.status}</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="border-t border-slate-700 px-6 py-4">
                  <Button
                    variant="outline"
                    className="w-full border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white"
                  >
                    View All Transactions
                  </Button>
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