"use client"

import { useState } from "react"
import { use } from "react"
import Link from "next/link"
import {
  Building2,
  MapPin,
  Ruler,
  BarChart3,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Clock,
  Phone,
  Mail,
  ArrowLeft,
} from "lucide-react"
import { AppShell } from "@/components/skymatch/app-shell"
import { BreadcrumbsNav } from "@/components/skymatch/breadcrumbs-nav"
import { MapPlaceholder } from "@/components/skymatch/map-placeholder"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import {
  currentSDP,
  mockScenarios,
  mockProperties,
  mockNormativeChecks,
  mapMarkers,
} from "@/lib/mock-data"
import { statusLabels } from "@/lib/constants"

const checkIcons: Record<string, React.ReactNode> = {
  aprobado: <CheckCircle2 className="h-5 w-5 text-success" />,
  observacion: <AlertTriangle className="h-5 w-5 text-warning" />,
  rechazado: <XCircle className="h-5 w-5 text-destructive" />,
  pendiente: <Clock className="h-5 w-5 text-muted-foreground" />,
}

const checkBg: Record<string, string> = {
  aprobado: "border-success/20 bg-success/5",
  observacion: "border-warning/20 bg-warning/5",
  rechazado: "border-destructive/20 bg-destructive/5",
  pendiente: "border-border bg-muted/50",
}

