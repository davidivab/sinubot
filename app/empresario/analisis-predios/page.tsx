"use client"

import { AppShell } from "@/components/skymatch/app-shell"
import { BreadcrumbsNav } from "@/components/skymatch/breadcrumbs-nav"
import { BarChart } from "@/components/skymatch/bar-chart"
import { PieChart } from "@/components/skymatch/pie-chart"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  Users, 
  TrendingUp, 
  AlertCircle,
  CheckCircle,
  Clock,
  Home,
  Lightbulb
} from "lucide-react"
import { currentEmpresario } from "@/lib/mock-data"
import { mockSocialCharacterizations, socialCharacterizationStats } from "@/lib/social-characterization-data"

export default function AnalisisPrediosPage() {
  const stats = socialCharacterizationStats
  
  // Filtrar caracterizaciones de la zona de interés (ejemplo: Zona Directa)
  const zonasInteres = mockSocialCharacterizations.filter(
    (c) => c.zonaAeroportuaria === "Directa" || c.zonaAeroportuaria === "Indirecta"
  )

  const interesadosAsociacion = zonasInteres.filter(
    (c) => c.disposicion.interesAsociacion === "Sí me interesa" || 
           c.disposicion.interesAsociacion === "Tal vez, si los beneficios están claros"
  ).length

  const promedioEdadZona = zonasInteres.reduce((sum, c) => sum + (c.edad || 0), 0) / zonasInteres.length

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
            { label: "Análisis de Predios" },
          ]}
        />

        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">
            Análisis de Disposición Social
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Insights sobre moradores y disposición a la asociatividad en la zona de interés
          </p>
        </div>

        {/* Alert Info */}
        <Card className="border border-blue-200 bg-blue-50/50 dark:border-blue-900 dark:bg-blue-950/20">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <Lightbulb className="h-5 w-5 text-blue-600 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-medium text-blue-900 dark:text-blue-100">
                  Información basada en caracterización social real
                </p>
                <p className="mt-1 text-xs text-blue-700 dark:text-blue-300">
                  Los datos provienen de encuestas realizadas a {stats.totalEncuestas} moradores en Puerta de Teja. 
                  Esta información le ayudará a diseñar estrategias de asociatividad más efectivas.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Métricas Clave */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="border border-border">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-500/10">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Interés Positivo</p>
                  <p className="text-2xl font-bold text-foreground">
                    {interesadosAsociacion}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {((interesadosAsociacion / zonasInteres.length) * 100).toFixed(0)}% del total
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-border">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-500/10">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Moradores Encuestados</p>
                  <p className="text-2xl font-bold text-foreground">
                    {zonasInteres.length}
                  </p>
                  <p className="text-xs text-muted-foreground">en zona objetivo</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-border">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-amber-500/10">
                  <Clock className="h-6 w-6 text-amber-600" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Decisión Rápida</p>
                  <p className="text-2xl font-bold text-foreground">
                    {stats.distribucionTiempoDecision.menosSeisMeses}
                  </p>
                  <p className="text-xs text-muted-foreground">&lt; 6 meses</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-border">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-500/10">
                  <Home className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Edad Promedio</p>
                  <p className="text-2xl font-bold text-foreground">
                    {promedioEdadZona.toFixed(0)}
                  </p>
                  <p className="text-xs text-muted-foreground">años</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Interés en Asociación */}
          <Card className="border border-border">
            <CardHeader>
              <CardTitle className="text-lg">Nivel de Interés en Asociación</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-foreground font-medium flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-green-500" />
                      Sí me interesa
                    </span>
                    <span className="text-muted-foreground">
                      {stats.interesAsociacion.siMeInteresa} ({((stats.interesAsociacion.siMeInteresa / stats.totalEncuestas) * 100).toFixed(0)}%)
                    </span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-3">
                    <div
                      className="bg-green-500 h-3 rounded-full"
                      style={{ width: `${(stats.interesAsociacion.siMeInteresa / stats.totalEncuestas) * 100}%` }}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-foreground font-medium flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-blue-500" />
                      Tal vez (con beneficios claros)
                    </span>
                    <span className="text-muted-foreground">
                      {stats.interesAsociacion.talVez} ({((stats.interesAsociacion.talVez / stats.totalEncuestas) * 100).toFixed(0)}%)
                    </span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-3">
                    <div
                      className="bg-blue-500 h-3 rounded-full"
                      style={{ width: `${(stats.interesAsociacion.talVez / stats.totalEncuestas) * 100}%` }}
                    />
                  </div>
                </div>

                <div className="mt-4 p-3 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-900">
                  <p className="text-sm font-medium text-green-900 dark:text-green-100">
                    Oportunidad: {((interesadosAsociacion / stats.totalEncuestas) * 100).toFixed(0)}% de apertura
                  </p>
                  <p className="text-xs text-green-700 dark:text-green-300 mt-1">
                    Más de la mitad de los moradores están abiertos a asociarse si se demuestra claramente el beneficio.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tiempo de Decisión */}
          <BarChart
            title="Tiempo Estimado para Decisión"
            data={[
              {
                label: "< 6 meses",
                value: stats.distribucionTiempoDecision.menosSeisMeses,
                color: "bg-green-500",
              },
              {
                label: "6-12 meses",
                value: stats.distribucionTiempoDecision.seisADoce,
                color: "bg-blue-500",
              },
              {
                label: "1-3 años",
                value: stats.distribucionTiempoDecision.unoATres,
                color: "bg-amber-500",
              },
              {
                label: "> 3 años",
                value: stats.distribucionTiempoDecision.masTres,
                color: "bg-red-500",
              },
            ]}
          />
        </div>

        {/* Barreras a Considerar */}
        <Card className="border border-border">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5" />
                Barreras Principales a Abordar
              </CardTitle>
              <Badge variant="secondary">Top 5</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stats.barrerasPrincipales.map((barrera, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-foreground">
                      {barrera.nombre}
                    </span>
                    <Badge variant="secondary" className="text-xs">
                      {barrera.porcentajeAlto}% crítico
                    </Badge>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-red-500 h-2 rounded-full"
                      style={{ width: `${(barrera.intensidadPromedio / 4) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Factores Motivadores */}
        <Card className="border border-border">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Factores que Motivan a los Moradores
              </CardTitle>
              <Badge variant="secondary" className="bg-green-100 dark:bg-green-900/30">Top 5</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stats.factoresMotivadoresPrincipales.map((factor, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-foreground">
                      {factor.nombre}
                    </span>
                    <Badge variant="secondary" className="text-xs bg-green-100 dark:bg-green-900/30">
                      {factor.porcentajeMuyImportante}% prioritario
                    </Badge>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full"
                      style={{ width: `${(factor.importanciaPromedio / 5) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recomendaciones Estratégicas */}
        <Card className="border border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 dark:border-blue-900">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-900 dark:text-blue-100">
              <Lightbulb className="h-5 w-5" />
              Recomendaciones Estratégicas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-3 p-3 bg-white dark:bg-gray-900 rounded-lg border border-blue-200 dark:border-blue-800">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-500 text-white text-xs font-bold mt-0.5">
                  1
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">Comunicación Clara y Transparente</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {stats.barrerasPrincipales[0].porcentajeAlto}% considera la falta de información como barrera crítica. 
                    Priorice campañas informativas detalladas sobre beneficios, procesos y garantías.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-white dark:bg-gray-900 rounded-lg border border-blue-200 dark:border-blue-800">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-500 text-white text-xs font-bold mt-0.5">
                  2
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">Enfocarse en Estabilidad Económica</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    El {stats.factoresMotivadoresPrincipales[0].porcentajeMuyImportante}% prioriza mejorar ingresos. 
                    Diseñe propuestas que demuestren claramente los beneficios económicos a corto y mediano plazo.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-white dark:bg-gray-900 rounded-lg border border-blue-200 dark:border-blue-800">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-500 text-white text-xs font-bold mt-0.5">
                  3
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">Aprovechar Ventana de Decisión</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {stats.distribucionTiempoDecision.menosSeisMeses} moradores pueden decidir en menos de 6 meses. 
                    Establezca un plan de acompañamiento intensivo para este grupo objetivo.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-white dark:bg-gray-900 rounded-lg border border-blue-200 dark:border-blue-800">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-500 text-white text-xs font-bold mt-0.5">
                  4
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">Construir Confianza Gradual</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    La desconfianza es alta ({stats.barrerasPrincipales[1].porcentajeAlto}%). 
                    Considere empezar con grupos pequeños de 2-3 vecinos cercanos que ya tienen confianza mutua.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  )
}
