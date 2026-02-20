import { cn } from "@/lib/utils"

interface ProgressBarProps {
  value: number
  label?: string
  showPercentage?: boolean
  variant?: "default" | "primary" | "success" | "warning"
  size?: "sm" | "md"
}

const barVariants: Record<string, string> = {
  default: "bg-muted-foreground",
  primary: "bg-primary",
  success: "bg-green-600",
  warning: "bg-yellow-600",
}

export function ProgressBar({
  value,
  label,
  showPercentage = true,
  variant = "primary",
  size = "md",
}: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, value))
  return (
    <div className="space-y-1.5">
      {(label || showPercentage) && (
        <div className="flex items-center justify-between">
          {label && <span className="text-sm font-medium text-foreground">{label}</span>}
          {showPercentage && <span className="text-sm font-semibold text-foreground">{clamped}%</span>}
        </div>
      )}
      <div
        className={cn(
          "w-full overflow-hidden rounded-full bg-muted",
          size === "sm" ? "h-1.5" : "h-2.5"
        )}
      >
        <div
          className={cn("h-full rounded-full transition-all duration-500", barVariants[variant])}
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  )
}
