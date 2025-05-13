"use client"

import { X } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { FilterState } from "./filter-sidebar"

interface ActiveFiltersProps {
  filters: FilterState
  onClearFilter: (filterType: string, value?: string) => void
  onClearAll: () => void
}

export default function ActiveFilters({ filters, onClearFilter, onClearAll }: ActiveFiltersProps) {
  const hasActiveFilters = () => {
    return (
      filters.priceRange.min > 0 ||
      filters.priceRange.max < 100 ||
      (filters.ram && filters.ram.length > 0) ||
      (filters.cpu && filters.cpu.length > 0) ||
      (filters.storage && filters.storage.length > 0) ||
      (filters.bandwidth && filters.bandwidth.length > 0) ||
      (filters.operatingSystem && filters.operatingSystem.length > 0) ||
      (filters.botType && filters.botType.length > 0) ||
      (filters.features && filters.features.length > 0)
    )
  }

  const formatFilterLabel = (key: string, value: string) => {
    switch (key) {
      case "priceRange":
        return `$${filters.priceRange.min}-$${filters.priceRange.max}`
      case "ram":
      case "cpu":
      case "storage":
      case "bandwidth":
        return value
      case "operatingSystem":
        return value.charAt(0).toUpperCase() + value.slice(1)
      case "botType":
        return value.charAt(0).toUpperCase() + value.slice(1)
      case "features":
        // Map feature IDs to more readable labels
        const featureLabels: Record<string, string> = {
          ssd: "SSD Storage",
          backup: "Daily Backups",
          ddos: "DDoS Protection",
          ipv6: "IPv6 Support",
          snapshot: "Snapshot Support",
          restart: "Auto Restarts",
          monitoring: "24/7 Monitoring",
          scaling: "Auto-scaling",
          db: "Database Support",
          priority: "Priority Support",
          ssl: "Free SSL",
          cpanel: "Control Panel",
          subdomain: "Unlimited Subdomains",
          email: "Email Accounts",
          cdn: "CDN Integration",
        }
        return featureLabels[value] || value
      default:
        return value
    }
  }

  if (!hasActiveFilters()) {
    return null
  }

  // Map filter category to human-readable label
  const getCategoryLabel = (category: string) => {
    const labels: Record<string, string> = {
      ram: "RAM",
      cpu: "CPU",
      storage: "Storage",
      bandwidth: "Bandwidth",
      operatingSystem: "OS",
      botType: "Bot Type",
      features: "Features",
      priceRange: "Price",
    }
    return labels[category] || category
  }

  return (
    <div className="flex flex-wrap gap-2 items-center mb-6">
      <span className="text-sm font-medium text-slate-400 mr-1">Active filters:</span>

      {filters.priceRange.min > 0 || filters.priceRange.max < 100 ? (
        <Badge
          variant="outline"
          className="bg-purple-500/10 text-purple-400 border-purple-500/20 flex items-center gap-1"
        >
          <span className="font-medium">{getCategoryLabel("priceRange")}:</span>${filters.priceRange.min}-$
          {filters.priceRange.max === 100 ? "100+" : filters.priceRange.max}
          <Button
            variant="ghost"
            size="icon"
            className="h-4 w-4 p-0 ml-1 text-purple-400 hover:text-white hover:bg-purple-500/20 rounded-full"
            onClick={() => onClearFilter("priceRange")}
          >
            <X className="h-3 w-3" />
          </Button>
        </Badge>
      ) : null}

      {Object.entries(filters).map(([key, value]) => {
        // Skip price range as it's handled separately
        if (key === "priceRange" || !Array.isArray(value) || value.length === 0) return null

        // For array values, create a badge for each value
        return value.map((val, index) => (
          <Badge
            key={`${key}-${val}-${index}`}
            variant="outline"
            className="bg-purple-500/10 text-purple-400 border-purple-500/20 flex items-center gap-1"
          >
            <span className="font-medium">{getCategoryLabel(key)}:</span>
            {formatFilterLabel(key, val)}
            <Button
              variant="ghost"
              size="icon"
              className="h-4 w-4 p-0 ml-1 text-purple-400 hover:text-white hover:bg-purple-500/20 rounded-full"
              onClick={() => onClearFilter(key, val)}
            >
              <X className="h-3 w-3" />
            </Button>
          </Badge>
        ))
      })}

      <Button
        variant="ghost"
        size="sm"
        onClick={onClearAll}
        className="text-slate-400 hover:text-white hover:bg-slate-800/50 h-7 px-2 ml-auto"
      >
        Clear all
      </Button>
    </div>
  )
}
