import type { Metadata } from "next"
import { CpuIcon, HardDrive, Network, Power, RefreshCw, Server, Shield } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Dedicated Server Dashboard - Nylon Hosting",
  description: "Manage your dedicated servers",
}

// Data constants
const servers = [
  {
    name: "Performance Server",
    ip: "192.168.2.1",
  },
]

const serverStatus = {
  status: "Running",
  uptime: "120 days, 5 hours",
  location: "Dallas, US",
  ip: "192.168.2.1",
  os: "CentOS 8",
}

const quickActions = [
  { label: "Reboot", icon: Power },
  { label: "Shutdown", icon: Power },
  { label: "Reinstall OS", icon: RefreshCw },
  { label: "Network", icon: Network },
  { label: "Security Settings", icon: Shield, colSpan: 2 },
]

const resourceUsage = [
  { label: "CPU Usage", value: "35%", percentage: 35 },
  { label: "Memory Usage", value: "12GB / 32GB", percentage: 37.5 },
  { label: "Disk Usage", value: "450GB / 2TB", percentage: 22.5 },
  { label: "Bandwidth", value: "3.5TB / Unmetered", percentage: 35 },
]

const hardwareSpecs = [
  { label: "CPU", value: "Intel Xeon E-2288G (8 cores, 16 threads)", icon: CpuIcon },
  { label: "Memory", value: "32GB DDR4 ECC", icon: HardDrive },
  { label: "Storage", value: "2 x 1TB NVMe SSD", icon: HardDrive },
  { label: "Network", value: "Unmetered (10 Gbps)", icon: Network },
]

const raidConfig = {
  type: "RAID 1 (Mirroring)",
  status: "Healthy",
  lastCheck: "Today, 02:00 AM",
}

const remoteManagement = {
  ipmi: "Available",
  kvm: true,
  rebootOptions: ["Soft Reboot", "Hard Reboot"],
}

export default function ServerDashboardPage() {
  return (
    <div className="panel-layout">
      {/* Left panel - Server information */}
      <div className="space-y-6">
        <Card className="panel-gradient">
          <CardHeader>
            <CardTitle>Your Dedicated Servers</CardTitle>
            <CardDescription>Select a server to view details</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-1">
              {servers.map((server, index) => (
                <button key={index} className="w-full p-3 text-left bg-accent/30">
                  <div className="flex items-center gap-3">
                    <Server className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">{server.name}</p>
                      <p className="text-xs text-muted-foreground">{server.ip}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="panel-gradient">
          <CardHeader>
            <CardTitle>Server Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(serverStatus).map(([key, value], index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm">{key.charAt(0).toUpperCase() + key.slice(1)}</span>
                  <span className={`text-sm ${key === "status" ? "text-green-400" : ""}`}>{value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="panel-gradient">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-2">
              {quickActions.map((action, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  className={`justify-start ${action.colSpan ? "col-span-2" : ""}`}
                >
                  <action.icon className="mr-2 h-4 w-4" />
                  {action.label}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main content panel */}
      <div className="space-y-6">
        <Card className="panel-gradient">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>{servers[0].name}</CardTitle>
                <CardDescription>Running for {serverStatus.uptime}</CardDescription>
              </div>
              <Button>Manage Server</Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <h3 className="mb-4 text-lg font-medium">Resource Usage</h3>
                <div className="space-y-4">
                  {resourceUsage.map((resource, index) => (
                    <div key={index}>
                      <div className="mb-1 flex items-center justify-between">
                        <span className="text-sm font-medium">{resource.label}</span>
                        <span className="text-sm text-muted-foreground">{resource.value}</span>
                      </div>
                      <div className="h-2 rounded-full bg-muted">
                        <div
                          className="h-full rounded-full bg-primary"
                          style={{ width: `${resource.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="mb-4 text-lg font-medium">Hardware Specifications</h3>
                <div className="space-y-3">
                  {hardwareSpecs.map((spec, index) => (
                    <div key={index} className="flex items-start">
                      <spec.icon className="mr-2 h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">{spec.label}</p>
                        <p className="text-sm text-muted-foreground">{spec.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="panel-gradient">
          <CardHeader>
            <CardTitle>Performance Metrics</CardTitle>
            <CardDescription>Last 24 hours</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full flex items-center justify-center border border-accent rounded-md">
              <p className="text-muted-foreground">Performance graph would be displayed here</p>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="panel-gradient">
            <CardHeader>
              <CardTitle>RAID Configuration</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-md border border-accent p-3">
                  <p className="font-medium">RAID Type</p>
                  <p className="text-sm text-muted-foreground">{raidConfig.type}</p>
                </div>
                <div className="rounded-md border border-accent p-3">
                  <p className="font-medium">Disk Status</p>
                  <div className="mt-2 flex items-center">
                    <span className="mr-2 h-2 w-2 rounded-full bg-green-400"></span>
                    <span className="text-sm text-green-400">{raidConfig.status}</span>
                  </div>
                </div>
                <div className="rounded-md border border-accent p-3">
                  <p className="font-medium">Last Check</p>
                  <p className="text-sm text-muted-foreground">{raidConfig.lastCheck}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="panel-gradient">
            <CardHeader>
              <CardTitle>Remote Management</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-md border border-accent p-3">
                  <p className="font-medium">IPMI Access</p>
                  <div className="mt-2 flex items-center">
                    <span className="mr-2 h-2 w-2 rounded-full bg-green-400"></span>
                    <span className="text-sm text-green-400">{remoteManagement.ipmi}</span>
                  </div>
                </div>
                <div className="rounded-md border border-accent p-3">
                  <p className="font-medium">KVM over IP</p>
                  <div className="mt-2">
                    <Button size="sm" variant="outline">
                      Launch Console
                    </Button>
                  </div>
                </div>
                <div className="rounded-md border border-accent p-3">
                  <p className="font-medium">Remote Reboot</p>
                  <div className="mt-2 grid grid-cols-2 gap-2">
                    {remoteManagement.rebootOptions.map((option, index) => (
                      <Button key={index} size="sm" variant="outline">
                        {option}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
