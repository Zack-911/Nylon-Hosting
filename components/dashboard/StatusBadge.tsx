import { Badge } from "@/components/ui/badge"

interface StatusBadgeProps {
  status: string
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  let color = ""
  let text = ""

  switch (status) {
    case "online":
      color = "bg-green-500/20 text-green-400"
      text = "Online"
      break
    case "offline":
      color = "bg-red-500/20 text-red-400"
      text = "Offline"
      break
    case "maintenance":
      color = "bg-yellow-500/20 text-yellow-400"
      text = "Maintenance"
      break
    default:
      color = "bg-slate-500/20 text-slate-400"
      text = status
  }

  return <Badge className={color}>{text}</Badge>
}

