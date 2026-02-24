"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, Save, MapPin, Home, FileText, AlertCircle } from "lucide-react"
import { AppShell } from "@/components/skymatch/app-shell"
import { BreadcrumbsNav } from "@/components/skymatch/breadcrumbs-nav"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { currentMorador } from "@/lib/mock-data"

export default function NuevoPredioPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))

    // Redirect to predios list
    router.push("/morador/predios")
  }

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
            { label: "Mis Predios", href: "/morador/predios" },
            { label: "Registrar Nuevo Predio" },
          ]}
        />

        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display text-2xl font-bold text-foreground">
              Registrar Nuevo Predio
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Completa la información de tu predio para agregarlo al sistema ZIDA
            </p>
          </div>
        </div>

        {/* Information notice */}
        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="flex items-start gap-3 pt-6">
            <AlertCircle className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
            <div className="text-sm">
              <p className="font-medium text-foreground">
                Información importante
              </p>
              <p className="text-muted-foreground mt-1">
                Asegúrate de ingresar correctamente el código CHIP de tu predio. Esta información
                será verificada por la SDP antes de ser aprobada. Puedes encontrar el CHIP en tu
                recibo del impuesto predial o en el certificado de tradición y libertad.
              </p>
            </div>
          </CardContent>
        </Card>

        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            {/* Sección 1: Identificación del Predio */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Identificación del Predio
                </CardTitle>
                <CardDescription>
                  Información oficial del predio según catastro
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="chipCode">
                      Código CHIP <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="chipCode"
                      name="chipCode"
                      placeholder="AAA-0000-XXXX"
                      required
                      pattern="[A-Z]{3}-\d{4}-[A-Z]{4}"
                    />
                    <p className="text-xs text-muted-foreground">
                      Formato: AAA-0000-XXXX (ejemplo: AAA-0001-BCDE)
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="areaMt2">
                      Área (m²) <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="areaMt2"
                      name="areaMt2"
                      type="number"
                      min="1"
                      placeholder="120"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="direccion">
                    Dirección Completa <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="direccion"
                    name="direccion"
                    placeholder="Calle 45 #12-34"
                    required
                  />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="localidad">
                      Localidad <span className="text-destructive">*</span>
                    </Label>
                    <Select name="localidad" required>
                      <SelectTrigger id="localidad">
                        <SelectValue placeholder="Selecciona una localidad" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="San Cristobal">San Cristóbal</SelectItem>
                        <SelectItem value="Usme">Usme</SelectItem>
                        <SelectItem value="Tunjuelito">Tunjuelito</SelectItem>
                        <SelectItem value="Bosa">Bosa</SelectItem>
                        <SelectItem value="Kennedy">Kennedy</SelectItem>
                        <SelectItem value="Fontibon">Fontibón</SelectItem>
                        <SelectItem value="Engativa">Engativá</SelectItem>
                        <SelectItem value="Suba">Suba</SelectItem>
                        <SelectItem value="Barrios Unidos">Barrios Unidos</SelectItem>
                        <SelectItem value="Ciudad Bolivar">Ciudad Bolívar</SelectItem>
                        <SelectItem value="Antonio Nariño">Antonio Nariño</SelectItem>
                        <SelectItem value="Puente Aranda">Puente Aranda</SelectItem>
                        <SelectItem value="Candelaria">Candelaria</SelectItem>
                        <SelectItem value="Rafael Uribe">Rafael Uribe Uribe</SelectItem>
                        <SelectItem value="Santa Fe">Santa Fe</SelectItem>
                        <SelectItem value="Los Martires">Los Mártires</SelectItem>
                        <SelectItem value="Teusaquillo">Teusaquillo</SelectItem>
                        <SelectItem value="Chapinero">Chapinero</SelectItem>
                        <SelectItem value="Usaquen">Usaquén</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="barrio">
                      Barrio <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="barrio"
                      name="barrio"
                      placeholder="La Victoria"
                      required
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Sección 2: Tipo de Tenencia */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Home className="h-5 w-5" />
                  Tipo de Tenencia
                </CardTitle>
                <CardDescription>
                  Especifica tu relación legal con el predio
                </CardDescription>
              </CardHeader>
              <CardContent>
                <RadioGroup name="ownershipType" defaultValue="propietario" required>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3 rounded-lg border p-4 hover:bg-muted/50 transition-colors">
                      <RadioGroupItem value="propietario" id="propietario" className="mt-1" />
                      <div className="flex-1">
                        <Label htmlFor="propietario" className="cursor-pointer">
                          <span className="font-semibold">Propietario</span>
                          <p className="text-sm text-muted-foreground mt-1">
                            Tengo escrituras del predio a mi nombre
                          </p>
                        </Label>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3 rounded-lg border p-4 hover:bg-muted/50 transition-colors">
                      <RadioGroupItem value="poseedor" id="poseedor" className="mt-1" />
                      <div className="flex-1">
                        <Label htmlFor="poseedor" className="cursor-pointer">
                          <span className="font-semibold">Poseedor</span>
                          <p className="text-sm text-muted-foreground mt-1">
                            Ocupo y uso el predio sin título de propiedad
                          </p>
                        </Label>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3 rounded-lg border p-4 hover:bg-muted/50 transition-colors">
                      <RadioGroupItem value="tenedor" id="tenedor" className="mt-1" />
                      <div className="flex-1">
                        <Label htmlFor="tenedor" className="cursor-pointer">
                          <span className="font-semibold">Tenedor</span>
                          <p className="text-sm text-muted-foreground mt-1">
                            Arriendo o tengo permiso temporal del propietario
                          </p>
                        </Label>
                      </div>
                    </div>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>

            {/* Sección 3: Intención */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Tu Intención
                </CardTitle>
                <CardDescription>
                  ¿Qué te gustaría hacer con este predio? (puedes cambiar esto después)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <RadioGroup name="intention" defaultValue="no_definido" required>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3 rounded-lg border p-4 hover:bg-muted/50 transition-colors">
                      <RadioGroupItem value="permanecer" id="permanecer" className="mt-1" />
                      <div className="flex-1">
                        <Label htmlFor="permanecer" className="cursor-pointer">
                          <span className="font-semibold">Permanecer</span>
                          <p className="text-sm text-muted-foreground mt-1">
                            Quiero quedarme en mi predio
                          </p>
                        </Label>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3 rounded-lg border p-4 hover:bg-muted/50 transition-colors">
                      <RadioGroupItem value="asociarse" id="asociarse" className="mt-1" />
                      <div className="flex-1">
                        <Label htmlFor="asociarse" className="cursor-pointer">
                          <span className="font-semibold">Asociarme</span>
                          <p className="text-sm text-muted-foreground mt-1">
                            Me interesa asociarme con otros propietarios
                          </p>
                        </Label>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3 rounded-lg border p-4 hover:bg-muted/50 transition-colors">
                      <RadioGroupItem value="vender" id="vender" className="mt-1" />
                      <div className="flex-1">
                        <Label htmlFor="vender" className="cursor-pointer">
                          <span className="font-semibold">Vender</span>
                          <p className="text-sm text-muted-foreground mt-1">
                            Deseo vender mi predio
                          </p>
                        </Label>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3 rounded-lg border p-4 hover:bg-muted/50 transition-colors">
                      <RadioGroupItem value="no_definido" id="no_definido" className="mt-1" />
                      <div className="flex-1">
                        <Label htmlFor="no_definido" className="cursor-pointer">
                          <span className="font-semibold">No lo sé aún</span>
                          <p className="text-sm text-muted-foreground mt-1">
                            Necesito más información antes de decidir
                          </p>
                        </Label>
                      </div>
                    </div>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>

            {/* Coordenadas (opcional) */}
            <Card>
              <CardHeader>
                <CardTitle>Ubicación GPS (Opcional)</CardTitle>
                <CardDescription>
                  Si conoces las coordenadas exactas del predio, ingrésalas aquí
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="latitude">Latitud</Label>
                    <Input
                      id="latitude"
                      name="latitude"
                      type="number"
                      step="any"
                      placeholder="4.557"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="longitude">Longitud</Label>
                    <Input
                      id="longitude"
                      name="longitude"
                      type="number"
                      step="any"
                      placeholder="-74.089"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <div className="flex items-center justify-between border-t border-border pt-6">
              <Button variant="outline" type="button" asChild>
                <Link href="/morador/predios">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Cancelar
                </Link>
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                <Save className="mr-2 h-4 w-4" />
                {isSubmitting ? "Registrando..." : "Registrar Predio"}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </AppShell>
  )
}
