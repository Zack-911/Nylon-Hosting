"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { X, ChevronDown, FilterX } from "lucide-react"
import { cn } from "@/lib/utils"

interface FilterOption {
  id: string
  label: string
}

interface PriceRange {
  min: number
  max: number
}

interface FilterSidebarProps {
  category: string
  onFilterChange: (filters: FilterState) => void
  className?: string
  isMobile?: boolean
  onClose?: () => void
}

export interface FilterState {
  priceRange: PriceRange
  ram?: string[]
  cpu?: string[]
  storage?: string[]
  bandwidth?: string[]
  operatingSystem?: string[]
  botType?: string[]
  features?: string[]
}

const RAM_OPTIONS: FilterOption[] = [
  { id: "1GB", label: "1 GB" },
  { id: "2GB", label: "2 GB" },
  { id: "4GB", label: "4 GB" },
  { id: "8GB", label: "8 GB" },
  { id: "16GB", label: "16+ GB" },
]

const CPU_OPTIONS: FilterOption[] = [
  { id: "1vCPU", label: "1 vCPU" },
  { id: "2vCPU", label: "2 vCPU" },
  { id: "4vCPU", label: "4 vCPU" },
  { id: "8vCPU", label: "8+ vCPU" },
]

const STORAGE_OPTIONS: FilterOption[] = [
  { id: "10GB", label: "10 GB" },
  { id: "20GB", label: "20 GB" },
  { id: "50GB", label: "50 GB" },
  { id: "100GB", label: "100 GB" },
  { id: "250GB", label: "250+ GB" },
]

const BANDWIDTH_OPTIONS: FilterOption[] = [
  { id: "unlimited", label: "Unlimited" },
  { id: "1TB", label: "1 TB" },
  { id: "2TB", label: "2 TB" },
  { id: "5TB", label: "5 TB" },
  { id: "10TB", label: "10+ TB" },
]

const OS_OPTIONS: FilterOption[] = [
  { id: "linux", label: "Linux" },
  { id: "windows", label: "Windows" },
]

const BOT_TYPE_OPTIONS: FilterOption[] = [
  { id: "discord", label: "Discord" },
  { id: "telegram", label: "Telegram" },
  { id: "slack", label: "Slack" },
  { id: "other", label: "Other" },
]

const FEATURES_VPS: FilterOption[] = [
  { id: "ssd", label: "SSD Storage" },
  { id: "backup", label: "Daily Backups" },
  { id: "ddos", label: "DDoS Protection" },
  { id: "ipv6", label: "IPv6 Support" },
  { id: "snapshot", label: "Snapshot Support" },
]

const FEATURES_BOT: FilterOption[] = [
  { id: "restart", label: "Automatic Restarts" },
  { id: "monitoring", label: "24/7 Monitoring" },
  { id: "scaling", label: "Auto-scaling" },
  { id: "db", label: "Database Support" },
  { id: "priority", label: "Priority Support" },
]

const FEATURES_WEB: FilterOption[] = [
  { id: "ssl", label: "Free SSL" },
  { id: "cpanel", label: "Control Panel" },
  { id: "subdomain", label: "Unlimited Subdomains" },
  { id: "email", label: "Email Accounts" },
  { id: "cdn", label: "CDN Integration" },
]

