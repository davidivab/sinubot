"use client"

import { HelpCircle, Info } from "lucide-react"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface FormulaTooltipProps {
  indice: "ICS" | "CJ" | "TM" | "BL"
  valor: number
  datos?: {
    familias?: number
    temoresPromedio?: number
    antiguedadAnios?: number
    saneamientos?: number
    litigios?: number
    areaTotal?: number
    densidadObjetivo?: number
    precioM2?: number
    accesibilidad?: number
    servicios?: number
    normativa?: number
  }
}

const formulas = {
  ICS: {
    nombre: "Índice de Complejidad Social",
    formula: "ICS = (familias × 0.3) + (temores_promedio × 0.4) + (antigüedad_años / 10 × 0.3)",
    descripcion: "Mide la complejidad social del englobe considerando cantidad de familias, temores declarados y arraigo histórico.",
    fuente: "SINUPOT + Formulario de Caracterización",
    rango: "0-100 (Escalado)",
    interpretacion: {
      bajo: "0-33: Baja complejidad - Proceso de concertación ágil",
      medio: "34-66: Complejidad media - Requiere mediación institucional",
      alto: "67-100: Alta complejidad - Priorizar acompañamiento SDP"
    }
  },
  CJ: {
    nombre: "Complejidad Jurídica",
    formula: "CJ = (saneamientos_pendientes × 0.4) + (litigios_activos × 0.6)",
    descripcion: "Evalúa obstáculos legales que podrían retrasar o impedir la asociatividad predial.",
    fuente: "Catastro Distrital + Registro SDP",
    rango: "0-100 (Escalado)",
    interpretacion: {
      bajo: "0-33: Sin litigios mayores - Trámite expedito",
      medio: "34-66: Saneamientos menores - Revisión jurídica necesaria",
      alto: "67-100: Litigios complejos - Requiere intervención legal especializada"
    }
  },
  TM: {
    nombre: "Tamaño de Mercado",
    formula: "TM = área_total × densidad_objetivo × precio_m2_promedio",
    descripcion: "Estima el potencial económico del desarrollo urbano basado en normativa POT y precios de mercado.",
    fuente: "POT ZIDA + Lonja de Propiedad Raíz",
    rango: "USD Millones",
    interpretacion: {
      bajo: "< $5M: Proyecto micro - Empresas locales",
      medio: "$5M-$15M: Proyecto mediano - Desarrolladores regionales",
      alto: "> $15M: Proyecto macro - Inversionistas institucionales"
    }
  },
  BL: {
    nombre: "Bondad Locativa",
    formula: "BL = (accesibilidad × 0.3) + (servicios_públicos × 0.4) + (normativa_favorable × 0.3)",
    descripcion: "Evalúa las condiciones del entorno que favorecen el desarrollo urbano sostenible.",
    fuente: "ArcGIS Enterprise + POT + IDU",
    rango: "0-100 (Escalado)",
    interpretacion: {
      bajo: "0-33: Baja accesibilidad - Requiere inversión en infraestructura",
      medio: "34-66: Condiciones aceptables - Proyecto viable",
      alto: "67-100: Alta conectividad - Ideal para desarrollo inmediato"
    }
  }
}

