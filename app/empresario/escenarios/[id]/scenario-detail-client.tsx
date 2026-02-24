"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { 
  ArrowLeft, 
  Calendar, 
  DollarSign, 
  MapPin, 
  FileText, 
  Edit, 
  Trash2,
  Building2,
  Map,
  TrendingUp
} from "lucide-react"
import { AppShell } from "@/components/skymatch/app-shell"
import { BreadcrumbsNav } from "@/components/skymatch/breadcrumbs-nav"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { currentEmpresario, mockProperties } from "@/lib/mock-data"
import { statusLabels } from "@/lib/constants"
import { cn } from "@/lib/utils"
import type { Scenario } from "@/lib/types"

interface ScenarioDetailClientProps {
  scenario: Scenario | null
}

export function ScenarioDetailClient({ scenario }: ScenarioDetailClientProps) {
  const router = useRouter()

  if (!scenario) {
    return (
      <AppShell
        userName={`${currentEmpresario.nombre} ${currentEmpresario.apellido}`}
        userRole="empresario"
        notificationsCount={1}
      >
        <div className="flex min-h-[400px] items-center justify-center">
          <div className="text-center">
            <h2 className="font-display text-2xl font-bold text-foreground">
              Escenario no encontrado
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              El escenario que buscas no existe o fue eliminado
            </p>
            <Button className="mt-6" asChild>
              <Link href="/empresario/escenarios">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Volver a Escenarios
              </Link>
            </Button>
          </div>
        </div>
      </AppShell>
    )
  }

  // Get the predios selected for this scenario
  const selectedPredios = mockProperties.filter((p) =>
    scenario.prediosSeleccionados.includes(p.id)
  )

  const statusConfig = statusLabels[scenario.status]

  return (
    <AppShell
      userName={`${currentEmpresario.nombre} ${currentEmpresario.apellido}`}
      userRole="empresario"
      notificationsCount={1}
    >
      <div className="space-y-6">
        <BreadcrumbsNav
          items={[
            { label: "Dashboard", href: "/empresario/dashboard" },
            { label: "Escenarios", href: "/empresario/escenarios" },
            { label: scenario.nombre },
          ]}
        />

        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3">
              <h1 className="font-display text-2xl font-bold text-foreground">
                {scenario.nombre}
              </h1>
              <Badge variant="secondary" className={cn("text-xs", statusConfig?.className)}>
                {statusConfig?.label}
              </Badge>
            </div>
            <p className="mt-2 text-sm text-muted-foreground max-w-2xl">
              {scenario.descripcion}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Edit className="mr-2 h-4 w-4" />
              Editar
            </Button>
            <Button variant="outline" size="sm" className="text-destructive">
              <Trash2 className="mr-2 h-4 w-4" />
              Eliminar
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="border border-border">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Building2 className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Tipo Proyecto</p>
                  <p className="font-semibold text-foreground">{scenario.tipoProyecto}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-border">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-500/10">
                  <DollarSign className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Inversión</p>
                  <p className="font-semibold text-foreground">
                    ${(scenario.inversionEstimada / 1000000).toFixed(0)}M
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-border">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10">
                  <MapPin className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Predios</p>
                  <p className="font-semibold text-foreground">
                    {scenario.prediosSeleccionados.length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-border">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/10">
                  <TrendingUp className="h-5 w-5 text-amber-600" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">ICS Promedio</p>
                  <p className="font-semibold text-foreground font-mono">
                    {scenario.icsPromedio.toFixed(2)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Project Details */}
          <Card className="border border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <FileText className="h-5 w-5" />
                Detalles del Proyecto
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground">Empresa</p>
                  <p className="mt-1 text-sm font-medium text-foreground">
                    {scenario.empresaNombre}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Área Total</p>
                  <p className="mt-1 text-sm font-medium text-foreground">
                    {scenario.areaTotal.toLocaleString()} m²
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Plazo</p>
                  <p className="mt-1 text-sm font-medium text-foreground">
                    {scenario.plazo}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Fecha Objetivo</p>
                  <p className="mt-1 text-sm font-medium text-foreground">
                    {new Date(scenario.fechaObjetivo).toLocaleDateString("es-CO")}
                  </p>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <p className="text-xs text-muted-foreground">Inversión Estimada</p>
                <p className="text-2xl font-bold text-foreground">
                  ${scenario.inversionEstimada.toLocaleString("es-CO")}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Timeline */}
          <Card className="border border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Calendar className="h-5 w-5" />
                Línea de Tiempo
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">Creación</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(scenario.fechaCreacion).toLocaleDateString("es-CO")}
                    </p>
                  </div>
                </div>

                <div className="ml-4 border-l-2 border-border pl-7 pb-3">
                  <div className="flex items-start gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-500/10">
                      <div className="h-2 w-2 rounded-full bg-amber-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">Última Actualización</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(scenario.fechaActualizacion).toLocaleDateString("es-CO")}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="ml-4 border-l-2 border-dashed border-border pl-7">
                  <div className="flex items-start gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                      <div className="h-2 w-2 rounded-full bg-muted-foreground" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">Fecha Objetivo</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(scenario.fechaObjetivo).toLocaleDateString("es-CO")}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Selected Properties */}
        <Card className="border border-border">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Map className="h-5 w-5" />
                Predios Seleccionados ({selectedPredios.length})
              </CardTitle>
              <Button variant="outline" size="sm" asChild>
                <Link href="/empresario/mapa">
                  <MapPin className="mr-2 h-4 w-4" />
                  Ver en Mapa
                </Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {selectedPredios.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>CHIP</TableHead>
                    <TableHead>Dirección</TableHead>
                    <TableHead>Localidad</TableHead>
                    <TableHead>Área</TableHead>
                    <TableHead>Tipo Propiedad</TableHead>
                    <TableHead>Estado</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {selectedPredios.map((predio) => (
                    <TableRow key={predio.id}>
                      <TableCell className="font-mono text-sm">{predio.chipCode}</TableCell>
                      <TableCell className="text-sm">{predio.direccion}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {predio.localidad}
                      </TableCell>
                      <TableCell className="text-sm">{predio.areaMt2} m²</TableCell>
                      <TableCell className="text-sm capitalize">{predio.ownershipType}</TableCell>
                      <TableCell className="text-sm">
                        <Badge variant="secondary" className="text-xs">
                          {predio.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="py-8 text-center text-muted-foreground">
                No hay predios seleccionados para este escenario
              </div>
            )}
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex items-center justify-between border-t border-border pt-6">
          <Button variant="outline" asChild>
            <Link href="/empresario/escenarios">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver a Escenarios
            </Link>
          </Button>
          <div className="flex items-center gap-2">
            <Button variant="outline" asChild>
              <Link href="/empresario/mapa">
                <MapPin className="mr-2 h-4 w-4" />
                Ver en Mapa
              </Link>
            </Button>
            <Button>
              Solicitar Aprobación
            </Button>
          </div>
        </div>
      </div>
    </AppShell>
  )
}
