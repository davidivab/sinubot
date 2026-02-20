"use client"

import Link from "next/link"
import { Plus, ArrowRight, Map, ClipboardList, Mail, User, Bot } from "lucide-react"
import { AppShell } from "@/components/skymatch/app-shell"
import { StatCard } from "@/components/skymatch/stat-card"
import { PropertyCard } from "@/components/skymatch/property-card"
import { AlertBanner } from "@/components/skymatch/alert-banner"
import { BreadcrumbsNav } from "@/components/skymatch/breadcrumbs-nav"
import { SinuBot } from "@/components/skymatch/sinu-bot"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { currentMorador, moradorStats, mockProperties, mockActivity } from "@/lib/mock-data"

const myProperties = mockProperties.filter((p) => p.moradorId === "u1")
const recentActivity = mockActivity.filter((a) => a.userId === "u1").slice(0, 3)

const activityIcons: Record<string, React.ReactNode> = {
  registro_predio: <Plus className="h-4 w-4 text-primary" />,
  caracterizacion: <ClipboardList className="h-4 w-4 text-green-600" />,
  oferta_recibida: <Mail className="h-4 w-4 text-blue-600" />,
}

export default function MoradorDashboard() {
  return (
    <AppShell
      userName={`${currentMorador.nombre} ${currentMorador.apellido}`}
      userRole="morador"
      notificationsCount={2}
    >
      <div className="space-y-6">
        <BreadcrumbsNav items={[{ label: "Dashboard" }]} />

        {/* Welcome */}
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">
            Bienvenido, {currentMorador.nombre}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Resumen de tu actividad en la plataforma ZIDA
          </p>
        </div>

        {/* Alert */}
        <AlertBanner
          variant="warning"
          title="Caracterizacion pendiente"
          message="Tienes 1 predio sin completar la caracterizacion social. Completala para mejorar el calculo del ICS."
          actionLabel="Completar ahora"
          actionHref="/caracterizacion"
        />

        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {moradorStats.map((stat) => (
            <StatCard key={stat.label} {...stat} />
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Properties */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-lg font-semibold text-foreground">Mis Predios</h2>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/predios/nuevo">Ver todos</Link>
              </Button>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {myProperties.map((p) => (
                <PropertyCard key={p.id} property={p} />
              ))}
              {/* Add property card */}
              <Link href="/predios/nuevo" className="block">
                <Card className="flex h-full min-h-[140px] cursor-pointer items-center justify-center border-2 border-dashed border-border hover:border-primary/40 hover:bg-primary/5 transition-colors">
                  <CardContent className="flex flex-col items-center gap-2 p-6 text-center">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                      <Plus className="h-5 w-5 text-primary" />
                    </div>
                    <p className="text-sm font-medium text-muted-foreground">Agregar predio</p>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </div>

          {/* Right sidebar */}
          <div className="space-y-4">
            {/* Quick actions */}
            <Card className="border border-border">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-semibold">Acciones rapidas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <QuickAction icon={<Map className="h-4 w-4" />} label="Ver Mapa Social" href="/mapa" />
                <QuickAction icon={<ClipboardList className="h-4 w-4" />} label="Caracterizacion" href="/caracterizacion" />
                <QuickAction icon={<Mail className="h-4 w-4" />} label="Mis Ofertas" href="#" />
                <QuickAction icon={<User className="h-4 w-4" />} label="Mi Perfil" href="/perfil" />
              </CardContent>
            </Card>

            {/* Activity */}
            <Card className="border border-border">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-semibold">Actividad reciente</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {recentActivity.map((a) => (
                  <div key={a.id} className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-muted">
                      {activityIcons[a.type] || <Plus className="h-4 w-4" />}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-foreground">{a.title}</p>
                      <p className="text-xs text-muted-foreground truncate">{a.description}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* SinuBot promo */}
            <Card className="border border-primary/20 bg-primary/5">
              <CardContent className="flex items-center gap-3 p-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                  <Bot className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">Asistente SinuBot</p>
                  <p className="text-xs text-muted-foreground">
                    Preguntame sobre predios, caracterizacion o el mapa
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <SinuBot userName={currentMorador.nombre} contextModule="dashboard" />
    </AppShell>
  )
}

function QuickAction({ icon, label, href }: { icon: React.ReactNode; label: string; href: string }) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
    >
      {icon}
      <span className="flex-1">{label}</span>
      <ArrowRight className="h-3.5 w-3.5" />
    </Link>
  )
}
