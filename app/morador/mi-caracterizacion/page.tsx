"use client"

import Link from "next/link"
import { 
  User, 
  MapPin, 
  Calendar, 
  CheckCircle2, 
  AlertCircle,
  Edit,
  Download,
  Home,
  Users,
  Heart,
  TrendingUp,
  Shield
} from "lucide-react"
import { AppShell } from "@/components/skymatch/app-shell"
import { BreadcrumbsNav } from "@/components/skymatch/breadcrumbs-nav"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import { currentMorador, mockSocialCharacterizations, mockProperties } from "@/lib/mock-data"

export default function MiCaracterizacionPage() {
  // Find the characterization for current morador
  const miPropiedad = mockProperties.find(p => p.moradorId === currentMorador.id && p.caracterizacionCompleta)
  const miCaracterizacion = mockSocialCharacterizations.find(
    c => c.propertyId === miPropiedad?.id
  )

  if (!miCaracterizacion) {
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
              { label: "Mi Caracterización" },
            ]}
          />

          <Card className="border-amber-200 bg-amber-50">
            <CardContent className="flex items-start gap-3 pt-6">
              <AlertCircle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-foreground">
                  Aún no has completado tu caracterización social
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  Complete el cuestionario para participar en el programa de renovación urbana.
                </p>
                <Button className="mt-4" asChild>
                  <Link href="/morador/caracterizacion">
                    Completar Caracterización
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </AppShell>
    )
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
            { label: "Mi Caracterización Social" },
          ]}
        />

        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="font-display text-2xl font-bold text-foreground">
                Mi Caracterización Social
              </h1>
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                <CheckCircle2 className="h-3 w-3 mr-1" />
                Completada
              </Badge>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              Registro completado el {new Date(miCaracterizacion.fecha).toLocaleDateString("es-CO")}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Edit className="mr-2 h-4 w-4" />
              Actualizar
            </Button>
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Descargar
            </Button>
          </div>
        </div>

        {/* Completion Progress */}
        <Card className="border-green-200 bg-green-50">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-foreground">Completitud</span>
              <span className="text-sm font-bold text-green-600">100%</span>
            </div>
            <Progress value={100} className="h-2" />
          </CardContent>
        </Card>

        {/* Key Information */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10">
                  <MapPin className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Zona</p>
                  <p className="font-semibold text-foreground">
                    {miCaracterizacion.zonaAeroportuaria}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-500/10">
                  <Home className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Tipo de Morador</p>
                  <p className="font-semibold text-foreground capitalize">
                    {miCaracterizacion.tipoMorador}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/10">
                  <User className="h-5 w-5 text-amber-600" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Edad</p>
                  <p className="font-semibold text-foreground">
                    {miCaracterizacion.edad} años
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Intención y Disposición */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <TrendingUp className="h-5 w-5" />
                Intención y Disposición
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Intención Principal</p>
                <Badge variant="secondary" className="text-sm">
                  {miCaracterizacion.disposicion.intencionPrincipal}
                </Badge>
              </div>

              <Separator />

              <div>
                <p className="text-xs text-muted-foreground mb-1">Interés en Asociación</p>
                <Badge 
                  variant="secondary" 
                  className={`text-sm ${
                    miCaracterizacion.disposicion.interesAsociacion === "Sí me interesa"
                      ? "bg-green-100 text-green-800"
                      : miCaracterizacion.disposicion.interesAsociacion.startsWith("Tal vez")
                      ? "bg-amber-100 text-amber-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {miCaracterizacion.disposicion.interesAsociacion}
                </Badge>
              </div>

              <Separator />

              <div>
                <p className="text-xs text-muted-foreground mb-1">Tiempo de Decisión</p>
                <p className="text-sm font-medium">
                  {miCaracterizacion.disposicion.tiempoDecision}
                </p>
              </div>

              <Separator />

              <div>
                <p className="text-xs text-muted-foreground mb-2">Aspectos Atractivos</p>
                <div className="space-y-2">
                  {miCaracterizacion.disposicion.aspectosAtractivos.infoClaraBeneficios && (
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                      <span>Información clara de beneficios</span>
                    </div>
                  )}
                  {miCaracterizacion.disposicion.aspectosAtractivos.mayorGananciaVentaConjunta && (
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                      <span>Mayor ganancia en venta conjunta</span>
                    </div>
                  )}
                  {miCaracterizacion.disposicion.aspectosAtractivos.ingresosPeriodicos && (
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                      <span>Ingresos periódicos</span>
                    </div>
                  )}
                  {miCaracterizacion.disposicion.aspectosAtractivos.opcionesReubicacion && (
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                      <span>Opciones de reubicación</span>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Factores Motivadores */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Heart className="h-5 w-5" />
                Factores Motivadores
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Cercanía a red de apoyo</span>
                <Badge variant="outline" className="text-xs">
                  {miCaracterizacion.factoresMotivadores.cercaniaRedApoyo}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Mejorar ingresos</span>
                <Badge variant="outline" className="text-xs">
                  {miCaracterizacion.factoresMotivadores.mejorarIngresos}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Mejorar calidad de vivienda</span>
                <Badge variant="outline" className="text-xs">
                  {miCaracterizacion.factoresMotivadores.mejorarCalidadVivienda}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Claridad jurídica</span>
                <Badge variant="outline" className="text-xs">
                  {miCaracterizacion.factoresMotivadores.claridadJuridica}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Actividades económicas</span>
                <Badge variant="outline" className="text-xs">
                  {miCaracterizacion.factoresMotivadores.actividadesEconomicas}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Percepción del Entorno */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <AlertCircle className="h-5 w-5" />
                Percepción del Entorno
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Ruido</span>
                <Badge 
                  variant="secondary" 
                  className={`text-xs ${
                    miCaracterizacion.percepcionEntorno.ruido.includes("negativo")
                      ? "bg-red-100 text-red-800"
                      : "bg-green-100 text-green-800"
                  }`}
                >
                  {miCaracterizacion.percepcionEntorno.ruido}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Contaminación del aire</span>
                <Badge 
                  variant="secondary" 
                  className={`text-xs ${
                    miCaracterizacion.percepcionEntorno.contaminacionAire.includes("negativo")
                      ? "bg-red-100 text-red-800"
                      : "bg-green-100 text-green-800"
                  }`}
                >
                  {miCaracterizacion.percepcionEntorno.contaminacionAire}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Tráfico vehicular</span>
                <Badge 
                  variant="secondary" 
                  className={`text-xs ${
                    miCaracterizacion.percepcionEntorno.traficoVehicular.includes("negativo")
                      ? "bg-red-100 text-red-800"
                      : "bg-green-100 text-green-800"
                  }`}
                >
                  {miCaracterizacion.percepcionEntorno.traficoVehicular}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Tráfico de carga</span>
                <Badge 
                  variant="secondary" 
                  className={`text-xs ${
                    miCaracterizacion.percepcionEntorno.traficoCarga.includes("negativo")
                      ? "bg-red-100 text-red-800"
                      : "bg-green-100 text-green-800"
                  }`}
                >
                  {miCaracterizacion.percepcionEntorno.traficoCarga}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Herramientas Digitales */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Users className="h-5 w-5" />
                Herramientas Digitales
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Comodidad de uso</span>
                <Badge variant="outline" className="text-xs">
                  {miCaracterizacion.herramientasDigitales.comodidadUso}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Preferencia de apoyo</span>
                <Badge variant="outline" className="text-xs">
                  {miCaracterizacion.herramientasDigitales.preferenciaApoyo}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Reuniones presenciales</span>
                <Badge variant="outline" className="text-xs">
                  {miCaracterizacion.herramientasDigitales.necesidadReunionesPresenciales}
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Barriers */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Shield className="h-5 w-5" />
              Barreras Identificadas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 md:grid-cols-2">
              <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <span className="text-sm">Falta de información</span>
                <Badge variant="secondary">{miCaracterizacion.barreras.faltaInformacion}</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <span className="text-sm">Desconfianza</span>
                <Badge variant="secondary">{miCaracterizacion.barreras.desconfianza}</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <span className="text-sm">Falta de claridad</span>
                <Badge variant="secondary">{miCaracterizacion.barreras.faltaClaridad}</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <span className="text-sm">Problemas legales</span>
                <Badge variant="secondary">{miCaracterizacion.barreras.problemasLegales}</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <span className="text-sm">Relaciones sociales</span>
                <Badge variant="secondary">{miCaracterizacion.barreras.relacionesSociales}</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <span className="text-sm">Dependencia de ingresos</span>
                <Badge variant="secondary">{miCaracterizacion.barreras.dependenciaIngresos}</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Property Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Home className="h-5 w-5" />
              Información del Predio
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Dirección</p>
                <p className="text-sm font-medium">{miCaracterizacion.direccion}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Tratamiento Urbanístico</p>
                <p className="text-sm font-medium">{miCaracterizacion.tratamientoUrbanistico}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">En AEDAF</p>
                <Badge variant={miCaracterizacion.inAEDAF ? "default" : "secondary"}>
                  {miCaracterizacion.inAEDAF ? "Sí" : "No"}
                </Badge>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Actividad del Predio</p>
                <p className="text-sm">{miCaracterizacion.actividadPredioUltimoAno}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex items-center justify-between border-t border-border pt-6">
          <Button variant="outline" asChild>
            <Link href="/morador/dashboard">
              Volver al Dashboard
            </Link>
          </Button>
          <div className="flex items-center gap-2">
            <Button variant="outline" asChild>
              <Link href="/morador/predios">
                Ver Mis Predios
              </Link>
            </Button>
            <Button asChild>
              <Link href="/morador/caracterizacion">
                Actualizar Información
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </AppShell>
  )
}
