"use client"

import type React from "react"
import { useState, useMemo, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, Info } from "lucide-react"
import { useMediaQuery } from "@/hooks/use-media-query"
import FilterSidebar, { type FilterState } from "@/components/filters/filter-sidebar"
import MobileFilterDrawer from "@/components/filters/mobile-filter-drawer"
import ActiveFilters from "@/components/filters/active-filters"
import Link from "next/link"
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"

// Define types for service products
interface ServiceProduct {
  id: string
  name: string
  icon: React.ElementType
  iconColor?: string
  description: string
  features: string[]
  pricing: {
    monthly: number
  }
  availability: string
  popular?: boolean
  category: string
  specs?: {
    ram?: string
    cpu?: string
    storage?: string
    bandwidth?: string
    os?: string[]
    botType?: string[]
  }
  tags?: string[]
}

interface FilterableServicesGridProps {
  services: ServiceProduct[]
  category: string
}

export default function FilterableServicesGrid({ services, category }: FilterableServicesGridProps) {
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
  const isDesktop = useMediaQuery("(min-width: 768px)")

  // Update active filters count
  useEffect(() => {
    let count = 0

    if (filters.priceRange.min > 0 || filters.priceRange.max < 100) count++
    if (filters.ram && filters.ram.length > 0) count++
    if (filters.cpu && filters.cpu.length > 0) count++
    if (filters.storage && filters.storage.length > 0) count++
    if (filters.bandwidth && filters.bandwidth.length > 0) count++
    if (filters.operatingSystem && filters.operatingSystem.length > 0) count++
    if (filters.botType && filters.botType.length > 0) count++
    if (filters.features && filters.features.length > 0) count++

    setActiveFiltersCount(count)
  }, [filters])

  // Apply filters to services
  const filteredServices = useMemo(() => {
    return services.filter((service) => {
      // Price filter
      if (
        service.pricing.monthly < filters.priceRange.min ||
        (service.pricing.monthly > filters.priceRange.max && filters.priceRange.max < 100)
      ) {
        return false
      }

      // RAM filter
      if (filters.ram && filters.ram.length > 0) {
        // Skip if no RAM specs or doesn't match any selected
        if (
          !service.specs?.ram ||
          !filters.ram.some((ram) => {
            // Handle special cases like "16GB" for "16+ GB"
            if (ram === "16GB") {
              const ramValue = Number.parseInt(service.specs?.ram || "0")
              return ramValue >= 16
            }
            return service.specs?.ram?.includes(ram.replace("GB", " GB")) || false
          })
        ) {
          return false
        }
      }

      // CPU filter
      if (filters.cpu && filters.cpu.length > 0) {
        if (
          !service.specs?.cpu ||
          !filters.cpu.some((cpu) => {
            // Handle special cases like "8vCPU" for "8+ vCPU"
            if (cpu === "8vCPU") {
              const cpuValue = Number.parseInt(service.specs?.cpu || "0")
              return cpuValue >= 8
            }
            return service.specs?.cpu?.includes(cpu.replace("vCPU", " vCPU")) || false
          })
        ) {
          return false
        }
      }

      // Storage filter
      if (filters.storage && filters.storage.length > 0) {
        if (
          !service.specs?.storage ||
          !filters.storage.some((storage) => {
            // Handle special cases like "250GB" for "250+ GB"
            if (storage === "250GB") {
              const storageValue = Number.parseInt(service.specs?.storage || "0")
              return storageValue >= 250
            }
            return service.specs?.storage?.includes(storage.replace("GB", " GB")) || false
          })
        ) {
          return false
        }
      }

      // Bandwidth filter
      if (filters.bandwidth && filters.bandwidth.length > 0) {
        if (
          !service.specs?.bandwidth ||
          !filters.bandwidth.some((bandwidth) => {
            if (bandwidth === "unlimited" && service.specs?.bandwidth?.toLowerCase().includes("unlimited")) {
              return true
            }
            if (bandwidth === "10TB") {
              const match = service.specs?.bandwidth?.match(/(\d+)\s*TB/)
              if (match) {
                const bandwidthValue = Number.parseInt(match[1])
                return bandwidthValue >= 10
              }
            }
            return service.specs?.bandwidth?.includes(bandwidth.replace("TB", " TB")) || false
          })
        ) {
          return false
        }
      }

      // OS filter
      if (filters.operatingSystem && filters.operatingSystem.length > 0) {
        if (!service.specs?.os || !service.specs.os.some((os) => filters.operatingSystem!.includes(os.toLowerCase()))) {
          return false
        }
      }

      // Bot type filter
      if (filters.botType && filters.botType.length > 0) {
        if (
          !service.specs?.botType ||
          !service.specs.botType.some((type) => filters.botType!.includes(type.toLowerCase()))
        ) {
          return false
        }
      }

      // Features filter
      if (filters.features && filters.features.length > 0) {
        const serviceFeatureSet = new Set(service.tags || [])
        if (!filters.features.some((feature) => serviceFeatureSet.has(feature))) {
          return false
        }
      }

      return true
    })
  }, [services, filters])

  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters)
  }

  const handleClearFilter = (filterType: string, value?: string) => {
    if (filterType === "priceRange") {
      setFilters((prev) => ({
        ...prev,
        priceRange: { min: 0, max: 100 },
      }))
    } else if (value) {
      setFilters((prev) => {
        const currentValues = (prev[filterType as keyof FilterState] as string[]) || []
        return {
          ...prev,
          [filterType]: currentValues.filter((v) => v !== value),
        }
      })
    }
  }

  const handleClearAllFilters = () => {
    setFilters({
      priceRange: { min: 0, max: 100 },
      ram: [],
      cpu: [],
      storage: [],
      bandwidth: [],
      operatingSystem: [],
      botType: [],
      features: [],
    })
  }

  return (
    <div className="w-full">
      {!isDesktop && (
        <MobileFilterDrawer
          category={category}
          onFilterChange={handleFilterChange}
          activeFiltersCount={activeFiltersCount}
        />
      )}

      <div className={`flex flex-col ${isDesktop ? "md:flex-row" : ""} gap-6`}>
        {isDesktop && <FilterSidebar className="shrink-0" category={category} onFilterChange={handleFilterChange} />}

        <div className="flex-1">
          {activeFiltersCount > 0 && (
            <ActiveFilters filters={filters} onClearFilter={handleClearFilter} onClearAll={handleClearAllFilters} />
          )}

          {filteredServices.length === 0 ? (
            <Card className="bg-[var(--bg-card)] border-slate-800 text-center p-8">
              <div className="flex flex-col items-center gap-3">
                <Info className="h-12 w-12 text-slate-500" />
                <h3 className="text-xl font-semibold text-white">No matching services</h3>
                <p className="text-slate-400 max-w-md">
                  No services match your current filter criteria. Try adjusting your filters or clearing them to see
                  more options.
                </p>
                <Button
                  variant="outline"
                  className="mt-4 border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white"
                  onClick={handleClearAllFilters}
                >
                  Clear all filters
                </Button>
              </div>
            </Card>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredServices.map((service) => (
                <Card key={service.id} className="bg-[var(--bg-card)] border-slate-800 overflow-hidden flex flex-col">
                  <CardHeader>
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="h-10 w-10 rounded-md bg-slate-800/50 flex items-center justify-center">
                        <service.icon className={`h-5 w-5 ${service.iconColor || "text-purple-400"}`} />
                      </div>
                      {service.popular && <Badge className="gradient-purple-blue text-white border-0">Popular</Badge>}
                    </div>
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-white">{service.name}</CardTitle>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Badge
                              className={`
                                ${
                                  service.availability === "High"
                                    ? "bg-green-500/20 text-green-400"
                                    : service.availability === "Medium"
                                      ? "bg-yellow-500/20 text-yellow-400"
                                      : "bg-red-500/20 text-red-400"
                                }
                              `}
                            >
                              {service.availability}
                            </Badge>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Current availability status</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <CardTitle className="text-white"></CardTitle>
                    <p className="text-slate-400 mt-2">{service.description}</p>
                  </CardHeader>
                  <CardContent className="text-slate-300 grow">
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-slate-300 mb-1">Features:</p>
                      <ul className="space-y-1">
                        {service.features.map((feature, i) => (
                          <li key={i} className="flex items-start text-sm">
                            <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                  <CardFooter className="flex flex-col gap-3">
                    <div className="w-full flex justify-between items-center">
                      <span className="text-sm text-slate-400">Monthly Price</span>
                      <span className="text-xl font-bold text-purple-400">${service.pricing.monthly.toFixed(2)}</span>
                    </div>
                    <div className="flex gap-2 w-full">
                      <Link
                        href={`/buy/${service.category === "vps" ? "hosting" : service.category}`}
                        className="flex-1"
                      >
                        <Button className="w-full gradient-purple-blue gradient-purple-blue-hover">Deploy Now</Button>
                      </Link>
                      <Link href={`/buy/${service.category === "vps" ? "hosting" : service.category}`}>
                        <Button
                          variant="outline"
                          className="border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white"
                        >
                          Details
                        </Button>
                      </Link>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
