"use client"

import { useState } from "react"
import Link from "next/link"
import { 
  Database, 
  Download, 
  Filter, 
  Search, 
  Eye, 
  TrendingUp,
  Users,
  MapPin,
  Target,
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
import { currentEmpresario, mockSocialCharacterizations, socialCharacterizationStats } from "@/lib/mock-data"

export default function CaracterizacionesEmpresarioPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [zonaFilter, setZonaFilter] = useState<string>("all")
  const [interesFilter, setInteresFilter] = useState<string>("all")

  // Filter data
  const filteredData = mockSocialCharacterizations.filter((item) => {
    const matchesSearch = 
      item.nombreMorador.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.direccion.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.encuestadoId.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesZona = zonaFilter === "all" || item.zonaAeroportuaria === zonaFilter
    
    const matchesInteres = 
      interesFilter === "all" || 
      item.disposicion.interesAsociacion === interesFilter

    return matchesSearch && matchesZona && matchesInteres
  })

  // Calculate opportunity score
  const getOpportunityScore = (item: typeof mockSocialCharacterizations[0]) => {
    let score = 0
    
    // Interest in association
    if (item.disposicion.interesAsociacion === "Sí me interesa") score += 40
    else if (item.disposicion.interesAsociacion === "Tal vez, si los beneficios están claros") score += 20
    
    // Intention to sell
    if (item.disposicion.intencionPrincipal.includes("Vender")) score += 30
    
    // Decision timeframe
    if (item.disposicion.tiempoDecision === "Menos de 6 meses") score += 20
    else if (item.disposicion.tiempoDecision === "Entre 6 meses y 1 año") score += 10
    
    // Received offers
    if (item.actividadPredioUltimoAno?.includes("ofertas de compra")) score += 10
    
    return score
  }

  const getScoreColor = (score: number) => {
    if (score >= 70) return "text-green-600 font-bold"
    if (score >= 40) return "text-amber-600 font-semibold"
    return "text-red-600"
  }

  const getScoreBadge = (score: number) => {
    if (score >= 70) return { label: "Alta", class: "bg-green-100 text-green-800" }
    if (score >= 40) return { label: "Media", class: "bg-amber-100 text-amber-800" }
    return { label: "Baja", class: "bg-red-100 text-red-800" }
  }

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
            { label: "Base de Datos - Moradores" },
          ]}
        />

        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="font-display text-2xl font-bold text-foreground">
              Base de Datos - Perfiles de Moradores
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Análisis estratégico de {mockSocialCharacterizations.length} perfiles individuales
              basados en {socialCharacterizationStats.totalEncuestas} caracterizaciones sociales
            </p>
          </div>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Exportar Análisis
          </Button>
        </div>

        {/* Strategic Stats */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-500/10">
                  <Target className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Oportunidades Alto Potencial</p>
                  <p className="text-2xl font-bold text-green-600">
                    {filteredData.filter(item => getOpportunityScore(item) >= 70).length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Interesados en Asociación</p>
                  <p className="text-2xl font-bold text-primary">
                    {filteredData.filter(item => item.disposicion.interesAsociacion === "Sí me interesa").length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/10">
                  <TrendingUp className="h-5 w-5 text-amber-600" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Potencial Medio</p>
                  <p className="text-2xl font-bold text-amber-600">
                    {filteredData.filter(item => {
                      const score = getOpportunityScore(item)
                      return score >= 40 && score < 70
                    }).length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10">
                  <Database className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Total Perfiles</p>
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
              Filtros Estratégicos
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
                  Interés en Asociación
                </label>
                <Select value={interesFilter} onValueChange={setInteresFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Todos" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos los niveles</SelectItem>
                    <SelectItem value="Sí me interesa">Sí me interesa</SelectItem>
                    <SelectItem value="Tal vez, si los beneficios están claros">Tal vez</SelectItem>
                    <SelectItem value="No me interesa">No me interesa</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {(searchTerm || zonaFilter !== "all" || interesFilter !== "all") && (
              <div className="mt-4 flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSearchTerm("")
                    setZonaFilter("all")
                    setInteresFilter("all")
                  }}
                >
                  Limpiar filtros
                </Button>
                <span className="text-xs text-muted-foreground">
                  Mostrando {filteredData.length} de {mockSocialCharacterizations.length} perfiles
                </span>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Strategic Data Table */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Database className="h-5 w-5" />
              Perfiles con Score de Oportunidad
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
                    <TableHead>Zona</TableHead>
                    <TableHead>Edad</TableHead>
                    <TableHead>Interés</TableHead>
                    <TableHead>Tiempo Decisión</TableHead>
                    <TableHead>Score</TableHead>
                    <TableHead>Prioridad</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredData.length > 0 ? (
                    filteredData
                      .sort((a, b) => getOpportunityScore(b) - getOpportunityScore(a))
                      .map((item) => {
                        const score = getOpportunityScore(item)
                        const scoreBadge = getScoreBadge(score)
                        
                        return (
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
                            <TableCell>
                              <Badge variant="secondary" className="text-xs">
                                {item.zonaAeroportuaria}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-sm">
                              {item.edad}
                            </TableCell>
                            <TableCell>
                              <Badge 
                                variant="secondary"
                                className={`text-xs ${
                                  item.disposicion.interesAsociacion === "Sí me interesa" 
                                    ? "bg-green-100 text-green-800"
                                    : item.disposicion.interesAsociacion.startsWith("Tal vez")
                                    ? "bg-amber-100 text-amber-800"
                                    : "bg-red-100 text-red-800"
                                }`}
                              >
                                {item.disposicion.interesAsociacion}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-xs max-w-[120px] truncate">
                              {item.disposicion.tiempoDecision}
                            </TableCell>
                            <TableCell className={getScoreColor(score)}>
                              {score}/100
                            </TableCell>
                            <TableCell>
                              <Badge variant="secondary" className={scoreBadge.class}>
                                {scoreBadge.label}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right">
                              <Button variant="ghost" size="sm">
                                <Eye className="h-4 w-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        )
                      })
                  ) : (
                    <TableRow>
                      <TableCell colSpan={10} className="h-24 text-center text-muted-foreground">
                        No se encontraron perfiles con los filtros aplicados
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Strategic Insights */}
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Top 5 Motivadores</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {socialCharacterizationStats.factoresMotivadoresPrincipales
                  .slice(0, 5)
                  .map((factor, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        {index + 1}. {factor.nombre}
                      </span>
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-32 bg-muted rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-green-600"
                            style={{ width: `${factor.porcentajeMuyImportante}%` }}
                          />
                        </div>
                        <span className="text-sm font-semibold text-green-600 w-12 text-right">
                          {factor.porcentajeMuyImportante}%
                        </span>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Distribución de Decisión</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Menos de 6 meses</span>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-32 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-green-600"
                        style={{ width: `${socialCharacterizationStats.distribucionTiempoDecision.menosSeisMeses}%` }}
                      />
                    </div>
                    <span className="text-sm font-semibold text-green-600 w-12 text-right">
                      {socialCharacterizationStats.distribucionTiempoDecision.menosSeisMeses}%
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">6 meses - 1 año</span>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-32 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-blue-600"
                        style={{ width: `${socialCharacterizationStats.distribucionTiempoDecision.seisADoce}%` }}
                      />
                    </div>
                    <span className="text-sm font-semibold w-12 text-right">
                      {socialCharacterizationStats.distribucionTiempoDecision.seisADoce}%
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">1-3 años</span>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-32 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-amber-600"
                        style={{ width: `${socialCharacterizationStats.distribucionTiempoDecision.unoATres}%` }}
                      />
                    </div>
                    <span className="text-sm font-semibold w-12 text-right">
                      {socialCharacterizationStats.distribucionTiempoDecision.unoATres}%
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
            <Link href="/empresario/dashboard">
              Volver al Dashboard
            </Link>
          </Button>
          <div className="flex items-center gap-2">
            <Button variant="outline" asChild>
              <Link href="/empresario/analisis-predios">
                Ver Análisis Estratégico
              </Link>
            </Button>
            <Button>
              <Download className="mr-2 h-4 w-4" />
              Exportar Lista
            </Button>
          </div>
        </div>
      </div>
    </AppShell>
  )
}
