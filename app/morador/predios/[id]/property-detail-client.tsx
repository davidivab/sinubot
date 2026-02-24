"use client"

import Link from "next/link"
import { ArrowLeft, MapPin, Home, FileText, Edit, AlertTriangle, CheckCircle2, Calendar, User } from "lucide-react"
import { AppShell } from "@/components/skymatch/app-shell"
import { BreadcrumbsNav } from "@/components/skymatch/breadcrumbs-nav"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { currentMorador, mockSocialCharacterizations } from "@/lib/mock-data"
import { intentionConfig } from "@/lib/constants"
import { cn } from "@/lib/utils"
import type { Property } from "@/lib/types"

const ownershipLabels = {
  propietario: "Propietario",
  poseedor: "Poseedor",
  tenedor: "Tenedor",
}

const statusLabels = {
  registrado: "Registrado",
  en_revision: "En Revisión",
  verificado: "Verificado",
  rechazado: "Rechazado",
}

const riskLabels = {
  bajo: { label: "Bajo", className: "bg-green-100 text-green-800" },
  medio: { label: "Medio", className: "bg-yellow-100 text-yellow-800" },
  alto: { label: "Alto", className: "bg-red-100 text-red-800" },
}

export default function PropertyDetailClient({ property }: { property: Property }) {
  const iCfg = intentionConfig[property.intention]
  const characterization = mockSocialCharacterizations.find(
    (c) => c.propertyId === property.id
  )

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
            { label: property.chipCode },
          ]}
        />

        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display text-2xl font-bold text-foreground">
              Detalle del Predio
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {property.direccion}
            </p>
          </div>
          <Button variant="outline" asChild>
            <Link href={`/morador/predios/${property.id}/editar`}>
              <Edit className="mr-2 h-4 w-4" />
              Editar
            </Link>
          </Button>
        </div>

        {/* Estado de caracterización */}
        <Card className={cn(
          "border",
          property.caracterizacionCompleta 
            ? "bg-green-50 border-green-200" 
            : "bg-yellow-50 border-yellow-200"
        )}>
          <CardContent className="flex items-start gap-3 pt-6">
            {property.caracterizacionCompleta ? (
              <>
                <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="font-medium text-foreground">
                    Caracterización Completa
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    La caracterización social de este predio está completa. Puedes ver los detalles
                    o actualizarla si algo ha cambiado.
                  </p>
                  <div className="flex gap-2 mt-3">
                    <Button size="sm" asChild>
                      <Link href="/morador/mi-caracterizacion">
                        Ver Caracterización
                      </Link>
                    </Button>
                    <Button size="sm" variant="outline" asChild>
                      <Link href="/morador/caracterizacion">
                        Actualizar
                      </Link>
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <AlertTriangle className="h-5 w-5 text-yellow-600 shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="font-medium text-foreground">
                    Caracterización Pendiente
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Para completar el registro del predio, necesitas realizar la caracterización social.
                    Esto ayudará a definir las mejores opciones para ti y tu comunidad.
                  </p>
                  <Button size="sm" className="mt-3" asChild>
                    <Link href="/morador/caracterizacion">
                      Iniciar Caracterización
                    </Link>
                  </Button>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Información General */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Información General
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Código CHIP</p>
                <p className="font-mono text-lg font-semibold text-foreground">{property.chipCode}</p>
              </div>
              
              <div>
                <p className="text-sm text-muted-foreground">Dirección</p>
                <p className="text-base font-medium text-foreground">{property.direccion}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Localidad</p>
                  <p className="text-base font-medium text-foreground">{property.localidad}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Barrio</p>
                  <p className="text-base font-medium text-foreground">{property.barrio}</p>
                </div>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Área</p>
                <p className="text-base font-medium text-foreground">
                  {property.areaMt2.toLocaleString()} m²
                </p>
              </div>

              {property.latitude && property.longitude && (
                <div>
                  <p className="text-sm text-muted-foreground">Coordenadas GPS</p>
                  <p className="text-sm font-mono text-foreground">
                    {property.latitude}, {property.longitude}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Información Legal y Estado */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Home className="h-5 w-5" />
                Tenencia y Estado
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Tipo de Tenencia</p>
                <Badge variant="outline" className="mt-1">
                  {ownershipLabels[property.ownershipType]}
                </Badge>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Estado del Registro</p>
                <Badge variant="outline" className="mt-1">
                  {statusLabels[property.status]}
                </Badge>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Fecha de Registro</p>
                <p className="text-base font-medium text-foreground flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  {new Date(property.fechaRegistro).toLocaleDateString("es-CO", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>

              {property.riskLevel && (
                <div>
                  <p className="text-sm text-muted-foreground">Nivel de Riesgo</p>
                  <Badge 
                    variant="secondary" 
                    className={cn("mt-1", riskLabels[property.riskLevel].className)}
                  >
                    {riskLabels[property.riskLevel].label}
                  </Badge>
                </div>
              )}

              <div>
                <p className="text-sm text-muted-foreground">Propietario Registrado</p>
                <p className="text-base font-medium text-foreground flex items-center gap-2">
                  <User className="h-4 w-4" />
                  {property.moradorNombre}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Intención */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Tu Intención con este Predio
            </CardTitle>
            <CardDescription>
              Esta información ayuda a identificar las mejores opciones para ti
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <Badge className={cn("text-sm", iCfg.className)}>
                  {iCfg.label}
                </Badge>
                <p className="text-sm text-muted-foreground mt-2">
                  {property.intention === "permanecer" && "Deseas quedarte en tu predio"}
                  {property.intention === "asociarse" && "Estás interesado en asociarte con otros propietarios"}
                  {property.intention === "vender" && "Deseas vender tu predio"}
                  {property.intention === "no_definido" && "Aún estás evaluando tus opciones"}
                </p>
              </div>
              <Button variant="outline" size="sm" asChild>
                <Link href={`/morador/predios/${property.id}/editar`}>
                  Cambiar Intención
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Caracterización Social (si existe) */}
        {characterization && (
          <Card>
            <CardHeader>
              <CardTitle>Resumen de Caracterización</CardTitle>
              <CardDescription>
                Información recopilada en la caracterización social
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-muted rounded-lg">
                  <p className="text-2xl font-bold text-foreground">{characterization.edad || "N/A"}</p>
                  <p className="text-sm text-muted-foreground">Edad</p>
                </div>
                <div className="text-center p-4 bg-muted rounded-lg">
                  <p className="text-2xl font-bold text-foreground capitalize">{characterization.tipoMorador}</p>
                  <p className="text-sm text-muted-foreground">Tipo de Morador</p>
                </div>
                <div className="text-center p-4 bg-muted rounded-lg">
                  <p className="text-2xl font-bold text-foreground">
                    {characterization.zonaAeroportuaria}
                  </p>
                  <p className="text-sm text-muted-foreground">Zona Aeroportuaria</p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t">
                <p className="text-sm text-muted-foreground">
                  Última actualización:{" "}
                  {new Date(characterization.fecha).toLocaleDateString("es-CO")}
                </p>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/morador/mi-caracterizacion">
                    Ver Detalles Completos
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Acciones */}
        <div className="flex items-center justify-between border-t border-border pt-6">
          <Button variant="outline" asChild>
            <Link href="/morador/predios">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver a Mis Predios
            </Link>
          </Button>
          <div className="flex gap-2">
            <Button variant="outline" asChild>
              <Link href={`/morador/predios/${property.id}/editar`}>
                <Edit className="mr-2 h-4 w-4" />
                Editar Predio
              </Link>
            </Button>
            {!property.caracterizacionCompleta && (
              <Button asChild>
                <Link href="/morador/caracterizacion">
                  Completar Caracterización
                </Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </AppShell>
  )
}
