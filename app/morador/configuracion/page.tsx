"use client"

import { AppShell } from "@/components/skymatch/app-shell"
import { BreadcrumbsNav } from "@/components/skymatch/breadcrumbs-nav"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { currentMorador } from "@/lib/mock-data"
import { Bell, Mail, Shield, Eye, Download, Trash2 } from "lucide-react"

export default function MoradorConfiguracionPage() {
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
            { label: "Configuración" },
          ]}
        />

        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">Configuración</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Administra tus preferencias y configuración de privacidad
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            {/* Notifications settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Notificaciones
                </CardTitle>
                <CardDescription>
                  Configura cómo y cuándo quieres recibir notificaciones
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="notif-ofertas" className="text-sm font-medium">
                      Nuevas ofertas de escenarios
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Recibe avisos cuando haya nuevas ofertas para tus predios
                    </p>
                  </div>
                  <Switch id="notif-ofertas" defaultChecked />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="notif-mensajes" className="text-sm font-medium">
                      Mensajes de la SDP
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Comunicados oficiales y actualizaciones importantes
                    </p>
                  </div>
                  <Switch id="notif-mensajes" defaultChecked />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="notif-recordatorios" className="text-sm font-medium">
                      Recordatorios
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Recordatorios de caracterización y acciones pendientes
                    </p>
                  </div>
                  <Switch id="notif-recordatorios" defaultChecked />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="notif-comunidad" className="text-sm font-medium">
                      Actividades comunitarias
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Eventos, reuniones y talleres en tu zona
                    </p>
                  </div>
                  <Switch id="notif-comunidad" />
                </div>

                <Separator />

                <div className="space-y-3">
                  <Label htmlFor="notif-frecuencia">Frecuencia de resúmenes</Label>
                  <Select defaultValue="diario">
                    <SelectTrigger id="notif-frecuencia">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tiempo-real">Tiempo real</SelectItem>
                      <SelectItem value="diario">Resumen diario</SelectItem>
                      <SelectItem value="semanal">Resumen semanal</SelectItem>
                      <SelectItem value="nunca">Nunca</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Email preferences */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5" />
                  Correo Electrónico
                </CardTitle>
                <CardDescription>
                  Preferencias de comunicación por email
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="email-boletín" className="text-sm font-medium">
                      Boletín mensual
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Actualizaciones del programa de renovación urbana
                    </p>
                  </div>
                  <Switch id="email-boletín" defaultChecked />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="email-tips" className="text-sm font-medium">
                      Consejos y recursos
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Guías para sacar el máximo provecho de la plataforma
                    </p>
                  </div>
                  <Switch id="email-tips" />
                </div>
              </CardContent>
            </Card>

            {/* Privacy settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Privacidad y Datos
                </CardTitle>
                <CardDescription>
                  Control sobre tu información personal (Ley 1581/2012)
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="privacy-sdp" className="text-sm font-medium">
                      Compartir datos con SDP
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Permite que la SDP use tus datos para análisis agregados
                    </p>
                  </div>
                  <Switch id="privacy-sdp" defaultChecked disabled />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="privacy-visible" className="text-sm font-medium">
                      Perfil visible en mapa social
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Solo se muestra tu predio de forma anónima, sin datos personales
                    </p>
                  </div>
                  <Switch id="privacy-visible" defaultChecked />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="privacy-contacto" className="text-sm font-medium">
                      Contacto directo por empresarios
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Permite que empresarios aprobados te contacten tras ofertas formales
                    </p>
                  </div>
                  <Switch id="privacy-contacto" />
                </div>

                <Separator />

                <div className="space-y-3 pt-4">
                  <p className="text-sm font-medium text-foreground">Gestión de datos</p>
                  <div className="flex gap-3">
                    <Button variant="outline" size="sm">
                      <Download className="mr-2 h-4 w-4" />
                      Descargar mis datos
                    </Button>
                    <Button variant="outline" size="sm" className="text-destructive">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Solicitar eliminación
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Según la Ley 1581/2012, tienes derecho a conocer, actualizar y rectificar
                    tu información personal.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Display preferences */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="h-5 w-5" />
                  Visualización
                </CardTitle>
                <CardDescription>
                  Preferencias de interfaz y accesibilidad
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <Label htmlFor="idioma">Idioma</Label>
                  <Select defaultValue="es">
                    <SelectTrigger id="idioma">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="es">Español</SelectItem>
                      <SelectItem value="en">English</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="tema">Tema</Label>
                  <Select defaultValue="sistema">
                    <SelectTrigger id="tema">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="claro">Claro</SelectItem>
                      <SelectItem value="oscuro">Oscuro</SelectItem>
                      <SelectItem value="sistema">Sistema</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="accesibilidad" className="text-sm font-medium">
                      Modo de alto contraste
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Mejora la legibilidad del texto
                    </p>
                  </div>
                  <Switch id="accesibilidad" />
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end pt-4">
              <Button>Guardar configuración</Button>
            </div>
          </div>

          {/* Right sidebar */}
          <div className="space-y-4">
            <Card className="border-info/50 bg-info/5">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-semibold">Protección de datos</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground space-y-2">
                <p>
                  Cumplimos con la Ley 1581 de 2012 de protección de datos personales.
                </p>
                <p>
                  Tus datos están seguros y solo se utilizan para los fines autorizados.
                </p>
                <Button variant="link" className="h-auto p-0 text-info">
                  Ver política de privacidad completa
                </Button>
              </CardContent>
            </Card>

            <Card className="border-border bg-muted/30">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-semibold">¿Necesitas ayuda?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <p className="text-muted-foreground">
                  Si tienes problemas con la configuración, contacta soporte técnico:
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  Contactar soporte
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppShell>
  )
}
