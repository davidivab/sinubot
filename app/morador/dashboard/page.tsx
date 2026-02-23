"use client"

import Link from "next/link"
import { Building2, ClipboardList, Map, TrendingUp, Users, AlertTriangle } from "lucide-react"
import { AppShell } from "@/components/skymatch/app-shell"
import { StatCard } from "@/components/skymatch/stat-card"
import { BreadcrumbsNav } from "@/components/skymatch/breadcrumbs-nav"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { currentMorador } from "@/lib/mock-data"

const moradorStats = [
  {
    label: "Predios Registrados",
    value: "2",
    icon: "Building2",
    trend: { value: 0, direction: "up" as const, label: "sin cambios" },
  },
  {
    label: "Caracterización",
    value: "50%",
    icon: "ClipboardList",
    trend: { value: 0, direction: "up" as const, label: "1 de 2 completas" },
  },
  {
    label: "Ofertas Recibidas",
    value: "3",
    icon: "TrendingUp",
    trend: { value: 3, direction: "up" as const, label: "nuevas este mes" },
  },
  {
    label: "Estado",
    value: "Activo",
    icon: "Shield",
    trend: { value: 0, direction: "up" as const, label: "verificado" },
  },
]

export default function MoradorDashboard() {
  return (
    <AppShell
      userName={`${currentMorador.nombre} ${currentMorador.apellido}`}
      userRole="morador"
      notificationsCount={3}
    >
      <div className="space-y-6">
        <BreadcrumbsNav items={[{ label: "Dashboard" }]} />

        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display text-2xl font-bold text-foreground">
              Dashboard Morador
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Bienvenido, {currentMorador.nombre}. Este es tu panel de control.
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {moradorStats.map((stat) => (
            <StatCard key={stat.label} {...stat} />
          ))}
        </div>

        {/* Main Content */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Tasks / Pending actions */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="font-display text-lg font-semibold text-foreground">
              Acciones Pendientes
            </h2>
            <Card className="border border-border">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <ClipboardList className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-foreground">Completar Caracterización</h3>
                      <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                        Pendiente
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Completa la caracterización social del predio en Calle 80 #68-45 para que la SDP pueda evaluarlo.
                    </p>
                    <Button size="sm" asChild>
                      <Link href="/morador/caracterizacion">Completar Ahora</Link>
                    </Button>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-green-100">
                    <Building2 className="h-5 w-5 text-green-600" />
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-foreground">Revisar Ofertas</h3>
                      <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                        3 nuevas
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Tienes 3 ofertas nuevas de empresarios interesados en tu predio.
                    </p>
                    <Button size="sm" variant="outline" asChild>
                      <Link href="/morador/ofertas">Ver Ofertas</Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <h2 className="font-display text-lg font-semibold text-foreground">
              Actividad Reciente
            </h2>
            <Card className="border border-border">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="flex h-2 w-2 mt-2 shrink-0 rounded-full bg-green-500"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">Predio verificado</p>
                      <p className="text-xs text-muted-foreground">Hace 2 días</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex h-2 w-2 mt-2 shrink-0 rounded-full bg-blue-500"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">Nueva oferta recibida</p>
                      <p className="text-xs text-muted-foreground">Hace 3 días</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex h-2 w-2 mt-2 shrink-0 rounded-full bg-yellow-500"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">Caracterización iniciada</p>
                      <p className="text-xs text-muted-foreground">Hace 5 días</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            <Card className="border border-border">
              <CardHeader>
                <CardTitle className="text-base">Progreso de Perfil</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Completado</span>
                    <span className="font-semibold text-foreground">75%</span>
                  </div>
                  <Progress value={75} className="h-2" />
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-green-500"></div>
                    <span className="text-muted-foreground">Datos personales</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-green-500"></div>
                    <span className="text-muted-foreground">Predios registrados</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
                    <span className="text-muted-foreground">Caracterización social</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-gray-300"></div>
                    <span className="text-muted-foreground">Verificación SDP</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-border bg-blue-50 dark:bg-blue-950/20">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Map className="h-4 w-4" />
                  Mapa Social
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Explora las intenciones de tus vecinos en el mapa social.
                </p>
                <Button size="sm" variant="outline" className="w-full" asChild>
                  <Link href="/morador/mapa">Ver Mapa</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="border border-border bg-yellow-50 dark:bg-yellow-950/20">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-yellow-600" />
                  Protección Anti-Presión
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-2">
                  Máximo 3 ofertas por año. Puedes bloquear empresarios.
                </p>
                <p className="text-xs text-muted-foreground">
                  Ofertas este año: <strong>3 de 3</strong>
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppShell>
  )
}
