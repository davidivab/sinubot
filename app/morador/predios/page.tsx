"use client"

import Link from "next/link"
import { Plus, Building2, Eye, AlertTriangle } from "lucide-react"
import { AppShell } from "@/components/skymatch/app-shell"
import { BreadcrumbsNav } from "@/components/skymatch/breadcrumbs-nav"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { currentMorador, mockProperties } from "@/lib/mock-data"
import { intentionConfig } from "@/lib/constants"
import { cn } from "@/lib/utils"

const moradorProperties = mockProperties.filter((p) => p.moradorId === "u1")

export default function MoradorPrediosPage() {
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
            { label: "Mis Predios" },
          ]}
        />

        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display text-2xl font-bold text-foreground">
              Mis Predios
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Gestiona tus predios registrados en la ZIDA
            </p>
          </div>
          <Button asChild>
            <Link href="/morador/predios/nuevo">
              <Plus className="mr-2 h-4 w-4" /> Registrar Predio
            </Link>
          </Button>
        </div>

        <Card className="border border-border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>CHIP</TableHead>
                <TableHead>Dirección</TableHead>
                <TableHead>Área (m²)</TableHead>
                <TableHead>Intención</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {moradorProperties.map((prop) => {
                const iCfg = intentionConfig[prop.intention]
                return (
                  <TableRow key={prop.id}>
                    <TableCell className="font-mono text-sm">{prop.chipCode}</TableCell>
                    <TableCell className="font-medium text-foreground">{prop.direccion}</TableCell>
                    <TableCell className="text-sm">{prop.areaMt2.toLocaleString()}</TableCell>
                    <TableCell>
                      <Badge variant="secondary" className={cn("text-[10px]", iCfg.className)}>
                        {iCfg.label}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {prop.caracterizacionCompleta ? (
                        <Badge variant="secondary" className="bg-green-100 text-green-800 text-[10px]">
                          Completa
                        </Badge>
                      ) : (
                        <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 text-[10px]">
                          Pendiente
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
                        <Link href={`/morador/predios/${prop.id}`}>
                          <Eye className="h-4 w-4" />
                        </Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </Card>

        <Card className="border border-border bg-blue-50 dark:bg-blue-950/20">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-blue-600" />
              ¿Necesitas ayuda?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Si tienes dudas sobre cómo registrar tu predio o completar la caracterización,
              puedes consultar la guía o contactar a la SDP.
            </p>
            <div className="flex gap-2">
              <Button size="sm" variant="outline">Ver Guía</Button>
              <Button size="sm" variant="outline">Contactar SDP</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  )
}
