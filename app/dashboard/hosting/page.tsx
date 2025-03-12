"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, BarChart3, Clock, Server, Settings, Shield, Wifi } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function HostingDashboard() {
  const [activeServer, setActiveServer] = useState(0)

  // Sample server data
  const servers = [
    {
      id: 1,
      name: "Mining Server 01",
      location: "US East",
      status: "online",
      uptime: "99.98%",
      uptimeDays: "124d 7h 32m",
      cpuUsage: 42,
      ramUsage: 68,
      diskUsage: 54,
      networkIn: 245,
      networkOut: 1240,
      gpus: 4,
      activeGpus: 4,
      plan: "Enterprise",
      ipAddress: "192.168.1.105",
    },
    {
      id: 2,
      name: "Mining Server 02",
      location: "EU Central",
      status: "online",
      uptime: "99.76%",
      uptimeDays: "87d 14h 45m",
      cpuUsage: 38,
      ramUsage: 72,
      diskUsage: 62,
      networkIn: 186,
      networkOut: 920,
      gpus: 6,
      activeGpus: 5,
      plan: "Enterprise",
      ipAddress: "192.168.1.106",
    },
    {
      id: 3,
      name: "Mining Server 03",
      location: "Asia Pacific",
      status: "warning",
      uptime: "98.45%",
      uptimeDays: "32d 22h 17m",
      cpuUsage: 76,
      ramUsage: 85,
      diskUsage: 92,
      networkIn: 320,
      networkOut: 1580,
      gpus: 8,
      activeGpus: 7,
      plan: "Enterprise",
      ipAddress: "192.168.1.107",
    },
    {
      id: 4,
      name: "Mining Server 04",
      location: "US West",
      status: "offline",
      uptime: "0%",
      uptimeDays: "0d 0h 0m",
      cpuUsage: 0,
      ramUsage: 0,
      diskUsage: 0,
      networkIn: 0,
      networkOut: 0,
      gpus: 4,
      activeGpus: 0,
      plan: "Standard",
      ipAddress: "192.168.1.108",
    },
  ]

  // Status color mapping
  const statusColors: Record<string, string> = {
  online: "bg-green-500",
  warning: "bg-yellow-500",
  offline: "bg-red-500",
  };
  
  const statusTextColors: Record<string, string> = {
    online: "text-green-500",
    warning: "text-yellow-500",
    offline: "text-red-500",
  };
  
  const statusBgColors: Record<string, string> = {
    online: "bg-green-500/10",
    warning: "bg-yellow-500/10",
    offline: "bg-red-500/10",
  };
  

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Link href="/dashboard">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">Hosting Management</h1>
        </div>
        <Button variant="outline" size="icon">
          <Settings className="h-4 w-4" />
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <Card className="p-4">
            <h2 className="text-lg font-semibold mb-4">Your Servers</h2>
            <div className="space-y-3">
              {servers.map((server, index) => (
                <div
                  key={server.id}
                  className={`p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                    index === activeServer ? "bg-primary/10 border border-primary/30" : "hover:bg-secondary"
                  }`}
                  onClick={() => setActiveServer(index)}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">{server.name}</h3>
                      <div className="flex items-center mt-1">
                        <div className={`w-2 h-2 rounded-full mr-2 ${statusColors[server.status]}`}></div>
                        <span className="text-sm text-muted-foreground capitalize">{server.status}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">{server.location}</div>
                      <div className="text-sm text-muted-foreground">{server.uptime} uptime</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="lg:col-span-2">
          {servers[activeServer] && (
            <>
              <Card className="p-6 mb-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-xl font-bold">{servers[activeServer].name}</h2>
                    <p className="text-muted-foreground">
                      {servers[activeServer].location} • {servers[activeServer].plan} Plan
                    </p>
                  </div>
                  <div
                    className={`px-3 py-1 rounded-full text-sm ${statusBgColors[servers[activeServer].status]} ${
                      statusTextColors[servers[activeServer].status]
                    }`}
                  >
                    {servers[activeServer].status === "online"
                      ? "Running"
                      : servers[activeServer].status === "warning"
                        ? "Warning"
                        : "Offline"}
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="bg-secondary/50 p-3 rounded-lg">
                    <div className="text-sm text-muted-foreground">Uptime</div>
                    <div className="text-xl font-semibold">{servers[activeServer].uptime}</div>
                  </div>
                  <div className="bg-secondary/50 p-3 rounded-lg">
                    <div className="text-sm text-muted-foreground">Active GPUs</div>
                    <div className="text-xl font-semibold">
                      {servers[activeServer].activeGpus}/{servers[activeServer].gpus}
                    </div>
                  </div>
                  <div className="bg-secondary/50 p-3 rounded-lg">
                    <div className="text-sm text-muted-foreground">Network In</div>
                    <div className="text-xl font-semibold">{servers[activeServer].networkIn} Mbps</div>
                  </div>
                  <div className="bg-secondary/50 p-3 rounded-lg">
                    <div className="text-sm text-muted-foreground">Network Out</div>
                    <div className="text-xl font-semibold">{servers[activeServer].networkOut} Mbps</div>
                  </div>
                </div>

                <Tabs defaultValue="resources">
                  <TabsList className="mb-4">
                    <TabsTrigger value="resources">Resources</TabsTrigger>
                    <TabsTrigger value="network">Network</TabsTrigger>
                    <TabsTrigger value="security">Security</TabsTrigger>
                  </TabsList>

                  <TabsContent value="resources">
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm">CPU Usage</span>
                          <span className="text-sm font-medium">{servers[activeServer].cpuUsage}%</span>
                        </div>
                        <Progress value={servers[activeServer].cpuUsage} className="h-2" />
                      </div>

                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm">RAM Usage</span>
                          <span className="text-sm font-medium">{servers[activeServer].ramUsage}%</span>
                        </div>
                        <Progress value={servers[activeServer].ramUsage} className="h-2" />
                      </div>

                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm">Disk Usage</span>
                          <span className="text-sm font-medium">{servers[activeServer].diskUsage}%</span>
                        </div>
                        <Progress
                          value={servers[activeServer].diskUsage}
                          className={`h-2 ${servers[activeServer].diskUsage > 90 ? "bg-red-500" : ""}`}
                        />
                        {servers[activeServer].diskUsage > 90 && (
                          <p className="text-xs text-red-500 mt-1">Warning: Disk space is running low</p>
                        )}
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="network">
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium">IP Address</label>
                          <div className="flex items-center mt-1 bg-secondary/50 p-2 rounded">
                            <code className="text-sm">{servers[activeServer].ipAddress}</code>
                            <Button variant="ghost" size="sm" className="ml-auto h-6 w-6 p-0">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="14"
                                height="14"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                              </svg>
                            </Button>
                          </div>
                        </div>

                        <div>
                          <label className="text-sm font-medium">Connection Status</label>
                          <div className="flex items-center mt-1 bg-secondary/50 p-2 rounded">
                            <div
                              className={`w-2 h-2 rounded-full mr-2 ${statusColors[servers[activeServer].status]}`}
                            ></div>
                            <span className="text-sm capitalize">
                              {servers[activeServer].status === "online"
                                ? "Connected"
                                : servers[activeServer].status === "warning"
                                  ? "Unstable"
                                  : "Disconnected"}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="text-sm font-medium">Bandwidth Usage (Last 24h)</label>
                        <div className="h-24 bg-secondary/50 rounded-lg mt-1 flex items-end px-2 pb-2 gap-1">
                          {[35, 42, 28, 56, 72, 63, 45, 51, 39, 47, 55, 68].map((value, i) => (
                            <div
                              key={i}
                              className="bg-primary/60 w-full rounded-t"
                              style={{ height: `${value}%` }}
                            ></div>
                          ))}
                        </div>
                      </div>

                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>Total Bandwidth: 246.8 GB</span>
                        <span>Limit: 500 GB</span>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="security">
                    <div className="space-y-4">
                      <div className="bg-secondary/50 p-3 rounded-lg">
                        <div className="flex items-center">
                          <Shield className="h-5 w-5 mr-2 text-green-500" />
                          <div>
                            <h4 className="font-medium">Firewall Status</h4>
                            <p className="text-sm text-muted-foreground">Active - 12 rules configured</p>
                          </div>
                          <Button variant="outline" size="sm" className="ml-auto">
                            Configure
                          </Button>
                        </div>
                      </div>

                      <div className="bg-secondary/50 p-3 rounded-lg">
                        <div className="flex items-center">
                          <Clock className="h-5 w-5 mr-2 text-blue-500" />
                          <div>
                            <h4 className="font-medium">Last Security Scan</h4>
                            <p className="text-sm text-muted-foreground">2 days ago - No issues found</p>
                          </div>
                          <Button variant="outline" size="sm" className="ml-auto">
                            Run Scan
                          </Button>
                        </div>
                      </div>

                      <div className="bg-secondary/50 p-3 rounded-lg">
                        <div className="flex items-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="mr-2 text-yellow-500"
                          >
                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                          </svg>
                          <div>
                            <h4 className="font-medium">SSH Access</h4>
                            <p className="text-sm text-muted-foreground">2 authorized keys</p>
                          </div>
                          <Button variant="outline" size="sm" className="ml-auto">
                            Manage
                          </Button>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold">Server Health</h3>
                    <BarChart3 className="h-4 w-4 text-muted-foreground" />
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Uptime Duration</span>
                      <span className="font-medium">{servers[activeServer].uptimeDays}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Last Reboot</span>
                      <span className="font-medium">
                        {servers[activeServer].status === "offline" ? "N/A" : servers[activeServer].uptimeDays + " ago"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Temperature</span>
                      <span className="font-medium">{servers[activeServer].status === "offline" ? "N/A" : "42°C"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Health Score</span>
                      <span
                        className={`font-medium ${
                          servers[activeServer].status === "online"
                            ? "text-green-500"
                            : servers[activeServer].status === "warning"
                              ? "text-yellow-500"
                              : "text-red-500"
                        }`}
                      >
                        {servers[activeServer].status === "online"
                          ? "Good"
                          : servers[activeServer].status === "warning"
                            ? "Fair"
                            : "Poor"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Alerts</span>
                      <span className="font-medium">
                        {servers[activeServer].status === "warning"
                          ? "2 warnings"
                          : servers[activeServer].status === "offline"
                            ? "1 critical"
                            : "None"}
                      </span>
                    </div>
                  </div>
                </Card>

                <Card className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold">Quick Actions</h3>
                    <Wifi className="h-4 w-4 text-muted-foreground" />
                  </div>

                  <div className="space-y-3">
                    <Button
                      variant="outline"
                      className="w-full justify-start"
                      disabled={servers[activeServer].status === "offline"}
                    >
                      <Server className="h-4 w-4 mr-2" />
                      Restart Server
                    </Button>

                    <Button
                      variant="outline"
                      className="w-full justify-start"
                      disabled={servers[activeServer].status === "offline"}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-2"
                      >
                        <rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect>
                        <rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect>
                        <line x1="6" y1="6" x2="6.01" y2="6"></line>
                        <line x1="6" y1="18" x2="6.01" y2="18"></line>
                      </svg>
                      Restart Mining Services
                    </Button>

                    <Button variant="outline" className="w-full justify-start">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-2"
                      >
                        <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
                      </svg>
                      Optimize Performance
                    </Button>

                    <Button variant="outline" className="w-full justify-start">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-2"
                      >
                        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                      </svg>
                      Power Saving Mode
                    </Button>

                    <Button variant="outline" className="w-full justify-start">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-2"
                      >
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="12" y1="8" x2="12" y2="12"></line>
                        <line x1="12" y1="16" x2="12.01" y2="16"></line>
                      </svg>
                      View Server Logs
                    </Button>
                  </div>
                </Card>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}