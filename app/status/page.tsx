"use client"

import { useState, useEffect } from "react"
import { ChevronDown, ChevronUp, Info, ArrowUpRight, History } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { fetchServiceStatus } from "@/lib/status-api"
import type { ServiceStatus, StatusType, Incident } from "@/types/status"
import StatusIndicator from "@/components/status/status-indicator"
import ServiceMetricsChart from "@/components/status/service-metrics-chart"
import IncidentTimeline from "@/components/status/incident-timeline"
import StatusHeader from "@/components/status/status-header"
import Navbar from "@/components/navbar"

export default function StatusPage() {
  const [services, setServices] = useState<ServiceStatus[]>([])
  const [incidents, setIncidents] = useState<Incident[]>([])
  const [loading, setLoading] = useState(true)
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date())
  const [expandedService, setExpandedService] = useState<string | null>(null)
  const [refreshInterval, setRefreshInterval] = useState(30) // seconds
  const [activeTab, setActiveTab] = useState("all")
  const [overallStatus, setOverallStatus] = useState<StatusType>("operational")

  const refreshData = async () => {
    setLoading(true)
    try {
      const data = await fetchServiceStatus()
      setServices(data.services)
      setIncidents(data.incidents)
      setLastUpdated(new Date())

      // Calculate overall status
      const statuses = data.services.map((service) => service.status)
      if (statuses.includes("outage")) {
        setOverallStatus("outage")
      } else if (statuses.includes("degraded")) {
        setOverallStatus("degraded")
      } else if (statuses.includes("maintenance")) {
        setOverallStatus("maintenance")
      } else {
        setOverallStatus("operational")
      }
    } catch (error) {
      console.error("Failed to fetch status data:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    refreshData()

    const intervalId = setInterval(() => {
      refreshData()
    }, refreshInterval * 1000)

    return () => clearInterval(intervalId)
  }, [refreshInterval])

  const toggleServiceExpand = (serviceId: string) => {
    if (expandedService === serviceId) {
      setExpandedService(null)
    } else {
      setExpandedService(serviceId)
    }
  }

  const filteredServices = activeTab === "all" ? services : services.filter((service) => service.category === activeTab)

  const getStatusText = (status: StatusType) => {
    switch (status) {
      case "operational":
        return "All Systems Operational"
      case "degraded":
        return "Degraded System Performance"
      case "maintenance":
        return "Scheduled Maintenance"
      case "outage":
        return "System Outage Detected"
      default:
        return "Status Unknown"
    }
  }

  const getStatusColor = (status: StatusType) => {
    switch (status) {
      case "operational":
        return "bg-green-500"
      case "degraded":
        return "bg-yellow-500"
      case "maintenance":
        return "bg-blue-500"
      case "outage":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <Navbar />
      <StatusHeader
        status={overallStatus}
        statusText={getStatusText(overallStatus)}
        lastUpdated={lastUpdated}
        onRefresh={refreshData}
        loading={loading}
      />

      <div className="mt-8 flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-3/4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full sm:w-auto">
              <TabsList>
                <TabsTrigger value="all">All Services</TabsTrigger>
                <TabsTrigger value="core">Core</TabsTrigger>
                <TabsTrigger value="api">API</TabsTrigger>
                <TabsTrigger value="infrastructure">Infrastructure</TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="flex items-center mt-4 sm:mt-0">
              <span className="text-sm text-muted-foreground mr-2">Auto-refresh:</span>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="h-8">
                    {refreshInterval}s <ChevronDown className="ml-1 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setRefreshInterval(10)}>10s</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setRefreshInterval(30)}>30s</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setRefreshInterval(60)}>1m</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setRefreshInterval(300)}>5m</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <div className="space-y-4">
            {filteredServices.map((service) => (
              <Card key={service.id} className="overflow-hidden">
                <div
                  className="p-4 flex justify-between items-center cursor-pointer hover:bg-accent/50 transition-colors"
                  onClick={() => toggleServiceExpand(service.id)}
                >
                  <div className="flex items-center">
                    <StatusIndicator status={service.status} size="md" />
                    <div className="ml-3">
                      <h3 className="font-medium">{service.name}</h3>
                      <p className="text-sm text-muted-foreground">{service.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Badge variant={service.status === "operational" ? "outline" : "secondary"} className="mr-4">
                            {service.uptime}% uptime
                          </Badge>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>30-day average uptime</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    {expandedService === service.id ? (
                      <ChevronUp className="h-5 w-5 text-muted-foreground" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-muted-foreground" />
                    )}
                  </div>
                </div>

                {expandedService === service.id && (
                  <div className="p-4 pt-0 border-t">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                      <MetricsCard
                        title="Response Time"
                        value={`${service.metrics.responseTime}ms`}
                        change={service.metrics.responseTimeChange}
                        target="< 200ms"
                      />
                      <MetricsCard
                        title="Error Rate"
                        value={`${service.metrics.errorRate}%`}
                        change={service.metrics.errorRateChange}
                        target="< 0.1%"
                      />
                      <MetricsCard
                        title="Requests"
                        value={`${service.metrics.requestsPerMinute}/min`}
                        change={service.metrics.requestsChange}
                      />
                    </div>

                    <div className="mt-6">
                      <h4 className="text-sm font-medium mb-3">Performance (Last 24 Hours)</h4>
                      <ServiceMetricsChart metrics={service.metrics} />
                    </div>

                    {service.status !== "operational" && service.statusMessage && (
                      <div className="mt-4 p-3 bg-muted rounded-md flex items-start">
                        <Info className="h-5 w-5 text-muted-foreground mr-2 mt-0.5 flex-shrink-0" />
                        <p className="text-sm">{service.statusMessage}</p>
                      </div>
                    )}

                    <div className="mt-4 flex justify-end">
                      <Button variant="outline" size="sm" className="text-xs">
                        View Details <ArrowUpRight className="ml-1 h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                )}
              </Card>
            ))}
          </div>
        </div>

        <div className="w-full md:w-1/4 mt-6 md:mt-0">
          <Card>
            <div className="p-4 border-b">
              <div className="flex items-center">
                <History className="h-5 w-5 mr-2" />
                <h3 className="font-medium">Recent Incidents</h3>
              </div>
            </div>
            <div className="p-4">
              <IncidentTimeline incidents={incidents} />

              {incidents.length === 0 && (
                <div className="text-center py-6">
                  <p className="text-sm text-muted-foreground">No incidents reported in the last 30 days</p>
                </div>
              )}

              <div className="mt-4">
                <Button variant="outline" size="sm" className="w-full text-xs">
                  View Incident History
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

interface MetricsCardProps {
  title: string
  value: string
  change?: number
  target?: string
}

function MetricsCard({ title, value, change, target }: MetricsCardProps) {
  return (
    <div className="bg-card rounded-lg border p-3">
      <div className="flex justify-between items-start">
        <h4 className="text-sm font-medium text-muted-foreground">{title}</h4>
        {target && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Badge variant="outline" className="text-xs">
                  Target: {target}
                </Badge>
              </TooltipTrigger>
              <TooltipContent>
                <p>Our service level objective</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
      <p className="text-2xl font-semibold mt-1">{value}</p>
      {typeof change === "number" && (
        <div className="flex items-center mt-1">
          <Badge variant={change > 0 ? "destructive" : "success"} className="text-xs">
            {change > 0 ? "+" : ""}
            {change}%
          </Badge>
          <span className="text-xs text-muted-foreground ml-2">vs last 24h</span>
        </div>
      )}
    </div>
  )
}

