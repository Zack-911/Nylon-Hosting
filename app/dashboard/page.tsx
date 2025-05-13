"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Server,
  HardDrive,
  Database,
  BarChart3,
  Activity,
  Globe,
  Shield,
  Clock,
  Users,
  Bell,
  Settings,
  User,
  LogOut,
  Menu,
  X,
  ChevronRight,
  Terminal,
} from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import Stars from "@/components/particles/Stars"
import GlowingOrbs from "@/components/particles/GlowingOrbs"
import styles from "@/styles/modules/animations.module.css"
import { useRouter } from "next/navigation"

// Import chart components
import {
  AreaChart,
  Area,
  LineChart,
  Line,
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
    name: "Web Server Alpha",
    status: "online",
    uptime: 99.98,
    location: "US East",
    type: "Web Server",
    lastRestart: "3 days ago",
    cpuUsage: 45,
    ramUsage: 68,
    diskUsage: 32,
  },
  {
    id: "server-2",
    name: "Database Cluster",
    status: "online",
    uptime: 99.95,
    location: "EU Central",
    type: "Database Server",
    lastRestart: "5 days ago",
    cpuUsage: 38,
    ramUsage: 72,
    diskUsage: 45,
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
  },
  {
    id: "server-5",
    name: "Dev Environment",
    status: "offline",
    uptime: 92.45,
    location: "EU North",
    type: "Development Server",
    lastRestart: "2 hours ago",
    cpuUsage: 0,
    ramUsage: 0,
    diskUsage: 45,
  },
]

// Sample data for performance metrics
const performanceData = {
  cpu: 42,
  memory: 68,
  storage: 56,
  network: 78,
  requests: 1245,
  responseTime: 187, // ms
  activeUsers: 342,
  totalServers: 12,
  healthyServers: 11,
}

// Sample data for charts
const serverLoadHistory = [
  { time: "00:00", load: 42 },
  { time: "04:00", load: 38 },
  { time: "08:00", load: 65 },
  { time: "12:00", load: 78 },
  { time: "16:00", load: 82 },
  { time: "20:00", load: 54 },
  { time: "24:00", load: 42 },
]

const networkTraffic = [
  { time: "00:00", incoming: 32, outgoing: 24 },
  { time: "04:00", incoming: 28, outgoing: 18 },
  { time: "08:00", incoming: 45, outgoing: 35 },
  { time: "12:00", incoming: 68, outgoing: 52 },
  { time: "16:00", incoming: 72, outgoing: 58 },
  { time: "20:00", incoming: 54, outgoing: 42 },
  { time: "24:00", incoming: 38, outgoing: 28 },
]

const responseTimeData = [
  { time: "00:00", responseTime: 210 },
  { time: "04:00", responseTime: 180 },
  { time: "08:00", responseTime: 250 },
  { time: "12:00", responseTime: 320 },
  { time: "16:00", responseTime: 280 },
  { time: "20:00", responseTime: 220 },
  { time: "24:00", responseTime: 190 },
]

const storageUsageData = [
  { name: "System", value: 15 },
  { name: "Applications", value: 25 },
  { name: "User Data", value: 45 },
  { name: "Free Space", value: 15 },
]

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

// Metric Card Component
const MetricCard = ({ icon: Icon, title, value, description, trend, color = "text-blue-500" }: any) => (
  <Card className={`bg-[var(--bg-card)] border-slate-800 ${styles.cardHover}`}>
    <CardContent className="p-6">
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-sm text-slate-400">{title}</p>
          <div className="flex items-baseline space-x-2">
            <h3 className="text-2xl font-bold text-white">{value}</h3>
            {trend && (
              <span className={`text-xs ${trend > 0 ? "text-green-400" : "text-red-400"}`}>
                {trend > 0 ? "+" : ""}
                {trend}%
              </span>
            )}
          </div>
          {description && <p className="text-xs text-slate-500">{description}</p>}
        </div>
        <div className={`h-10 w-10 rounded-full bg-${color.split("-")[1]}-500/10 flex items-center justify-center`}>
          <Icon className={`h-5 w-5 ${color}`} />
        </div>
      </div>
    </CardContent>
  </Card>
)

