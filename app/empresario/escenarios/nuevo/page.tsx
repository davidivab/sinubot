"use client"

import { useState } from "react"
import Link from "next/link"
import { CheckCircle2, MapPin, Building2, Users, AlertTriangle, Download, Info } from "lucide-react"
import { AppShell } from "@/components/skymatch/app-shell"
import { BreadcrumbsNav } from "@/components/skymatch/breadcrumbs-nav"
import { FormField } from "@/components/skymatch/form-field"
import { SelectField } from "@/components/skymatch/select-field"
import { IndicesCard } from "@/components/skymatch/formula-tooltip"
import { AuditLog, AuditVerification, generateAuditHash, type AuditLogEntry } from "@/components/skymatch/audit-log"
import { DataProtectionBadge, HiddenDataPlaceholder } from "@/components/skymatch/data-protection"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
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
  const prediosSeleccionados = [
    { chip: "AAA-0001-BCDE", area: 120, familias: 3, intencion: "asociarse" },
    { chip: "AAA-0002-FGHI", area: 85, familias: 2, intencion: "asociarse" },
    { chip: "AAA-0005-RSTU", area: 95, familias: 2, intencion: "no_definido" },
  ]

  const areaTotal = prediosSeleccionados.reduce((sum, p) => sum + p.area, 0)
  const familiasTotal = prediosSeleccionados.reduce((sum, p) => sum + p.familias, 0)

  return (
    <div className="space-y-5">
      <CardHeader className="p-0 pb-4">
        <CardTitle className="text-lg">Caso de Uso 1: Selección y Agrupación de Predios</CardTitle>
        <CardDescription>
          Criterios de agrupación explícitos con trazabilidad completa
        </CardDescription>
      </CardHeader>

      {/* Criterios de Agrupación */}
      <Card className="border-2 border-primary/20 bg-primary/5">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
              <MapPin className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-foreground">Criterio de Agrupación Aplicado</p>
              <p className="mt-1 text-xs text-muted-foreground">
                **Contigüidad geométrica** (ST_Touches en PostGIS). Los predios seleccionados comparten al menos un vértice o borde.
              </p>
              <div className="mt-3 grid gap-2 text-xs">
                <div className="flex items-center justify-between rounded-md bg-card px-2 py-1">
                  <span className="text-muted-foreground">Área total del englobe:</span>
                  <strong className="font-mono text-foreground">{areaTotal} m²</strong>
                </div>
                <div className="flex items-center justify-between rounded-md bg-card px-2 py-1">
                  <span className="text-muted-foreground">Familias afectadas:</span>
                  <strong className="text-foreground">{familiasTotal} (dato de SINUPOT)</strong>
                </div>
                <div className="flex items-center justify-between rounded-md bg-card px-2 py-1">
                  <span className="text-muted-foreground">Restricciones detectadas:</span>
                  <strong className="text-green-700 dark:text-green-400">Ninguna ✓</strong>
                </div>
              </div>
              <p className="mt-2 text-[11px] text-muted-foreground">
                No se detectaron parques, equipamientos públicos (EEP) ni patrimonio histórico (PH) en el área.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-foreground">Predios seleccionados ({prediosSeleccionados.length})</p>
            <DataProtectionBadge level="anonymized" />
          </div>
          {prediosSeleccionados.map((predio, i) => (
            <div key={predio.chip} className="rounded-lg border border-border bg-card p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-sm font-semibold text-foreground">{predio.chip}</span>
                <Badge variant="secondary" className="text-[10px]">
                  {predio.intencion === "asociarse" ? "Desea asociarse" : "Sin definir"}
                </Badge>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-muted-foreground">Área:</span>{" "}
                  <strong className="text-foreground">{predio.area} m²</strong>
                </div>
                <div>
                  <span className="text-muted-foreground">Familias:</span>{" "}
                  <strong className="text-foreground">{predio.familias}</strong>
                </div>
              </div>
              <div className="mt-2 pt-2 border-t border-border/50 text-[11px]">
                <HiddenDataPlaceholder dataType="nombre" />
              </div>
            </div>
          ))}
          
          <div className="rounded-lg bg-muted/50 p-3 text-sm">
            <p className="text-muted-foreground">
              <Building2 className="inline h-4 w-4 mr-1" />
              Area total: <span className="font-semibold text-foreground">{areaTotal} m²</span>
            </p>
            <p className="text-muted-foreground mt-1">
              <Users className="inline h-4 w-4 mr-1" />
              Propietarios: <span className="font-semibold text-foreground">{familiasTotal} familias</span>
            </p>
          </div>

          <div className="flex items-start gap-2 text-[11px] text-muted-foreground p-2 rounded-md bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900">
            <Info className="h-3.5 w-3.5 mt-0.5 flex-shrink-0 text-blue-600 dark:text-blue-400" />
            <p>
              Los datos personales (nombres, cédulas, contactos) están **protegidos** por la Ley 1581/2012. 
              Solo la SDP puede acceder a información completa de moradores.
            </p>
          </div>
        </div>

        <div>
          <p className="text-sm font-medium text-foreground mb-3">Mapa de selección</p>
          <div className="rounded-lg overflow-hidden">
            <div className="relative h-[250px] bg-[#e8f0e8] dark:bg-[#1a2e1a] rounded-lg border border-border flex items-center justify-center">
              <div className="absolute inset-4 border-2 border-dashed border-primary/40 rounded-md flex items-center justify-center">
                <div className="text-center p-4">
                  <MapPin className="h-8 w-8 text-primary mx-auto mb-2" />
                  <p className="text-sm text-foreground font-medium">Mapa interactivo</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Visualización con ST_Touches
                  </p>
                  <p className="text-[11px] text-muted-foreground mt-2 font-mono">
                    {prediosSeleccionados.length} predios contiguos
                  </p>
                </div>
              </div>
            </div>
          </div>
          <p className="mt-2 text-xs text-muted-foreground text-center">
            Agrupación basada en contigüidad geométrica (no es una caja negra)
          </p>
        </div>
      </div>
    </div>
  )
}

