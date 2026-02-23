"use client"

import Link from "next/link"
import { Plus, Eye, ArrowRight } from "lucide-react"
import { AppShell } from "@/components/skymatch/app-shell"
import { StatCard } from "@/components/skymatch/stat-card"
import { BreadcrumbsNav } from "@/components/skymatch/breadcrumbs-nav"
import { MapPlaceholder } from "@/components/skymatch/map-placeholder"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { cn } from "@/lib/utils"
import { currentEmpresario, empresarioStats, mockScenarios, mapMarkers } from "@/lib/mock-data"
import { statusLabels } from "@/lib/constants"

const myScenarios = mockScenarios.filter((s) => s.empresarioId === "u4")

export default function EmpresarioDashboard() {
  return (
    <AppShell
      userName={`${currentEmpresario.nombre} ${currentEmpresario.apellido}`}
      userRole="empresario"
      notificationsCount={1}
    >
      <div className="space-y-6">
        <BreadcrumbsNav items={[{ label: "Dashboard" }]} />

        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display text-2xl font-bold text-foreground">
              Dashboard Empresario
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Gestion de escenarios de desarrollo urbano
            </p>
          </div>
          <Button asChild>
            <Link href="/empresario/escenarios/nuevo">
              <Plus className="mr-2 h-4 w-4" /> Nuevo Escenario
            </Link>
          </Button>
        </div>

        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {empresarioStats.map((stat) => (
            <StatCard key={stat.label} {...stat} />
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Scenarios table */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-lg font-semibold text-foreground">Mis Escenarios</h2>
            </div>
            <Card className="border border-border">
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nombre</TableHead>
                      <TableHead>Tipo</TableHead>
                      <TableHead>Predios</TableHead>
                      <TableHead>ICS</TableHead>
                      <TableHead>Estado</TableHead>
                      <TableHead className="w-12"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {myScenarios.map((s) => {
                      const sCfg = statusLabels[s.status]
                      return (
                        <TableRow key={s.id}>
                          <TableCell className="font-medium text-foreground">{s.nombre}</TableCell>
                          <TableCell className="text-sm text-muted-foreground">{s.tipoProyecto}</TableCell>
                          <TableCell className="text-sm">{s.prediosSeleccionados.length}</TableCell>
                          <TableCell className="font-mono text-sm">{s.icsPromedio.toFixed(2)}</TableCell>
                          <TableCell>
                            <Badge variant="secondary" className={cn("text-[10px]", sCfg?.className)}>
                              {sCfg?.label}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar: map + quick actions */}
          <div className="space-y-4">
            <Card className="border border-border">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-semibold">Vista Previa ZIDA</CardTitle>
              </CardHeader>
              <CardContent className="p-3 pt-0">
                <MapPlaceholder
                  height="h-[200px]"
                  markers={mapMarkers.slice(0, 3)}
                  centerLabel="Zona ZIDA"
                  showLegend={false}
                  showControls={false}
                />
              </CardContent>
            </Card>

            <Card className="border border-border">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-semibold">Acciones rapidas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Link
                  href="/empresario/escenarios/nuevo"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                >
                  <Plus className="h-4 w-4" />
                  <span className="flex-1">Crear Escenario</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
                <Link
                  href="/empresario/mapa"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                >
                  <Eye className="h-4 w-4" />
                  <span className="flex-1">Explorar Mapa</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppShell>
  )
}