export default function DashboardPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [selectedTimeframe, setSelectedTimeframe] = useState("24h")
  const router = useRouter()

  // Dashboard sections
  const dashboardSections = [
    { name: "Overview", icon: BarChart3, path: "/dashboard" },
    { name: "Servers", icon: Server, path: "/dashboard/hosting" },
    { name: "Cloud Storage", icon: Database, path: "/dashboard/cloudstorage" },
    { name: "Analytics", icon: Activity, path: "/dashboard/analytics" },
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
          <div className="mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold tracking-tighter gradient-text">Dashboard</h1>
                <p className="text-slate-400 mt-1">Welcome back! Here's an overview of your infrastructure.</p>
              </div>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  className="border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white"
                >
                  <Bell className="h-4 w-4 mr-2" />
                  Notifications
                </Button>
                <Button className="gradient-purple-blue gradient-purple-blue-hover">
                  <Server className="h-4 w-4 mr-2" />
                  Deploy New Server
                </Button>
              </div>
            </div>
          </div>

          {/* Dashboard Navigation */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
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
              <Card className="bg-[var(--bg-card)] border-slate-800">
                <CardHeader>
                  <CardTitle className="text-white">System Status</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">CPU Usage</span>
                      <span className="text-white">{performanceData.cpu}%</span>
                    </div>
                    <Progress value={performanceData.cpu} className="h-2" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Memory Usage</span>
                      <span className="text-white">{performanceData.memory}%</span>
                    </div>
                    <Progress value={performanceData.memory} className="h-2" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Storage Usage</span>
                      <span className="text-white">{performanceData.storage}%</span>
                    </div>
                    <Progress value={performanceData.storage} className="h-2" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Network Usage</span>
                      <span className="text-white">{performanceData.network}%</span>
                    </div>
                    <Progress value={performanceData.network} className="h-2" />
                  </div>

                  <div className="pt-4 border-t border-slate-700">
                    <h4 className="text-sm font-medium text-white mb-3">Quick Actions</h4>
                    <div className="space-y-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full justify-start text-slate-300 hover:text-white hover:bg-slate-800/30"
                      >
                        <Shield className="mr-2 h-4 w-4 text-blue-500" />
                        Security Scan
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full justify-start text-slate-300 hover:text-white hover:bg-slate-800/30"
                      >
                        <Clock className="mr-2 h-4 w-4 text-purple-500" />
                        Schedule Backup
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full justify-start text-slate-300 hover:text-white hover:bg-slate-800/30"
                      >
                        <Terminal className="mr-2 h-4 w-4 text-green-500" />
                        Console Access
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
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
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <MetricCard
                  icon={Server}
                  title="Active Servers"
                  value={performanceData.healthyServers}
                  description={`of ${performanceData.totalServers} total servers`}
                  trend={8.5}
                  color="text-blue-500"
                />
                <MetricCard
                  icon={Users}
                  title="Active Users"
                  value={performanceData.activeUsers}
                  trend={12.3}
                  color="text-purple-500"
                />
                <MetricCard
                  icon={Activity}
                  title="Response Time"
                  value={`${performanceData.responseTime}ms`}
                  trend={-5.2}
                  color="text-green-500"
                />
                <MetricCard
                  icon={Globe}
                  title="Requests"
                  value={performanceData.requests.toLocaleString()}
                  description="requests per minute"
                  trend={3.7}
                  color="text-cyan-500"
                />
              </div>

              {/* Server Load Chart */}
              <Card className={`bg-[var(--bg-card)] border-slate-800 ${styles.cardHover}`} data-aos="fade-up">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="text-white">Server Load</CardTitle>
                    <CardDescription className="text-slate-400">CPU utilization across all servers</CardDescription>
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
                      <AreaChart data={serverLoadHistory} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                        <defs>
                          <linearGradient id="serverLoadGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <XAxis dataKey="time" stroke="#71717a" tick={{ fill: "#a1a1aa" }} />
                        <YAxis stroke="#71717a" tick={{ fill: "#a1a1aa" }} tickFormatter={(value) => `${value}%`} />
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
                          dataKey="load"
                          stroke="#8b5cf6"
                          fillOpacity={1}
                          fill="url(#serverLoadGradient)"
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
                    <CardDescription className="text-slate-400">Manage and monitor your servers</CardDescription>
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

              {/* Performance Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6" data-aos="fade-up">
                {/* Network Traffic Chart */}
                <Card className={`bg-[var(--bg-card)] border-slate-800 ${styles.cardHover}`}>
                  <CardHeader>
                    <CardTitle className="text-white">Network Traffic</CardTitle>
                    <CardDescription className="text-slate-400">Incoming and outgoing network traffic</CardDescription>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="h-[250px] w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={networkTraffic} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                          <defs>
                            <linearGradient id="incomingGradient" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id="outgoingGradient" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8} />
                              <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                            </linearGradient>
                          </defs>
                          <XAxis dataKey="time" stroke="#71717a" tick={{ fill: "#a1a1aa" }} />
                          <YAxis stroke="#71717a" tick={{ fill: "#a1a1aa" }} />
                          <CartesianGrid strokeDasharray="3 3" stroke="#1a1730" />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: "#0d0b14",
                              borderColor: "#1a1730",
                              color: "#ffffff",
                            }}
                            labelStyle={{ color: "#ffffff" }}
                          />
                          <Legend />
                          <Area
                            type="monotone"
                            dataKey="incoming"
                            name="Incoming"
                            stroke="#3b82f6"
                            fillOpacity={1}
                            fill="url(#incomingGradient)"
                          />
                          <Area
                            type="monotone"
                            dataKey="outgoing"
                            name="Outgoing"
                            stroke="#8b5cf6"
                            fillOpacity={1}
                            fill="url(#outgoingGradient)"
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                {/* Response Time Chart */}
                <Card className={`bg-[var(--bg-card)] border-slate-800 ${styles.cardHover}`}>
                  <CardHeader>
                    <CardTitle className="text-white">Response Time</CardTitle>
                    <CardDescription className="text-slate-400">
                      Average server response time in milliseconds
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="h-[250px] w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={responseTimeData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                          <XAxis dataKey="time" stroke="#71717a" tick={{ fill: "#a1a1aa" }} />
                          <YAxis stroke="#71717a" tick={{ fill: "#a1a1aa" }} />
                          <CartesianGrid strokeDasharray="3 3" stroke="#1a1730" />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: "#0d0b14",
                              borderColor: "#1a1730",
                              color: "#ffffff",
                            }}
                            labelStyle={{ color: "#ffffff" }}
                            formatter={(value) => [`${value} ms`, "Response Time"]}
                          />
                          <Line
                            type="monotone"
                            dataKey="responseTime"
                            name="Response Time"
                            stroke="#10b981"
                            strokeWidth={2}
                            dot={{ r: 4, strokeWidth: 2 }}
                            activeDot={{ r: 6, strokeWidth: 2 }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>

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
                      <div className="text-xs text-slate-300">server_logs.txt, backup_2025.zip, config.json</div>
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

              {/* Recent Activity */}
              <Card className={`bg-[var(--bg-card)] border-slate-800 ${styles.cardHover}`} data-aos="fade-up">
                <CardHeader>
                  <CardTitle className="text-white">Recent Activity</CardTitle>
                  <CardDescription className="text-slate-400">Latest events and notifications</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="h-8 w-8 rounded-full bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                        <Server className="h-4 w-4 text-blue-400" />
                      </div>
                      <div>
                        <p className="text-sm text-white">
                          Server <span className="font-medium">Web Server Alpha</span> restarted successfully
                        </p>
                        <p className="text-xs text-slate-400">2 hours ago</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="h-8 w-8 rounded-full bg-yellow-500/10 flex items-center justify-center flex-shrink-0">
                        <Shield className="h-4 w-4 text-yellow-400" />
                      </div>
                      <div>
                        <p className="text-sm text-white">
                          Security scan completed with <span className="font-medium">3 warnings</span>
                        </p>
                        <p className="text-xs text-slate-400">5 hours ago</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="h-8 w-8 rounded-full bg-green-500/10 flex items-center justify-center flex-shrink-0">
                        <Database className="h-4 w-4 text-green-400" />
                      </div>
                      <div>
                        <p className="text-sm text-white">
                          Backup <span className="font-medium">daily-backup-2025-05-11</span> completed
                        </p>
                        <p className="text-xs text-slate-400">8 hours ago</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="h-8 w-8 rounded-full bg-purple-500/10 flex items-center justify-center flex-shrink-0">
                        <Users className="h-4 w-4 text-purple-400" />
                      </div>
                      <div>
                        <p className="text-sm text-white">
                          User <span className="font-medium">admin@example.com</span> logged in
                        </p>
                        <p className="text-xs text-slate-400">12 hours ago</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="border-t border-slate-700 px-6 py-4">
                  <Button
                    variant="outline"
                    className="w-full border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white"
                  >
                    View All Activity
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
