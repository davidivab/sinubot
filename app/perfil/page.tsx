"use client"

import { useState } from "react"
import { Camera, Save, Lock, Shield } from "lucide-react"
import { AppShell } from "@/components/skymatch/app-shell"
import { BreadcrumbsNav } from "@/components/skymatch/breadcrumbs-nav"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { cn } from "@/lib/utils"
import { currentMorador } from "@/lib/mock-data"
import { roleConfig } from "@/lib/constants"

export default function ProfilePage() {
  const user = currentMorador
  const rCfg = roleConfig[user.role]
  const [nombre, setNombre] = useState(user.nombre)
  const [apellido, setApellido] = useState(user.apellido)
  const [email, setEmail] = useState(user.email)
  const [telefono, setTelefono] = useState(user.telefono)
  const [consentShare, setConsentShare] = useState(true)
  const [consentNotif, setConsentNotif] = useState(true)

  return (
    <AppShell
      userName={`${user.nombre} ${user.apellido}`}
      userRole={user.role}
      notificationsCount={2}
    >
      <div className="mx-auto max-w-3xl space-y-6">
        <BreadcrumbsNav
          items={[
            { label: "Dashboard", href: "/dashboard" },
            { label: "Mi Perfil" },
          ]}
        />

        {/* Avatar header */}
        <Card className="border border-border">
          <CardContent className="flex items-center gap-6 p-6">
            <div className="group relative">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground">
                {user.nombre[0]}
                {user.apellido[0]}
              </div>
              <button
                type="button"
                className="absolute inset-0 flex items-center justify-center rounded-full bg-foreground/50 opacity-0 group-hover:opacity-100 transition-opacity"
                aria-label="Cambiar foto"
              >
                <Camera className="h-5 w-5 text-background" />
              </button>
            </div>
            <div>
              <h1 className="font-display text-xl font-bold text-foreground">
                {user.nombre} {user.apellido}
              </h1>
              <p className="text-sm text-muted-foreground">{user.email}</p>
              <div className="mt-2 flex items-center gap-2">
                <Badge
                  variant="secondary"
                  className={cn("text-xs", rCfg?.className)}
                >
                  {rCfg?.label}
                </Badge>
                <span className="text-xs text-muted-foreground">
                  Miembro desde{" "}
                  {new Date(user.fechaRegistro).toLocaleDateString("es-CO", {
                    month: "long",
                    year: "numeric",
                  })}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Personal info */}
        <Card className="border border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold">
              Informacion Personal
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="nombre">Nombre</Label>
                <Input
                  id="nombre"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="apellido">Apellido</Label>
                <Input
                  id="apellido"
                  value={apellido}
                  onChange={(e) => setApellido(e.target.value)}
                />
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="telefono">Telefono</Label>
                <Input
                  id="telefono"
                  value={telefono}
                  onChange={(e) => setTelefono(e.target.value)}
                />
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label>Tipo de Documento</Label>
                <Input
                  disabled
                  value={user.tipoDocumento}
                  className="bg-muted"
                />
              </div>
              <div className="space-y-1.5">
                <Label>Numero de Documento</Label>
                <Input
                  disabled
                  value={user.numeroDocumento}
                  className="bg-muted"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Change password */}
        <Card className="border border-border">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-sm font-semibold">
              <Lock className="h-4 w-4" />
              Cambiar Contrasena
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="current-pw">Contrasena Actual</Label>
              <Input id="current-pw" type="password" />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="new-pw">Nueva Contrasena</Label>
                <Input id="new-pw" type="password" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="confirm-pw">Confirmar Contrasena</Label>
                <Input id="confirm-pw" type="password" />
              </div>
            </div>
            <Button variant="outline" size="sm">
              Actualizar Contrasena
            </Button>
          </CardContent>
        </Card>

        {/* Privacy / consent */}
        <Card className="border border-border">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-sm font-semibold">
              <Shield className="h-4 w-4" />
              Privacidad y Consentimiento
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">
                  Compartir datos con empresarios
                </p>
                <p className="text-xs text-muted-foreground">
                  Permite que empresarios vean informacion de sus predios para
                  ofertas de desarrollo
                </p>
              </div>
              <Switch
                checked={consentShare}
                onCheckedChange={setConsentShare}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">
                  Notificaciones de ofertas
                </p>
                <p className="text-xs text-muted-foreground">
                  Recibir notificaciones cuando un empresario envie una oferta
                  sobre sus predios
                </p>
              </div>
              <Switch
                checked={consentNotif}
                onCheckedChange={setConsentNotif}
              />
            </div>
            <Separator />
            <p className="text-xs text-muted-foreground">
              De acuerdo con la Ley 1581 de 2012, usted puede ejercer sus
              derechos ARCO (Acceso, Rectificacion, Cancelacion y Oposicion)
              contactando a la SDP de Bogota.
            </p>
          </CardContent>
        </Card>

        {/* Save */}
        <div className="flex justify-end">
          <Button>
            <Save className="mr-2 h-4 w-4" />
            Guardar Cambios
          </Button>
        </div>
      </div>
    </AppShell>
  )
}
