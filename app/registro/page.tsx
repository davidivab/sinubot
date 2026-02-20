"use client"

import Link from "next/link"
import { useState } from "react"
import { User, Mail, Phone, MapPin, FileText, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { FormField } from "@/components/skymatch/form-field"
import { SelectField } from "@/components/skymatch/select-field"
import { ProgressBar } from "@/components/skymatch/progress-bar"
import { documentTypes } from "@/lib/constants"

export default function RegistroPage() {
  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    tipoDocumento: "",
    numeroDocumento: "",
    email: "",
    telefono: "",
    direccion: "",
  })
  const [consent1, setConsent1] = useState(false)
  const [consent2, setConsent2] = useState(false)
  const [consent3, setConsent3] = useState(false)

  const update = (key: string, value: string) => setForm((prev) => ({ ...prev, [key]: value }))

  return (
    <div className="min-h-screen bg-background px-4 py-8">
      <div className="mx-auto max-w-2xl space-y-6">
        {/* Logo */}
        <div className="text-center">
          <Link href="/" className="inline-flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-sm">
              SM
            </div>
            <span className="font-display text-lg font-bold text-foreground">SkyMatch</span>
          </Link>
        </div>

        <ProgressBar value={33} label="Paso 1 de 3 - Datos Personales" variant="primary" />

        <Card className="border border-border">
          <CardHeader>
            <CardTitle className="font-display text-xl">Registro de Morador</CardTitle>
            <CardDescription>
              Complete sus datos personales para crear una cuenta en la plataforma ZIDA
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="grid gap-4 sm:grid-cols-2">
              <FormField
                label="Nombre"
                id="nombre"
                placeholder="Tu nombre"
                value={form.nombre}
                onChange={(v) => update("nombre", v)}
                icon={User}
                required
              />
              <FormField
                label="Apellido"
                id="apellido"
                placeholder="Tu apellido"
                value={form.apellido}
                onChange={(v) => update("apellido", v)}
                icon={User}
                required
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <SelectField
                label="Tipo de Documento"
                id="tipoDocumento"
                value={form.tipoDocumento}
                onValueChange={(v) => update("tipoDocumento", v)}
                options={documentTypes}
                required
              />
              <FormField
                label="Numero de Documento"
                id="numeroDocumento"
                placeholder="1020304050"
                value={form.numeroDocumento}
                onChange={(v) => update("numeroDocumento", v)}
                icon={FileText}
                required
              />
            </div>

            <FormField
              label="Correo Electronico"
              id="email"
              type="email"
              placeholder="correo@ejemplo.com"
              value={form.email}
              onChange={(v) => update("email", v)}
              icon={Mail}
              required
            />

            <FormField
              label="Telefono"
              id="telefono"
              type="tel"
              placeholder="+57 310 456 7890"
              value={form.telefono}
              onChange={(v) => update("telefono", v)}
              icon={Phone}
              required
            />

            <FormField
              label="Direccion de Residencia"
              id="direccion"
              placeholder="Calle 45 #12-34, Localidad"
              value={form.direccion}
              onChange={(v) => update("direccion", v)}
              icon={MapPin}
              required
            />

            {/* Consents */}
            <div className="space-y-3 rounded-lg border border-border bg-muted/30 p-4">
              <p className="text-sm font-semibold text-foreground">Consentimientos</p>

              <div className="flex items-start gap-3">
                <Checkbox id="c1" checked={consent1} onCheckedChange={(c) => setConsent1(!!c)} />
                <Label htmlFor="c1" className="text-sm leading-relaxed text-muted-foreground font-normal">
                  Autorizo el tratamiento de mis datos personales conforme a la Ley 1581 de 2012 y la politica de privacidad de la SDP. <span className="text-destructive">*</span>
                </Label>
              </div>

              <div className="flex items-start gap-3">
                <Checkbox id="c2" checked={consent2} onCheckedChange={(c) => setConsent2(!!c)} />
                <Label htmlFor="c2" className="text-sm leading-relaxed text-muted-foreground font-normal">
                  Acepto compartir informacion anonimizada de mi predio con empresarios dentro de la plataforma (opcional).
                </Label>
              </div>

              <div className="flex items-start gap-3">
                <Checkbox id="c3" checked={consent3} onCheckedChange={(c) => setConsent3(!!c)} />
                <Label htmlFor="c3" className="text-sm leading-relaxed text-muted-foreground font-normal">
                  Deseo recibir notificaciones sobre ofertas y actualizaciones del proceso ZIDA (opcional).
                </Label>
              </div>
            </div>

            {/* ARCO Rights */}
            <div className="flex items-start gap-3 rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-800 dark:bg-blue-950/30">
              <ShieldCheck className="h-5 w-5 shrink-0 text-blue-600 mt-0.5 dark:text-blue-400" />
              <div>
                <p className="text-sm font-semibold text-blue-800 dark:text-blue-300">Derechos ARCO</p>
                <p className="mt-1 text-xs leading-relaxed text-blue-700 dark:text-blue-400">
                  Tienes derecho a Acceder, Rectificar, Cancelar y Oponerte al tratamiento de tus datos personales en cualquier momento.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <Button variant="ghost" asChild>
                <Link href="/">Cancelar</Link>
              </Button>
              <Button disabled={!consent1} asChild>
                <Link href="/verificacion-otp">Continuar</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Trust badges */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <ShieldCheck className="h-3.5 w-3.5" /> Ley 1581
          </span>
          <span className="flex items-center gap-1">
            <ShieldCheck className="h-3.5 w-3.5" /> Conexion Segura
          </span>
          <span className="flex items-center gap-1">
            <ShieldCheck className="h-3.5 w-3.5" /> SDP Bogota
          </span>
        </div>
      </div>
    </div>
  )
}