export function FormulaTooltip({ indice, valor, datos }: FormulaTooltipProps) {
  const config = formulas[indice]
  
  const nivel = valor <= 33 ? "bajo" : valor <= 66 ? "medio" : "alto"
  const colorClasses = {
    bajo: "text-green-700 dark:text-green-400",
    medio: "text-yellow-700 dark:text-yellow-400",
    alto: "text-red-700 dark:text-red-400"
  }

  const calcularPasos = () => {
    if (!datos) return null

    switch (indice) {
      case "ICS":
        if (!datos.familias || !datos.temoresPromedio || !datos.antiguedadAnios) return null
        const componente1 = datos.familias * 0.3
        const componente2 = datos.temoresPromedio * 0.4
        const componente3 = (datos.antiguedadAnios / 10) * 0.3
        const sumaRaw = componente1 + componente2 + componente3
        return (
          <div className="space-y-2 text-xs font-mono">
            <p className="text-muted-foreground">Datos de entrada:</p>
            <ul className="ml-3 space-y-1 text-xs">
              <li>• Familias afectadas: <strong>{datos.familias}</strong> (SINUPOT)</li>
              <li>• Temores promedio: <strong>{datos.temoresPromedio.toFixed(1)}/5</strong> (Caracterización)</li>
              <li>• Antigüedad: <strong>{datos.antiguedadAnios} años</strong> (Registro)</li>
            </ul>
            <p className="text-muted-foreground mt-3">Cálculo paso a paso:</p>
            <ul className="ml-3 space-y-1">
              <li>{datos.familias} × 0.3 = <strong>{componente1.toFixed(2)}</strong></li>
              <li>{datos.temoresPromedio.toFixed(1)} × 0.4 = <strong>{componente2.toFixed(2)}</strong></li>
              <li>({datos.antiguedadAnios} ÷ 10) × 0.3 = <strong>{componente3.toFixed(2)}</strong></li>
            </ul>
            <p className="mt-2 border-t border-border pt-2">
              Suma bruta: <strong>{sumaRaw.toFixed(2)}</strong> → Escalado a: <strong className={colorClasses[nivel]}>{valor}/100</strong>
            </p>
          </div>
        )
      
      case "CJ":
        if (!datos.saneamientos || !datos.litigios) return null
        const cj1 = datos.saneamientos * 0.4
        const cj2 = datos.litigios * 0.6
        const sumaCJ = cj1 + cj2
        return (
          <div className="space-y-2 text-xs font-mono">
            <p className="text-muted-foreground">Datos de entrada:</p>
            <ul className="ml-3 space-y-1 text-xs">
              <li>• Saneamientos pendientes: <strong>{datos.saneamientos}</strong> (Catastro)</li>
              <li>• Litigios activos: <strong>{datos.litigios}</strong> (SDP)</li>
            </ul>
            <p className="text-muted-foreground mt-3">Cálculo:</p>
            <ul className="ml-3 space-y-1">
              <li>{datos.saneamientos} × 0.4 = <strong>{cj1.toFixed(2)}</strong></li>
              <li>{datos.litigios} × 0.6 = <strong>{cj2.toFixed(2)}</strong></li>
            </ul>
            <p className="mt-2 border-t border-border pt-2">
              Resultado escalado: <strong className={colorClasses[nivel]}>{valor}/100</strong>
            </p>
          </div>
        )
      
      case "TM":
        if (!datos.areaTotal || !datos.densidadObjetivo || !datos.precioM2) return null
        const tmResultado = datos.areaTotal * datos.densidadObjetivo * datos.precioM2
        return (
          <div className="space-y-2 text-xs font-mono">
            <p className="text-muted-foreground">Datos de entrada:</p>
            <ul className="ml-3 space-y-1 text-xs">
              <li>• Área total: <strong>{datos.areaTotal.toLocaleString()} m²</strong> (GIS)</li>
              <li>• Densidad objetivo: <strong>{datos.densidadObjetivo.toFixed(2)} viv/ha</strong> (POT)</li>
              <li>• Precio promedio: <strong>${datos.precioM2.toLocaleString()}/m²</strong> (Lonja)</li>
            </ul>
            <p className="text-muted-foreground mt-3">Cálculo:</p>
            <p className="ml-3">
              {datos.areaTotal.toLocaleString()} × {datos.densidadObjetivo.toFixed(2)} × ${datos.precioM2.toLocaleString()}
            </p>
            <p className="mt-2 border-t border-border pt-2">
              Tamaño de mercado: <strong className="text-green-700 dark:text-green-400">${(tmResultado / 1000000).toFixed(2)}M USD</strong>
            </p>
          </div>
        )
      
      case "BL":
        if (!datos.accesibilidad || !datos.servicios || !datos.normativa) return null
        const bl1 = datos.accesibilidad * 0.3
        const bl2 = datos.servicios * 0.4
        const bl3 = datos.normativa * 0.3
        const sumaBL = bl1 + bl2 + bl3
        return (
          <div className="space-y-2 text-xs font-mono">
            <p className="text-muted-foreground">Datos de entrada:</p>
            <ul className="ml-3 space-y-1 text-xs">
              <li>• Accesibilidad: <strong>{datos.accesibilidad}/100</strong> (ArcGIS)</li>
              <li>• Servicios públicos: <strong>{datos.servicios}/100</strong> (IDU)</li>
              <li>• Normativa favorable: <strong>{datos.normativa}/100</strong> (POT)</li>
            </ul>
            <p className="text-muted-foreground mt-3">Cálculo:</p>
            <ul className="ml-3 space-y-1">
              <li>{datos.accesibilidad} × 0.3 = <strong>{bl1.toFixed(2)}</strong></li>
              <li>{datos.servicios} × 0.4 = <strong>{bl2.toFixed(2)}</strong></li>
              <li>{datos.normativa} × 0.3 = <strong>{bl3.toFixed(2)}</strong></li>
            </ul>
            <p className="mt-2 border-t border-border pt-2">
              Bondad Locativa: <strong className={colorClasses[nivel]}>{valor}/100</strong>
            </p>
          </div>
        )
    }
  }

  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <TooltipTrigger asChild>
          <button className="inline-flex items-center gap-1 rounded-md  px-2 py-0.5 hover:bg-muted transition-colors">
            <span className="font-mono text-sm font-bold">{indice}</span>
            <HelpCircle className="h-3.5 w-3.5 text-muted-foreground" />
          </button>
        </TooltipTrigger>
        <TooltipContent side="right" className="max-w-md p-4 border border-border shadow-lg">
          <div className="space-y-3">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h4 className="font-semibold text-sm text-foreground">{config.nombre}</h4>
                <Badge variant="outline" className="mt-1 text-[10px]">
                  {config.fuente}
                </Badge>
              </div>
              <div className="text-right">
                <div className="font-mono text-2xl font-bold tabular-nums">
                  {indice === "TM" ? `$${valor.toFixed(1)}M` : valor}
                </div>
                <div className="text-[10px] text-muted-foreground uppercase tracking-wide">
                  {config.rango}
                </div>
              </div>
            </div>

            <p className="text-xs text-muted-foreground leading-relaxed">
              {config.descripcion}
            </p>

            <div className="rounded-md bg-muted/50 p-3">
              <p className="text-xs font-medium text-foreground mb-1.5">Fórmula:</p>
              <code className="text-[11px] font-mono text-primary">
                {config.formula}
              </code>
            </div>

            {calcularPasos()}

            <div className="border-t border-border pt-3 mt-3">
              <p className="text-xs font-medium text-foreground mb-1.5">Interpretación:</p>
              <ul className="space-y-1 text-[11px]">
                <li className="text-green-700 dark:text-green-400">✓ {config.interpretacion.bajo}</li>
                <li className="text-yellow-700 dark:text-yellow-400">⚠ {config.interpretacion.medio}</li>
                <li className="text-red-700 dark:text-red-400">⨂ {config.interpretacion.alto}</li>
              </ul>
            </div>

            <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground pt-2 border-t border-border/50">
              <Info className="h-3 w-3" />
              <span>Transparencia algorítmica total: fórmula auditable</span>
            </div>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

// Componente para mostrar todos los índices juntos
interface IndicesCardProps {
  indices: {
    ics: number
    cj: number
    tm: number
    bl: number
  }
  datos?: {
    familias?: number
    temoresPromedio?: number
    antiguedadAnios?: number
    saneamientos?: number
    litigios?: number
    areaTotal?: number
    densidadObjetivo?: number
    precioM2?: number
    accesibilidad?: number
    servicios?: number
    normativa?: number
  }
}

export function IndicesCard({ indices, datos }: IndicesCardProps) {
  return (
    <Card className="border border-border">
      <CardContent className="p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-sm text-foreground">Índices Calculados</h3>
          <Badge variant="secondary" className="text-[10px]">
            Transparencia Algorítmica
          </Badge>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <FormulaTooltip
              indice="ICS"
              valor={indices.ics}
              datos={datos}
            />
            <p className="text-xs text-muted-foreground">Complejidad Social</p>
          </div>
          <div className="space-y-1">
            <FormulaTooltip
              indice="CJ"
              valor={indices.cj}
              datos={datos}
            />
            <p className="text-xs text-muted-foreground">Complejidad Jurídica</p>
          </div>
          <div className="space-y-1">
            <FormulaTooltip
              indice="TM"
              valor={indices.tm}
              datos={datos}
            />
            <p className="text-xs text-muted-foreground">Tamaño de Mercado</p>
          </div>
          <div className="space-y-1">
            <FormulaTooltip
              indice="BL"
              valor={indices.bl}
              datos={datos}
            />
            <p className="text-xs text-muted-foreground">Bondad Locativa</p>
          </div>
        </div>
        <div className="mt-4 pt-3 border-t border-border/50 flex items-start gap-2 text-[11px] text-muted-foreground">
          <Info className="h-3.5 w-3.5 mt-0.5 flex-shrink-0" />
          <p>
            Pasa el cursor sobre cada índice para ver la fórmula completa, fuentes de datos y proceso de cálculo. 
            Una auditoría independiente puede replicar estos resultados.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
