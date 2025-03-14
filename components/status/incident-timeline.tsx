import type { Incident } from "@/types/status"
import { formatDistanceToNow } from "date-fns"
import StatusIndicator from "./status-indicator"

interface IncidentTimelineProps {
  incidents: Incident[]
}

export default function IncidentTimeline({ incidents }: IncidentTimelineProps) {
  if (incidents.length === 0) {
    return null
  }

  return (
    <div className="space-y-4">
      {incidents.map((incident) => (
        <div key={incident.id} className="border-l-2 pl-4 pb-4 relative">
          <div className={`absolute w-3 h-3 rounded-full -left-[7px] top-1 ${getStatusColor(incident.status)}`}></div>
          <div className="flex flex-col">
            <h4 className="text-sm font-medium">{incident.title}</h4>
            <p className="text-xs text-muted-foreground mb-2">
              {formatDistanceToNow(new Date(incident.date), { addSuffix: true })}
            </p>
            <div className="flex items-center mb-2">
              <StatusIndicator status={incident.status} size="sm" showText />
            </div>
            <p className="text-xs">{incident.message}</p>
            {incident.affectedServices && incident.affectedServices.length > 0 && (
              <div className="mt-2">
                <p className="text-xs text-muted-foreground">Affected services:</p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {incident.affectedServices.map((service) => (
                    <span key={service} className="text-xs bg-muted px-2 py-1 rounded">
                      {service}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

function getStatusColor(status: string) {
  switch (status) {
    case "resolved":
      return "bg-green-500"
    case "monitoring":
      return "bg-blue-500"
    case "identified":
      return "bg-yellow-500"
    case "investigating":
      return "bg-red-500"
    default:
      return "bg-gray-500"
  }
}

