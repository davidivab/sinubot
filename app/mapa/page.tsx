"use client"

import { useState } from "react"
import { AppShell } from "@/components/skymatch/app-shell"
import { MapPlaceholder } from "@/components/skymatch/map-placeholder"
import { SinuBot } from "@/components/skymatch/sinu-bot"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { currentMorador, mockProperties, mapMarkers } from "@/lib/mock-data"
import { localidades, intentionConfig, riskConfig } from "@/lib/constants"

export default function MapaPage() {
  const [localidad, setLocalidad] = useState<string>("")
  const [intentions, setIntentions] = useState<string[]>(["permanecer", "asociarse", "vender", "no_definido"])
  const [risks, setRisks] = useState<string[]>(["bajo", "medio", "alto"])

  const toggleIntention = (val: string) => {
    setIntentions((prev) =>
      prev.includes(val) ? prev.filter((v) => v !== val) : [...prev, val]
    )
  }

  const toggleRisk = (val: string) => {
    setRisks((prev) =>
      prev.includes(val) ? prev.filter((v) => v !== val) : [...prev, val]
    )
  }

  const filteredProperties = mockProperties.filter((p) => {
    if (localidad && localidad !== "all" && p.localidad !== localidad) return false
    if (!intentions.includes(p.intention)) return false
    if (p.riskLevel && !risks.includes(p.riskLevel)) return false
    return true
  })

  const filteredMarkers = mapMarkers.filter((m) =>
    filteredProperties.some((p) => p.id === m.id)
  )

  // Stats
  const totalArea = filteredProperties.reduce((sum, p) => sum + p.areaMt2, 0)
  const intentionCounts = {
    permanecer: filteredProperties.filter((p) => p.intention === "permanecer").length,
    asociarse: filteredProperties.filter((p) => p.intention === "asociarse").length,
    vender: filteredProperties.filter((p) => p.intention === "vender").length,
  }

  return (
    <AppShell
      userName={`${currentMorador.nombre} ${currentMorador.apellido}`}
      userRole="morador"
      notificationsCount={2}
    >
      <div className="flex flex-col gap-6 lg:h-[calc(100vh-7rem)] lg:flex-row">
        {/* Left panel */}
        <div className="w-full shrink-0 space-y-4 overflow-y-auto lg:w-80">
          <div>
            <h1 className="font-display text-xl font-bold text-foreground">Mapa Social ZIDA</h1>
            <p className="mt-1 text-xs text-muted-foreground">
              Explora los predios de la zona ZIDA
            </p>
          </div>

          {/* Stats summary */}
          <Card className="border border-border">
            <CardContent className="grid grid-cols-2 gap-3 p-4">
              <div>
                <p className="text-2xl font-bold text-foreground">{filteredProperties.length}</p>
                <p className="text-xs text-muted-foreground">Predios</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{totalArea.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">m&sup2; total</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-green-600">{intentionCounts.asociarse}</p>
                <p className="text-xs text-muted-foreground">Asociarse</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-blue-600">{intentionCounts.permanecer}</p>
                <p className="text-xs text-muted-foreground">Permanecer</p>
              </div>
            </CardContent>
          </Card>

          {/* Filters */}
          <Card className="border border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold">Filtros</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Localidad */}
              <div className="space-y-1.5">
                <Label className="text-xs font-medium">Localidad</Label>
                <Select value={localidad} onValueChange={setLocalidad}>
                  <SelectTrigger className="h-8 text-xs">
                    <SelectValue placeholder="Todas" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas</SelectItem>
                    {localidades.map((l) => (
                      <SelectItem key={l} value={l}>{l}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Intention */}
              <div className="space-y-2">
                <Label className="text-xs font-medium">Intencion</Label>
                {Object.entries(intentionConfig).map(([key, cfg]) => (
                  <div key={key} className="flex items-center gap-2">
                    <Checkbox
                      id={`int-${key}`}
                      checked={intentions.includes(key)}
                      onCheckedChange={() => toggleIntention(key)}
                    />
                    <Label htmlFor={`int-${key}`} className="flex items-center gap-1.5 text-xs font-normal">
                      <div className={`h-2.5 w-2.5 rounded-full ${cfg.dotColor}`} />
                      {cfg.label}
                    </Label>
                  </div>
                ))}
              </div>

              {/* Risk */}
              <div className="space-y-2">
                <Label className="text-xs font-medium">Nivel de Riesgo</Label>
                {Object.entries(riskConfig).map(([key, cfg]) => (
                  <div key={key} className="flex items-center gap-2">
                    <Checkbox
                      id={`risk-${key}`}
                      checked={risks.includes(key)}
                      onCheckedChange={() => toggleRisk(key)}
                    />
                    <Label htmlFor={`risk-${key}`} className="text-xs font-normal">
                      <Badge variant="secondary" className={`${cfg.className} text-[10px]`}>
                        {cfg.label}
                      </Badge>
                    </Label>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Map */}
        <div className="flex-1 min-w-0">
          <MapPlaceholder
            height="h-full"
            markers={filteredMarkers}
            centerLabel={`Zona ZIDA - ${filteredProperties.length} predios`}
            showLegend
            showControls
          />
        </div>
      </div>

      <SinuBot userName={currentMorador.nombre} contextModule="mapa" />
    </AppShell>
  )
}
