"use client"

import Link from "next/link"
import { AppShell } from "@/components/skymatch/app-shell"
import { BreadcrumbsNav } from "@/components/skymatch/breadcrumbs-nav"
import { MapPlaceholder } from "@/components/skymatch/map-placeholder"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { currentEmpresario, mapMarkers } from "@/lib/mock-data"
import { Building2, MapPin, Eye, TrendingUp } from "lucide-react"

export default function EmpresarioMapaPage() {
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
            { label: "Mapa ZIDA" },
          ]}
        />

        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display text-2xl font-bold text-foreground">Mapa ZIDA</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Explora las Zonas de Interés para el Desarrollo Urbano
            </p>
          </div>
          <Button asChild>
            <Link href="/empresario/busqueda">Nueva búsqueda</Link>
          </Button>
        </div>

        <div className="grid gap-6 lg:grid-cols-4">
          {/* Main map */}
          <div className="lg:col-span-3">
            <Card className="border-border">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Zona de Interés para el Desarrollo Urbano</CardTitle>
                  <Tabs defaultValue="oportunidades" className="w-auto">
                    <TabsList className="grid grid-cols-3">
                      <TabsTrigger value="oportunidades" className="text-xs">Oportunidades</TabsTrigger>
                      <TabsTrigger value="escenarios" className="text-xs">Escenarios</TabsTrigger>
                      <TabsTrigger value="ics" className="text-xs">ICS</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
              </CardHeader>
              <CardContent>
                <MapPlaceholder
                  height="h-[600px]"
                  markers={mapMarkers}
                  centerLabel="ZIDA - Renovación Urbana"
                  showLegend={true}
                  showControls={true}
                />
              </CardContent>
            </Card>

            {/* Map legend */}
            <Card className="border-border mt-4">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Leyenda del Mapa</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-success" />
                    <span className="text-xs text-muted-foreground">ICS bajo (&lt;40)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-warning" />
                    <span className="text-xs text-muted-foreground">ICS medio (40-60)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-destructive" />
                    <span className="text-xs text-muted-foreground">ICS alto (&gt;60)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-primary" />
                    <span className="text-xs text-muted-foreground">Tus escenarios</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right sidebar */}
          <div className="space-y-4">
            {/* Quick stats */}
            <Card className="border-border">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-semibold flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  Estadísticas ZIDA
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Total predios</span>
                  <span className="font-semibold text-foreground">1,247</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Caracterizados</span>
                  <span className="font-semibold text-foreground">856</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Área total</span>
                  <span className="font-semibold text-foreground">145,230 m²</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">ICS promedio</span>
                  <Badge variant="outline" className="font-mono">42.5</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Opportunities nearby */}
            <Card className="border-border">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-semibold flex items-center gap-2">
                  <Eye className="h-4 w-4" />
                  Oportunidades Destacadas
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="rounded-lg border border-border p-3 space-y-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-foreground">Centro Histórico</p>
                    <Badge className="text-[10px]" variant="default">Alto</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    85 predios · 12,450 m² · ICS: 38.2
                  </p>
                  <Button variant="link" size="sm" className="h-auto p-0 text-xs" asChild>
                    <Link href="/empresario/busqueda?zona=centro">Ver detalles</Link>
                  </Button>
                </div>

                <div className="rounded-lg border border-border p-3 space-y-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-foreground">Rafael Uribe Este</p>
                    <Badge className="text-[10px]" variant="secondary">Medio</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    42 predios · 6,780 m² · ICS: 52.1
                  </p>
                  <Button variant="link" size="sm" className="h-auto p-0 text-xs" asChild>
                    <Link href="/empresario/busqueda?zona=rafael-uribe">Ver detalles</Link>
                  </Button>
                </div>

                <div className="rounded-lg border border-border p-3 space-y-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-foreground">La Candelaria Sur</p>
                    <Badge className="text-[10px]" variant="default">Alto</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    67 predios · 9,320 m² · ICS: 35.8
                  </p>
                  <Button variant="link" size="sm" className="h-auto p-0 text-xs" asChild>
                    <Link href="/empresario/busqueda?zona=candelaria">Ver detalles</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Your scenarios */}
            <Card className="border-border bg-primary/5">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-semibold flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-primary" />
                  Tus Escenarios
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="rounded-lg border border-border bg-background p-3 space-y-1">
                  <p className="text-sm font-medium text-foreground">Renovación Urbana Centro</p>
                  <p className="text-xs text-muted-foreground">
                    85 predios · Estado: en_revision
                  </p>
                  <Button variant="link" size="sm" className="h-auto p-0 text-xs" asChild>
                    <Link href="/empresario/escenarios">Ver escenario</Link>
                  </Button>
                </div>

                <Button variant="outline" size="sm" className="w-full" asChild>
                  <Link href="/empresario/escenarios/nuevo">
                    <MapPin className="mr-2 h-3.5 w-3.5" />
                    Crear nuevo escenario
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Info notice */}
            <Card className="border-border bg-accent/20">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-semibold">Datos anónimos</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground">
                  El mapa muestra datos agregados y anónimos de acuerdo con la Ley 1581/2012.
                  Los datos personales de moradores no están disponibles públicamente.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppShell>
  )
}
