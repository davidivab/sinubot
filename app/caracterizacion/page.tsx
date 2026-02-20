"use client"

import { useState } from "react"
import Link from "next/link"
import { AppShell } from "@/components/skymatch/app-shell"
import { BreadcrumbsNav } from "@/components/skymatch/breadcrumbs-nav"
import { LikertScale } from "@/components/skymatch/likert-scale"
import { ProgressBar } from "@/components/skymatch/progress-bar"
import { SelectField } from "@/components/skymatch/select-field"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { currentMorador, likertQuestions as initialQuestions, mockProperties } from "@/lib/mock-data"
import type { LikertQuestion } from "@/lib/types"

const myProperties = mockProperties.filter((p) => p.moradorId === "u1")

export default function CaracterizacionPage() {
  const [selectedProperty, setSelectedProperty] = useState("")
  const [questions, setQuestions] = useState<LikertQuestion[]>(
    initialQuestions.map((q) => ({ ...q }))
  )
  const [observaciones, setObservaciones] = useState("")

  const answeredCount = questions.filter((q) => q.value !== null).length
  const progress = Math.round((answeredCount / questions.length) * 100)

  const handleLikertChange = (id: string, value: number) => {
    setQuestions((prev) =>
      prev.map((q) => (q.id === id ? { ...q, value } : q))
    )
  }

  return (
    <AppShell
      userName={`${currentMorador.nombre} ${currentMorador.apellido}`}
      userRole="morador"
      notificationsCount={2}
    >
      <div className="mx-auto max-w-3xl space-y-6">
        <BreadcrumbsNav
          items={[
            { label: "Dashboard", href: "/dashboard" },
            { label: "Caracterizacion Social" },
          ]}
        />

        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">Caracterizacion Social</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Evalua tu vinculo con el territorio. Esta informacion es fundamental para el calculo del ICS.
          </p>
        </div>

        {/* Property selector */}
        <SelectField
          label="Seleccionar Predio"
          id="property"
          value={selectedProperty}
          onValueChange={setSelectedProperty}
          options={myProperties.map((p) => ({
            value: p.id,
            label: `${p.chipCode} - ${p.direccion}`,
          }))}
          required
        />

        {/* Progress */}
        <ProgressBar
          value={progress}
          label={`Progreso: ${answeredCount} de ${questions.length} preguntas`}
          variant={progress === 100 ? "success" : "primary"}
        />

        {/* Questions */}
        <Card className="border border-border">
          <CardHeader>
            <CardTitle className="text-lg">Cuestionario de Arraigo Territorial</CardTitle>
            <CardDescription>
              Responde cada pregunta en una escala de 1 (Muy bajo) a 5 (Muy alto)
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {questions.map((q) => (
              <LikertScale
                key={q.id}
                id={q.id}
                label={q.label}
                description={q.description}
                value={q.value}
                onChange={(val) => handleLikertChange(q.id, val)}
              />
            ))}
          </CardContent>
        </Card>

        {/* Observations */}
        <Card className="border border-border">
          <CardHeader>
            <CardTitle className="text-lg">Observaciones Adicionales</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-1.5">
              <Label htmlFor="obs" className="text-sm font-medium text-foreground">
                Comentarios o situaciones especiales (opcional)
              </Label>
              <Textarea
                id="obs"
                placeholder="Describe cualquier situacion especial sobre tu relacion con el territorio..."
                rows={4}
                value={observaciones}
                onChange={(e) => setObservaciones(e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex items-center justify-between">
          <Button variant="ghost" asChild>
            <Link href="/dashboard">Cancelar</Link>
          </Button>
          <Button disabled={progress < 100}>
            Enviar Caracterizacion
          </Button>
        </div>
      </div>
    </AppShell>
  )
}
