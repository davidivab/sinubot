"use client"

import { useState } from "react"
import Link from "next/link"
import { 
  Database, 
  Download, 
  Filter, 
  Search, 
  Eye, 
  ArrowUpDown,
  Users,
  MapPin,
  Calendar,
  FileText
} from "lucide-react"
import { AppShell } from "@/components/skymatch/app-shell"
import { BreadcrumbsNav } from "@/components/skymatch/breadcrumbs-nav"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
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
import { currentSDP, mockSocialCharacterizations, socialCharacterizationStats } from "@/lib/mock-data"

export default function CaracterizacionesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [zonaFilter, setZonaFilter] = useState<string>("all")
  const [intencionFilter, setIntencionFilter] = useState<string>("all")

  // Filter data
  const filteredData = mockSocialCharacterizations.filter((item) => {
    const matchesSearch = 
      item.nombreMorador.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.direccion.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.encuestadoId.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesZona = zonaFilter === "all" || item.zonaAeroportuaria === zonaFilter
    
    const matchesIntencion = 
      intencionFilter === "all" || 
      item.disposicion.intencionPrincipal === intencionFilter

    return matchesSearch && matchesZona && matchesIntencion
  })

  const getIntencionBadgeColor = (intencion: string) => {
    if (intencion.includes("Quedarme")) return "bg-red-100 text-red-800"
    if (intencion.includes("Vender")) return "bg-green-100 text-green-800"
    if (intencion.includes("continuar")) return "bg-amber-100 text-amber-800"
    return "bg-gray-100 text-gray-800"
  }

  const getInteresColor = (interes: string) => {
    if (interes === "Sí") return "text-green-600 font-semibold"
    if (interes === "Tal vez") return "text-amber-600 font-semibold"
    return "text-red-600 font-semibold"
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
            { label: "Base de Datos - Caracterizaciones" },
          ]}
        />

        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="font-display text-2xl font-bold text-foreground">
              Base de Datos - Caracterizaciones Sociales
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Consulta y análisis de {mockSocialCharacterizations.length} caracterizaciones individuales
              de {socialCharacterizationStats.totalEncuestas} encuestas totales
            </p>
          </div>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Exportar CSV
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Database className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Total Encuestas</p>
                  <p className="text-2xl font-bold text-foreground">
                    {socialCharacterizationStats.totalEncuestas}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-500/10">
                  <Users className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Interesados en Asociación</p>
                  <p className="text-2xl font-bold text-green-600">
                    {socialCharacterizationStats.interesAsociacion.siMeInteresa}%
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10">
                  <MapPin className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Edad Promedio</p>
                  <p className="text-2xl font-bold text-foreground">
                    {socialCharacterizationStats.promedioEdad} años
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/10">
                  <FileText className="h-5 w-5 text-amber-600" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Filtradas</p>
                  <p className="text-2xl font-bold text-foreground">
                    {filteredData.length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Filter className="h-5 w-5" />
              Filtros
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div>
                <label className="text-xs text-muted-foreground mb-2 block">
                  Búsqueda
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Nombre, dirección o ID..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-muted-foreground mb-2 block">
                  Zona Aeroportuaria
                </label>
                <Select value={zonaFilter} onValueChange={setZonaFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Todas" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas las zonas</SelectItem>
                    <SelectItem value="Directa">Directa</SelectItem>
                    <SelectItem value="Indirecta">Indirecta</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-xs text-muted-foreground mb-2 block">
                  Intención Principal
                </label>
                <Select value={intencionFilter} onValueChange={setIntencionFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Todas" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas las intenciones</SelectItem>
                    <SelectItem value="Quedarme en mi predio (no vender)">No vender</SelectItem>
                    <SelectItem value="Vender mi predio">Vender</SelectItem>
                    <SelectItem value="seguir viviendo y continuar con mis actividades económicas">
                      Continuar actividades
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {(searchTerm || zonaFilter !== "all" || intencionFilter !== "all") && (
              <div className="mt-4 flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSearchTerm("")
                    setZonaFilter("all")
                    setIntencionFilter("all")
                  }}
                >
                  Limpiar filtros
                </Button>
                <span className="text-xs text-muted-foreground">
                  Mostrando {filteredData.length} de {mockSocialCharacterizations.length} registros
                </span>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Data Table */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Database className="h-5 w-5" />
              Registros Detallados
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Morador</TableHead>
                    <TableHead>Dirección</TableHead>
                    <TableHead>Edad</TableHead>
                    <TableHead>Zona</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Intención</TableHead>
                    <TableHead>Interés Asoc.</TableHead>
                    <TableHead>Fecha</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredData.length > 0 ? (
                    filteredData.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-mono text-xs">
                          {item.encuestadoId}
                        </TableCell>
                        <TableCell className="font-medium">
                          {item.nombreMorador}
                        </TableCell>
                        <TableCell className="text-xs text-muted-foreground max-w-[200px] truncate">
                          {item.direccion}
                        </TableCell>
                        <TableCell className="text-sm">
                          {item.edad} años
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary" className="text-xs">
                            {item.zonaAeroportuaria}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-xs">
                          {item.tipoMorador}
                        </TableCell>
                        <TableCell>
                          <Badge 
                            variant="secondary" 
                            className={`text-xs ${getIntencionBadgeColor(item.disposicion.intencionPrincipal)}`}
                          >
                            {item.disposicion.intencionPrincipal.substring(0, 20)}...
                          </Badge>
                        </TableCell>
                        <TableCell className={getInteresColor(item.disposicion.interesAsociacion)}>
                          {item.disposicion.interesAsociacion}
                        </TableCell>
                        <TableCell className="text-xs text-muted-foreground">
                          {new Date(item.fecha).toLocaleDateString("es-CO")}
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={10} className="h-24 text-center text-muted-foreground">
                        No se encontraron registros con los filtros aplicados
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Distribution Summary */}
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Distribución por Zona</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Zona Directa</span>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-32 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary"
                        style={{ width: `${socialCharacterizationStats.distribucionZona.directa}%` }}
                      />
                    </div>
                    <span className="text-sm font-semibold">
                      {socialCharacterizationStats.distribucionZona.directa}%
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Zona Indirecta</span>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-32 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-blue-600"
                        style={{ width: `${socialCharacterizationStats.distribucionZona.indirecta}%` }}
                      />
                    </div>
                    <span className="text-sm font-semibold">
                      {socialCharacterizationStats.distribucionZona.indirecta}%
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Interés en Asociación</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Sí me interesa</span>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-32 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-green-600"
                        style={{ width: `${socialCharacterizationStats.interesAsociacion.siMeInteresa}%` }}
                      />
                    </div>
                    <span className="text-sm font-semibold text-green-600">
                      {socialCharacterizationStats.interesAsociacion.siMeInteresa}%
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Tal vez</span>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-32 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-amber-600"
                        style={{ width: `${socialCharacterizationStats.interesAsociacion.talVez}%` }}
                      />
                    </div>
                    <span className="text-sm font-semibold text-amber-600">
                      {socialCharacterizationStats.interesAsociacion.talVez}%
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">No me interesa</span>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-32 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-red-600"
                        style={{ width: `${socialCharacterizationStats.interesAsociacion.noMeInteresa}%` }}
                      />
                    </div>
                    <span className="text-sm font-semibold text-red-600">
                      {socialCharacterizationStats.interesAsociacion.noMeInteresa}%
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="flex items-center justify-between border-t border-border pt-6">
          <Button variant="outline" asChild>
            <Link href="/sdp/dashboard">
              Volver al Dashboard
            </Link>
          </Button>
          <div className="flex items-center gap-2">
            <Button variant="outline" asChild>
              <Link href="/sdp/analisis-social">
                Ver Análisis Agregado
              </Link>
            </Button>
            <Button>
              <Download className="mr-2 h-4 w-4" />
              Exportar Reporte
            </Button>
          </div>
        </div>
      </div>
    </AppShell>
  )
}
