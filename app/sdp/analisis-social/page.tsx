"use client"

import { AppShell } from "@/components/skymatch/app-shell"
import { BreadcrumbsNav } from "@/components/skymatch/breadcrumbs-nav"
import { BarChart } from "@/components/skymatch/bar-chart"
import { PieChart } from "@/components/skymatch/pie-chart"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Users, 
  TrendingUp, 
  AlertCircle, 
  CheckCircle,
  BarChart3,
  PieChart as PieChartIcon
} from "lucide-react"
import { socialCharacterizationStats } from "@/lib/social-characterization-data"

export default function AnalisisSocialPage() {
  const stats = socialCharacterizationStats

  return (
    <AppShell
      userName="Admin SDP"
      userRole="sdp"
      notificationsCount={3}
    >
      <div className="space-y-6">
        <BreadcrumbsNav
          items={[
            { label: "Dashboard", href: "/sdp/dashboard" },
            { label: "Análisis Social" },
          ]}
        />

        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">
            Análisis de Caracterización Social
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Resultados consolidados de las encuestas de caracterización social en Puerta de Teja
          </p>
        </div>

        {/* Métricas Principales */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="border border-border">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-500/10">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Total Encuestas</p>
                  <p className="text-2xl font-bold text-foreground">
                    {stats.totalEncuestas}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-border">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-500/10">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Interés en Asociación</p>
                  <p className="text-2xl font-bold text-foreground">
                    {stats.interesAsociacion.siMeInteresa + stats.interesAsociacion.talVez}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    ({((stats.interesAsociacion.siMeInteresa + stats.interesAsociacion.talVez) / stats.totalEncuestas * 100).toFixed(0)}%)
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-border">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-amber-500/10">
                  <TrendingUp className="h-6 w-6 text-amber-600" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Promedio Edad</p>
                  <p className="text-2xl font-bold text-foreground">
                    {stats.promedioEdad.toFixed(0)}
                  </p>
                  <p className="text-xs text-muted-foreground">años</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-border">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-500/10">
                  <AlertCircle className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Zona Directa AEDA</p>
                  <p className="text-2xl font-bold text-foreground">
                    {stats.distribucionZona.directa}
                  </p>
                  <p className="text-xs text-muted-foreground">predios</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Distribución por Zona */}
          <PieChart
            title="Distribución por Zona de Influencia"
            data={[
              {
                label: "Zona Directa",
                value: stats.distribucionZona.directa,
                color: "bg-blue-500",
              },
              {
                label: "Zona Indirecta",
                value: stats.distribucionZona.indirecta,
                color: "bg-green-500",
              },
              {
                label: "No Aplica",
                value: stats.distribucionZona.noAplica,
                color: "bg-gray-500",
              },
            ]}
          />

          {/* Intención Principal */}
          <PieChart
            title="Intención respecto al Predio"
            data={[
              {
                label: "Quedarse",
                value: stats.distribucionIntencion.quedarse,
                color: "bg-green-500",
              },
              {
                label: "Vender",
                value: stats.distribucionIntencion.vender,
                color: "bg-amber-500",
              },
              {
                label: "No responde",
                value: stats.distribucionIntencion.noResponde,
                color: "bg-gray-500",
              },
            ]}
          />
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Interés en Asociación */}
          <BarChart
            title="Nivel de Interés en Asociación"
            data={[
              {
                label: "Sí me interesa",
                value: stats.interesAsociacion.siMeInteresa,
                color: "bg-green-500",
              },
              {
                label: "Tal vez, si beneficios claros",
                value: stats.interesAsociacion.talVez,
                color: "bg-blue-500",
              },
              {
                label: "Me es indiferente",
                value: stats.interesAsociacion.indiferente,
                color: "bg-gray-500",
              },
              {
                label: "No me interesa",
                value: stats.interesAsociacion.noMeInteresa,
                color: "bg-red-500",
              },
            ]}
          />

          {/* Tiempo de Decisión */}
          <BarChart
            title="Tiempo Estimado para Tomar Decisión"
            data={[
              {
                label: "Menos de 6 meses",
                value: stats.distribucionTiempoDecision.menosSeisMeses,
                color: "bg-green-500",
              },
              {
                label: "6 meses a 1 año",
                value: stats.distribucionTiempoDecision.seisADoce,
                color: "bg-blue-500",
              },
              {
                label: "1 a 3 años",
                value: stats.distribucionTiempoDecision.unoATres,
                color: "bg-amber-500",
              },
              {
                label: "Más de 3 años",
                value: stats.distribucionTiempoDecision.masTres,
                color: "bg-purple-500",
              },
              {
                label: "No lo sé",
                value: stats.distribucionTiempoDecision.noSabe,
                color: "bg-gray-500",
              },
            ]}
          />
        </div>

        {/* Barreras Principales */}
        <Card className="border border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5" />
              Principales Barreras Percibidas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stats.barrerasPrincipales.map((barrera, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-foreground">
                      {barrera.nombre}
                    </span>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="text-xs">
                        {barrera.porcentajeAlto}% alta intensidad
                      </Badge>
                      <span className="text-sm text-muted-foreground">
                        {barrera.intensidadPromedio.toFixed(1)}/4.0
                      </span>
                    </div>
                  </div>
                  <div className="w-full bg-muted rounded-full h-3">
                    <div
                      className="bg-red-500 h-3 rounded-full transition-all"
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
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Principales Factores Motivadores
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stats.factoresMotivadoresPrincipales.map((factor, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-foreground">
                      {factor.nombre}
                    </span>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="text-xs bg-green-500/10 text-green-700">
                        {factor.porcentajeMuyImportante}% muy importante
                      </Badge>
                      <span className="text-sm text-muted-foreground">
                        {factor.importanciaPromedio.toFixed(1)}/5.0
                      </span>
                    </div>
                  </div>
                  <div className="w-full bg-muted rounded-full h-3">
                    <div
                      className="bg-green-500 h-3 rounded-full transition-all"
                      style={{ width: `${(factor.importanciaPromedio / 5) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Percepción del Entorno */}
        <Card className="border border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Percepción del Entorno Aeroportuario
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 border border-border rounded-lg">
                  <p className="text-xs text-muted-foreground mb-1">Ruido</p>
                  <p className="text-2xl font-bold text-foreground">
                    {stats.percepcionPromedioEntorno.ruido.toFixed(1)}
                  </p>
                  <p className="text-xs text-muted-foreground">/5.0</p>
                </div>
                <div className="text-center p-4 border border-border rounded-lg">
                  <p className="text-xs text-muted-foreground mb-1">Contaminación</p>
                  <p className="text-2xl font-bold text-foreground">
                    {stats.percepcionPromedioEntorno.contaminacion.toFixed(1)}
                  </p>
                  <p className="text-xs text-muted-foreground">/5.0</p>
                </div>
                <div className="text-center p-4 border border-border rounded-lg">
                  <p className="text-xs text-muted-foreground mb-1">Tráfico</p>
                  <p className="text-2xl font-bold text-foreground">
                    {stats.percepcionPromedioEntorno.trafico.toFixed(1)}
                  </p>
                  <p className="text-xs text-muted-foreground">/5.0</p>
                </div>
                <div className="text-center p-4 border border-border rounded-lg">
                  <p className="text-xs text-muted-foreground mb-1">Tráfico Carga</p>
                  <p className="text-2xl font-bold text-foreground">
                    {stats.percepcionPromedioEntorno.traficoCarga.toFixed(1)}
                  </p>
                  <p className="text-xs text-muted-foreground">/5.0</p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground text-center">
                Escala: 1 = Muy negativo, 5 = Muy positivo
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Insights y Recomendaciones */}
        <Card className="border border-border bg-blue-500/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-700">
              <PieChartIcon className="h-5 w-5" />
              Insights Clave
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3 text-sm text-foreground">
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">•</span>
                <span>
                  <strong>Alta disposición condicionada:</strong> El {((stats.interesAsociacion.talVez / stats.totalEncuestas) * 100).toFixed(0)}% de moradores está interesado en asociarse si los beneficios son claros, lo que representa una oportunidad significativa.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">•</span>
                <span>
                  <strong>Barrera principal:</strong> La falta de información es la barrera más crítica ({stats.barrerasPrincipales[0].porcentajeAlto}% alta intensidad), sugiriendo la necesidad de campañas de socialización.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">•</span>
                <span>
                  <strong>Motivador clave:</strong> Mejorar ingresos y estabilidad económica es prioridad para el {stats.factoresMotivadoresPrincipales[0].porcentajeMuyImportante}% de encuestados.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">•</span>
                <span>
                  <strong>Percepción negativa del entorno:</strong> La calificación promedio del entorno aeroportuario es baja ({stats.percepcionPromedioEntorno.contaminacion.toFixed(1)}/5.0), lo que puede influir positivamente en la disposición al cambio.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">•</span>
                <span>
                  <strong>Ventana de oportunidad:</strong> El {((stats.distribucionTiempoDecision.menosSeisMeses / stats.totalEncuestas) * 100).toFixed(0)}% puede tomar decisiones en menos de 6 meses con información adecuada.
                </span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  )
}
