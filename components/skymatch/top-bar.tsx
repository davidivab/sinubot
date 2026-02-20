"use client"

import Link from "next/link"
import { Bell, Search, Menu, LogOut, User, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import type { UserRole } from "@/lib/types"
import { roleConfig } from "@/lib/constants"

interface TopBarProps {
  userName: string
  userRole: UserRole
  notificationsCount?: number
  onMenuToggle?: () => void
}

export function TopBar({ userName, userRole, notificationsCount = 0, onMenuToggle }: TopBarProps) {
  const initials = userName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)

  const roleCfg = roleConfig[userRole]

  return (
    <header className="fixed top-0 right-0 left-0 z-50 flex h-16 items-center border-b border-border bg-card px-4 lg:px-6">
      <div className="flex flex-1 items-center gap-4">
        <Button variant="ghost" size="icon" className="lg:hidden" onClick={onMenuToggle}>
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>

        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-sm">
            SM
          </div>
          <span className="hidden font-display text-lg font-bold text-foreground sm:inline-block">
            SkyMatch
          </span>
        </Link>

        <div className="ml-4 hidden max-w-sm flex-1 md:flex">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Buscar predios, escenarios..."
              className="pl-9"
            />
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {notificationsCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[10px] font-medium text-destructive-foreground">
              {notificationsCount}
            </span>
          )}
          <span className="sr-only">Notificaciones</span>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2 px-2">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-primary/10 text-primary text-xs font-medium">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <div className="hidden text-left md:block">
                <p className="text-sm font-medium leading-none text-foreground">{userName}</p>
                <Badge variant="secondary" className={`mt-0.5 text-[10px] px-1.5 py-0 ${roleCfg.className}`}>
                  {roleCfg.label}
                </Badge>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem asChild>
              <Link href="/perfil" className="flex items-center gap-2">
                <User className="h-4 w-4" /> Mi Perfil
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/configuracion" className="flex items-center gap-2">
                <Settings className="h-4 w-4" /> Configuracion
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/login" className="flex items-center gap-2 text-destructive">
                <LogOut className="h-4 w-4" /> Cerrar Sesion
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
