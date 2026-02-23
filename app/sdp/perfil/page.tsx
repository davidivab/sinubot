"use client"

import { useState } from "react"
import { Camera, Save, Shield } from "lucide-react"
import { AppShell } from "@/components/skymatch/app-shell"
import { BreadcrumbsNav } from "@/components/skymatch/breadcrumbs-nav"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"

const currentSDP = {
  id: "u6",
  nombre: "Carlos",
  apellido: "Rodriguez",
  email: "carlos.rodriguez@sdp.gov.co",
  telefono: "601-3334455",
  tipoDocumento: "CC" as const,
  numeroDocumento: "80123456",
  role: "sdp" as const,
  status: "activo" as const,
  fechaRegistro: "2024-01-15",
}

export default function SDPProfilePage() {
  const user = currentSDP
  const [nombre, setNombre] = useState(user.nombre)
  const [apellido, setApellido] = useState(user.apellido)
  const [email, setEmail] = useState(user.email)
  const [telefono, setTelefono] = useState(user.telefono)

  return (
    <AppShell
      userName={`${user.nombre} ${user.apellido}`}
      userRole={user.role}
      notificationsCount={5}
    >
      <div className="mx-auto max-w-3xl space-y-6">
        <BreadcrumbsNav
          items={[
            { label: "Dashboard", href: "/sdp/dashboard" },
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
                className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground opacity-0 transition-opacity group-hover:opacity-100"
                aria-label="Cambiar foto"
              >
                <Camera className="h-4 w-4" />
              </button>
            </div>
            <div className="flex-1">
              <h2 className="font-display text-xl font-bold text-foreground">
                {user.nombre} {user.apellido}
              </h2>
              <p className="text-sm text-muted-foreground">{user.email}</p>
              <div className="mt-2 flex items-center gap-2">
                <Badge variant="secondary" className="bg-red-100 text-red-800">
                  SDP Admin
                </Badge>
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  Activo
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Personal Info */}
        <Card className="border border-border">
          <CardHeader>
            <CardTitle>Información Personal</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="nombre">Nombre</Label>
                <Input
                  id="nombre"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="apellido">Apellido</Label>
                <Input
                  id="apellido"
                  value={apellido}
                  onChange={(e) => setApellido(e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Correo Electrónico</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="telefono">Teléfono</Label>
              <Input
                id="telefono"
                type="tel"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="docType">Tipo de Documento</Label>
                <Input id="docType" value={user.tipoDocumento} disabled />
              </div>
              <div className="space-y-2">
                <Label htmlFor="docNum">Número de Documento</Label>
                <Input id="docNum" value={user.numeroDocumento} disabled />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Access Level */}
        <Card className="border border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Nivel de Acceso
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-lg bg-muted p-4">
              <p className="text-sm font-medium text-foreground mb-2">Permisos Administrativos</p>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li>✓ Acceso completo a datos de moradores</li>
                <li>✓ Gestión de usuarios y escenarios</li>
                <li>✓ Generación de reportes y análisis</li>
                <li>✓ Configuración de parámetros del sistema</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex justify-end gap-3">
          <Button variant="outline">Cancelar</Button>
          <Button>
            <Save className="mr-2 h-4 w-4" />
            Guardar Cambios
          </Button>
        </div>
      </div>
    </AppShell>
  )
}
