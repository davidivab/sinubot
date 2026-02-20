import { AlertTriangle, Info, CheckCircle2, XCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"

interface AlertBannerProps {
  variant: "warning" | "info" | "success" | "error"
  title: string
  message: string
  actionLabel?: string
  actionHref?: string
}

const variants = {
  warning: {
    icon: AlertTriangle,
    className: "border-yellow-300 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-950/30",
    iconColor: "text-yellow-600 dark:text-yellow-400",
    titleColor: "text-yellow-800 dark:text-yellow-300",
    textColor: "text-yellow-700 dark:text-yellow-400",
  },
  info: {
    icon: Info,
    className: "border-blue-300 bg-blue-50 dark:border-blue-800 dark:bg-blue-950/30",
    iconColor: "text-blue-600 dark:text-blue-400",
    titleColor: "text-blue-800 dark:text-blue-300",
    textColor: "text-blue-700 dark:text-blue-400",
  },
  success: {
    icon: CheckCircle2,
    className: "border-green-300 bg-green-50 dark:border-green-800 dark:bg-green-950/30",
    iconColor: "text-green-600 dark:text-green-400",
    titleColor: "text-green-800 dark:text-green-300",
    textColor: "text-green-700 dark:text-green-400",
  },
  error: {
    icon: XCircle,
    className: "border-red-300 bg-red-50 dark:border-red-800 dark:bg-red-950/30",
    iconColor: "text-red-600 dark:text-red-400",
    titleColor: "text-red-800 dark:text-red-300",
    textColor: "text-red-700 dark:text-red-400",
  },
}

export function AlertBanner({ variant, title, message, actionLabel, actionHref }: AlertBannerProps) {
  const cfg = variants[variant]
  const Icon = cfg.icon

  return (
    <div className={cn("flex gap-3 rounded-lg border p-4", cfg.className)}>
      <Icon className={cn("h-5 w-5 shrink-0 mt-0.5", cfg.iconColor)} />
      <div className="flex-1 min-w-0">
        <p className={cn("text-sm font-semibold", cfg.titleColor)}>{title}</p>
        <p className={cn("mt-0.5 text-sm", cfg.textColor)}>{message}</p>
        {actionLabel && actionHref && (
          <Link
            href={actionHref}
            className={cn("mt-2 inline-block text-sm font-medium underline underline-offset-2", cfg.titleColor)}
          >
            {actionLabel}
          </Link>
        )}
      </div>
    </div>
  )
}
