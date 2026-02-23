"use client"

import { BarChart3, Download, FileText, TrendingUp } from "lucide-react"
import { AppShell } from "@/components/skymatch/app-shell"
import { BreadcrumbsNav } from "@/components/skymatch/breadcrumbs-nav"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const currentSDP = {
  nombre: "Carlos",
  apellido: "Rodriguez",
}

const availableReports = [
  {
    id: "r1",
    name: "Reporte de Moradores",
    description: "Estadísticas de moradores registrados y caracterización social",
    type: "PDF",
    size: "2.3 MB",
  },
  {
    id: "r2",
    name: "Análisis de Escenarios",
    description: "Escenarios activos, aprobados y rechazados por trimestre",
    type: "Excel",
    size: "1.8 MB",
  },
  {
    id: "r3",
    name: "Intenciones por Localidad",
    description: "Distribución de intenciones (vender, asociarse, permanecer) por zona",
    type: "PDF",
    size: "1.2 MB",
  },
  {
    id: "r4",
    name: "Índice ICS Promedio",
    description: "Evolución del Índice de Complejidad Social por mes",
    type: "Excel",
    size: "850 KB",
  },
]

export default function SDPReportesPage() {
  return (
    <AppShell
      userName={`${currentSDP.nombre} ${currentSDP.apellido}`}
      userRole="sdp"
      notificationsCount={5}
    >
      <div className="space-y-6">
        <BreadcrumbsNav
          items={[
            { label: "Dashboard", href: "/sdp/dashboard" },
            { label: "Reportes" },
          ]}
        />

        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display text-2xl font-bold text-foreground">
              Reportes y Análisis
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Genera y descarga reportes estadísticos de la ZIDA
            </p>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Filters */}
          <div className="space-y-4">
            <Card className="border border-border">
              <CardHeader>
                <CardTitle className="text-base">Generar Reporte</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Tipo de Reporte</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="moradores">Moradores</SelectItem>
                      <SelectItem value="escenarios">Escenarios</SelectItem>
                      <SelectItem value="intenciones">Intenciones</SelectItem>
                      <SelectItem value="ics">Índice ICS</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Período</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Último mes" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="week">Última semana</SelectItem>
                      <SelectItem value="month">Último mes</SelectItem>
                      <SelectItem value="quarter">Último trimestre</SelectItem>
                      <SelectItem value="year">Último año</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Formato</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="PDF" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pdf">PDF</SelectItem>
                      <SelectItem value="excel">Excel</SelectItem>
                      <SelectItem value="csv">CSV</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button className="w-full">
                  <Download className="mr-2 h-4 w-4" />
                  Generar
                </Button>
              </CardContent>
            </Card>

            <Card className="border border-border">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  Resumen Rápido
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Moradores Activos</p>
                  <p className="text-2xl font-bold text-foreground">1,247</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Escenarios Aprobados</p>
                  <p className="text-2xl font-bold text-foreground">23</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">ICS Promedio</p>
                  <p className="text-2xl font-bold text-foreground">42.5</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Reports List */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="font-display text-lg font-semibold text-foreground">
              Reportes Disponibles
            </h2>
            <div className="space-y-3">
              {availableReports.map((report) => (
                <Card key={report.id} className="border border-border">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex gap-4 flex-1">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                          <FileText className="h-6 w-6 text-primary" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-foreground">{report.name}</h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            {report.description}
                          </p>
                          <div className="flex items-center gap-2 mt-2">
                            <Badge variant="secondary" className="text-xs">
                              {report.type}
                            </Badge>
                            <span className="text-xs text-muted-foreground">{report.size}</span>
                          </div>
                        </div>
                      </div>
                      <Button size="sm" variant="outline">
                        <Download className="mr-2 h-4 w-4" />
                        Descargar
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  )
}
