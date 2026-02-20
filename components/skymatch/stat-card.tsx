import {
  Building2,
  Ruler,
  Mail,
  ClipboardCheck,
  FolderOpen,
  MapPin,
  BarChart3,
  DollarSign,
  Users,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  LucideIcon,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import type { StatCardData } from "@/lib/types"

const iconMap: Record<string, LucideIcon> = {
  Building2,
  Ruler,
  Mail,
  ClipboardCheck,
  FolderOpen,
  MapPin,
  BarChart3,
  DollarSign,
  Users,
  AlertTriangle,
}

const variantStyles: Record<string, string> = {
  default: "bg-muted/50 text-muted-foreground",
  primary: "bg-primary/10 text-primary",
  success: "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400",
  warning: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400",
  info: "bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400",
}

export function StatCard({ label, value, icon, trend, variant = "default" }: StatCardData) {
  const Icon = iconMap[icon] || Building2
  return (
    <Card className="border border-border">
      <CardContent className="flex items-center gap-4 p-5">
        <div className={cn("flex h-12 w-12 shrink-0 items-center justify-center rounded-xl", variantStyles[variant])}>
          <Icon className="h-6 w-6" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm text-muted-foreground truncate">{label}</p>
          <div className="flex items-baseline gap-2">
            <p className="text-2xl font-bold tracking-tight text-foreground">{value}</p>
            {trend && (
              <span
                className={cn(
                  "flex items-center text-xs font-medium",
                  trend.direction === "up" ? "text-green-600" : "text-red-600"
                )}
              >
                {trend.direction === "up" ? (
                  <TrendingUp className="mr-0.5 h-3 w-3" />
                ) : (
                  <TrendingDown className="mr-0.5 h-3 w-3" />
                )}
                +{trend.value}
              </span>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
