"use client"

import Link from "next/link"
import { AppShell } from "@/components/skymatch/app-shell"
import { BreadcrumbsNav } from "@/components/skymatch/breadcrumbs-nav"
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
import { currentEmpresario } from "@/lib/mock-data"
import { Eye, TrendingUp, MapPin, BarChart3 } from "lucide-react"

const mockOpportunities = [
  { id: "o1", zona: "Centro Histórico", localidad: "Santa Fe", predios: 85, areaTotalM2: 12450, icsPromedio: 38.2, potencial: "alto" },
  { id: "o2", zona: "Rafael Uribe Este", localidad: "Rafael Uribe", predios: 42, areaTotalM2: 6780, icsPromedio: 52.1, potencial: "medio" },
  { id: "o3", zona: "La Candelaria Sur", localidad: "La Candelaria", predios: 67, areaTotalM2: 9320, icsPromedio: 35.8, potencial: "alto" },
  { id: "o4", zona: "Teusaquillo Norte", localidad: "Teusaquillo", predios: 23, areaTotalM2: 4560, icsPromedio: 45.3, potencial: "medio" },
  { id: "o5", zona: "Usaquén Centro", localidad: "Usaquén", predios: 18, areaTotalM2: 3200, icsPromedio: 62.5, potencial: "bajo" },
  { id: "o6", zona: "Chapinero Alto", localidad: "Chapinero", predios: 31, areaTotalM2: 5890, icsPromedio: 48.7, potencial: "medio" },
  { id: "o7", zona: "Engativá Occidental", localidad: "Engativá", predios: 56, areaTotalM2: 8920, icsPromedio: 41.2, potencial: "alto" },
  { id: "o8", zona: "Kennedy Central", localidad: "Kennedy", predios: 74, areaTotalM2: 11240, icsPromedio: 39.6, potencial: "alto" },
]

export default function EmpresarioOportunidadesPage() {
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
            { label: "Oportunidades" },
          ]}
        />

        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">
            Oportunidades Identificadas
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Zonas con potencial de desarrollo urbano basadas en tus búsquedas
          </p>
        </div>

        {/* Stats overview */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card className="border-border">
            <CardContent className="flex items-center gap-3 pt-6">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                <TrendingUp className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">8</p>
                <p className="text-xs text-muted-foreground">Oportunidades activas</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardContent className="flex items-center gap-3 pt-6">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-secondary/10">
                <MapPin className="h-5 w-5 text-secondary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">3</p>
                <p className="text-xs text-muted-foreground">Localidades cubiertas</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardContent className="flex items-center gap-3 pt-6">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-success/10">
                <BarChart3 className="h-5 w-5 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">42.3</p>
                <p className="text-xs text-muted-foreground">ICS promedio</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardContent className="flex items-center gap-3 pt-6">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-warning/10">
                <Eye className="h-5 w-5 text-warning" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">124</p>
                <p className="text-xs text-muted-foreground">Predios totales</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Opportunities table */}
        <Card className="border-border">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Listado de Oportunidades</CardTitle>
              <Button variant="outline" size="sm" asChild>
                <Link href="/empresario/busqueda">Nueva búsqueda</Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Zona</TableHead>
                  <TableHead>Localidad</TableHead>
                  <TableHead className="text-right">Predios</TableHead>
                  <TableHead className="text-right">Área Total</TableHead>
                  <TableHead className="text-right">ICS Promedio</TableHead>
                  <TableHead>Potencial</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockOpportunities.map((opp) => (
                  <TableRow key={opp.id}>
                    <TableCell className="font-medium">{opp.zona}</TableCell>
                    <TableCell>{opp.localidad}</TableCell>
                    <TableCell className="text-right">{opp.predios}</TableCell>
                    <TableCell className="text-right">{opp.areaTotalM2} m²</TableCell>
                    <TableCell className="text-right">
                      <Badge variant="outline" className="font-mono">
                        {opp.icsPromedio}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          opp.potencial === "alto"
                            ? "default"
                            : opp.potencial === "medio"
                            ? "secondary"
                            : "outline"
                        }
                      >
                        {opp.potencial}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" asChild>
                        <Link href={`/empresario/oportunidades/${opp.id}`}>
                          <Eye className="mr-2 h-3.5 w-3.5" />
                          Ver detalle
                        </Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Info card */}
        <Card className="border-info/50 bg-info/5">
          <CardContent className="flex items-start gap-3 pt-6">
            <Eye className="h-5 w-5 text-info shrink-0 mt-0.5" />
            <div className="text-sm">
              <p className="font-medium text-foreground">Datos anónimos y agregados</p>
              <p className="text-muted-foreground mt-1">
                Todas las oportunidades se muestran con datos agregados y anónimos de acuerdo
                con la Ley 1581/2012. Para avanzar en un proyecto, debes crear un escenario
                formal que será revisado por la SDP.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  )
}
