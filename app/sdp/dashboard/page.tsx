"use client"

import Link from "next/link"
import {
  Eye,
  ArrowRight,
  Clock,
  UserPlus,
  FileCheck,
  AlertTriangle,
  BarChart3,
  Database,
} from "lucide-react"
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
import {
  currentSDP,
  sdpStats,
  mockActivity,
  mockScenarios,
  mapMarkers,
} from "@/lib/mock-data"
import { statusLabels } from "@/lib/constants"

const activityIcons: Record<string, React.ReactNode> = {
  usuario_registrado: <UserPlus className="h-4 w-4 text-info" />,
  escenario_creado: <FileCheck className="h-4 w-4 text-secondary" />,
  escenario_aprobado: <FileCheck className="h-4 w-4 text-success" />,
  escenario_rechazado: <FileCheck className="h-4 w-4 text-destructive" />,
  alerta_social: <AlertTriangle className="h-4 w-4 text-warning" />,
  registro_predio: <Clock className="h-4 w-4 text-muted-foreground" />,
  caracterizacion: <Clock className="h-4 w-4 text-muted-foreground" />,
  oferta_recibida: <Clock className="h-4 w-4 text-muted-foreground" />,
}

const pendingScenarios = mockScenarios.filter(
  (s) => s.status === "en_revision"
)

export default function SDPDashboard() {
  return (
    <AppShell
      userName={`${currentSDP.nombre} ${currentSDP.apellido}`}
      userRole="sdp"
      notificationsCount={3}
    >
      <div className="space-y-6">
        <BreadcrumbsNav items={[{ label: "Dashboard" }]} />

        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">
            Panel de Administracion SDP
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Supervision y gestion integral de la zona ZIDA
          </p>
        </div>

        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {sdpStats.map((stat) => (
            <StatCard key={stat.label} {...stat} />
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Recent activity + pending reviews */}
          <div className="lg:col-span-2 space-y-6">
            {/* Pending reviews */}
            <Card className="border border-border">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-semibold">
                    Escenarios Pendientes de Revision
                  </CardTitle>
                  <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400">
                    {pendingScenarios.length} pendientes
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Escenario</TableHead>
                      <TableHead>Empresa</TableHead>
                      <TableHead>Predios</TableHead>
                      <TableHead>ICS</TableHead>
                      <TableHead>Estado</TableHead>
                      <TableHead className="w-12"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pendingScenarios.length === 0 ? (
                      <TableRow>
                        <TableCell
                          colSpan={6}
                          className="py-8 text-center text-sm text-muted-foreground"
                        >
                          No hay escenarios pendientes de revision
                        </TableCell>
                      </TableRow>
                    ) : (
                      pendingScenarios.map((s) => {
                        const sCfg = statusLabels[s.status]
                        return (
                          <TableRow key={s.id}>
                            <TableCell className="font-medium text-foreground">
                              {s.nombre}
                            </TableCell>
                            <TableCell className="text-sm text-muted-foreground">
                              {s.empresaNombre}
                            </TableCell>
                            <TableCell className="text-sm">
                              {s.prediosSeleccionados.length}
                            </TableCell>
                            <TableCell className="font-mono text-sm">
                              {s.icsPromedio.toFixed(2)}
                            </TableCell>
                            <TableCell>
                              <Badge
                                variant="secondary"
                                className={cn("text-[10px]", sCfg?.className)}
                              >
                                {sCfg?.label}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
                                <Link href={`/sdp/escenarios/${s.id}`}>
                                  <Eye className="h-4 w-4" />
                                </Link>
                              </Button>
                            </TableCell>
                          </TableRow>
                        )
                      })
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Recent activity */}
            <Card className="border border-border">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-semibold">
                  Actividad Reciente
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-1 p-4 pt-0">
                {mockActivity.slice(0, 6).map((item) => (
                  <div
                    key={item.id}
                    className="flex items-start gap-3 rounded-lg px-3 py-2.5 hover:bg-muted/50 transition-colors"
                  >
                    <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted">
                      {activityIcons[item.type] ?? (
                        <Clock className="h-4 w-4 text-muted-foreground" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground">
                        {item.title}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        {item.description}
                      </p>
                    </div>
                    <span className="shrink-0 text-[11px] text-muted-foreground">
                      {new Date(item.timestamp).toLocaleDateString("es-CO", {
                        day: "2-digit",
                        month: "short",
                      })}
                    </span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Right sidebar */}
          <div className="space-y-4">
            {/* ZIDA map preview */}
            <Card className="border border-border">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-semibold">
                  Vista General ZIDA
                </CardTitle>
              </CardHeader>
              <CardContent className="p-3 pt-0">
                <MapPlaceholder
                  height="h-[220px]"
                  markers={mapMarkers}
                  centerLabel="Zona ZIDA"
                  showLegend={false}
                  showControls={false}
                />
              </CardContent>
            </Card>

            {/* Quick actions */}
            <Card className="border border-border">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-semibold">
                  Acciones rapidas
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {[
                  {
                    href: "/sdp/caracterizaciones",
                    label: "Base de Datos",
                    icon: <Database className="h-4 w-4" />,
                  },
                  {
                    href: "/sdp/analisis-social",
                    label: "Análisis Social",
                    icon: <BarChart3 className="h-4 w-4" />,
                  },
                  {
                    href: "/sdp/usuarios",
                    label: "Gestion de Usuarios",
                    icon: <UserPlus className="h-4 w-4" />,
                  },
                  {
                    href: "/sdp/escenarios",
                    label: "Revisar Escenarios",
                    icon: <FileCheck className="h-4 w-4" />,
                  },
                  {
                    href: "/sdp/mapa",
                    label: "Mapa ZIDA",
                    icon: <Eye className="h-4 w-4" />,
                  },
                ].map((action) => (
                  <Link
                    key={action.href}
                    href={action.href}
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                  >
                    {action.icon}
                    <span className="flex-1">{action.label}</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                ))}
              </CardContent>
            </Card>

            {/* Alerts summary */}
            <Card className="border border-destructive/20 bg-destructive/5">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-sm font-semibold text-destructive">
                  <AlertTriangle className="h-4 w-4" />
                  Alertas Activas
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="rounded-md bg-background px-3 py-2 text-xs">
                  <p className="font-medium text-foreground">
                    Alto riesgo social
                  </p>
                  <p className="text-muted-foreground">
                    Predio AAA-0004 en Rafael Uribe
                  </p>
                </div>
                <div className="rounded-md bg-background px-3 py-2 text-xs">
                  <p className="font-medium text-foreground">
                    Caracterizacion pendiente
                  </p>
                  <p className="text-muted-foreground">
                    12 predios sin completar &gt; 30 dias
                  </p>
                </div>
                <div className="rounded-md bg-background px-3 py-2 text-xs">
                  <p className="font-medium text-foreground">
                    Revision atrasada
                  </p>
                  <p className="text-muted-foreground">
                    Escenario Renovacion Urbana &gt; 15 dias
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppShell>
  )
}
