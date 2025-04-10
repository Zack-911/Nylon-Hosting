import type { Metadata } from "next"
import { CpuIcon, HardDrive, Network, Power, RefreshCw, Server } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "VPS Dashboard - Nylon Hosting",
  description: "Manage your VPS servers",
}

// Data constants
const servers = [
  { name: "Pro VPS", ip: "192.168.1.1" },
  { name: "Starter VPS", ip: "192.168.1.2" },
]

const serverStatus = {
  status: "Running",
  uptime: "45 days, 12 hours",
  location: "New York, US",
  ip: "192.168.1.1",
  os: "Ubuntu 22.04 LTS",
}

const quickActions = [
  { label: "Reboot", icon: Power },
  { label: "Shutdown", icon: Power },
  { label: "Reinstall OS", icon: RefreshCw },
  { label: "Network", icon: Network },
]

const resourceUsage = [
  { label: "CPU Usage", value: "23%", percentage: 23 },
  { label: "Memory Usage", value: "1.8GB / 4GB", percentage: 45 },
  { label: "Disk Usage", value: "25GB / 50GB", percentage: 50 },
  { label: "Bandwidth", value: "1.2TB / 3TB", percentage: 40 },
]

const specifications = [
  { label: "CPU", value: "2 vCPU Cores", icon: CpuIcon },
  { label: "Memory", value: "4GB RAM", icon: HardDrive },
  { label: "Storage", value: "50GB SSD", icon: HardDrive },
  { label: "Network", value: "3TB Bandwidth", icon: Network },
]

const backups = [
  { label: "Daily Backup", time: "Today, 03:00 AM" },
  { label: "Weekly Backup", time: "Sunday, 02:00 AM" },
  { label: "Monthly Backup", time: "April 1, 01:00 AM" },
]

const security = [
  { label: "Firewall Status", status: "Active", color: "green-400" },
  { label: "SSH Access", status: "Last login: Today, 10:23 AM" },
  { label: "DDoS Protection", status: "Enabled", color: "green-400" },
]

export default function VpsDashboardPage() {
  return (
    <div className="panel-layout">
      {/* Left panel - Server information */}
      <div className="space-y-6">
        <Card className="panel-gradient">
          <CardHeader>
            <CardTitle>Your VPS Servers</CardTitle>
            <CardDescription>Select a server to view details</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-1">
              {servers.map((server, index) => (
                <button
                  key={index}
                  className={`w-full p-3 text-left hover:bg-accent/50 ${index === 0 ? "bg-accent/30" : ""}`}
                >
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
              {Object.entries(serverStatus).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between">
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
                <Button key={index} variant="outline" size="sm" className="justify-start">
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
                <CardTitle>Pro VPS</CardTitle>
                <CardDescription>Running for 45 days</CardDescription>
              </div>
              <Button>Upgrade Plan</Button>
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
                <h3 className="mb-4 text-lg font-medium">Specifications</h3>
                <div className="space-y-3">
                  {specifications.map((spec, index) => (
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
              <CardTitle>Backups</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {backups.map((backup, index) => (
                  <div
                    key={index}
                    className="rounded-md border border-accent p-3 flex items-center justify-between"
                  >
                    <div>
                      <p className="font-medium">{backup.label}</p>
                      <p className="text-sm text-muted-foreground">{backup.time}</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Restore
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="panel-gradient">
            <CardHeader>
              <CardTitle>Security</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {security.map((item, index) => (
                  <div key={index} className="rounded-md border border-accent p-3">
                    <p className="font-medium">{item.label}</p>
                    <div className="mt-2 flex items-center">
                      {item.color && (
                        <span className={`mr-2 h-2 w-2 rounded-full bg-${item.color}`}></span>
                      )}
                      <span className={`text-sm ${item.color ? `text-${item.color}` : "text-muted-foreground"}`}>
                        {item.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
