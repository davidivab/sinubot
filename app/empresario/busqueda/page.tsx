"use client"

import { Search, Map, Building2, TrendingUp } from "lucide-react"
import { AppShell } from "@/components/skymatch/app-shell"
import { BreadcrumbsNav } from "@/components/skymatch/breadcrumbs-nav"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { MapPlaceholder } from "@/components/skymatch/map-placeholder"
import { currentEmpresario } from "@/lib/mock-data"

const mockOpportunities = [
  {
    id: "opp-1",
    area: 850,
    predios: 5,
    ics: 42,
    localidad: "Fontibón",
    precio: "$2.6M USD",
  },
  {
    id: "opp-2",
    area: 1200,
    predios: 7,
    ics: 38,
    localidad: "Engativá",
    precio: "$3.8M USD",
  },
  {
    id: "opp-3",
    area: 650,
    predios: 4,
    ics: 55,
    localidad: "Fontibón",
    precio: "$2.1M USD",
  },
]

export default function EmpresarioBusquedaPage() {
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
            { label: "Búsqueda" },
          ]}
        />

        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">
            Búsqueda de Oportunidades
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Explora predios disponibles en la ZIDA (datos anonimizados según Ley 1581/2012)
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Filters */}
          <div className="space-y-4">
            <Card className="border border-border">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Search className="h-4 w-4" />
                  Filtros de Búsqueda
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="localidad">Localidad</Label>
                  <Select>
                    <SelectTrigger id="localidad">
                      <SelectValue placeholder="Todas" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todas</SelectItem>
                      <SelectItem value="fontibon">Fontibón</SelectItem>
                      <SelectItem value="engativa">Engativá</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="area-min">Área Mínima (m²)</Label>
                  <Input id="area-min" type="number" placeholder="500" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="ics-max">ICS Máximo</Label>
                  <Input id="ics-max" type="number" placeholder="50" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="predios-min">Predios Mínimos</Label>
                  <Input id="predios-min" type="number" placeholder="3" />
                </div>

                <Button className="w-full">
                  <Search className="mr-2 h-4 w-4" />
                  Buscar
                </Button>
              </CardContent>
            </Card>

            <Card className="border border-border bg-yellow-50 dark:bg-yellow-950/20">
              <CardContent className="p-4">
                <p className="text-xs text-muted-foreground">
                  <strong>Protección de datos:</strong> Los nombres, cédulas y contactos de moradores
                  están anonimizados. Solo la SDP puede mediar contactos.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Map + Results */}
          <div className="lg:col-span-2 space-y-4">
            <Card className="border border-border">
              <CardContent className="p-4">
                <MapPlaceholder height="h-80" />
              </CardContent>
            </Card>

            <div className="space-y-3">
              <h2 className="font-display text-lg font-semibold text-foreground">
                Oportunidades Encontradas ({mockOpportunities.length})
              </h2>
              {mockOpportunities.map((opp) => (
                <Card key={opp.id} className="border border-border">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="secondary" className="bg-blue-100 text-blue-800 text-xs">
                            {opp.localidad}
                          </Badge>
                          <Badge variant="secondary" className="bg-green-100 text-green-800 text-xs">
                            {opp.predios} predios
                          </Badge>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-muted-foreground">Área Total</p>
                            <p className="font-semibold text-foreground">{opp.area.toLocaleString()} m²</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">ICS</p>
                            <p className="font-mono font-semibold text-foreground">{opp.ics}/100</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Precio Estimado</p>
                            <p className="font-semibold text-foreground">{opp.precio}</p>
                          </div>
                        </div>
                      </div>
                      <Button size="sm" variant="outline">
                        Ver Detalle
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
