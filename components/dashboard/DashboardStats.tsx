import { Activity, ArrowUpRight, ArrowDownRight, Bitcoin, Server } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import styles from "@/styles/modules/animations.module.css"

interface DashboardStatsProps {
  miningStats: {
    totalHashrate: number
    dailyEarnings: number
  }
  servers: {
    status: string
  }[]
}

export default function DashboardStats({ miningStats, servers }: DashboardStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4" data-aos="fade-up">
      <Card className={`bg-[var(--bg-card)] border-slate-800 ${styles.cardHover}`}>
        <CardContent className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-slate-400">Total Hashrate</p>
              <h3 className="text-2xl font-bold text-white mt-1">{miningStats.totalHashrate} MH/s</h3>
              <p className="text-sm text-green-400 flex items-center mt-1">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                +5.2% from yesterday
              </p>
            </div>
            <div className={`p-3 rounded-full bg-blue-500/10 ${styles.pulseAnimation}`}>
              <Activity className="h-5 w-5 text-blue-500" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className={`bg-[var(--bg-card)] border-slate-800 ${styles.cardHover}`}>
        <CardContent className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-slate-400">Daily Earnings</p>
              <h3 className="text-2xl font-bold text-white mt-1">{miningStats.dailyEarnings} BTC</h3>
              <p className="text-sm text-green-400 flex items-center mt-1">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                +1.2% from yesterday
              </p>
            </div>
            <div className={`p-3 rounded-full bg-yellow-500/10 ${styles.pulseAnimation}`}>
              <Bitcoin className="h-5 w-5 text-yellow-500" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className={`bg-[var(--bg-card)] border-slate-800 ${styles.cardHover}`}>
        <CardContent className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-slate-400">Active Servers</p>
              <h3 className="text-2xl font-bold text-white mt-1">
                {servers.filter((s) => s.status === "online").length}/{servers.length}
              </h3>
              <p className="text-sm text-red-400 flex items-center mt-1">
                <ArrowDownRight className="h-3 w-3 mr-1" />1 server offline
              </p>
            </div>
            <div className={`p-3 rounded-full bg-green-500/10 ${styles.pulseAnimation}`}>
              <Server className="h-5 w-5 text-green-500" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
