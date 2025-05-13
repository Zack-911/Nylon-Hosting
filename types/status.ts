export type StatusType = "operational" | "degraded" | "maintenance" | "outage"

export interface ServiceMetrics {
  responseTime: number
  responseTimeChange: number
  errorRate: number
  errorRateChange: number
  requestsPerMinute: number
  requestsChange: number
  history?: {
    timestamp: string
    responseTime: number
    errorRate: number
    requests: number
  }[]
}

export interface ServiceStatus {
  id: string
  name: string
  description: string
  category: string
  status: StatusType
  statusMessage?: string
  uptime: number
  metrics: ServiceMetrics
}

export interface Incident {
  id: string
  title: string
  date: string
  status: string
  message: string
  affectedServices?: string[]
}

export interface StatusData {
  services: ServiceStatus[]
  incidents: Incident[]
}
