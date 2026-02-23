"use client"

import Link from "next/link"
import { Eye, FolderOpen, Plus } from "lucide-react"
import { AppShell } from "@/components/skymatch/app-shell"
import { BreadcrumbsNav } from "@/components/skymatch/breadcrumbs-nav"
import { Card } from "@/components/ui/card"
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
import { currentEmpresario, mockScenarios } from "@/lib/mock-data"
import { statusLabels } from "@/lib/constants"
import { cn } from "@/lib/utils"

const myScenarios = mockScenarios.filter((s) => s.empresarioId === "u4")

export default function EmpresarioEscenariosPage() {
  return (
    <AppShell
      userName={`${currentEmpresario.nombre} ${currentEmpresario.apellido}`}
      userRole="empresario"
      notificationsCount={1}
    >
      <div className="space-y-6">
        <BreadcrumbsNav
          items={[
            { label: "Dashboard", href: "/empresario/dashboard" },
            { label: "Escenarios" },
          ]}
        />

        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display text-2xl font-bold text-foreground">
              Mis Escenarios
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Gestiona tus escenarios de desarrollo urbano
            </p>
          </div>
          <Button asChild>
            <Link href="/empresario/escenarios/nuevo">
              <Plus className="mr-2 h-4 w-4" /> Nuevo Escenario
            </Link>
          </Button>
        </div>

        <Card className="border border-border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Predios</TableHead>
                <TableHead>Área Total</TableHead>
                <TableHead>ICS</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {myScenarios.map((s) => {
                const sCfg = statusLabels[s.status]
                return (
                  <TableRow key={s.id}>
                    <TableCell className="font-medium text-foreground">
                      <div className="flex items-center gap-2">
                        <FolderOpen className="h-4 w-4 text-muted-foreground" />
                        {s.nombre}
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">{s.tipoProyecto}</TableCell>
                    <TableCell className="text-sm">{s.prediosSeleccionados.length}</TableCell>
                    <TableCell className="text-sm">{s.areaTotal.toLocaleString()} m²</TableCell>
                    <TableCell className="font-mono text-sm">{s.icsPromedio.toFixed(2)}</TableCell>
                    <TableCell>
                      <Badge variant="secondary" className={cn("text-[10px]", sCfg?.className)}>
                        {sCfg?.label}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
                        <Link href={`/empresario/escenarios/${s.id}`}>
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
      </div>
    </AppShell>
  )
}
