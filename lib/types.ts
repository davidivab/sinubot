// ─── User & Auth ───────────────────────────────────────────────
export type UserRole = "morador" | "empresario" | "sdp"

export type UserStatus = "activo" | "inactivo" | "pendiente" | "suspendido"

export interface User {
  id: string
  nombre: string
  apellido: string
  email: string
  telefono: string
  tipoDocumento: "CC" | "CE" | "NIT" | "TI" | "PP"
  numeroDocumento: string
  role: UserRole
  status: UserStatus
  avatar?: string
  fechaRegistro: string
  prediosCount?: number
}

// ─── Properties ────────────────────────────────────────────────
export type OwnershipType = "propietario" | "poseedor" | "tenedor"

export type IntentionType =
  | "permanecer"
  | "asociarse"
  | "vender"
  | "no_definido"

export type PropertyStatus =
  | "registrado"
  | "en_revision"
  | "verificado"
  | "rechazado"

export interface Property {
  id: string
  chipCode: string
  direccion: string
  localidad: string
  barrio: string
  areaMt2: number
  ownershipType: OwnershipType
  intention: IntentionType
  status: PropertyStatus
  moradorId: string
  moradorNombre: string
  fechaRegistro: string
  riskLevel?: "bajo" | "medio" | "alto"
  caracterizacionCompleta: boolean
  latitude?: number
  longitude?: number
}

// ─── Social Characterization ───────────────────────────────────
export interface LikertQuestion {
  id: string
  label: string
  description: string
  value: number | null
}

export interface CharacterizationForm {
  propertyId: string
  respuestas: LikertQuestion[]
  observaciones: string
  completado: boolean
  fechaCompletado?: string
}

// ─── Scenarios (Empresario) ────────────────────────────────────
export type ScenarioStatus =
  | "borrador"
  | "en_revision"
  | "aprobado"
  | "rechazado"

export interface Scenario {
  id: string
  nombre: string
  descripcion: string
  tipoProyecto: string
  inversionEstimada: number
  plazo: string
  fechaObjetivo: string
  empresarioId: string
  empresaNombre: string
  status: ScenarioStatus
  prediosSeleccionados: string[]
  areaTotal: number
  icsPromedio: number
  fechaCreacion: string
  fechaActualizacion: string
}

// ─── ICS Result ────────────────────────────────────────────────
export interface ICSValidation {
  icsScore: number
  contiguidadCheck: boolean
  tipologiaCheck: boolean
  litigiosidadCheck: boolean
  overall: "aprobado" | "observaciones" | "rechazado"
}

// ─── Activity Feed ─────────────────────────────────────────────
export type ActivityType =
  | "registro_predio"
  | "caracterizacion"
  | "oferta_recibida"
  | "escenario_creado"
  | "escenario_aprobado"
  | "escenario_rechazado"
  | "usuario_registrado"
  | "alerta_social"

export interface ActivityItem {
  id: string
  type: ActivityType
  title: string
  description: string
  timestamp: string
  userId?: string
  relatedId?: string
}

// ─── Stats ─────────────────────────────────────────────────────
export interface StatCardData {
  label: string
  value: string | number
  icon: string
  trend?: { value: number; direction: "up" | "down" }
  variant?: "default" | "primary" | "success" | "warning" | "info"
}

// ─── Chat (SinuBot) ───────────────────────────────────────────
export interface ChatMessage {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: string
  quickActions?: string[]
}

// ─── Nav ───────────────────────────────────────────────────────
export interface NavItem {
  label: string
  href: string
  icon: string
  badge?: number
}

// ─── Normative Validation ─────────────────────────────────────
export interface NormativeCheck {
  id: string
  label: string
  description: string
  status: "aprobado" | "observacion" | "rechazado" | "pendiente"
  detail?: string
}