export default function FilterSidebar({
  category,
  onFilterChange,
  className,
  isMobile = false,
  onClose,
}: FilterSidebarProps) {
  const [filters, setFilters] = useState<FilterState>({
    priceRange: { min: 0, max: 100 },
    ram: [],
    cpu: [],
    storage: [],
    bandwidth: [],
    operatingSystem: [],
    botType: [],
    features: [],
  })

  const [activeFiltersCount, setActiveFiltersCount] = useState(0)

  // Get the appropriate feature options based on category
  const getFeatureOptions = () => {
    switch (category) {
      case "vps":
        return FEATURES_VPS
      case "discord":
      case "telegram":
        return FEATURES_BOT
      case "web":
        return FEATURES_WEB
      default:
        return []
    }
  }

  const handlePriceChange = (value: number[]) => {
    const newFilters = {
      ...filters,
      priceRange: { min: value[0], max: value[1] },
    }
    setFilters(newFilters)
    onFilterChange(newFilters)
    updateActiveFiltersCount(newFilters)
  }

  const handleCheckboxChange = (filterType: keyof FilterState, itemId: string, checked: boolean) => {
    const currentValues = (filters[filterType] as string[]) || []
    const newValues = checked ? [...currentValues, itemId] : currentValues.filter((id) => id !== itemId)

    const newFilters = { ...filters, [filterType]: newValues }
    setFilters(newFilters)
    onFilterChange(newFilters)
    updateActiveFiltersCount(newFilters)
  }

  const updateActiveFiltersCount = (newFilters: FilterState) => {
    let count = 0

    // Price range filter is active if not at default values
    if (newFilters.priceRange.min > 0 || newFilters.priceRange.max < 100) {
      count++
    }

    // Count array filters that have values
    count += (newFilters.ram?.length || 0) > 0 ? 1 : 0
    count += (newFilters.cpu?.length || 0) > 0 ? 1 : 0
    count += (newFilters.storage?.length || 0) > 0 ? 1 : 0
    count += (newFilters.bandwidth?.length || 0) > 0 ? 1 : 0
    count += (newFilters.operatingSystem?.length || 0) > 0 ? 1 : 0
    count += (newFilters.botType?.length || 0) > 0 ? 1 : 0
    count += (newFilters.features?.length || 0) > 0 ? 1 : 0

    setActiveFiltersCount(count)
  }

  const clearAllFilters = () => {
    const resetFilters = {
      priceRange: { min: 0, max: 100 },
      ram: [],
      cpu: [],
      storage: [],
      bandwidth: [],
      operatingSystem: [],
      botType: [],
      features: [],
    }
    setFilters(resetFilters)
    onFilterChange(resetFilters)
    setActiveFiltersCount(0)
  }

  const isBotCategory = category === "discord" || category === "telegram"

  return (
    <aside
      className={cn(
        "flex flex-col bg-[var(--bg-card)] border border-slate-800 rounded-lg",
        isMobile
          ? "fixed inset-0 z-50 p-6 overflow-y-auto"
          : "w-72 p-4 sticky top-24 max-h-[calc(100vh-120px)] overflow-y-auto",
        className,
      )}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
          Filters
          {activeFiltersCount > 0 && (
            <Badge className="gradient-purple-blue text-white border-0">{activeFiltersCount}</Badge>
          )}
        </h3>
        {isMobile ? (
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="h-5 w-5" />
          </Button>
        ) : (
          activeFiltersCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAllFilters}
              className="text-slate-400 hover:text-white hover:bg-slate-800 h-8 px-2"
            >
              <FilterX className="h-4 w-4 mr-1" />
              Clear All
            </Button>
          )
        )}
      </div>

      <Separator className="bg-slate-800 mb-4" />

      {/* Price Range Filter */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-slate-300 mb-3">Price Range ($/month)</h4>
        <div className="px-2">
          <Slider
            defaultValue={[0, 100]}
            min={0}
            max={100}
            step={5}
            value={[filters.priceRange.min, filters.priceRange.max]}
            onValueChange={handlePriceChange}
            className="[&_[role=slider]]:bg-purple-500"
          />
        </div>
        <div className="flex justify-between mt-2 text-sm text-slate-400">
          <span>${filters.priceRange.min}</span>
          <span>${filters.priceRange.max}+</span>
        </div>
      </div>

      {/* Resources Filters */}
      <Collapsible defaultOpen className="mb-5">
        <CollapsibleTrigger className="flex w-full items-center justify-between text-sm font-medium text-slate-300 mb-2">
          Resources
          <ChevronDown className="h-4 w-4 text-slate-400" />
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="space-y-4 ml-1">
            {/* RAM */}
            <div className="space-y-2">
              <h5 className="text-xs font-medium text-slate-400">RAM</h5>
              {RAM_OPTIONS.map((option) => (
                <div key={option.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`ram-${option.id}`}
                    checked={filters.ram?.includes(option.id)}
                    onCheckedChange={(checked) => handleCheckboxChange("ram", option.id, checked === true)}
                    className="border-slate-600 data-[state=checked]:bg-purple-500 data-[state=checked]:border-purple-500"
                  />
                  <Label htmlFor={`ram-${option.id}`} className="text-sm text-slate-300 font-normal cursor-pointer">
                    {option.label}
                  </Label>
                </div>
              ))}
            </div>

            {/* CPU */}
            <div className="space-y-2">
              <h5 className="text-xs font-medium text-slate-400">CPU</h5>
              {CPU_OPTIONS.map((option) => (
                <div key={option.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`cpu-${option.id}`}
                    checked={filters.cpu?.includes(option.id)}
                    onCheckedChange={(checked) => handleCheckboxChange("cpu", option.id, checked === true)}
                    className="border-slate-600 data-[state=checked]:bg-purple-500 data-[state=checked]:border-purple-500"
                  />
                  <Label htmlFor={`cpu-${option.id}`} className="text-sm text-slate-300 font-normal cursor-pointer">
                    {option.label}
                  </Label>
                </div>
              ))}
            </div>

            {/* Storage */}
            <div className="space-y-2">
              <h5 className="text-xs font-medium text-slate-400">Storage</h5>
              {STORAGE_OPTIONS.map((option) => (
                <div key={option.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`storage-${option.id}`}
                    checked={filters.storage?.includes(option.id)}
                    onCheckedChange={(checked) => handleCheckboxChange("storage", option.id, checked === true)}
                    className="border-slate-600 data-[state=checked]:bg-purple-500 data-[state=checked]:border-purple-500"
                  />
                  <Label htmlFor={`storage-${option.id}`} className="text-sm text-slate-300 font-normal cursor-pointer">
                    {option.label}
                  </Label>
                </div>
              ))}
            </div>

            {/* Bandwidth */}
            <div className="space-y-2">
              <h5 className="text-xs font-medium text-slate-400">Bandwidth</h5>
              {BANDWIDTH_OPTIONS.map((option) => (
                <div key={option.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`bandwidth-${option.id}`}
                    checked={filters.bandwidth?.includes(option.id)}
                    onCheckedChange={(checked) => handleCheckboxChange("bandwidth", option.id, checked === true)}
                    className="border-slate-600 data-[state=checked]:bg-purple-500 data-[state=checked]:border-purple-500"
                  />
                  <Label
                    htmlFor={`bandwidth-${option.id}`}
                    className="text-sm text-slate-300 font-normal cursor-pointer"
                  >
                    {option.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* Type-specific Filters */}
      {category === "vps" && (
        <Collapsible defaultOpen className="mb-5">
          <CollapsibleTrigger className="flex w-full items-center justify-between text-sm font-medium text-slate-300 mb-2">
            Operating System
            <ChevronDown className="h-4 w-4 text-slate-400" />
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="space-y-2 ml-1">
              {OS_OPTIONS.map((option) => (
                <div key={option.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`os-${option.id}`}
                    checked={filters.operatingSystem?.includes(option.id)}
                    onCheckedChange={(checked) => handleCheckboxChange("operatingSystem", option.id, checked === true)}
                    className="border-slate-600 data-[state=checked]:bg-purple-500 data-[state=checked]:border-purple-500"
                  />
                  <Label htmlFor={`os-${option.id}`} className="text-sm text-slate-300 font-normal cursor-pointer">
                    {option.label}
                  </Label>
                </div>
              ))}
            </div>
          </CollapsibleContent>
        </Collapsible>
      )}

      {isBotCategory && (
        <Collapsible defaultOpen className="mb-5">
          <CollapsibleTrigger className="flex w-full items-center justify-between text-sm font-medium text-slate-300 mb-2">
            Bot Type
            <ChevronDown className="h-4 w-4 text-slate-400" />
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="space-y-2 ml-1">
              {BOT_TYPE_OPTIONS.map((option) => (
                <div key={option.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`bot-${option.id}`}
                    checked={filters.botType?.includes(option.id)}
                    onCheckedChange={(checked) => handleCheckboxChange("botType", option.id, checked === true)}
                    className="border-slate-600 data-[state=checked]:bg-purple-500 data-[state=checked]:border-purple-500"
                  />
                  <Label htmlFor={`bot-${option.id}`} className="text-sm text-slate-300 font-normal cursor-pointer">
                    {option.label}
                  </Label>
                </div>
              ))}
            </div>
          </CollapsibleContent>
        </Collapsible>
      )}

      {/* Features */}
      <Collapsible defaultOpen className="mb-5">
        <CollapsibleTrigger className="flex w-full items-center justify-between text-sm font-medium text-slate-300 mb-2">
          Features
          <ChevronDown className="h-4 w-4 text-slate-400" />
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="space-y-2 ml-1">
            {getFeatureOptions().map((option) => (
              <div key={option.id} className="flex items-center space-x-2">
                <Checkbox
                  id={`feature-${option.id}`}
                  checked={filters.features?.includes(option.id)}
                  onCheckedChange={(checked) => handleCheckboxChange("features", option.id, checked === true)}
                  className="border-slate-600 data-[state=checked]:bg-purple-500 data-[state=checked]:border-purple-500"
                />
                <Label htmlFor={`feature-${option.id}`} className="text-sm text-slate-300 font-normal cursor-pointer">
                  {option.label}
                </Label>
              </div>
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>

      {isMobile && (
        <div className="mt-auto pt-4 space-y-2">
          <Button className="w-full gradient-purple-blue gradient-purple-blue-hover" onClick={onClose}>
            Apply Filters
          </Button>
          <Button
            variant="outline"
            className="w-full border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white"
            onClick={clearAllFilters}
          >
            Clear All Filters
          </Button>
        </div>
      )}
    </aside>
  )
}
