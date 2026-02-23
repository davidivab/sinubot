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
import { Bell, Mail, Shield, Eye, FileText, Users, Database } from "lucide-react"

const currentSDP = {
  nombre: "Carlos",
  apellido: "Rodriguez",
}

export default function SDPConfiguracionPage() {
  return (
    <AppShell
      userName={`${currentSDP.nombre} ${currentSDP.apellido}`}
      userRole="sdp"
      notificationsCount={5}
    >
      <div className="space-y-6">
        <BreadcrumbsNav
          items={[
            { label: "Dashboard", href: "/sdp/dashboard" },
            { label: "Configuración" },
          ]}
        />

        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">
            Configuración Administrativa
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Configuración del sistema para administradores SDP
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            {/* Admin profile */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Perfil de Administrador
                </CardTitle>
                <CardDescription>
                  Información personal y permisos de acceso
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="nombre-admin">Nombre</Label>
                    <Input id="nombre-admin" defaultValue={currentSDP.nombre} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="apellido-admin">Apellido</Label>
                    <Input id="apellido-admin" defaultValue={currentSDP.apellido} />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email-admin">Email corporativo</Label>
                  <Input
                    id="email-admin"
                    type="email"
                    defaultValue="carlos.rodriguez@sdp.gov.co"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="telefono-admin">Teléfono</Label>
                  <Input id="telefono-admin" placeholder="Teléfono de contacto" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cargo">Cargo</Label>
                  <Input id="cargo" defaultValue="Coordinador ZIDA" readOnly />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="nivel-acceso">Nivel de acceso</Label>
                  <Select defaultValue="admin">
                    <SelectTrigger id="nivel-acceso" disabled>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Administrador completo</SelectItem>
                      <SelectItem value="supervisor">Supervisor</SelectItem>
                      <SelectItem value="analista">Analista</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">
                    Solo super-admin puede cambiar los niveles de acceso
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* System notifications */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Alertas del Sistema
                </CardTitle>
                <CardDescription>
                  Configura notificaciones administrativas
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="notif-nuevos-usuarios" className="text-sm font-medium">
                      Nuevos registros de usuarios
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Notificación cuando moradores o empresarios se registren
                    </p>
                  </div>
                  <Switch id="notif-nuevos-usuarios" defaultChecked />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="notif-escenarios-nuevos" className="text-sm font-medium">
                      Nuevos escenarios presentados
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Cuando empresarios creen escenarios para revisión
                    </p>
                  </div>
                  <Switch id="notif-escenarios-nuevos" defaultChecked />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="notif-alertas-sociales" className="text-sm font-medium">
                      Alertas sociales críticas
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Alertas de alto riesgo social o conflictos territoriales
                    </p>
                  </div>
                  <Switch id="notif-alertas-sociales" defaultChecked />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="notif-plazos" className="text-sm font-medium">
                      Vencimiento de plazos
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Recordatorios de revisiones pendientes y plazos de respuesta
                    </p>
                  </div>
                  <Switch id="notif-plazos" defaultChecked />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="notif-caracterizaciones" className="text-sm font-medium">
                      Caracterizaciones completadas
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Cuando moradores completen sus caracterizaciones sociales
                    </p>
                  </div>
                  <Switch id="notif-caracterizaciones" />
                </div>

                <Separator />

                <div className="space-y-3">
                  <Label htmlFor="notif-freq-admin">Frecuencia de resúmenes</Label>
                  <Select defaultValue="tiempo-real">
                    <SelectTrigger id="notif-freq-admin">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tiempo-real">Tiempo real</SelectItem>
                      <SelectItem value="horario">Resumen cada hora</SelectItem>
                      <SelectItem value="diario">Resumen diario (8:00 AM)</SelectItem>
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
                  Preferencias de notificaciones por correo
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="email-reportes-admin" className="text-sm font-medium">
                      Reportes semanales
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Estadísticas agregadas de la plataforma cada lunes
                    </p>
                  </div>
                  <Switch id="email-reportes-admin" defaultChecked />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="email-alertas" className="text-sm font-medium">
                      Alertas críticas por email
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Copia de alertas críticas enviadas a tu correo
                    </p>
                  </div>
                  <Switch id="email-alertas" defaultChecked />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="email-backup" className="text-sm font-medium">
                      Resúmenes de respaldo de datos
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Confirmación de respaldos automáticos del sistema
                    </p>
                  </div>
                  <Switch id="email-backup" />
                </div>
              </CardContent>
            </Card>

            {/* System settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5" />
                  Configuración del Sistema
                </CardTitle>
                <CardDescription>
                  Parámetros generales de la plataforma ZIDA
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <Label htmlFor="tiempo-revision">
                    Tiempo máximo de revisión de escenarios (días)
                  </Label>
                  <Input id="tiempo-revision" type="number" defaultValue="15" />
                  <p className="text-xs text-muted-foreground">
                    Plazo para revisar escenarios presentados por empresarios
                  </p>
                </div>

                <Separator />

                <div className="space-y-3">
                  <Label htmlFor="ics-umbral">Umbral de ICS crítico</Label>
                  <Input id="ics-umbral" type="number" defaultValue="70" step="0.1" />
                  <p className="text-xs text-muted-foreground">
                    ICS por encima de este valor genera alertas automáticas
                  </p>
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="auto-aprobacion" className="text-sm font-medium">
                      Auto-aprobación de usuarios verificados
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Aprobar automáticamente usuarios con NIT/cédula validada
                    </p>
                  </div>
                  <Switch id="auto-aprobacion" defaultChecked />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="modo-mantenimiento" className="text-sm font-medium">
                      Modo de mantenimiento
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Desactivar acceso a la plataforma para usuarios no-admin
                    </p>
                  </div>
                  <Switch id="modo-mantenimiento" />
                </div>
              </CardContent>
            </Card>

            {/* Privacy and audit */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Seguridad y Auditoría
                </CardTitle>
                <CardDescription>
                  Configuración de privacidad y registros de auditoría
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="audit-log" className="text-sm font-medium">
                      Registro de auditoría completo
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Registrar todas las acciones administrativas (requerido por Ley 1581)
                    </p>
                  </div>
                  <Switch id="audit-log" defaultChecked disabled />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="2fa" className="text-sm font-medium">
                      Autenticación de dos factores (2FA)
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Obligatorio para cuentas administrativas
                    </p>
                  </div>
                  <Switch id="2fa" defaultChecked disabled />
                </div>

                <Separator />

                <div className="space-y-3 pt-4">
                  <p className="text-sm font-medium text-foreground">Gestión de logs</p>
                  <div className="flex gap-3">
                    <Button variant="outline" size="sm">
                      Ver registros de acceso
                    </Button>
                    <Button variant="outline" size="sm">
                      Descargar logs de auditoría
                    </Button>
                  </div>
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
                  Interfaz y preferencias personales
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <Label htmlFor="idioma-sdp">Idioma</Label>
                  <Select defaultValue="es">
                    <SelectTrigger id="idioma-sdp">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="es">Español</SelectItem>
                      <SelectItem value="en">English</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="tema-sdp">Tema</Label>
                  <Select defaultValue="sistema">
                    <SelectTrigger id="tema-sdp">
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
                  <Label htmlFor="dashboard-default">Vista de dashboard predeterminada</Label>
                  <Select defaultValue="general">
                    <SelectTrigger id="dashboard-default">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="general">Vista general</SelectItem>
                      <SelectItem value="escenarios">Escenarios pendientes</SelectItem>
                      <SelectItem value="usuarios">Gestión de usuarios</SelectItem>
                      <SelectItem value="mapa">Mapa ZIDA</SelectItem>
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
                <CardTitle className="text-sm font-semibold">Permisos de acceso</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-xs">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-success" />
                    <span className="text-foreground">Gestión de usuarios</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-success" />
                    <span className="text-foreground">Revisión de escenarios</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-success" />
                    <span className="text-foreground">Generación de reportes</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-success" />
                    <span className="text-foreground">Acceso completo a datos</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-success" />
                    <span className="text-foreground">Configuración del sistema</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-muted-foreground" />
                    <span className="text-muted-foreground">Gestión de super-admin</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-info/50 bg-info/5">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-semibold">Cumplimiento normativo</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground space-y-2">
                <p>
                  La plataforma cumple con:
                </p>
                <ul className="list-disc list-inside space-y-1 text-xs">
                  <li>Ley 1581/2012 (Protección de datos)</li>
                  <li>Decreto 1074 de 2015</li>
                  <li>POT Bogotá D.C.</li>
                  <li>Normativa distrital de ZIDA</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-border bg-muted/30">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-semibold flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Equipo SDP
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Administradores</span>
                  <span className="font-semibold text-foreground">3</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Supervisores</span>
                  <span className="font-semibold text-foreground">5</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Analistas</span>
                  <span className="font-semibold text-foreground">12</span>
                </div>
                <Separator />
                <Button variant="outline" size="sm" className="w-full">
                  Gestionar equipo
                </Button>
              </CardContent>
            </Card>

            <Card className="border-border bg-muted/30">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-semibold">Soporte técnico</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <p className="text-muted-foreground">
                  Soporte técnico interno SDP:
                </p>
                <div className="space-y-1 text-xs">
                  <p className="text-foreground">
                    <strong>Email:</strong> soporte.zida@sdp.gov.co
                  </p>
                  <p className="text-foreground">
                    <strong>Ext:</strong> 4444
                  </p>
                </div>
                <Button variant="outline" size="sm" className="w-full">
                  Mesa de ayuda
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppShell>
  )
}
