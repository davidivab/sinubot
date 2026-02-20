"use client"

import { useState } from "react"
import Link from "next/link"
import { CheckCircle2 } from "lucide-react"
import { AppShell } from "@/components/skymatch/app-shell"
import { BreadcrumbsNav } from "@/components/skymatch/breadcrumbs-nav"
import { FormField } from "@/components/skymatch/form-field"
import { SelectField } from "@/components/skymatch/select-field"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { currentEmpresario } from "@/lib/mock-data"
import { projectTypes, plazoOptions } from "@/lib/constants"

const allSteps = ["Informacion Basica", "Seleccion Predios", "Validacion ICS", "Simulacion", "Confirmacion"]

export default function NuevoEscenarioPage() {
  const [step, setStep] = useState(0)
  const [nombre, setNombre] = useState("")
  const [descripcion, setDescripcion] = useState("")
  const [tipo, setTipo] = useState("")
  const [inversion, setInversion] = useState("")
  const [plazo, setPlazo] = useState("")
  const [fecha, setFecha] = useState("")

  return (
    <AppShell
      userName={`${currentEmpresario.nombre} ${currentEmpresario.apellido}`}
      userRole="empresario"
      notificationsCount={1}
    >
      <div className="mx-auto max-w-3xl space-y-6">
        <BreadcrumbsNav
          items={[
            { label: "Dashboard", href: "/empresario/dashboard" },
            { label: "Escenarios" },
            { label: "Nuevo Escenario" },
          ]}
        />

        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">Crear Nuevo Escenario</h1>
          <p className="mt-1 text-sm text-muted-foreground">Define los parametros de tu proyecto de desarrollo urbano</p>
        </div>

        {/* Stepper */}
        <div className="flex items-center gap-2">
          {allSteps.map((s, i) => (
            <div key={s} className="flex flex-1 items-center gap-2">
              <div className="flex items-center gap-2">
                <div
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold transition-colors",
                    i < step ? "bg-green-600 text-white" : i === step ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                  )}
                >
                  {i < step ? <CheckCircle2 className="h-4 w-4" /> : i + 1}
                </div>
                <span className={cn("hidden text-xs lg:block", i === step ? "font-medium text-foreground" : "text-muted-foreground")}>
                  {s}
                </span>
              </div>
              {i < allSteps.length - 1 && (
                <div className={cn("h-px flex-1", i < step ? "bg-green-600" : "bg-border")} />
              )}
            </div>
          ))}
        </div>

        <Card className="border border-border">
          <CardContent className="p-6">
            {step === 0 && (
              <div className="space-y-5">
                <CardHeader className="p-0 pb-4">
                  <CardTitle className="text-lg">Informacion Basica del Escenario</CardTitle>
                  <CardDescription>Define los datos generales del proyecto</CardDescription>
                </CardHeader>
                <FormField
                  label="Nombre del Escenario"
                  id="nombre"
                  placeholder="Ej: Renovacion Urbana La Victoria"
                  value={nombre}
                  onChange={setNombre}
                  required
                />
                <div className="space-y-1.5">
                  <Label htmlFor="desc" className="text-sm font-medium text-foreground">
                    Descripcion <span className="text-destructive">*</span>
                  </Label>
                  <Textarea
                    id="desc"
                    placeholder="Describe el proyecto, sus objetivos y el impacto esperado..."
                    rows={4}
                    value={descripcion}
                    onChange={(e) => setDescripcion(e.target.value)}
                  />
                </div>
                <SelectField
                  label="Tipo de Proyecto"
                  id="tipo"
                  value={tipo}
                  onValueChange={setTipo}
                  options={projectTypes.map((t) => ({ value: t, label: t }))}
                  required
                />
                <FormField
                  label="Inversion Estimada (COP)"
                  id="inversion"
                  type="number"
                  placeholder="15000000000"
                  value={inversion}
                  onChange={setInversion}
                  helpText="Monto en pesos colombianos"
                  required
                />
                <div className="grid gap-4 sm:grid-cols-2">
                  <SelectField
                    label="Plazo Estimado"
                    id="plazo"
                    value={plazo}
                    onValueChange={setPlazo}
                    options={plazoOptions.map((p) => ({ value: p, label: p }))}
                    required
                  />
                  <FormField
                    label="Fecha Objetivo"
                    id="fecha"
                    type="date"
                    value={fecha}
                    onChange={setFecha}
                    required
                  />
                </div>
              </div>
            )}

            {step === 1 && (
              <PropertySelectionStep />
            )}

            {step === 2 && (
              <ICSValidationStep />
            )}

            {step === 3 && (
              <SimulationStep />
            )}

            {step === 4 && (
              <ConfirmationStep nombre={nombre} tipo={tipo} />
            )}
          </CardContent>
        </Card>

        {step < 4 && (
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={() => step > 0 ? setStep(step - 1) : undefined}
              asChild={step === 0 ? true : undefined}
            >
              {step === 0 ? <Link href="/empresario/dashboard">Cancelar</Link> : <span>Anterior</span>}
            </Button>
            <Button onClick={() => setStep(step + 1)}>
              {step === 3 ? "Confirmar Escenario" : "Continuar"}
            </Button>
          </div>
        )}
      </div>
    </AppShell>
  )
}

