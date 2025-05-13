import { RefreshCw, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function DashboardHeader() {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8" data-aos="fade-down">
      <div>
        <h1 className="text-3xl font-bold tracking-tighter gradient-text">Mining Dashboard</h1>
        <p className="text-slate-400 mt-1">Monitor your servers, mining performance, and GPU inventory</p>
      </div>
      <div className="flex items-center gap-3">
        <Button variant="outline" className="border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white">
          <RefreshCw className="mr-2 h-4 w-4" />
          Refresh
        </Button>
        <Button className="gradient-purple-blue gradient-purple-blue-hover">
          <Plus className="mr-2 h-4 w-4" />
          Add Server
        </Button>
      </div>
    </div>
  )
}
