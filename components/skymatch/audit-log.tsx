"use client"

import { Shield, Lock, Clock, User, FileCheck } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { format } from "date-fns"
import { es } from "date-fns/locale"

export interface AuditLogEntry {
  id: string
  timestamp: string
  userId: string
  userName: string
  userRole: "morador" | "empresario" | "sdp"
  action: string
  description: string
  entityType: "escenario" | "predio" | "caracterizacion" | "oferta"
  entityId: string
  hash: string // SHA-256
  ipAddress?: string
  metadata?: Record<string, any>
}

interface AuditLogProps {
  logs: AuditLogEntry[]
  showHash?: boolean
  compact?: boolean
}

export function AuditLog({ logs, showHash = true, compact = false }: AuditLogProps) {
  const getRoleColor = (role: string) => {
    switch (role) {
      case "sdp":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400"
      case "empresario":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
      case "morador":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const getActionIcon = (action: string) => {
    if (action.includes("crear") || action.includes("registr")) return <FileCheck className="h-4 w-4" />
    if (action.includes("modific") || action.includes("actualiz")) return <User className="h-4 w-4" />
    if (action.includes("aprobó") || action.includes("rechazó")) return <Shield className="h-4 w-4" />
    return <Clock className="h-4 w-4" />
  }

  if (compact) {
    return (
      <div className="space-y-2">
        {logs.map((log, index) => (
          <div key={log.id} className="flex items-start gap-3 text-sm">
            <div className="mt-0.5">{getActionIcon(log.action)}</div>
            <div className="flex-1">
              <p className="text-foreground font-medium">{log.description}</p>
              <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                <span>{log.userName}</span>
                <span>•</span>
                <span>{format(new Date(log.timestamp), "dd MMM yyyy, HH:mm", { locale: es })}</span>
              </div>
              {showHash && (
                <code className="block mt-1 font-mono text-[10px] text-muted-foreground truncate">
                  SHA-256: {log.hash}
                </code>
              )}
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <Card className="border border-border">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-semibold flex items-center gap-2">
            <Lock className="h-4 w-4" />
            Log de Auditoría
          </CardTitle>
          <Badge variant="outline" className="text-[10px]">
            {logs.length} {logs.length === 1 ? "registro" : "registros"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3 p-0">
        {logs.map((log, index) => (
          <div key={log.id}>
            <div className="px-5 py-3 hover:bg-muted/30 transition-colors">
              <div className="flex items-start gap-3">
                <div className="mt-1">{getActionIcon(log.action)}</div>
                <div className="flex-1 space-y-2">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-medium text-foreground">{log.description}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-muted-foreground">{log.userName}</span>
                        <Badge variant="secondary" className={`text-[10px] ${getRoleColor(log.userRole)}`}>
                          {log.userRole.toUpperCase()}
                        </Badge>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">
                        {format(new Date(log.timestamp), "dd MMM yyyy", { locale: es })}
                      </p>
                      <p className="text-xs text-muted-foreground font-mono">
                        {format(new Date(log.timestamp), "HH:mm:ss")}
                      </p>
                    </div>
                  </div>

                  {showHash && (
                    <div className="rounded-md bg-muted/50 p-2">
                      <div className="flex items-start gap-2">
                        <Shield className="h-3 w-3 mt-0.5 text-muted-foreground flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="text-[10px] text-muted-foreground mb-1">Hash SHA-256 (Inmutable):</p>
                          <code className="block font-mono text-[10px] text-foreground break-all">
                            {log.hash}
                          </code>
                        </div>
                      </div>
                    </div>
                  )}

                  {log.metadata && Object.keys(log.metadata).length > 0 && (
                    <details className="text-xs">
                      <summary className="cursor-pointer text-muted-foreground hover:text-foreground">
                        Ver metadatos
                      </summary>
                      <div className="mt-2 rounded-md bg-muted/30 p-2">
                        <pre className="font-mono text-[10px] overflow-x-auto">
                          {JSON.stringify(log.metadata, null, 2)}
                        </pre>
                      </div>
                    </details>
                  )}
                </div>
              </div>
            </div>
            {index < logs.length - 1 && <Separator />}
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

// Función helper para generar hash SHA-256 (simulado en cliente)
export function generateAuditHash(data: {
  timestamp: string
  userId: string
  action: string
  entityId: string
}): string {
  // En producción, esto se haría en el backend con crypto real
  // Este es un simulador para el demo
  const str = JSON.stringify(data)
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = (hash << 5) - hash + char
    hash = hash & hash // Convert to 32bit integer
  }
  // Convertir a formato hexadecimal de 64 caracteres (simulando SHA-256)
  const baseHash = Math.abs(hash).toString(16).padStart(8, "0")
  return (baseHash + baseHash + baseHash + baseHash + baseHash + baseHash + baseHash + baseHash).slice(0, 64)
}

// Componente para mostrar verificación de integridad
interface AuditVerificationProps {
  totalLogs: number
  lastVerified: string
  integrityStatus: "verified" | "pending" | "warning"
}

export function AuditVerification({
  totalLogs,
  lastVerified,
  integrityStatus,
}: AuditVerificationProps) {
  const statusConfig = {
    verified: {
      label: "Verificado",
      color: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
      icon: "✓",
    },
    pending: {
      label: "Pendiente",
      color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
      icon: "⏳",
    },
    warning: {
      label: "Advertencia",
      color: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
      icon: "⚠",
    },
  }

  const config = statusConfig[integrityStatus]

  return (
    <Card className="border border-border bg-muted/20">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
              <Shield className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">Verificación de Integridad</p>
              <p className="text-xs text-muted-foreground">
                {totalLogs} {totalLogs === 1 ? "registro" : "registros"} auditables
              </p>
            </div>
          </div>
          <div className="text-right">
            <Badge variant="secondary" className={`text-[10px] ${config.color}`}>
              {config.icon} {config.label}
            </Badge>
            <p className="text-[10px] text-muted-foreground mt-1">
              Última verificación: {format(new Date(lastVerified), "dd/MM/yyyy HH:mm", { locale: es })}
            </p>
          </div>
        </div>
        <div className="mt-3 pt-3 border-t border-border/50 text-[11px] text-muted-foreground">
          <p>
            Los logs de auditoría son **inmutables** gracias a firmas SHA-256. Una auditoría independiente
            puede verificar la integridad de todos los cambios realizados en el sistema.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