export default function ScenarioReview({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  const scenario = mockScenarios.find((s) => s.id === id) ?? mockScenarios[0]
  const scenarioProperties = mockProperties.filter((p) =>
    scenario.prediosSeleccionados.includes(p.id)
  )
  const sCfg = statusLabels[scenario.status]
  const [observations, setObservations] = useState("")

  const infoCards = [
    {
      label: "Empresa",
      value: scenario.empresaNombre,
      icon: <Building2 className="h-5 w-5" />,
    },
    {
      label: "Total Predios",
      value: scenario.prediosSeleccionados.length,
      icon: <MapPin className="h-5 w-5" />,
    },
    {
      label: "Area Total",
      value: `${scenario.areaTotal} m\u00b2`,
      icon: <Ruler className="h-5 w-5" />,
    },
    {
      label: "ICS Calculado",
      value: scenario.icsPromedio.toFixed(2),
      icon: <BarChart3 className="h-5 w-5" />,
    },
  ]

  const timeline = [
    {
      date: scenario.fechaCreacion,
      label: "Escenario creado",
      actor: scenario.empresaNombre,
    },
    {
      date: scenario.fechaActualizacion,
      label: "Enviado a revision",
      actor: scenario.empresaNombre,
    },
    {
      date: new Date().toISOString().slice(0, 10),
      label: "En revision SDP",
      actor: "Pedro Lopez (SDP)",
    },
  ]

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
            { label: "Escenarios", href: "/sdp/dashboard" },
            { label: scenario.nombre },
          ]}
        />

        {/* Header */}
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="h-9 w-9" asChild>
              <Link href="/sdp/dashboard">
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="font-display text-2xl font-bold text-foreground">
                  {scenario.nombre}
                </h1>
                <Badge
                  variant="secondary"
                  className={cn("text-xs", sCfg?.className)}
                >
                  {sCfg?.label}
                </Badge>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">
                ID: {scenario.id.toUpperCase()} &middot; Tipo:{" "}
                {scenario.tipoProyecto}
              </p>
            </div>
          </div>
        </div>

        {/* Info cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {infoCards.map((card) => (
            <Card key={card.label} className="border border-border">
              <CardContent className="flex items-center gap-4 p-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                  {card.icon}
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">{card.label}</p>
                  <p className="text-lg font-semibold text-foreground">
                    {card.value}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Project description */}
            <Card className="border border-border">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-semibold">
                  Descripcion del Proyecto
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {scenario.descripcion}
                </p>
                <Separator />
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <p className="text-xs text-muted-foreground">
                      Inversion Estimada
                    </p>
                    <p className="font-semibold text-foreground">
                      $
                      {(scenario.inversionEstimada / 1_000_000_000).toFixed(0)}
                      .000 M COP
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Plazo</p>
                    <p className="font-semibold text-foreground">
                      {scenario.plazo}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">
                      Fecha Objetivo
                    </p>
                    <p className="font-semibold text-foreground">
                      {new Date(scenario.fechaObjetivo).toLocaleDateString(
                        "es-CO",
                        { day: "2-digit", month: "long", year: "numeric" }
                      )}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">
                      Predios Seleccionados
                    </p>
                    <div className="mt-1 flex flex-wrap gap-1">
                      {scenarioProperties.map((p) => (
                        <Badge
                          key={p.id}
                          variant="outline"
                          className="text-[10px]"
                        >
                          {p.chipCode}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Map */}
            <Card className="border border-border">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-semibold">
                  Ubicacion de Predios
                </CardTitle>
              </CardHeader>
              <CardContent className="p-3 pt-0">
                <MapPlaceholder
                  height="h-[280px]"
                  markers={mapMarkers.filter((m) =>
                    scenario.prediosSeleccionados.includes(m.id)
                  )}
                  centerLabel="Area del Escenario"
                />
              </CardContent>
            </Card>

            {/* Normative validation */}
            <Card className="border border-border">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-semibold">
                  Validacion Normativa
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {mockNormativeChecks.map((check) => (
                  <div
                    key={check.id}
                    className={cn(
                      "flex items-start gap-4 rounded-lg border p-4",
                      checkBg[check.status]
                    )}
                  >
                    <div className="mt-0.5 shrink-0">
                      {checkIcons[check.status]}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">
                        {check.label}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {check.description}
                      </p>
                      {check.detail && (
                        <p className="mt-1 font-mono text-xs text-muted-foreground">
                          {check.detail}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Decision form */}
            <Card className="border border-border">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-semibold">
                  Decision de Revision
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label
                    htmlFor="obs"
                    className="mb-1.5 block text-sm font-medium text-foreground"
                  >
                    Observaciones
                  </label>
                  <Textarea
                    id="obs"
                    placeholder="Escriba sus observaciones sobre este escenario..."
                    rows={4}
                    value={observations}
                    onChange={(e) => setObservations(e.target.value)}
                  />
                </div>
                <div className="flex flex-wrap gap-3">
                  <Button className="bg-success text-success-foreground hover:bg-success/90">
                    <CheckCircle2 className="mr-2 h-4 w-4" />
                    Aprobar Escenario
                  </Button>
                  <Button variant="destructive">
                    <XCircle className="mr-2 h-4 w-4" />
                    Rechazar Escenario
                  </Button>
                  <Button variant="outline">
                    <Clock className="mr-2 h-4 w-4" />
                    Guardar Borrador
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right sidebar */}
          <div className="space-y-4">
            {/* Timeline */}
            <Card className="border border-border">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-semibold">
                  Historial
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {timeline.map((item, i) => (
                    <div key={i} className="relative flex gap-3">
                      {i < timeline.length - 1 && (
                        <div className="absolute left-[7px] top-5 h-full w-px bg-border" />
                      )}
                      <div className="relative mt-1.5 h-[15px] w-[15px] shrink-0 rounded-full border-2 border-primary bg-background" />
                      <div className="pb-4">
                        <p className="text-sm font-medium text-foreground">
                          {item.label}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {item.actor}
                        </p>
                        <p className="text-[11px] text-muted-foreground">
                          {new Date(item.date).toLocaleDateString("es-CO", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Company contact */}
            <Card className="border border-border">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-semibold">
                  Contacto Empresa
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-100 font-semibold text-sm text-green-800 dark:bg-green-900/30 dark:text-green-400">
                    AM
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      Ana Martinez
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {scenario.empresaNombre}
                    </p>
                  </div>
                </div>
                <Separator />
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Mail className="h-4 w-4" />
                    <span>ana.martinez@constructora.com</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Phone className="h-4 w-4" />
                    <span>+57 315 678 9012</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* ICS Gauge */}
            <Card className="border border-border">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-semibold">
                  ICS Score
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center gap-2 pb-6">
                <div className="relative flex h-28 w-28 items-center justify-center rounded-full border-8 border-success/20">
                  <div
                    className="absolute inset-0 rounded-full"
                    style={{
                      background: `conic-gradient(var(--success) ${scenario.icsPromedio * 100}%, transparent 0)`,
                      maskImage:
                        "radial-gradient(circle, transparent 58%, black 60%)",
                      WebkitMaskImage:
                        "radial-gradient(circle, transparent 58%, black 60%)",
                    }}
                  />
                  <span className="relative z-10 text-2xl font-bold text-foreground">
                    {scenario.icsPromedio.toFixed(2)}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Minimo requerido: 0.60
                </p>
                <Badge className="bg-success/10 text-success text-xs">
                  Aprobado
                </Badge>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppShell>
  )
}
