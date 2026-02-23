"use client"

import { Shield, Eye, EyeOff, Lock, UserX } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface DataProtectionBadgeProps {
  level: "public" | "anonymized" | "protected" | "encrypted"
  className?: string
}

const protectionLevels = {
  public: {
    label: "Público",
    color: "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400",
    icon: <Eye className="h-3 w-3" />,
    description: "Información pública sin datos personales",
  },
  anonymized: {
    label: "Anonimizado",
    color: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
    icon: <EyeOff className="h-3 w-3" />,
    description: "Datos agregados sin identificadores personales",
  },
  protected: {
    label: "Protegido",
    color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
    icon: <Shield className="h-3 w-3" />,
    description: "Acceso restringido por rol (Ley 1581/2012)",
  },
  encrypted: {
    label: "Cifrado",
    color: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
    icon: <Lock className="h-3 w-3" />,
    description: "Cifrado AES-256 + TLS 1.3",
  },
}

export function DataProtectionBadge({ level, className }: DataProtectionBadgeProps) {
  const config = protectionLevels[level]

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Badge variant="secondary" className={`text-[10px] gap-1 ${config.color} ${className || ""}`}>
            {config.icon}
            {config.label}
          </Badge>
        </TooltipTrigger>
        <TooltipContent>
          <p className="text-xs">{config.description}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

// Componente para mostrar advertencia de protección anti-presión
interface AntiPressureWarningProps {
  predioId: string
  ofertasRecibidas: number
  ofertasBloqueadas: number
  limiteOfertas: number
}

export function AntiPressureWarning({
  predioId,
  ofertasRecibidas,
  ofertasBloqueadas,
  limiteOfertas,
}: AntiPressureWarningProps) {
  const porcentaje = (ofertasRecibidas / limiteOfertas) * 100
  const cercaLimite = porcentaje >= 80

  return (
    <Card className={`border ${cercaLimite ? "border-yellow-500 bg-yellow-50 dark:bg-yellow-900/10" : "border-border"}`}>
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className={`flex h-10 w-10 items-center justify-center rounded-full ${cercaLimite ? "bg-yellow-100 dark:bg-yellow-900/30" : "bg-muted"}`}>
            <Shield className={`h-5 w-5 ${cercaLimite ? "text-yellow-700 dark:text-yellow-400" : "text-muted-foreground"}`} />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-foreground">Protección Anti-Presión</p>
            <div className="mt-2 space-y-1 text-xs text-muted-foreground">
              <p>• Ofertas recibidas este año: <strong className="text-foreground">{ofertasRecibidas}/{limiteOfertas}</strong></p>
              <p>• Ofertas bloqueadas por ti: <strong className="text-foreground">{ofertasBloqueadas}</strong></p>
            </div>
            {cercaLimite && (
              <p className="mt-2 text-xs text-yellow-700 dark:text-yellow-400">
                ⚠ Te quedan {limiteOfertas - ofertasRecibidas} ofertas antes de alcanzar el límite anual.
              </p>
            )}
          </div>
        </div>
        <div className="mt-3 pt-3 border-t border-border/50 text-[11px] text-muted-foreground">
          <p>
            Puedes bloquear ofertas de empresarios específicos si te sientes presionado. 
            El sistema limita a **máximo {limiteOfertas} ofertas por año** para evitar spam.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

// Componente para mostrar datos ocultos (para empresarios)
interface HiddenDataPlaceholderProps {
  dataType: "nombre" | "cedula" | "telefono" | "email" | "direccion_exacta"
  reason?: string
}

export function HiddenDataPlaceholder({ dataType, reason }: HiddenDataPlaceholderProps) {
  const labels = {
    nombre: "Nombre completo",
    cedula: "Número de documento",
    telefono: "Teléfono",
    email: "Correo electrónico",
    direccion_exacta: "Dirección exacta",
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="inline-flex items-center gap-1.5 rounded-md bg-muted px-2 py-1 text-xs text-muted-foreground">
            <EyeOff className="h-3 w-3" />
            <span>[{labels[dataType]} oculto]</span>
          </div>
        </TooltipTrigger>
        <TooltipContent className="max-w-xs">
          <p className="text-xs">
            {reason || "Este dato está protegido por la Ley 1581/2012. Solo la SDP puede acceder a información personal de moradores."}
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

// Componente para panel de consentimiento (Ley 1581)
interface ConsentStatusProps {
  hasConsent: boolean
  consentDate?: string
  consentType: "caracterizacion" | "ofertas" | "datos_publicos"
}

export function ConsentStatus({ hasConsent, consentDate, consentType }: ConsentStatusProps) {
  const typeLabels = {
    caracterizacion: "Caracterización Social",
    ofertas: "Recepción de Ofertas",
    datos_publicos: "Datos Públicos en Mapa",
  }

  return (
    <div className="flex items-center justify-between rounded-lg border border-border p-3">
      <div className="flex items-center gap-2">
        <div className={`flex h-8 w-8 items-center justify-center rounded-full ${hasConsent ? "bg-green-100 dark:bg-green-900/30" : "bg-muted"}`}>
          {hasConsent ? (
            <Shield className="h-4 w-4 text-green-700 dark:text-green-400" />
          ) : (
            <Lock className="h-4 w-4 text-muted-foreground" />
          )}
        </div>
        <div>
          <p className="text-sm font-medium text-foreground">{typeLabels[consentType]}</p>
          {consentDate && (
            <p className="text-xs text-muted-foreground">
              Otorgado el {consentDate}
            </p>
          )}
        </div>
      </div>
      <Badge variant="secondary" className={`text-[10px] ${hasConsent ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400" : "bg-muted"}`}>
        {hasConsent ? "Activo" : "Pendiente"}
      </Badge>
    </div>
  )
}

// Componente para botón de bloquear empresario
interface BlockEmpresarioButtonProps {
  empresarioId: string
  empresarioName: string
  isBlocked: boolean
  onToggleBlock: (empresarioId: string) => void
}

export function BlockEmpresarioButton({
  empresarioId,
  empresarioName,
  isBlocked,
  onToggleBlock,
}: BlockEmpresarioButtonProps) {
  return (
    <Button
      variant={isBlocked ? "outline" : "destructive"}
      size="sm"
      onClick={() => onToggleBlock(empresarioId)}
      className="gap-1.5"
    >
      <UserX className="h-3.5 w-3.5" />
      {isBlocked ? "Desbloquear" : "Bloquear ofertas"}
    </Button>
  )
}
