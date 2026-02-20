"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Building2,
  ClipboardList,
  Map,
  User,
  Settings,
  FolderOpen,
  Users,
  ChevronLeft,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { sidebarNav } from "@/lib/constants"
import type { UserRole } from "@/lib/types"

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  LayoutDashboard,
  Building2,
  ClipboardList,
  Map,
  User,
  Settings,
  FolderOpen,
  Users,
}

interface SidebarNavProps {
  role: UserRole
  collapsed?: boolean
  onToggle?: () => void
}

export function SidebarNav({ role, collapsed = false, onToggle }: SidebarNavProps) {
  const pathname = usePathname()
  const items = sidebarNav[role]

  return (
    <aside
      className={cn(
        "fixed left-0 top-16 z-40 flex h-[calc(100vh-4rem)] flex-col border-r border-border bg-card transition-all duration-200",
        collapsed ? "w-16" : "w-60"
      )}
    >
      <nav className="flex-1 space-y-1 px-2 py-4">
        {items.map((item) => {
          const Icon = iconMap[item.icon] || LayoutDashboard
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <Icon className="h-5 w-5 shrink-0" />
              {!collapsed && (
                <>
                  <span className="flex-1">{item.label}</span>
                  {item.badge != null && item.badge > 0 && (
                    <Badge variant="destructive" className="h-5 px-1.5 text-[10px]">
                      {item.badge}
                    </Badge>
                  )}
                </>
              )}
            </Link>
          )
        })}
      </nav>

      <div className="border-t border-border p-2">
        <Button variant="ghost" size="sm" className="w-full justify-center" onClick={onToggle}>
          <ChevronLeft className={cn("h-4 w-4 transition-transform", collapsed && "rotate-180")} />
          {!collapsed && <span className="ml-2 text-xs text-muted-foreground">Colapsar</span>}
        </Button>
      </div>
    </aside>
  )
}
