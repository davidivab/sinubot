"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, CheckCircle2, Building2, FileText, Ruler } from "lucide-react"
import { AppShell } from "@/components/skymatch/app-shell"
import { BreadcrumbsNav } from "@/components/skymatch/breadcrumbs-nav"
import { FormField } from "@/components/skymatch/form-field"
import { SelectField } from "@/components/skymatch/select-field"
import { FileUpload } from "@/components/skymatch/file-upload"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { currentMorador } from "@/lib/mock-data"

const steps = ["CHIP", "Datos Basicos", "Documentos", "Confirmacion"]

export default function AddPropertyPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [chip, setChip] = useState("")
  const [chipFound, setChipFound] = useState(false)
  const [ownership, setOwnership] = useState("")
  const [area, setArea] = useState("")
  const [intention, setIntention] = useState("")

  const handleSearch = () => {
    if (chip.length > 3) setChipFound(true)
  }

  return (
    <AppShell
      userName={`${currentMorador.nombre} ${currentMorador.apellido}`}
      userRole="morador"
      notificationsCount={2}
    >
      <div className="mx-auto max-w-3xl space-y-6">
        <BreadcrumbsNav
          items={[
            { label: "Dashboard", href: "/dashboard" },
            { label: "Mis Predios", href: "/dashboard" },
            { label: "Nuevo Predio" },
          ]}
        />

        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">Registrar Nuevo Predio</h1>
          <p className="mt-1 text-sm text-muted-foreground">Sigue los pasos para registrar tu predio en la plataforma ZIDA</p>
        </div>

        {/* Stepper */}
        <div className="flex items-center gap-2">
          {steps.map((step, i) => (
            <div key={step} className="flex flex-1 items-center gap-2">
              <div className="flex items-center gap-2">
                <div
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold transition-colors",
                    i < currentStep
                      ? "bg-green-600 text-white"
                      : i === currentStep
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                  )}
                >
                  {i < currentStep ? <CheckCircle2 className="h-4 w-4" /> : i + 1}
                </div>
                <span className={cn("hidden text-sm sm:block", i === currentStep ? "font-medium text-foreground" : "text-muted-foreground")}>
                  {step}
                </span>
              </div>
              {i < steps.length - 1 && (
                <div className={cn("h-px flex-1", i < currentStep ? "bg-green-600" : "bg-border")} />
              )}
            </div>
          ))}
        </div>

        {/* Step content */}
        <Card className="border border-border">
          <CardContent className="p-6">
            {currentStep === 0 && (
              <div className="space-y-5">
                <CardHeader className="p-0 pb-4">
                  <CardTitle className="text-lg">Buscar por Codigo CHIP</CardTitle>
                  <CardDescription>Ingresa el codigo CHIP que aparece en tu certificado de tradicion y libertad</CardDescription>
                </CardHeader>
                <div className="flex gap-2">
                  <div className="flex-1">
                    <FormField
                      label="Codigo CHIP"
                      id="chip"
                      placeholder="AAA-0000-XXXX"
                      value={chip}
                      onChange={setChip}
                      icon={Search}
                      helpText="Formato: AAA-0000-XXXX"
                      required
                    />
                  </div>
                  <Button className="mt-7" onClick={handleSearch}>Buscar</Button>
                </div>
                {chipFound && (
                  <div className="rounded-lg border border-green-200 bg-green-50 p-4 dark:border-green-800 dark:bg-green-950/30">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 shrink-0" />
                      <div className="space-y-1">
                        <p className="text-sm font-semibold text-green-800 dark:text-green-300">Predio encontrado</p>
                        <p className="text-xs text-green-700 dark:text-green-400">CHIP: {chip}</p>
                        <p className="text-xs text-green-700 dark:text-green-400">Ubicacion: San Cristobal, Bogota</p>
                        <p className="text-xs text-green-700 dark:text-green-400">Estado catastral: Vigente</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {currentStep === 1 && (
              <div className="space-y-5">
                <CardHeader className="p-0 pb-4">
                  <CardTitle className="text-lg">Datos Basicos del Predio</CardTitle>
                  <CardDescription>Completa la informacion sobre tu relacion con el predio</CardDescription>
                </CardHeader>

                <div className="space-y-3">
                  <Label className="text-sm font-medium">Tipo de Tenencia <span className="text-destructive">*</span></Label>
                  <RadioGroup value={ownership} onValueChange={setOwnership} className="grid grid-cols-3 gap-3">
                    {[
                      { value: "propietario", icon: Building2, label: "Propietario" },
                      { value: "poseedor", icon: FileText, label: "Poseedor" },
                      { value: "tenedor", icon: Ruler, label: "Tenedor" },
                    ].map((opt) => (
                      <Label
                        key={opt.value}
                        htmlFor={opt.value}
                        className={cn(
                          "flex cursor-pointer flex-col items-center gap-2 rounded-lg border p-4 transition-colors",
                          ownership === opt.value
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/30"
                        )}
                      >
                        <RadioGroupItem value={opt.value} id={opt.value} className="sr-only" />
                        <opt.icon className={cn("h-6 w-6", ownership === opt.value ? "text-primary" : "text-muted-foreground")} />
                        <span className={cn("text-sm font-medium", ownership === opt.value ? "text-primary" : "text-muted-foreground")}>
                          {opt.label}
                        </span>
                      </Label>
                    ))}
                  </RadioGroup>
                </div>

                <FormField
                  label="Area del Predio (m2)"
                  id="area"
                  type="number"
                  placeholder="120"
                  value={area}
                  onChange={setArea}
                  icon={Ruler}
                  required
                />

                <SelectField
                  label="Intencion sobre el predio"
                  id="intention"
                  value={intention}
                  onValueChange={setIntention}
                  options={[
                    { value: "permanecer", label: "Permanecer en el predio" },
                    { value: "asociarse", label: "Asociarse con un proyecto" },
                    { value: "vender", label: "Vender el predio" },
                    { value: "no_definido", label: "No he decidido aun" },
                  ]}
                  required
                />
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-5">
                <CardHeader className="p-0 pb-4">
                  <CardTitle className="text-lg">Documentos de Soporte</CardTitle>
                  <CardDescription>Sube los documentos que respaldan tu relacion con el predio</CardDescription>
                </CardHeader>
                <FileUpload
                  label="Certificado de Tradicion y Libertad"
                  accept=".pdf"
                  maxSize="10MB"
                  helpText="Documento PDF expedido por la Superintendencia de Notariado y Registro"
                />
                <FileUpload
                  label="Documento de Identidad"
                  accept=".pdf,.jpg,.png"
                  maxSize="5MB"
                  helpText="Cedula de ciudadania o documento de identidad por ambas caras"
                />
                <FileUpload
                  label="Documentos Adicionales (opcional)"
                  accept=".pdf,.jpg,.png,.doc"
                  maxSize="10MB"
                  helpText="Escrituras, contratos de arrendamiento, facturas de servicios, etc."
                />
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-5 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
                  <CheckCircle2 className="h-8 w-8 text-green-600" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold text-foreground">Registro Exitoso</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Tu predio ha sido registrado correctamente. El equipo de la SDP revisara tu documentacion
                    en los proximos dias habiles.
                  </p>
                </div>
                <div className="rounded-lg border border-border bg-muted/30 p-4 text-left">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Resumen</p>
                  <div className="mt-2 space-y-1 text-sm">
                    <p><span className="text-muted-foreground">CHIP:</span> <span className="font-mono font-medium text-foreground">{chip || "AAA-0001-BCDE"}</span></p>
                    <p><span className="text-muted-foreground">Tenencia:</span> <span className="font-medium text-foreground capitalize">{ownership || "Propietario"}</span></p>
                    <p><span className="text-muted-foreground">Area:</span> <span className="font-medium text-foreground">{area || "120"} m&sup2;</span></p>
                    <p><span className="text-muted-foreground">Intencion:</span> <span className="font-medium text-foreground capitalize">{intention || "Asociarse"}</span></p>
                  </div>
                </div>
                <Button asChild>
                  <Link href="/dashboard">Volver al Dashboard</Link>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Navigation */}
        {currentStep < 3 && (
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={() => currentStep > 0 ? setCurrentStep(currentStep - 1) : undefined}
              asChild={currentStep === 0 ? true : undefined}
            >
              {currentStep === 0 ? <Link href="/dashboard">Cancelar</Link> : <span>Anterior</span>}
            </Button>
            <Button onClick={() => setCurrentStep(currentStep + 1)}>
              {currentStep === 2 ? "Registrar Predio" : "Siguiente"}
            </Button>
          </div>
        )}
      </div>
    </AppShell>
  )
}
