"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { SlidersHorizontal } from "lucide-react"
import FilterSidebar, { type FilterState } from "./filter-sidebar"

interface MobileFilterDrawerProps {
  category: string
  onFilterChange: (filters: FilterState) => void
  activeFiltersCount: number
}

export default function MobileFilterDrawer({ category, onFilterChange, activeFiltersCount }: MobileFilterDrawerProps) {
  const [open, setOpen] = React.useState(false)

  const handleFilterChange = (filters: FilterState) => {
    onFilterChange(filters)
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          className="border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white w-full md:w-auto mb-4"
        >
          <SlidersHorizontal className="h-4 w-4 mr-2" />
          Filters
          {activeFiltersCount > 0 && (
            <span className="ml-2 bg-purple-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {activeFiltersCount}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0 bg-[var(--bg-card)] border-slate-800 w-full max-w-md">
        <FilterSidebar
          category={category}
          onFilterChange={handleFilterChange}
          isMobile={true}
          onClose={() => setOpen(false)}
        />
      </SheetContent>
    </Sheet>
  )
}

