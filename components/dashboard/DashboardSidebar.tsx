import { User, Settings, Bell, LogOut, Zap, Wallet, Server, CpuIcon as Gpu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import styles from "@/styles/modules/animations.module.css"

interface DashboardSidebarProps {
  miningStats: {
    totalHashrate: number
    activeWorkers: number
    dailyEarnings: number
    powerConsumption: number
    efficiency: number
  }
}

export default function DashboardSidebar({ miningStats }: DashboardSidebarProps) {
  return (
    <div className="space-y-6 sticky top-20">
      {/* User Profile Card */}
      <Card className={`bg-[var(--bg-card)] border-slate-800 ${styles.cardHover}`} data-aos="fade-right">
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            <div className="relative h-12 w-12 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center">
              <span className="text-white font-bold text-lg">JD</span>
            </div>
            <div>
              <h3 className="font-medium text-white">John Doe</h3>
              <p className="text-sm text-slate-400">Premium Miner</p>
            </div>
          </div>

          <Separator className="my-4 bg-slate-700" />

          <div className="space-y-1">
            <Button
              variant="ghost"
              className="w-full justify-start text-slate-300 hover:text-white hover:bg-slate-800/30"
            >
              <User className="mr-2 h-4 w-4" />
              Profile
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start text-slate-300 hover:text-white hover:bg-slate-800/30"
            >
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start text-slate-300 hover:text-white hover:bg-slate-800/30"
            >
              <Bell className="mr-2 h-4 w-4" />
              Notifications
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start text-slate-300 hover:text-white hover:bg-slate-800/30"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Mining Summary Card */}
      <Card
        className={`bg-[var(--bg-card)] border-slate-800 ${styles.cardHover}`}
        data-aos="fade-right"
        data-aos-delay="100"
      >
        <CardHeader>
          <CardTitle className="text-white">Mining Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-slate-400">Total Hashrate</span>
              <span className="font-medium text-white">{miningStats.totalHashrate} MH/s</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Active Workers</span>
              <span className="font-medium text-white">{miningStats.activeWorkers}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Daily Earnings</span>
              <span className="font-medium text-white">{miningStats.dailyEarnings} BTC</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Power Consumption</span>
              <span className="font-medium text-white">{miningStats.powerConsumption} W</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Efficiency</span>
              <span className="font-medium text-white">{miningStats.efficiency} MH/J</span>
            </div>
          </div>

          <Separator className="bg-slate-700" />

          <div className="pt-2">
            <Button
              variant="outline"
              className="w-full border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white"
            >
              View Detailed Stats
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions Card */}
      <Card
        className={`bg-[var(--bg-card)] border-slate-800 ${styles.cardHover}`}
        data-aos="fade-right"
        data-aos-delay="200"
      >
        <CardHeader>
          <CardTitle className="text-white">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Button
            variant="outline"
            className="w-full justify-start border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white"
          >
            <Zap className="mr-2 h-4 w-4 text-yellow-500" />
            Optimize Mining
          </Button>
          <Button
            variant="outline"
            className="w-full justify-start border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white"
          >
            <Wallet className="mr-2 h-4 w-4 text-green-500" />
            Withdraw Earnings
          </Button>
          <Button
            variant="outline"
            className="w-full justify-start border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white"
          >
            <Server className="mr-2 h-4 w-4 text-blue-500" />
            Add New Server
          </Button>
          <Button
            variant="outline"
            className="w-full justify-start border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white"
          >
            <Gpu className="mr-2 h-4 w-4 text-purple-500" />
            Add New GPU
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

