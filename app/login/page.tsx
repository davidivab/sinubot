"use client"

import Link from "next/link"
import { useState } from "react"
import { Mail, Lock, Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12">
      <div className="w-full max-w-md space-y-6">
        {/* Logo */}
        <div className="text-center">
          <Link href="/" className="inline-flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground font-bold">
              SM
            </div>
            <span className="font-display text-2xl font-bold text-foreground">SkyMatch</span>
          </Link>
        </div>

        <Card className="border border-border">
          <CardHeader className="text-center">
            <CardTitle className="font-display text-xl">Iniciar Sesion</CardTitle>
            <CardDescription>Ingresa tus credenciales para acceder</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="email">Correo electronico</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input id="email" type="email" placeholder="correo@ejemplo.com" className="pl-9" />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="password">Contrasena</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Tu contrasena"
                  className="pl-9 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Checkbox id="remember" />
                <Label htmlFor="remember" className="text-sm font-normal text-muted-foreground">
                  Recordarme
                </Label>
              </div>
              <Link href="#" className="text-sm font-medium text-primary hover:underline">
                Olvidaste tu contrasena?
              </Link>
            </div>

            <Button className="w-full" size="lg" asChild>
              <Link href="/dashboard">Iniciar Sesion</Link>
            </Button>

            <p className="text-center text-sm text-muted-foreground">
              No tienes cuenta?{" "}
              <Link href="/registro" className="font-medium text-primary hover:underline">
                Registrate aqui
              </Link>
            </p>

            <Separator />

            {/* Demo role switcher */}
            <div className="space-y-2">
              <p className="text-center text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Acceso rapido (demo)
              </p>
              <div className="grid grid-cols-3 gap-2">
                <Button variant="outline" size="sm" className="text-xs" asChild>
                  <Link href="/dashboard">Morador</Link>
                </Button>
                <Button variant="outline" size="sm" className="text-xs" asChild>
                  <Link href="/empresario/dashboard">Empresario</Link>
                </Button>
                <Button variant="outline" size="sm" className="text-xs" asChild>
                  <Link href="/sdp/dashboard">SDP Admin</Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