function ICSValidationStep() {
  // Datos de ejemplo para el cálculo de índices
  const datosCalculoICS = {
    familias: 7,
    temoresPromedio: 2.1,
    antiguedadAnios: 8,
    saneamientos: 1,
    litigios: 0,
    areaTotal: 300,
    densidadObjetivo: 2.5,
    precioM2: 3500000,
    accesibilidad: 72,
    servicios: 85,
    normativa: 68,
  }

  const indices = {
    ics: 38, // Calculado con la fórmula
    cj: 15,  // Baja complejidad jurídica
    tm: 2.6, // $2.6M USD tamaño de mercado
    bl: 76,  // Alta bondad locativa
  }

  const checks = [
    {
      label: "Contigüidad geométrica",
      value: "3/3 predios",
      status: "pass" as const,
      detail: "Todos los predios comparten vértices o bordes (algoritmo ST_Touches)",
    },
    {
      label: "Restricciones normativas",
      value: "Ninguna",
      status: "pass" as const,
      detail: "No hay EEP, parques ni patrimonio histórico en el área",
    },
    {
      label: "Tipología compatible",
      value: "Logístico",
      status: "pass" as const,
      detail: "Uso permitido según POT ZIDA (Decreto 555/2021)",
    },
    {
      label: "Complejidad social",
      value: `ICS ${indices.ics}/100`,
      status: "warning" as const,
      detail: "Requiere acompañamiento SDP (nivel medio)",
    },
  ]

  return (
    <div className="space-y-5">
      <CardHeader className="p-0 pb-4">
        <CardTitle className="text-lg">Caso de Uso 2: Simulación con Indicadores Transparentes</CardTitle>
        <CardDescription>
          Fórmulas completas visibles, fuentes de datos verificables y memoria de cálculo
        </CardDescription>
      </CardHeader>

      {/* Indicadores con transparencia algorítmica */}
      <IndicesCard indices={indices} datos={datosCalculoICS} />

      <Separator />

      {/* Validaciones normativas */}
      <div>
        <h4 className="text-sm font-semibold text-foreground mb-3">Validaciones Normativas</h4>
        <div className="space-y-3">
          {checks.map((c) => (
            <div key={c.label} className="flex items-center gap-3 rounded-lg border border-border p-3">
              <div
                className={cn(
                  "flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
                  c.status === "pass"
                    ? "bg-green-100 dark:bg-green-900/30"
                    : "bg-yellow-100 dark:bg-yellow-900/30"
                )}
              >
                <CheckCircle2
                  className={cn(
                    "h-4 w-4",
                    c.status === "pass" ? "text-green-600" : "text-yellow-600"
                  )}
                />
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

      {/* Ficha de Escenario */}
      <Card className="border-2 border-green-500/30 bg-green-50/50 dark:bg-green-950/20">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
              <CheckCircle2 className="h-5 w-5 text-green-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-green-800 dark:text-green-300">
                Escenario viable para concertación
              </p>
              <p className="mt-1 text-xs text-green-700 dark:text-green-400">
                El escenario cumple con los criterios normativos del POT ZIDA. Ya puedes generar la Ficha de Oportunidad
                con memoria de cálculo completa.
              </p>
              <Button size="sm" variant="outline" className="mt-3 gap-2 border-green-600 text-green-700 hover:bg-green-100 dark:border-green-500 dark:text-green-400 dark:hover:bg-green-950/40">
                <Download className="h-3.5 w-3.5" />
                Descargar Ficha PDF
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex items-start gap-2 text-[11px] text-muted-foreground p-2 rounded-md bg-muted/50 border border-border/50">
        <Info className="h-3.5 w-3.5 mt-0.5 flex-shrink-0" />
        <p>
          **Transparencia algorítmica total**: Pasa el cursor sobre cada índice para ver la fórmula completa,
          fuentes de datos y proceso de cálculo paso a paso. Una auditoría independiente puede replicar estos resultados.
        </p>
      </div>
    </div>
  )
}

function SimulationStep() {
  // Logs de auditoría simulados
  const auditLogs: AuditLogEntry[] = [
    {
      id: "log-1",
      timestamp: new Date().toISOString(),
      userId: "u4",
      userName: "Ana Martinez",
      userRole: "empresario",
      action: "crear_escenario",
      description: "Escenario creado: Renovación Urbana La Victoria",
      entityType: "escenario",
      entityId: "esc-001",
      hash: generateAuditHash({
        timestamp: new Date().toISOString(),
        userId: "u4",
        action: "crear_escenario",
        entityId: "esc-001",
      }),
      ipAddress: "192.168.1.45",
    },
    {
      id: "log-2",
      timestamp: new Date(Date.now() - 1000 * 60).toISOString(),
      userId: "u4",
      userName: "Ana Martinez",
      userRole: "empresario",
      action: "seleccionar_predios",
      description: "Seleccionados 3 predios con contigüidad geométrica verificada",
      entityType: "escenario",
      entityId: "esc-001",
      hash: generateAuditHash({
        timestamp: new Date(Date.now() - 1000 * 60).toISOString(),
        userId: "u4",
        action: "seleccionar_predios",
        entityId: "esc-001",
      }),
      metadata: {
        predios: ["AAA-0001-BCDE", "AAA-0002-FGHI", "AAA-0005-RSTU"],
        area_total_m2: 300,
        criterio: "ST_Touches PostGIS",
      },
    },
    {
      id: "log-3",
      timestamp: new Date(Date.now() - 1000 * 120).toISOString(),
      userId: "u4",
      userName: "Ana Martinez",
      userRole: "empresario",
      action: "calcular_indices",
      description: "Índices calculados: ICS=38, CJ=15, TM=$2.6M, BL=76",
      entityType: "escenario",
      entityId: "esc-001",
      hash: generateAuditHash({
        timestamp: new Date(Date.now() - 1000 * 120).toISOString(),
        userId: "u4",
        action: "calcular_indices",
        entityId: "esc-001",
      }),
      metadata: {
        ics_valor: 38,
        cj_valor: 15,
        tm_valor_usd: 2600000,
        bl_valor: 76,
        formula_ics: "(familias × 0.3) + (temores × 0.4) + (antigüedad × 0.3)",
      },
    },
  ]

  return (
    <div className="space-y-5">
      <CardHeader className="p-0 pb-4">
        <CardTitle className="text-lg">Caso de Uso 3: Consumo por Actores con Trazabilidad</CardTitle>
        <CardDescription>
          Vistas diferenciadas, protección de datos y logs inmutables SHA-256
        </CardDescription>
      </CardHeader>

      {/* Impacto proyectado */}
      <div>
        <h4 className="text-sm font-semibold text-foreground mb-3">Impacto Proyectado</h4>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-lg border border-border p-4 text-center">
            <p className="text-sm text-muted-foreground">Familias beneficiadas</p>
            <p className="text-3xl font-bold text-foreground">7</p>
            <p className="text-xs text-muted-foreground mt-1">Dato verificable de SINUPOT</p>
          </div>
          <div className="rounded-lg border border-border p-4 text-center">
            <p className="text-sm text-muted-foreground">Empleos generados (est.)</p>
            <p className="text-3xl font-bold text-foreground">42</p>
            <p className="text-xs text-muted-foreground mt-1">Proyección según TM</p>
          </div>
          <div className="rounded-lg border border-border p-4 text-center">
            <p className="text-sm text-muted-foreground">Tamaño de mercado</p>
            <p className="text-3xl font-bold text-foreground">$2.6M</p>
            <p className="text-xs text-muted-foreground mt-1">USD (fórmula auditable)</p>
          </div>
          <div className="rounded-lg border border-border p-4 text-center">
            <p className="text-sm text-muted-foreground">Bondad locativa</p>
            <p className="text-3xl font-bold text-foreground">76/100</p>
            <p className="text-xs text-muted-foreground mt-1">Alta conectividad</p>
          </div>
        </div>
      </div>

      <Separator />

      {/* Vistas diferenciadas por actor */}
      <div>
        <h4 className="text-sm font-semibold text-foreground mb-3">
          Vista Actual: Empresario (Datos Anonimizados)
        </h4>
        <Card className="border border-blue-500/30 bg-blue-50/30 dark:bg-blue-950/10">
          <CardContent className="p-4 space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-foreground">Catálogo de Oportunidades</p>
              <DataProtectionBadge level="anonymized" />
            </div>
            <div className="text-xs space-y-2">
              <p className="text-muted-foreground">
                ✓ Acceso a: {" "}
                <strong className="text-foreground">
                  Área total, índices calculados, restricciones normativas, proyección de mercado
                </strong>
              </p>
              <p className="text-muted-foreground">
                ⨂ NO tienes acceso a: {" "}
                <HiddenDataPlaceholder dataType="nombre" />{" "}
                <HiddenDataPlaceholder dataType="cedula" />{" "}
                <HiddenDataPlaceholder dataType="telefono" />
              </p>
              <p className="text-xs text-blue-700 dark:text-blue-400 mt-2 p-2 rounded-md bg-blue-100 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900">
                **Protección anti-presión**: Solo puedes enviar máximo 3 ofertas/año por predio. 
                Los moradores pueden bloquear tus ofertas si se sienten presionados.
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="mt-3 grid gap-3 lg:grid-cols-2 text-xs">
          <Card className="border border-border/50">
            <CardContent className="p-3">
              <p className="font-semibold text-foreground mb-2">Vista SDP (institucional)</p>
              <ul className="space-y-1 text-muted-foreground">
                <li>✓ Mapa de calor con "bolsas de oportunidad"</li>
                <li>✓ Alertas de alta vulnerabilidad social</li>
                <li>✓ Logs de auditoría SHA-256</li>
                <li>✓ Activar mesas de concertación</li>
              </ul>
            </CardContent>
          </Card>
          <Card className="border border-border/50">
            <CardContent className="p-3">
              <p className="font-semibold text-foreground mb-2">Vista Morador</p>
              <ul className="space-y-1 text-muted-foreground">
                <li>✓ Estado de mi caso</li>
                <li>✓ Pedagogía normativa ("¿Qué es un englobe?")</li>
                <li>✓ Buzón de preguntas a SDP</li>
                <li>✓ Bloquear ofertas no deseadas</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>

      <Separator />

      {/* Trazabilidad completa */}
      <div>
        <h4 className="text-sm font-semibold text-foreground mb-3">Trazabilidad Completa (Logs Inmutables)</h4>
        <AuditLog logs={auditLogs} showHash={true} compact={false} />
      </div>

      <AuditVerification
        totalLogs={auditLogs.length}
        lastVerified={new Date().toISOString()}
        integrityStatus="verified"
      />

      <div className="rounded-lg border border-green-200 bg-green-50 p-4 dark:border-green-800 dark:bg-green-950/30">
        <p className="text-sm font-semibold text-green-800 dark:text-green-300">Escenario listo para revisión SDP</p>
        <p className="mt-1 text-xs text-green-700 dark:text-green-400">
          Todos los pasos se ejecutaron con transparencia algorítmica y trazabilidad completa. 
          La SDP podrá auditar cada decisión tomada en el proceso.
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
