"use client"

import { useState } from "react"
import {
  Search,
  Eye,
  Pencil,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { AppShell } from "@/components/skymatch/app-shell"
import { BreadcrumbsNav } from "@/components/skymatch/breadcrumbs-nav"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { cn } from "@/lib/utils"
import { currentSDP, mockUsers } from "@/lib/mock-data"
import { statusLabels, roleConfig } from "@/lib/constants"

export default function UserManagement() {
  const [search, setSearch] = useState("")
  const [roleFilter, setRoleFilter] = useState<string>("all")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [selected, setSelected] = useState<string[]>([])

  const filtered = mockUsers.filter((u) => {
    const matchSearch =
      search === "" ||
      `${u.nombre} ${u.apellido}`.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      u.numeroDocumento.includes(search)
    const matchRole = roleFilter === "all" || u.role === roleFilter
    const matchStatus = statusFilter === "all" || u.status === statusFilter
    return matchSearch && matchRole && matchStatus
  })

  const toggleSelect = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    )
  }

  const toggleAll = () => {
    if (selected.length === filtered.length) {
      setSelected([])
    } else {
      setSelected(filtered.map((u) => u.id))
    }
  }

  return (
    <AppShell
      userName={`${currentSDP.nombre} ${currentSDP.apellido}`}
      userRole="sdp"
      notificationsCount={3}
    >
      <div className="space-y-6">
        <BreadcrumbsNav
          items={[
            { label: "Dashboard", href: "/sdp/dashboard" },
            { label: "Usuarios" },
          ]}
        />

        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">
            Gestion de Usuarios
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Administra moradores, empresarios y personal SDP registrados en la
            plataforma
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[240px] max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por nombre, email o documento..."
              className="pl-9"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Select value={roleFilter} onValueChange={setRoleFilter}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Rol" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos los roles</SelectItem>
              <SelectItem value="morador">Morador</SelectItem>
              <SelectItem value="empresario">Empresario</SelectItem>
              <SelectItem value="sdp">SDP Admin</SelectItem>
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Estado" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos los estados</SelectItem>
              <SelectItem value="activo">Activo</SelectItem>
              <SelectItem value="inactivo">Inactivo</SelectItem>
              <SelectItem value="pendiente">Pendiente</SelectItem>
              <SelectItem value="suspendido">Suspendido</SelectItem>
            </SelectContent>
          </Select>
          {selected.length > 0 && (
            <Badge variant="secondary" className="text-xs">
              {selected.length} seleccionados
            </Badge>
          )}
        </div>

        {/* Table */}
        <Card className="border border-border">
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-10">
                    <Checkbox
                      checked={
                        filtered.length > 0 &&
                        selected.length === filtered.length
                      }
                      onCheckedChange={toggleAll}
                      aria-label="Seleccionar todos"
                    />
                  </TableHead>
                  <TableHead>Usuario</TableHead>
                  <TableHead>Documento</TableHead>
                  <TableHead>Rol</TableHead>
                  <TableHead>Predios</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Registro</TableHead>
                  <TableHead className="w-24">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={8}
                      className="py-12 text-center text-sm text-muted-foreground"
                    >
                      No se encontraron usuarios con los filtros aplicados
                    </TableCell>
                  </TableRow>
                ) : (
                  filtered.map((user) => {
                    const rCfg = roleConfig[user.role]
                    const sCfg = statusLabels[user.status]
                    return (
                      <TableRow key={user.id}>
                        <TableCell>
                          <Checkbox
                            checked={selected.includes(user.id)}
                            onCheckedChange={() => toggleSelect(user.id)}
                            aria-label={`Seleccionar ${user.nombre}`}
                          />
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-muted font-medium text-sm text-muted-foreground">
                              {user.nombre[0]}
                              {user.apellido[0]}
                            </div>
                            <div>
                              <p className="font-medium text-foreground text-sm">
                                {user.nombre} {user.apellido}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {user.email}
                              </p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="font-mono text-xs text-muted-foreground">
                          {user.tipoDocumento} {user.numeroDocumento}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="secondary"
                            className={cn("text-[10px]", rCfg?.className)}
                          >
                            {rCfg?.label}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm">
                          {user.prediosCount ?? "-"}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="secondary"
                            className={cn("text-[10px]", sCfg?.className)}
                          >
                            {sCfg?.label}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-xs text-muted-foreground">
                          {new Date(user.fechaRegistro).toLocaleDateString(
                            "es-CO",
                            { day: "2-digit", month: "short", year: "numeric" }
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7"
                              title="Ver perfil"
                            >
                              <Eye className="h-3.5 w-3.5" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7"
                              title="Editar"
                            >
                              <Pencil className="h-3.5 w-3.5" />
                            </Button>
                            {user.status === "inactivo" && (
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-7 w-7"
                                title="Reactivar"
                              >
                                <RotateCcw className="h-3.5 w-3.5" />
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    )
                  })
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Pagination */}
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <p>
            Mostrando{" "}
            <span className="font-medium text-foreground">
              {filtered.length}
            </span>{" "}
            de{" "}
            <span className="font-medium text-foreground">
              1,247
            </span>{" "}
            usuarios
          </p>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" className="h-8 w-8" disabled>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="h-8 min-w-8 bg-primary text-primary-foreground hover:bg-primary/90"
            >
              1
            </Button>
            <Button variant="outline" size="sm" className="h-8 min-w-8">
              2
            </Button>
            <Button variant="outline" size="sm" className="h-8 min-w-8">
              3
            </Button>
            <span className="px-1">...</span>
            <Button variant="outline" size="sm" className="h-8 min-w-8">
              125
            </Button>
            <Button variant="outline" size="icon" className="h-8 w-8">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </AppShell>
  )
}
