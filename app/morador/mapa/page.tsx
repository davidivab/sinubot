"use client"

import { AppShell } from "@/components/skymatch/app-shell"
import { BreadcrumbsNav } from "@/components/skymatch/breadcrumbs-nav"
import { MapPlaceholder } from "@/components/skymatch/map-placeholder"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { currentMorador, mapMarkers } from "@/lib/mock-data"
import { Users, Building2, MapPin, Shield } from "lucide-react"

export default function MoradorMapaPage() {
  return (
    <AppShell
      userName={`${currentMorador.nombre} ${currentMorador.apellido}`}
      userRole="morador"
      notificationsCount={3}
    >
      <div className="space-y-6">
        <BreadcrumbsNav
          items={[
            { label: "Dashboard", href: "/morador/dashboard" },
            { label: "Mapa Social" },
          ]}
        />

        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display text-2xl font-bold text-foreground">Mapa Social</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Visualiza tu predio y el tejido social de la ZIDA
            </p>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-4">
          {/* Main map column */}
          <div className="lg:col-span-3">
            <Card className="border-border">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Zona de Interés para el Desarrollo Urbano</CardTitle>
                  <Tabs defaultValue="social" className="w-auto">
                    <TabsList className="grid grid-cols-3">
                      <TabsTrigger value="social" className="text-xs">Social</TabsTrigger>
                      <TabsTrigger value="predial" className="text-xs">Predial</TabsTrigger>
                      <TabsTrigger value="riesgo" className="text-xs">Riesgo</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
              </CardHeader>
              <CardContent>
                <MapPlaceholder
                  height="h-[600px]"
                  markers={mapMarkers}
                  centerLabel="Tu predio: AAA-0001"
                  showLegend={true}
                  showControls={true}
                />
              </CardContent>
            </Card>

            {/* Legend card */}
            <Card className="border-border mt-4">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Leyenda del Mapa Social</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-primary" />
                    <span className="text-xs text-muted-foreground">Tu ubicación</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-success" />
                    <span className="text-xs text-muted-foreground">Centros comunitarios</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-secondary" />
                    <span className="text-xs text-muted-foreground">Equipamientos</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-warning" />
                    <span className="text-xs text-muted-foreground">Riesgo medio</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right sidebar */}
          <div className="space-y-4">
            {/* Tu predio card */}
            <Card className="border-border bg-primary/5">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-semibold flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-primary" />
                  Tu Predio
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div>
                  <p className="text-xs text-muted-foreground">CHIP</p>
                  <p className="font-medium text-foreground">AAA-0001</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Dirección</p>
                  <p className="font-medium text-foreground">Cra 10 #15-25</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Localidad</p>
                  <p className="font-medium text-foreground">Santa Fe</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Área</p>
                  <p className="font-medium text-foreground">120 m²</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">ICS</p>
                  <Badge variant="outline" className="font-mono">62.3</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Estadísticas del sector */}
            <Card className="border-border">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-semibold flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Estadísticas del Sector
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Predios registrados</span>
                  <span className="font-semibold text-foreground">247</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Moradores activos</span>
                  <span className="font-semibold text-foreground">189</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Caracterizaciones</span>
                  <span className="font-semibold text-foreground">156</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">ICS promedio</span>
                  <span className="font-semibold text-foreground">58.7</span>
                </div>
              </CardContent>
            </Card>

            {/* Escenarios cercanos */}
            <Card className="border-border">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-semibold flex items-center gap-2">
                  <Building2 className="h-4 w-4" />
                  Escenarios en tu Zona
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="rounded-lg border border-border p-3 space-y-1">
                  <p className="text-sm font-medium text-foreground">Renovación Urbana Centro</p>
                  <p className="text-xs text-muted-foreground">85 predios · Status: activo</p>
                  <Badge className="text-[10px]" variant="secondary">Incluye tu predio</Badge>
                </div>
                <div className="rounded-lg border border-border p-3 space-y-1">
                  <p className="text-sm font-medium text-foreground">Mejoramiento Integral</p>
                  <p className="text-xs text-muted-foreground">42 predios · Status: estudio</p>
                </div>
              </CardContent>
            </Card>

            {/* Protection notice */}
            <Card className="border-border bg-accent/20">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-semibold flex items-center gap-2">
                  <Shield className="h-4 w-4 text-primary" />
                  Tu privacidad protegida
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground">
                  Los datos de tu predio solo se comparten de forma anónima y agregada
                  con empresarios. Tus datos personales están protegidos por la Ley 1581/2012.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppShell>
  )
}
