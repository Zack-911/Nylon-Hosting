"use client"

import { RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { StatusType } from "@/types/status"
import { formatDistanceToNow } from "date-fns"

interface StatusHeaderProps {
  status: StatusType
  statusText: string
  lastUpdated: Date
  onRefresh: () => void
  loading: boolean
}

export default function StatusHeader({ status, statusText, lastUpdated, onRefresh, loading }: StatusHeaderProps) {
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
    <div className="bg-card rounded-lg border p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-2xl font-bold">System Status</h1>
          <div className="flex items-center mt-2">
            <div className={`h-3 w-3 rounded-full ${getStatusColor(status)} mr-2`}></div>
            <p className="text-lg font-medium">{statusText}</p>
          </div>
        </div>
        <div className="mt-4 md:mt-0 flex items-center">
          <p className="text-sm text-muted-foreground mr-3">
            Updated {formatDistanceToNow(lastUpdated, { addSuffix: true })}
          </p>
          <Button variant="outline" size="sm" onClick={onRefresh} disabled={loading}>
            <RefreshCw className={`h-4 w-4 mr-1 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </Button>
        </div>
      </div>
    </div>
  )
}