function PropertySelectionStep() {
  return (
    <div className="space-y-5">
      <CardHeader className="p-0 pb-4">
        <CardTitle className="text-lg">Seleccion de Predios</CardTitle>
        <CardDescription>Selecciona los predios disponibles en la zona ZIDA para tu proyecto</CardDescription>
      </CardHeader>
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="space-y-3">
          <p className="text-sm font-medium text-foreground">Predios seleccionados (3)</p>
          {["AAA-0001-BCDE", "AAA-0002-FGHI", "AAA-0005-RSTU"].map((chip, i) => (
            <div key={chip} className="flex items-center justify-between rounded-lg border border-border bg-muted/30 px-3 py-2">
              <span className="font-mono text-sm text-foreground">{chip}</span>
              <Button variant="ghost" size="sm" className="h-7 text-xs text-destructive hover:text-destructive">
                Quitar
              </Button>
            </div>
          ))}
          <div className="rounded-lg bg-muted/50 p-3 text-sm">
            <p className="text-muted-foreground">Area total: <span className="font-semibold text-foreground">300 m&sup2;</span></p>
            <p className="text-muted-foreground">Propietarios: <span className="font-semibold text-foreground">2</span></p>
          </div>
        </div>
        <div>
          <p className="text-sm font-medium text-foreground mb-3">Mapa de seleccion</p>
          <div className="rounded-lg overflow-hidden">
            <div className="relative h-[250px] bg-[#e8f0e8] dark:bg-[#1a2e1a] rounded-lg border border-border flex items-center justify-center">
              <span className="text-sm text-muted-foreground">Mapa interactivo de seleccion</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function ICSValidationStep() {
  const checks = [
    { label: "Indice ICS", value: "0.72", status: "pass", detail: "Minimo requerido: 0.60" },
    { label: "Contiguidad", value: "3/3", status: "pass", detail: "Todos los predios son contiguos" },
    { label: "Tipologia", value: "Compatible", status: "warning", detail: "Verificar uso complementario" },
    { label: "Litigiosidad", value: "Sin litigios", status: "pass", detail: "No se encontraron conflictos" },
  ]

  return (
    <div className="space-y-5">
      <CardHeader className="p-0 pb-4">
        <CardTitle className="text-lg">Validacion ICS</CardTitle>
        <CardDescription>Resultado de la validacion normativa del escenario</CardDescription>
      </CardHeader>

      {/* Score gauge */}
      <div className="flex items-center justify-center">
        <div className="relative flex h-32 w-32 items-center justify-center rounded-full border-8 border-green-200 dark:border-green-900/30">
          <div className="text-center">
            <p className="text-3xl font-bold text-green-600">0.72</p>
            <p className="text-xs text-muted-foreground">ICS Score</p>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {checks.map((c) => (
          <div key={c.label} className="flex items-center gap-3 rounded-lg border border-border p-3">
            <div className={cn(
              "flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
              c.status === "pass" ? "bg-green-100 dark:bg-green-900/30" : "bg-yellow-100 dark:bg-yellow-900/30"
            )}>
              <CheckCircle2 className={cn("h-4 w-4", c.status === "pass" ? "text-green-600" : "text-yellow-600")} />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-foreground">{c.label}</p>
                <span className="font-mono text-sm font-semibold text-foreground">{c.value}</span>
              </div>
              <p className="text-xs text-muted-foreground">{c.detail}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function SimulationStep() {
  return (
    <div className="space-y-5">
      <CardHeader className="p-0 pb-4">
        <CardTitle className="text-lg">Simulacion de Impacto</CardTitle>
        <CardDescription>Proyeccion del impacto social y economico del escenario</CardDescription>
      </CardHeader>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-lg border border-border p-4 text-center">
          <p className="text-sm text-muted-foreground">Familias beneficiadas</p>
          <p className="text-3xl font-bold text-foreground">48</p>
        </div>
        <div className="rounded-lg border border-border p-4 text-center">
          <p className="text-sm text-muted-foreground">Empleos generados</p>
          <p className="text-3xl font-bold text-foreground">120</p>
        </div>
        <div className="rounded-lg border border-border p-4 text-center">
          <p className="text-sm text-muted-foreground">Viviendas nuevas</p>
          <p className="text-3xl font-bold text-foreground">85</p>
        </div>
        <div className="rounded-lg border border-border p-4 text-center">
          <p className="text-sm text-muted-foreground">Espacio publico (m&sup2;)</p>
          <p className="text-3xl font-bold text-foreground">2,400</p>
        </div>
      </div>
      <div className="rounded-lg border border-green-200 bg-green-50 p-4 dark:border-green-800 dark:bg-green-950/30">
        <p className="text-sm font-semibold text-green-800 dark:text-green-300">Escenario viable</p>
        <p className="mt-1 text-xs text-green-700 dark:text-green-400">
          El escenario cumple con los criterios normativos y de impacto social para ser sometido a revision.
        </p>
      </div>
    </div>
  )
}

function ConfirmationStep({ nombre, tipo }: { nombre: string; tipo: string }) {
  return (
    <div className="space-y-5 text-center">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
        <CheckCircle2 className="h-8 w-8 text-green-600" />
      </div>
      <div>
        <h3 className="font-display text-xl font-bold text-foreground">Escenario Enviado</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Tu escenario ha sido enviado para revision por la SDP. Recibiras notificaciones sobre su progreso.
        </p>
      </div>
      <div className="rounded-lg border border-border bg-muted/30 p-4 text-left">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Resumen</p>
        <div className="mt-2 space-y-1 text-sm">
          <p><span className="text-muted-foreground">Nombre:</span> <span className="font-medium text-foreground">{nombre || "Renovacion Urbana La Victoria"}</span></p>
          <p><span className="text-muted-foreground">Tipo:</span> <span className="font-medium text-foreground">{tipo || "Renovacion Urbana"}</span></p>
          <p><span className="text-muted-foreground">Predios:</span> <span className="font-medium text-foreground">3 seleccionados (300 m&sup2;)</span></p>
          <p><span className="text-muted-foreground">ICS:</span> <span className="font-mono font-medium text-foreground">0.72</span></p>
        </div>
      </div>
      <Button asChild>
        <Link href="/empresario/dashboard">Volver al Dashboard</Link>
      </Button>
    </div>
  )
}
