"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Info, Settings } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function GpuDashboard() {
  const [activeGpu, setActiveGpu] = useState(0)

  // Sample GPU data
  const gpus = [
    {
      id: 1,
      name: "NVIDIA RTX 4090",
      hashrate: 132,
      power: 320,
      temp: 65,
      efficiency: 0.41,
      utilization: 98,
      fanSpeed: 75,
      memory: 24,
      memoryUsed: 20,
      uptime: "18d 7h 32m",
      status: "online",
    },
    {
      id: 2,
      name: "NVIDIA RTX 3080",
      hashrate: 98,
      power: 280,
      temp: 72,
      efficiency: 0.35,
      utilization: 96,
      fanSpeed: 85,
      memory: 10,
      memoryUsed: 9.2,
      uptime: "12d 14h 45m",
      status: "online",
    },
    {
      id: 3,
      name: "AMD RX 6900 XT",
      hashrate: 64,
      power: 230,
      temp: 68,
      efficiency: 0.28,
      utilization: 94,
      fanSpeed: 70,
      memory: 16,
      memoryUsed: 14.5,
      uptime: "8d 22h 17m",
      status: "online",
    },
    {
      id: 4,
      name: "NVIDIA RTX 3070",
      hashrate: 0,
      power: 0,
      temp: 32,
      efficiency: 0,
      utilization: 0,
      fanSpeed: 0,
      memory: 8,
      memoryUsed: 0,
      uptime: "0d 0h 0m",
      status: "offline",
    },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Link href="/dashboard">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">GPU Management</h1>
        </div>
        <Button variant="outline" size="icon">
          <Settings className="h-4 w-4" />
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <Card className="p-4">
            <h2 className="text-lg font-semibold mb-4">Your GPUs</h2>
            <div className="space-y-3">
              {gpus.map((gpu, index) => (
                <div
                  key={gpu.id}
                  className={`p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                    index === activeGpu ? "bg-primary/10 border border-primary/30" : "hover:bg-secondary"
                  }`}
                  onClick={() => setActiveGpu(index)}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">{gpu.name}</h3>
                      <div className="flex items-center mt-1">
                        <div
                          className={`w-2 h-2 rounded-full mr-2 ${
                            gpu.status === "online" ? "bg-green-500" : "bg-red-500"
                          }`}
                        ></div>
                        <span className="text-sm text-muted-foreground capitalize">{gpu.status}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">{gpu.hashrate} MH/s</div>
                      <div className="text-sm text-muted-foreground">{gpu.power}W</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="lg:col-span-2">
          {gpus[activeGpu] && (
            <>
              <Card className="p-6 mb-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-xl font-bold">{gpus[activeGpu].name}</h2>
                    <p className="text-muted-foreground">Uptime: {gpus[activeGpu].uptime}</p>
                  </div>
                  <div
                    className={`px-3 py-1 rounded-full text-sm ${
                      gpus[activeGpu].status === "online"
                        ? "bg-green-500/10 text-green-500"
                        : "bg-red-500/10 text-red-500"
                    }`}
                  >
                    {gpus[activeGpu].status === "online" ? "Active" : "Offline"}
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="bg-secondary/50 p-3 rounded-lg">
                    <div className="text-sm text-muted-foreground">Hashrate</div>
                    <div className="text-xl font-semibold">{gpus[activeGpu].hashrate} MH/s</div>
                  </div>
                  <div className="bg-secondary/50 p-3 rounded-lg">
                    <div className="text-sm text-muted-foreground">Power</div>
                    <div className="text-xl font-semibold">{gpus[activeGpu].power}W</div>
                  </div>
                  <div className="bg-secondary/50 p-3 rounded-lg">
                    <div className="text-sm text-muted-foreground">Temperature</div>
                    <div className="text-xl font-semibold">{gpus[activeGpu].temp}°C</div>
                  </div>
                  <div className="bg-secondary/50 p-3 rounded-lg">
                    <div className="text-sm text-muted-foreground">Efficiency</div>
                    <div className="text-xl font-semibold">{gpus[activeGpu].efficiency} MH/W</div>
                  </div>
                </div>

                <Tabs defaultValue="performance">
                  <TabsList className="mb-4">
                    <TabsTrigger value="performance">Performance</TabsTrigger>
                    <TabsTrigger value="settings">Settings</TabsTrigger>
                  </TabsList>

                  <TabsContent value="performance">
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm">GPU Utilization</span>
                          <span className="text-sm font-medium">{gpus[activeGpu].utilization}%</span>
                        </div>
                        <Progress value={gpus[activeGpu].utilization} className="h-2" />
                      </div>

                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm">Fan Speed</span>
                          <span className="text-sm font-medium">{gpus[activeGpu].fanSpeed}%</span>
                        </div>
                        <Progress value={gpus[activeGpu].fanSpeed} className="h-2" />
                      </div>

                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm">Memory Usage</span>
                          <span className="text-sm font-medium">
                            {gpus[activeGpu].memoryUsed} / {gpus[activeGpu].memory} GB
                          </span>
                        </div>
                        <Progress value={(gpus[activeGpu].memoryUsed / gpus[activeGpu].memory) * 100} className="h-2" />
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="settings">
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium">Power Limit</label>
                          <div className="flex items-center mt-1">
                            <input type="range" min="50" max="100" defaultValue="80" className="w-full" />
                            <span className="ml-2 text-sm">80%</span>
                          </div>
                        </div>

                        <div>
                          <label className="text-sm font-medium">Fan Mode</label>
                          <select className="w-full mt-1 rounded-md border border-input bg-background px-3 py-1 text-sm">
                            <option>Auto</option>
                            <option>Manual</option>
                            <option>Curve</option>
                          </select>
                        </div>
                      </div>

                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm">
                          Reset
                        </Button>
                        <Button size="sm">Apply</Button>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold">Mining Performance</h3>
                    <Info className="h-4 w-4 text-muted-foreground" />
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Daily Earnings</span>
                      <span className="font-medium">0.00042 BTC</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Weekly Earnings</span>
                      <span className="font-medium">0.00294 BTC</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Monthly Earnings</span>
                      <span className="font-medium">0.0126 BTC</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Power Cost (Daily)</span>
                      <span className="font-medium">$1.84</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Profit (Daily)</span>
                      <span className="font-medium text-green-500">$14.26</span>
                    </div>
                  </div>
                </Card>

                <Card className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold">Maintenance</h3>
                    <Info className="h-4 w-4 text-muted-foreground" />
                  </div>

                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">Driver Version</span>
                        <span className="text-sm font-medium">535.98</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-xs text-muted-foreground">Latest: 535.129</span>
                        <Button variant="outline" size="sm" className="h-7 text-xs">
                          Update
                        </Button>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">Last Maintenance</span>
                        <span className="text-sm font-medium">32 days ago</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-xs text-muted-foreground">Recommended: Every 30 days</span>
                        <Button variant="outline" size="sm" className="h-7 text-xs">
                          Schedule
                        </Button>
                      </div>
                    </div>

                    <div className="pt-2">
                      <Button variant="destructive" size="sm" className="w-full">
                        Restart GPU
                      </Button>
                    </div>
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