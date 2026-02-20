"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { TopBar } from "./top-bar"
import { SidebarNav } from "./sidebar-nav"
import type { UserRole } from "@/lib/types"

interface AppShellProps {
  children: React.ReactNode
  userName: string
  userRole: UserRole
  notificationsCount?: number
}

export function AppShell({ children, userName, userRole, notificationsCount = 0 }: AppShellProps) {
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      <TopBar
        userName={userName}
        userRole={userRole}
        notificationsCount={notificationsCount}
        onMenuToggle={() => setMobileOpen(!mobileOpen)}
      />

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-30 bg-foreground/20 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar - hidden on mobile unless open */}
      <div className={cn("lg:block", mobileOpen ? "block" : "hidden")}>
        <SidebarNav role={userRole} collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} />
      </div>

      <main
        className={cn(
          "pt-16 transition-all duration-200",
          "lg:ml-60",
          collapsed && "lg:ml-16"
        )}
      >
        <div className="p-4 lg:p-6">{children}</div>
      </main>
    </div>
  )
}
