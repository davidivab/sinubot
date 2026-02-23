"use client"

import { AppShell } from "@/components/skymatch/app-shell"
import { BreadcrumbsNav } from "@/components/skymatch/breadcrumbs-nav"
import { MapPlaceholder } from "@/components/skymatch/map-placeholder"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { mapMarkers } from "@/lib/mock-data"
import { AlertTriangle, Building2, MapPin, TrendingUp, Users } from "lucide-react"

const currentSDP = {
  nombre: "Carlos",
  apellido: "Rodriguez",
}

export default function SDPMapaPage() {
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
            { label: "Mapa ZIDA" },
          ]}
        />

        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display text-2xl font-bold text-foreground">Mapa ZIDA Completo</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Vista administrativa de todas las Zonas de Interés para el Desarrollo Urbano
            </p>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-4">
          {/* Main map column */}
          <div className="lg:col-span-3">
            <Card className="border-border">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Mapa Administrativo SDP</CardTitle>
                  <Tabs defaultValue="general" className="w-auto">
                    <TabsList className="grid grid-cols-4">
                      <TabsTrigger value="general" className="text-xs">General</TabsTrigger>
                      <TabsTrigger value="ics" className="text-xs">ICS</TabsTrigger>
                      <TabsTrigger value="escenarios" className="text-xs">Escenarios</TabsTrigger>
                      <TabsTrigger value="riesgo" className="text-xs">Riesgo</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
              </CardHeader>
              <CardContent>
                <MapPlaceholder
                  height="h-[600px]"
                  markers={mapMarkers}
                  centerLabel="ZIDA - Gestión SDP"
                  showLegend={true}
                  showControls={true}
                />
              </CardContent>
            </Card>

            {/* Detailed legend */}
            <Card className="border-border mt-4">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Leyenda del Mapa</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
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
                    <span className="text-xs text-muted-foreground">Escenarios activos</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-secondary" />
                    <span className="text-xs text-muted-foreground">Equipamientos públicos</span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-border">
                  <p className="text-xs font-medium text-foreground mb-2">Filtros activos:</p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="text-xs">
                      Todas las localidades
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      Todos los tipos de predio
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      Sin filtro de ICS
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right sidebar */}
          <div className="space-y-4">
            {/* Global stats */}
            <Card className="border-border">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-semibold flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  Estadísticas Globales
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Total ZIDA</span>
                  <span className="font-semibold text-foreground">3</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Predios totales</span>
                  <span className="font-semibold text-foreground">1,247</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Moradores registrados</span>
                  <span className="font-semibold text-foreground">856</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Caracterizaciones</span>
                  <span className="font-semibold text-foreground">723</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Escenarios activos</span>
                  <span className="font-semibold text-foreground">23</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">ICS promedio</span>
                  <Badge variant="outline" className="font-mono">42.5</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Zonas destacadas */}
            <Card className="border-border">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-semibold flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Zonas por Localidad
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-foreground">Santa Fe</span>
                    <span className="text-xs text-muted-foreground">487 predios</span>
                  </div>
                  <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-primary" style={{ width: "39%" }} />
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-foreground">Rafael Uribe</span>
                    <span className="text-xs text-muted-foreground">412 predios</span>
                  </div>
                  <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-primary" style={{ width: "33%" }} />
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-foreground">La Candelaria</span>
                    <span className="text-xs text-muted-foreground">348 predios</span>
                  </div>
                  <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-primary" style={{ width: "28%" }} />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Active scenarios summary */}
            <Card className="border-border bg-primary/5">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-semibold flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-primary" />
                  Escenarios en Revisión
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="rounded-lg border border-border bg-background p-3 space-y-1">
                  <p className="text-sm font-medium text-foreground">Renovación Urbana Centro</p>
                  <p className="text-xs text-muted-foreground">
                    85 predios · Santa Fe
                  </p>
                  <Badge className="text-[10px]" variant="secondary">En revisión</Badge>
                </div>

                <div className="rounded-lg border border-border bg-background p-3 space-y-1">
                  <p className="text-sm font-medium text-foreground">Mejoramiento Integral Sur</p>
                  <p className="text-xs text-muted-foreground">
                    42 predios · Rafael Uribe
                  </p>
                  <Badge className="text-[10px]" variant="secondary">En revisión</Badge>
                </div>

                <Button variant="outline" size="sm" className="w-full">
                  Ver todos los escenarios
                </Button>
              </CardContent>
            </Card>

            {/* Alerts */}
            <Card className="border-destructive/20 bg-destructive/5">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-semibold flex items-center gap-2 text-destructive">
                  <AlertTriangle className="h-4 w-4" />
                  Alertas Territoriales
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="rounded-md bg-background border border-border p-3 text-xs space-y-1">
                  <p className="font-medium text-foreground">Alto riesgo social</p>
                  <p className="text-muted-foreground">
                    Zona Rafael Uribe Este - 15 predios
                  </p>
                </div>
                <div className="rounded-md bg-background border border-border p-3 text-xs space-y-1">
                  <p className="font-medium text-foreground">Morosidad caracterización</p>
                  <p className="text-muted-foreground">
                    12 predios sin completar &gt; 30 días
                  </p>
                </div>
                <Button variant="outline" size="sm" className="w-full text-destructive border-destructive/50">
                  Ver todas las alertas
                </Button>
              </CardContent>
            </Card>

            {/* Download options */}
            <Card className="border-border bg-muted/30">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-semibold flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Opciones de Exportación
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" size="sm" className="w-full justify-start text-xs">
                  Exportar datos de predios
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start text-xs">
                  Exportar estadísticas ICS
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start text-xs">
                  Generar informe territorial
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppShell>
  )
}
