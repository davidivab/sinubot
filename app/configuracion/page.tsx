"use client"

import { useState } from "react"
import {
  Bell,
  Palette,
  Globe,
  Save,
  RotateCcw,
  Monitor,
  Sun,
  Moon,
} from "lucide-react"
import { AppShell } from "@/components/skymatch/app-shell"
import { BreadcrumbsNav } from "@/components/skymatch/breadcrumbs-nav"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { currentMorador } from "@/lib/mock-data"

const tabs = [
  { id: "notificaciones", label: "Notificaciones", icon: Bell },
  { id: "apariencia", label: "Apariencia", icon: Palette },
  { id: "region", label: "Region", icon: Globe },
] as const

type TabId = (typeof tabs)[number]["id"]

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<TabId>("notificaciones")

  const [emailOfertas, setEmailOfertas] = useState(true)
  const [emailEstado, setEmailEstado] = useState(true)
  const [emailResumen, setEmailResumen] = useState(false)
  const [pushOfertas, setPushOfertas] = useState(true)
  const [pushEstado, setPushEstado] = useState(false)
  const [frequency, setFrequency] = useState("inmediato")

  const [theme, setTheme] = useState("auto")
  const [density, setDensity] = useState("normal")

  const [idioma, setIdioma] = useState("es")
  const [zona, setZona] = useState("america_bogota")
  const [formato, setFormato] = useState("dd_mm_yyyy")
  const [moneda, setMoneda] = useState("cop")

  return (
    <AppShell
      userName={`${currentMorador.nombre} ${currentMorador.apellido}`}
      userRole={currentMorador.role}
      notificationsCount={2}
    >
      <div className="mx-auto max-w-4xl space-y-6">
        <BreadcrumbsNav
          items={[
            { label: "Dashboard", href: "/dashboard" },
            { label: "Configuracion" },
          ]}
        />

        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">
            Configuracion
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Personaliza tu experiencia en SkyMatch
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[200px_1fr]">
          {/* Left nav */}
          <nav className="space-y-1">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                    activeTab === tab.id
                      ? "bg-primary/10 font-medium text-primary"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {tab.label}
                </button>
              )
            })}
          </nav>

          {/* Content */}
          <div className="space-y-6">
            {/* Notifications */}
            {activeTab === "notificaciones" && (
              <Card className="border border-border">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-semibold">
                    Preferencias de Notificacion
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Email
                    </h3>
                    <div className="flex items-center justify-between">
                      <Label className="font-normal">
                        Ofertas y escenarios
                      </Label>
                      <Switch
                        checked={emailOfertas}
                        onCheckedChange={setEmailOfertas}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label className="font-normal">
                        Cambios de estado
                      </Label>
                      <Switch
                        checked={emailEstado}
                        onCheckedChange={setEmailEstado}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label className="font-normal">
                        Resumen semanal
                      </Label>
                      <Switch
                        checked={emailResumen}
                        onCheckedChange={setEmailResumen}
                      />
                    </div>
                  </div>
                  <Separator />
                  <div className="space-y-4">
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Push
                    </h3>
                    <div className="flex items-center justify-between">
                      <Label className="font-normal">
                        Ofertas y escenarios
                      </Label>
                      <Switch
                        checked={pushOfertas}
                        onCheckedChange={setPushOfertas}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label className="font-normal">
                        Cambios de estado
                      </Label>
                      <Switch
                        checked={pushEstado}
                        onCheckedChange={setPushEstado}
                      />
                    </div>
                  </div>
                  <Separator />
                  <div className="space-y-2">
                    <Label>Frecuencia</Label>
                    <Select value={frequency} onValueChange={setFrequency}>
                      <SelectTrigger className="w-[200px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="inmediato">Inmediato</SelectItem>
                        <SelectItem value="diario">
                          Resumen diario
                        </SelectItem>
                        <SelectItem value="semanal">
                          Resumen semanal
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Appearance */}
            {activeTab === "apariencia" && (
              <Card className="border border-border">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-semibold">
                    Apariencia
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-3">
                    <Label>Tema</Label>
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { id: "light", label: "Claro", icon: Sun },
                        { id: "dark", label: "Oscuro", icon: Moon },
                        { id: "auto", label: "Automatico", icon: Monitor },
                      ].map((opt) => {
                        const Icon = opt.icon
                        return (
                          <button
                            key={opt.id}
                            type="button"
                            onClick={() => setTheme(opt.id)}
                            className={cn(
                              "flex flex-col items-center gap-2 rounded-lg border-2 p-4 text-sm transition-colors",
                              theme === opt.id
                                ? "border-primary bg-primary/5 text-primary"
                                : "border-border text-muted-foreground hover:border-foreground/20"
                            )}
                          >
                            <Icon className="h-5 w-5" />
                            {opt.label}
                          </button>
                        )
                      })}
                    </div>
                  </div>
                  <Separator />
                  <div className="space-y-2">
                    <Label>Densidad</Label>
                    <Select value={density} onValueChange={setDensity}>
                      <SelectTrigger className="w-[200px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="compacta">Compacta</SelectItem>
                        <SelectItem value="normal">Normal</SelectItem>
                        <SelectItem value="confortable">
                          Confortable
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Region */}
            {activeTab === "region" && (
              <Card className="border border-border">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-semibold">
                    Region e Idioma
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-1.5">
                      <Label>Idioma</Label>
                      <Select value={idioma} onValueChange={setIdioma}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="es">Espanol</SelectItem>
                          <SelectItem value="en">English</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-1.5">
                      <Label>Zona Horaria</Label>
                      <Select value={zona} onValueChange={setZona}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="america_bogota">
                            America/Bogota (UTC-5)
                          </SelectItem>
                          <SelectItem value="america_new_york">
                            America/New York (UTC-5)
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-1.5">
                      <Label>Formato de Fecha</Label>
                      <Select value={formato} onValueChange={setFormato}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="dd_mm_yyyy">
                            DD/MM/AAAA
                          </SelectItem>
                          <SelectItem value="mm_dd_yyyy">
                            MM/DD/AAAA
                          </SelectItem>
                          <SelectItem value="yyyy_mm_dd">
                            AAAA-MM-DD
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-1.5">
                      <Label>Moneda</Label>
                      <Select value={moneda} onValueChange={setMoneda}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="cop">COP ($ Colombiano)</SelectItem>
                          <SelectItem value="usd">USD ($ Dolar)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Actions */}
            <div className="flex justify-end gap-3">
              <Button variant="outline">
                <RotateCcw className="mr-2 h-4 w-4" />
                Restablecer
              </Button>
              <Button>
                <Save className="mr-2 h-4 w-4" />
                Guardar Cambios
              </Button>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  )
}
