import type { UserRole } from "./types"

// ─── Sidebar Navigation per Role ────────────────────────────────
// IMPORTANTE: Cada rol tiene rutas completamente separadas para evitar conflictos
export const sidebarNav: Record<UserRole, { label: string; href: string; icon: string; badge?: number }[]> = {
  morador: [
    { label: "Dashboard", href: "/morador/dashboard", icon: "LayoutDashboard" },
    { label: "Mis Predios", href: "/morador/predios", icon: "Building2" },
    { label: "Caracterización", href: "/morador/caracterizacion", icon: "ClipboardList" },
    { label: "Mapa Social", href: "/morador/mapa", icon: "Map" },
    { label: "Mi Perfil", href: "/morador/perfil", icon: "User" },
    { label: "Configuración", href: "/morador/configuracion", icon: "Settings" },
  ],
  empresario: [
    { label: "Dashboard", href: "/empresario/dashboard", icon: "LayoutDashboard" },
    { label: "Búsqueda", href: "/empresario/busqueda", icon: "Map" },
    { label: "Escenarios", href: "/empresario/escenarios", icon: "FolderOpen" },
    { label: "Oportunidades", href: "/empresario/oportunidades", icon: "Building2" },
    { label: "Mi Perfil", href: "/empresario/perfil", icon: "User" },
    { label: "Configuración", href: "/empresario/configuracion", icon: "Settings" },
  ],
  sdp: [
    { label: "Dashboard", href: "/sdp/dashboard", icon: "LayoutDashboard" },
    { label: "Usuarios", href: "/sdp/usuarios", icon: "Users" },
    { label: "Escenarios", href: "/sdp/escenarios", icon: "FolderOpen", badge: 2 },
    { label: "Reportes", href: "/sdp/reportes", icon: "ClipboardList" },
    { label: "Mi Perfil", href: "/sdp/perfil", icon: "User" },
    { label: "Configuración", href: "/sdp/configuracion", icon: "Settings" },
  ],
}

// ─── Status Labels & Colors ─────────────────────────────────────
export const statusLabels: Record<string, { label: string; className: string }> = {
  registrado: { label: "Registrado", className: "bg-muted text-muted-foreground" },
  en_revision: { label: "En Revision", className: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400" },
  verificado: { label: "Verificado", className: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400" },
  rechazado: { label: "Rechazado", className: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400" },
  borrador: { label: "Borrador", className: "bg-muted text-muted-foreground" },
  aprobado: { label: "Aprobado", className: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400" },
  activo: { label: "Activo", className: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400" },
  inactivo: { label: "Inactivo", className: "bg-muted text-muted-foreground" },
  pendiente: { label: "Pendiente", className: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400" },
  suspendido: { label: "Suspendido", className: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400" },
}

// ─── Intention Colors ───────────────────────────────────────────
export const intentionConfig: Record<string, { label: string; className: string; dotColor: string }> = {
  permanecer: { label: "Permanecer", className: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400", dotColor: "bg-blue-500" },
  asociarse: { label: "Asociarse", className: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400", dotColor: "bg-green-500" },
  vender: { label: "Vender", className: "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400", dotColor: "bg-orange-500" },
  no_definido: { label: "No Definido", className: "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400", dotColor: "bg-gray-500" },
}

// ─── Role Colors ────────────────────────────────────────────────
export const roleConfig: Record<UserRole, { label: string; className: string; accentColor: string }> = {
  morador: { label: "Morador", className: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400", accentColor: "text-blue-600" },
  empresario: { label: "Empresario", className: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400", accentColor: "text-green-600" },
  sdp: { label: "SDP Admin", className: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400", accentColor: "text-red-600" },
}

// ─── Ownership Labels ───────────────────────────────────────────
export const ownershipLabels: Record<string, string> = {
  propietario: "Propietario",
  poseedor: "Poseedor",
  tenedor: "Tenedor",
}

// ─── Risk Colors ────────────────────────────────────────────────
export const riskConfig: Record<string, { label: string; className: string }> = {
  bajo: { label: "Bajo", className: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400" },
  medio: { label: "Medio", className: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400" },
  alto: { label: "Alto", className: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400" },
}

// ─── Document Types ─────────────────────────────────────────────
export const documentTypes = [
  { value: "CC", label: "Cedula de Ciudadania" },
  { value: "CE", label: "Cedula de Extranjeria" },
  { value: "NIT", label: "NIT" },
  { value: "TI", label: "Tarjeta de Identidad" },
  { value: "PP", label: "Pasaporte" },
]

// ─── Project Types ──────────────────────────────────────────────
export const projectTypes = [
  "Renovacion Urbana",
  "Desarrollo Comercial",
  "Vivienda de Interes Social",
  "Industrial Sostenible",
  "Equipamiento Comunitario",
  "Espacio Publico",
]

// ─── Plazo Options ──────────────────────────────────────────────
export const plazoOptions = [
  "6 meses",
  "12 meses",
  "18 meses",
  "24 meses",
  "36 meses",
  "48 meses",
]

// ─── Localidades ────────────────────────────────────────────────
export const localidades = [
  "San Cristobal",
  "Usme",
  "Ciudad Bolivar",
  "Rafael Uribe Uribe",
  "Tunjuelito",
  "Bosa",
]
