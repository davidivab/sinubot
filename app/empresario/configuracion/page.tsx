"use client"

import { AppShell } from "@/components/skymatch/app-shell"
import { BreadcrumbsNav } from "@/components/skymatch/breadcrumbs-nav"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { currentEmpresario } from "@/lib/mock-data"
import { Bell, Mail, Shield, Eye, FileText } from "lucide-react"

export default function EmpresarioConfiguracionPage() {
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
            { label: "Configuración" },
          ]}
        />

        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">Configuración</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Administra las preferencias de tu cuenta empresarial
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            {/* Company info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Información de la Empresa
                </CardTitle>
                <CardDescription>
                  Datos de tu organización registrada
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="empresa">Nombre de la empresa</Label>
                    <Input id="empresa" defaultValue="Constructora XYZ" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="nit">NIT</Label>
                    <Input id="nit" defaultValue={currentEmpresario.numeroDocumento} />
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="sector">Sector</Label>
                    <Input id="sector" defaultValue="Construcción" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="telefono-empresa">Teléfono</Label>
                    <Input id="telefono-empresa" placeholder="Teléfono de contacto" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="direccion-empresa">Dirección</Label>
                  <Input id="direccion-empresa" placeholder="Dirección de la empresa" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="web">Sitio web</Label>
                  <Input id="web" type="url" placeholder="https://ejemplo.com" />
                </div>
              </CardContent>
            </Card>

            {/* Notifications */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Notificaciones
                </CardTitle>
                <CardDescription>
                  Configura las alertas sobre tus escenarios y oportunidades
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="notif-escenarios" className="text-sm font-medium">
                      Actualizaciones de escenarios
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Recibe avisos cuando tus escenarios cambien de estado
                    </p>
                  </div>
                  <Switch id="notif-escenarios" defaultChecked />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="notif-oportunidades" className="text-sm font-medium">
                      Nuevas oportunidades
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Alertas de nuevas zonas que coincidan con tus criterios
                    </p>
                  </div>
                  <Switch id="notif-oportunidades" defaultChecked />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="notif-sdp" className="text-sm font-medium">
                      Mensajes de la SDP
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Comunicaciones oficiales y requerimientos
                    </p>
                  </div>
                  <Switch id="notif-sdp" defaultChecked />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="notif-respuestas" className="text-sm font-medium">
                      Respuestas de moradores
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Cuando moradores respondan a tus propuestas
                    </p>
                  </div>
                  <Switch id="notif-respuestas" defaultChecked />
                </div>

                <Separator />

                <div className="space-y-3">
                  <Label htmlFor="notif-frecuencia-emp">Frecuencia de alertas</Label>
                  <Select defaultValue="tiempo-real">
                    <SelectTrigger id="notif-frecuencia-emp">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tiempo-real">Tiempo real</SelectItem>
                      <SelectItem value="diario">Resumen diario</SelectItem>
                      <SelectItem value="semanal">Resumen semanal</SelectItem>
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
                  Comunicaciones por Email
                </CardTitle>
                <CardDescription>
                  Preferencias de correo electrónico
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="email-reportes" className="text-sm font-medium">
                      Reportes mensuales
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Estadísticas y métricas de tus escenarios
                    </p>
                  </div>
                  <Switch id="email-reportes" defaultChecked />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="email-normativa" className="text-sm font-medium">
                      Actualizaciones normativas
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Cambios en regulaciones de desarrollo urbano
                    </p>
                  </div>
                  <Switch id="email-normativa" defaultChecked />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="email-capacitaciones" className="text-sm font-medium">
                      Capacitaciones y eventos
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Talleres sobre uso de la plataforma
                    </p>
                  </div>
                  <Switch id="email-capacitaciones" />
                </div>
              </CardContent>
            </Card>

            {/* Privacy and data */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Privacidad y Datos
                </CardTitle>
                <CardDescription>
                  Gestión de información empresarial
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="privacy-perfil" className="text-sm font-medium">
                      Perfil público
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Permite que la SDP y moradores vean información básica de tu empresa
                    </p>
                  </div>
                  <Switch id="privacy-perfil" defaultChecked />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="privacy-proyectos" className="text-sm font-medium">
                      Mostrar proyectos anteriores
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Comparte tu portafolio de proyectos completados
                    </p>
                  </div>
                  <Switch id="privacy-proyectos" />
                </div>

                <Separator />

                <div className="space-y-3 pt-4">
                  <p className="text-sm font-medium text-foreground">Uso de datos</p>
                  <p className="text-xs text-muted-foreground">
                    Tu empresa se compromete a cumplir con la Ley 1581/2012 en el manejo
                    de datos personales de moradores. Todos los accesos están auditados.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Display preferences */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="h-5 w-5" />
                  Preferencias de Visualización
                </CardTitle>
                <CardDescription>
                  Interfaz y accesibilidad
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <Label htmlFor="idioma-emp">Idioma</Label>
                  <Select defaultValue="es">
                    <SelectTrigger id="idioma-emp">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="es">Español</SelectItem>
                      <SelectItem value="en">English</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="tema-emp">Tema</Label>
                  <Select defaultValue="sistema">
                    <SelectTrigger id="tema-emp">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="claro">Claro</SelectItem>
                      <SelectItem value="oscuro">Oscuro</SelectItem>
                      <SelectItem value="sistema">Sistema</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="mapa-default">Vista de mapa predeterminada</Label>
                  <Select defaultValue="oportunidades">
                    <SelectTrigger id="mapa-default">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="oportunidades">Oportunidades</SelectItem>
                      <SelectItem value="escenarios">Mis escenarios</SelectItem>
                      <SelectItem value="ics">Mapa de ICS</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end pt-4">
              <Button>Guardar configuración</Button>
            </div>
          </div>

          {/* Right sidebar */}
          <div className="space-y-4">
            <Card className="border-border bg-muted/30">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-semibold">Estado de verificación</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">NIT verificado</span>
                  <span className="text-success font-medium">✓ Verificado</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Documentos legales</span>
                  <span className="text-success font-medium">✓ Completos</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Aprobación SDP</span>
                  <span className="text-success font-medium">✓ Aprobado</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-info/50 bg-info/5">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-semibold">Cumplimiento normativo</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground space-y-2">
                <p>
                  Todas las empresas deben cumplir con:
                </p>
                <ul className="list-disc list-inside space-y-1 text-xs">
                  <li>Ley 1581/2012 (Protección de datos)</li>
                  <li>POT Bogotá D.C.</li>
                  <li>Normativa de renovación urbana</li>
                </ul>
                <Button variant="link" className="h-auto p-0 text-info">
                  Ver documentación completa
                </Button>
              </CardContent>
            </Card>

            <Card className="border-border bg-muted/30">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-semibold">Soporte técnico</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <p className="text-muted-foreground">
                  ¿Problemas con tu cuenta? Contacta soporte:
                </p>
                <div className="space-y-1 text-xs">
                  <p className="text-foreground">
                    <strong>Email:</strong> empresas@sdp.gov.co
                  </p>
                  <p className="text-foreground">
                    <strong>Tel:</strong> 601 339 4444 ext. 201
                  </p>
                </div>
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
