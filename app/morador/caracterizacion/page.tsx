"use client"

import Link from "next/link"
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
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { currentMorador } from "@/lib/mock-data"
import { AlertCircle, CheckCircle2, Save } from "lucide-react"

export default function CaracterizacionPage() {
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
            { label: "Caracterización Social" },
          ]}
        />

        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display text-2xl font-bold text-foreground">
              Caracterización Social
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Completa tu caracterización social para participar en el programa
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Progreso: 35%</span>
            <Progress value={35} className="w-24" />
          </div>
        </div>

        {/* Information notice */}
        <Card className="border-info/50 bg-info/5">
          <CardContent className="flex items-start gap-3 pt-6">
            <AlertCircle className="h-5 w-5 text-info shrink-0 mt-0.5" />
            <div className="text-sm">
              <p className="font-medium text-foreground">
                Protección de datos personales (Ley 1581/2012)
              </p>
              <p className="text-muted-foreground mt-1">
                La información recolectada será utilizada exclusivamente para propósitos del
                programa de renovación urbana y será manejada con estricta confidencialidad
                por la Secretaría Distrital de Planeación.
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            {/* Sección 1: Información del Hogar */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>1. Información del Hogar</CardTitle>
                    <CardDescription className="mt-1">
                      Datos básicos de composición familiar
                    </CardDescription>
                  </div>
                  <CheckCircle2 className="h-5 w-5 text-success" />
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="numPersonas">Número de personas en el hogar</Label>
                    <Input id="numPersonas" type="number" defaultValue="4" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="numMenores">Menores de 18 años</Label>
                    <Input id="numMenores" type="number" defaultValue="2" />
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="numAdultosMay">Adultos mayores (+60 años)</Label>
                    <Input id="numAdultosMay" type="number" defaultValue="0" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="discapacidad">Personas con discapacidad</Label>
                    <Input id="discapacidad" type="number" defaultValue="0" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="jefatura">Jefe/a de hogar</Label>
                  <Select defaultValue="hombre">
                    <SelectTrigger id="jefatura">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hombre">Hombre</SelectItem>
                      <SelectItem value="mujer">Mujer</SelectItem>
                      <SelectItem value="compartido">Compartido</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Sección 2: Condiciones Socioeconómicas */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>2. Condiciones Socioeconómicas</CardTitle>
                    <CardDescription className="mt-1">
                      Información sobre ingresos y actividad económica
                    </CardDescription>
                  </div>
                  <div className="text-xs text-muted-foreground">Opcional</div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="ingresos">Rango de ingresos mensuales del hogar</Label>
                  <Select>
                    <SelectTrigger id="ingresos">
                      <SelectValue placeholder="Selecciona un rango" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0-1">Menos de 1 SMMLV</SelectItem>
                      <SelectItem value="1-2">1 a 2 SMMLV</SelectItem>
                      <SelectItem value="2-3">2 a 3 SMMLV</SelectItem>
                      <SelectItem value="3-5">3 a 5 SMMLV</SelectItem>
                      <SelectItem value="5+">Más de 5 SMMLV</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Actividad económica predominante</Label>
                  <RadioGroup defaultValue="empleado">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="empleado" id="empleado" />
                      <Label htmlFor="empleado" className="font-normal cursor-pointer">
                        Empleado formal
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="independiente" id="independiente" />
                      <Label htmlFor="independiente" className="font-normal cursor-pointer">
                        Trabajador independiente
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="informal" id="informal" />
                      <Label htmlFor="informal" className="font-normal cursor-pointer">
                        Trabajo informal
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="desempleado" id="desempleado" />
                      <Label htmlFor="desempleado" className="font-normal cursor-pointer">
                        Desempleado
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="pensionado" id="pensionado" />
                      <Label htmlFor="pensionado" className="font-normal cursor-pointer">
                        Pensionado
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="ocupacion">Ocupación principal</Label>
                  <Input id="ocupacion" placeholder="ej: Comerciante, Profesor, etc." />
                </div>
              </CardContent>
            </Card>

            {/* Sección 3: Vivienda y Arraigo */}
            <Card>
              <CardHeader>
                <CardTitle>3. Vivienda y Arraigo Territorial</CardTitle>
                <CardDescription className="mt-1">
                  Características de permanencia y vínculos con el territorio
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="tiempoResidencia">
                    Tiempo de residencia en el predio (años)
                  </Label>
                  <Input id="tiempoResidencia" type="number" placeholder="Ejemplo: 15" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tenencia">Tipo de tenencia</Label>
                  <Select>
                    <SelectTrigger id="tenencia">
                      <SelectValue placeholder="Selecciona una opción" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="propietario">Propietario</SelectItem>
                      <SelectItem value="arrendatario">Arrendatario</SelectItem>
                      <SelectItem value="usufructo">Usufructo</SelectItem>
                      <SelectItem value="otro">Otro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Participación comunitaria</Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="jac" />
                      <label htmlFor="jac" className="text-sm cursor-pointer">
                        Junta de Acción Comunal (JAC)
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="org-barrial" />
                      <label htmlFor="org-barrial" className="text-sm cursor-pointer">
                        Organización barrial
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="org-cultural" />
                      <label htmlFor="org-cultural" className="text-sm cursor-pointer">
                        Grupo cultural o deportivo
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="no-participa" />
                      <label htmlFor="no-participa" className="text-sm cursor-pointer">
                        No participo en organizaciones
                      </label>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="expectativas">
                    Expectativas sobre el proceso de renovación urbana
                  </Label>
                  <Textarea
                    id="expectativas"
                    placeholder="Describe tus expectativas, preocupaciones o propuestas..."
                    rows={4}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <div className="flex items-center justify-between pt-4">
              <Button variant="outline" asChild>
                <Link href="/morador/dashboard">Guardar y continuar después</Link>
              </Button>
              <div className="flex gap-3">
                <Button variant="outline">
                  <Save className="mr-2 h-4 w-4" />
                  Guardar borrador
                </Button>
                <Button>Enviar caracterización</Button>
              </div>
            </div>
          </div>

          {/* Right sidebar */}
          <div className="space-y-4">
            <Card className="border-border">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-semibold">Progreso de secciones</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-foreground">1. Información del hogar</span>
                    <CheckCircle2 className="h-4 w-4 text-success" />
                  </div>
                  <Progress value={100} className="h-1.5" />
                </div>
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-foreground">2. Condiciones socioeconómicas</span>
                    <span className="text-xs text-muted-foreground">50%</span>
                  </div>
                  <Progress value={50} className="h-1.5" />
                </div>
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-foreground">3. Vivienda y arraigo</span>
                    <span className="text-xs text-muted-foreground">0%</span>
                  </div>
                  <Progress value={0} className="h-1.5" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-border bg-muted/30">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-semibold">¿Necesitas ayuda?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <p className="text-muted-foreground">
                  Si tienes dudas sobre cómo completar la caracterización, contacta a la SDP:
                </p>
                <div className="space-y-1">
                  <p className="text-foreground">
                    <strong>Teléfono:</strong> 601 339 4444
                  </p>
                  <p className="text-foreground">
                    <strong>Email:</strong> info@sdp.gov.co
                  </p>
                </div>
                <Button variant="outline" size="sm" className="w-full">
                  Solicitar acompañamiento
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppShell>
  )
}
