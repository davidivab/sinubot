"use client"

import { useState } from "react"
import Link from "next/link"
import { X, CheckCircle2 } from "lucide-react"
import { AppShell } from "@/components/skymatch/app-shell"
import { BreadcrumbsNav } from "@/components/skymatch/breadcrumbs-nav"
import { MapPlaceholder } from "@/components/skymatch/map-placeholder"
import { PropertyCard } from "@/components/skymatch/property-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { currentEmpresario, mockProperties, mapMarkers } from "@/lib/mock-data"
import { intentionConfig } from "@/lib/constants"

const availableProperties = mockProperties.filter(
  (p) => p.intention === "asociarse" || p.intention === "vender"
)

export default function PropertySelectionPage() {
  const [selected, setSelected] = useState<string[]>(["p1", "p6"])

  const toggle = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    )
  }

  const selectedProps = mockProperties.filter((p) => selected.includes(p.id))
  const totalArea = selectedProps.reduce((sum, p) => sum + p.areaMt2, 0)
  const filteredMarkers = mapMarkers.filter((m) => selected.includes(m.id))

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
            { label: "Nuevo Escenario", href: "/empresario/escenarios/nuevo" },
            { label: "Seleccion de Predios" },
          ]}
        />

        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">Seleccion de Predios</h1>
          <p className="mt-1 text-sm text-muted-foreground">Selecciona los predios disponibles para tu escenario</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-5">
          {/* Left panel */}
          <div className="lg:col-span-2 space-y-4">
            <Card className="border border-border">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-semibold">
                  Seleccionados ({selected.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {selectedProps.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    Ningun predio seleccionado
                  </p>
                ) : (
                  selectedProps.map((p) => (
                    <div key={p.id} className="flex items-center justify-between rounded-lg border border-border bg-muted/30 px-3 py-2">
                      <div>
                        <p className="font-mono text-xs font-semibold text-foreground">{p.chipCode}</p>
                        <p className="text-[11px] text-muted-foreground">{p.areaMt2} m&sup2;</p>
                      </div>
                      <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => toggle(p.id)}>
                        <X className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  ))
                )}
                <div className="rounded-lg bg-muted/50 p-3 text-sm space-y-1">
                  <p className="text-muted-foreground">Area total: <span className="font-semibold text-foreground">{totalArea} m&sup2;</span></p>
                  <p className="text-muted-foreground">Predios: <span className="font-semibold text-foreground">{selected.length}</span></p>
                </div>
              </CardContent>
            </Card>

            {/* ICS preview */}
            <Card className="border border-border">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-semibold">Vista Previa ICS</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Score ICS</span>
                  <span className="font-mono font-bold text-green-600">0.72</span>
                </div>
                {[
                  { label: "Contiguidad", ok: true },
                  { label: "Tipologia", ok: true },
                  { label: "Litigiosidad", ok: true },
                ].map((c) => (
                  <div key={c.label} className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="h-3.5 w-3.5 text-green-600" />
                    <span className="text-muted-foreground">{c.label}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            <div className="flex gap-2">
              <Button variant="outline" className="flex-1" onClick={() => setSelected([])}>
                Limpiar
              </Button>
              <Button className="flex-1" asChild>
                <Link href="/empresario/escenarios/nuevo">Continuar</Link>
              </Button>
            </div>
          </div>

          {/* Map panel */}
          <div className="lg:col-span-3">
            <MapPlaceholder
              height="h-[500px]"
              markers={filteredMarkers}
              centerLabel={`${selected.length} predios seleccionados`}
              showLegend
              showControls
            />

            {/* Available properties below map */}
            <div className="mt-4 space-y-3">
              <p className="text-sm font-semibold text-foreground">Predios disponibles</p>
              <div className="grid gap-3 sm:grid-cols-2">
                {availableProperties.map((p) => (
                  <div
                    key={p.id}
                    onClick={() => toggle(p.id)}
                    className={cn(
                      "cursor-pointer rounded-lg border p-3 transition-colors",
                      selected.includes(p.id)
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/30"
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-semibold text-foreground">{p.chipCode}</span>
                      <Checkbox checked={selected.includes(p.id)} />
                    </div>
                    <p className="mt-1 text-[11px] text-muted-foreground truncate">{p.direccion}</p>
                    <div className="mt-1 flex items-center gap-2 text-[11px]">
                      <span className="text-muted-foreground">{p.areaMt2} m&sup2;</span>
                      <Badge variant="secondary" className={cn("text-[9px]", intentionConfig[p.intention]?.className)}>
                        {intentionConfig[p.intention]?.label}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  )
}
