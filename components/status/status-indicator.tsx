import { CheckCircle, AlertTriangle, XCircle, Clock } from "lucide-react"
import { cn } from "@/lib/utils"
import type { StatusType } from "@/types/status"

interface StatusIndicatorProps {
  status: string
  size?: "sm" | "md" | "lg"
  showText?: boolean
  className?: string
}

export default function StatusIndicator({ status, size = "md", showText = false, className }: StatusIndicatorProps) {
  const getStatusIcon = () => {
    switch (status) {
      case "operational":
        return <CheckCircle className={iconClasses} />
      case "degraded":
        return <AlertTriangle className={iconClasses} />
      case "maintenance":
        return <Clock className={iconClasses} />
      case "outage":
        return <XCircle className={iconClasses} />
      default:
        return <AlertTriangle className={iconClasses} />
    }
  }

  const getStatusColor = () => {
    switch (status) {
      case "operational":
        return "text-green-500"
      case "degraded":
        return "text-yellow-500"
      case "maintenance":
        return "text-blue-500"
      case "outage":
        return "text-red-500"
      default:
        return "text-gray-500"
    }
  }

  const getStatusText = () => {
    switch (status) {
      case "operational":
        return "Operational"
      case "degraded":
        return "Degraded"
      case "maintenance":
        return "Maintenance"
      case "outage":
        return "Outage"
      default:
        return "Unknown"
    }
  }

  const getSizeClasses = () => {
    switch (size) {
      case "sm":
        return "h-4 w-4"
      case "md":
        return "h-5 w-5"
      case "lg":
        return "h-6 w-6"
      default:
        return "h-5 w-5"
    }
  }

  const iconClasses = cn(getSizeClasses(), getStatusColor())

  return (
    <div className={cn("flex items-center", className)}>
      {getStatusIcon()}
      {showText && <span className={cn("ml-2 text-sm font-medium", getStatusColor())}>{getStatusText()}</span>}
    </div>
  )
}

