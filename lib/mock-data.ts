import type {
  User,
  Property,
  Scenario,
  ActivityItem,
  StatCardData,
  ChatMessage,
  LikertQuestion,
  NormativeCheck,
} from "./types"

// ─── Users ──────────────────────────────────────────────────────
export const mockUsers: User[] = [
  {
    id: "u1",
    nombre: "Carlos",
    apellido: "Ramirez",
    email: "carlos.ramirez@email.com",
    telefono: "+57 310 456 7890",
    tipoDocumento: "CC",
    numeroDocumento: "1020304050",
    role: "morador",
    status: "activo",
    fechaRegistro: "2025-08-15",
    prediosCount: 3,
  },
  {
    id: "u2",
    nombre: "Maria",
    apellido: "Gonzalez",
    email: "maria.gonzalez@email.com",
    telefono: "+57 311 234 5678",
    tipoDocumento: "CC",
    numeroDocumento: "1030405060",
    role: "morador",
    status: "activo",
    fechaRegistro: "2025-09-02",
    prediosCount: 1,
  },
  {
    id: "u3",
    nombre: "Juan",
    apellido: "Torres",
    email: "juan.torres@email.com",
    telefono: "+57 312 345 6789",
    tipoDocumento: "CC",
    numeroDocumento: "1040506070",
    role: "morador",
    status: "pendiente",
    fechaRegistro: "2025-10-20",
    prediosCount: 2,
  },
  {
    id: "u4",
    nombre: "Ana",
    apellido: "Martinez",
    email: "ana.martinez@constructora.com",
    telefono: "+57 315 678 9012",
    tipoDocumento: "NIT",
    numeroDocumento: "900123456",
    role: "empresario",
    status: "activo",
    fechaRegistro: "2025-07-10",
  },
  {
    id: "u5",
    nombre: "Pedro",
    apellido: "Lopez",
    email: "pedro.lopez@sdp.gov.co",
    telefono: "+57 316 789 0123",
    tipoDocumento: "CC",
    numeroDocumento: "1050607080",
    role: "sdp",
    status: "activo",
    fechaRegistro: "2025-06-01",
  },
  {
    id: "u6",
    nombre: "Laura",
    apellido: "Diaz",
    email: "laura.diaz@email.com",
    telefono: "+57 317 890 1234",
    tipoDocumento: "CC",
    numeroDocumento: "1060708090",
    role: "morador",
    status: "inactivo",
    fechaRegistro: "2025-05-15",
    prediosCount: 0,
  },
  {
    id: "u7",
    nombre: "Santiago",
    apellido: "Rojas",
    email: "santiago@inmobiliaria.co",
    telefono: "+57 318 901 2345",
    tipoDocumento: "NIT",
    numeroDocumento: "900654321",
    role: "empresario",
    status: "activo",
    fechaRegistro: "2025-08-22",
  },
]

export const currentMorador = mockUsers[0]
export const currentEmpresario = mockUsers[3]
export const currentSDP = mockUsers[4]

// ─── Properties ─────────────────────────────────────────────────
export const mockProperties: Property[] = [
  {
    id: "p1",
    chipCode: "AAA-0001-BCDE",
    direccion: "Calle 45 #12-34, San Cristobal",
    localidad: "San Cristobal",
    barrio: "La Victoria",
    areaMt2: 120,
    ownershipType: "propietario",
    intention: "asociarse",
    status: "verificado",
    moradorId: "u1",
    moradorNombre: "Carlos Ramirez",
    fechaRegistro: "2025-08-20",
    riskLevel: "bajo",
    caracterizacionCompleta: true,
    latitude: 4.557,
    longitude: -74.089,
  },
  {
    id: "p2",
    chipCode: "AAA-0002-FGHI",
    direccion: "Carrera 8 #50-21, Usme",
    localidad: "Usme",
    barrio: "Monte Blanco",
    areaMt2: 85,
    ownershipType: "poseedor",
    intention: "permanecer",
    status: "verificado",
    moradorId: "u1",
    moradorNombre: "Carlos Ramirez",
    fechaRegistro: "2025-09-05",
    riskLevel: "medio",
    caracterizacionCompleta: true,
    latitude: 4.48,
    longitude: -74.11,
  },
  {
    id: "p3",
    chipCode: "AAA-0003-JKLM",
    direccion: "Transversal 3 #22-15, Ciudad Bolivar",
    localidad: "Ciudad Bolivar",
    barrio: "Arborizadora Alta",
    areaMt2: 200,
    ownershipType: "propietario",
    intention: "vender",
    status: "en_revision",
    moradorId: "u1",
    moradorNombre: "Carlos Ramirez",
    fechaRegistro: "2025-10-12",
    riskLevel: "bajo",
    caracterizacionCompleta: false,
    latitude: 4.564,
    longitude: -74.155,
  },
  {
    id: "p4",
    chipCode: "AAA-0004-NOPQ",
    direccion: "Calle 60 Sur #15-08, Rafael Uribe",
    localidad: "Rafael Uribe Uribe",
    barrio: "Diana Turbay",
    areaMt2: 150,
    ownershipType: "tenedor",
    intention: "asociarse",
    status: "registrado",
    moradorId: "u2",
    moradorNombre: "Maria Gonzalez",
    fechaRegistro: "2025-09-10",
    riskLevel: "alto",
    caracterizacionCompleta: false,
    latitude: 4.55,
    longitude: -74.12,
  },
  {
    id: "p5",
    chipCode: "AAA-0005-RSTU",
    direccion: "Diagonal 40 #8-45, San Cristobal",
    localidad: "San Cristobal",
    barrio: "Los Libertadores",
    areaMt2: 95,
    ownershipType: "propietario",
    intention: "no_definido",
    status: "verificado",
    moradorId: "u3",
    moradorNombre: "Juan Torres",
    fechaRegistro: "2025-10-25",
    riskLevel: "medio",
    caracterizacionCompleta: true,
    latitude: 4.56,
    longitude: -74.09,
  },
  {
    id: "p6",
    chipCode: "AAA-0006-VWXY",
    direccion: "Carrera 10 #55-30, Usme",
    localidad: "Usme",
    barrio: "Gran Yomasa",
    areaMt2: 175,
    ownershipType: "propietario",
    intention: "asociarse",
    status: "verificado",
    moradorId: "u3",
    moradorNombre: "Juan Torres",
    fechaRegistro: "2025-11-01",
    riskLevel: "bajo",
    caracterizacionCompleta: true,
    latitude: 4.49,
    longitude: -74.13,
  },
]

// ─── Scenarios ──────────────────────────────────────────────────
export const mockScenarios: Scenario[] = [
  {
    id: "s1",
    nombre: "Renovacion Urbana La Victoria",
    descripcion:
      "Proyecto de renovacion urbana integral para el sector La Victoria en San Cristobal, contemplando vivienda de interes social y espacio publico.",
    tipoProyecto: "Renovacion Urbana",
    inversionEstimada: 15000000000,
    plazo: "24 meses",
    fechaObjetivo: "2027-06-30",
    empresarioId: "u4",
    empresaNombre: "Constructora Martinez & Asociados",
    status: "en_revision",
    prediosSeleccionados: ["p1", "p2", "p5"],
    areaTotal: 300,
    icsPromedio: 0.72,
    fechaCreacion: "2025-10-01",
    fechaActualizacion: "2025-11-15",
  },
  {
    id: "s2",
    nombre: "Centro Comercial Monte Blanco",
    descripcion:
      "Desarrollo de centro comercial con enfoque comunitario, integrando comercio local y servicios para la comunidad de Usme.",
    tipoProyecto: "Desarrollo Comercial",
    inversionEstimada: 8000000000,
    plazo: "18 meses",
    fechaObjetivo: "2027-03-15",
    empresarioId: "u7",
    empresaNombre: "Inmobiliaria Rojas S.A.S.",
    status: "borrador",
    prediosSeleccionados: ["p6"],
    areaTotal: 175,
    icsPromedio: 0.58,
    fechaCreacion: "2025-11-10",
    fechaActualizacion: "2025-11-10",
  },
  {
    id: "s3",
    nombre: "Parque Industrial Arborizadora",
    descripcion:
      "Parque industrial sostenible con enfoque en microempresas y economia circular para el sector de Ciudad Bolivar.",
    tipoProyecto: "Industrial Sostenible",
    inversionEstimada: 22000000000,
    plazo: "36 meses",
    fechaObjetivo: "2028-01-01",
    empresarioId: "u4",
    empresaNombre: "Constructora Martinez & Asociados",
    status: "aprobado",
    prediosSeleccionados: ["p3", "p4"],
    areaTotal: 350,
    icsPromedio: 0.85,
    fechaCreacion: "2025-08-15",
    fechaActualizacion: "2025-10-30",
  },
]

// ─── Activity Items ──────────────────────────────────────────────
export const mockActivity: ActivityItem[] = [
  {
    id: "a1",
    type: "registro_predio",
    title: "Predio registrado",
    description: "Se registro el predio AAA-0003-JKLM en Ciudad Bolivar",
    timestamp: "2025-10-12T14:30:00",
    userId: "u1",
  },
  {
    id: "a2",
    type: "caracterizacion",
    title: "Caracterizacion completada",
    description: "Carlos Ramirez completo la caracterizacion del predio AAA-0001-BCDE",
    timestamp: "2025-10-10T09:15:00",
    userId: "u1",
  },
  {
    id: "a3",
    type: "oferta_recibida",
    title: "Nueva oferta recibida",
    description: "El predio AAA-0001-BCDE recibio una oferta del escenario Renovacion Urbana",
    timestamp: "2025-10-08T16:45:00",
    userId: "u1",
  },
  {
    id: "a4",
    type: "escenario_creado",
    title: "Escenario creado",
    description: "Ana Martinez creo el escenario Renovacion Urbana La Victoria",
    timestamp: "2025-10-01T10:00:00",
    userId: "u4",
  },
  {
    id: "a5",
    type: "escenario_aprobado",
    title: "Escenario aprobado",
    description: "SDP aprobo el escenario Parque Industrial Arborizadora",
    timestamp: "2025-10-30T11:20:00",
    userId: "u5",
  },
  {
    id: "a6",
    type: "usuario_registrado",
    title: "Nuevo morador registrado",
    description: "Juan Torres se registro como morador en la plataforma",
    timestamp: "2025-10-20T08:00:00",
    userId: "u3",
  },
  {
    id: "a7",
    type: "alerta_social",
    title: "Alerta de vulnerabilidad",
    description: "Predio AAA-0004-NOPQ presenta alto nivel de riesgo social",
    timestamp: "2025-09-15T13:30:00",
  },
]

// ─── Stat Cards ──────────────────────────────────────────────────
export const moradorStats: StatCardData[] = [
  { label: "Predios Registrados", value: 3, icon: "Building2", variant: "primary", trend: { value: 1, direction: "up" } },
  { label: "Area Total", value: "405 m\u00b2", icon: "Ruler", variant: "info" },
  { label: "Ofertas Recibidas", value: 1, icon: "Mail", variant: "success", trend: { value: 1, direction: "up" } },
  { label: "Caracterizacion", value: "67%", icon: "ClipboardCheck", variant: "warning" },
]

export const empresarioStats: StatCardData[] = [
  { label: "Escenarios Activos", value: 2, icon: "FolderOpen", variant: "primary" },
  { label: "Predios Disponibles", value: 156, icon: "MapPin", variant: "info" },
  { label: "ICS Promedio", value: "0.72", icon: "BarChart3", variant: "success" },
  { label: "Inversion Total", value: "$23.000M", icon: "DollarSign", variant: "warning" },
]

export const sdpStats: StatCardData[] = [
  { label: "Total Moradores", value: "1,247", icon: "Users", variant: "primary", trend: { value: 12, direction: "up" } },
  { label: "Total Predios", value: 834, icon: "Building2", variant: "info", trend: { value: 8, direction: "up" } },
  { label: "Escenarios Activos", value: 5, icon: "FolderOpen", variant: "success" },
  { label: "Alertas Sociales", value: 3, icon: "AlertTriangle", variant: "warning" },
]

// ─── Likert Questions ────────────────────────────────────────────
export const likertQuestions: LikertQuestion[] = [
  { id: "q1", label: "Arraigo territorial", description: "Nivel de vinculo emocional y cultural con el territorio donde se ubica su predio", value: null },
  { id: "q2", label: "Dependencia economica", description: "Grado en que su sustento economico depende de actividades realizadas en el predio", value: null },
  { id: "q3", label: "Redes sociales y comunitarias", description: "Fortaleza de sus vinculos con vecinos, organizaciones y comunidad del sector", value: null },
  { id: "q4", label: "Vulnerabilidad socioeconomica", description: "Nivel de exposicion a riesgos sociales, economicos o ambientales", value: null },
  { id: "q5", label: "Acceso a servicios basicos", description: "Disponibilidad y calidad de servicios publicos (agua, luz, gas, alcantarillado)", value: null },
  { id: "q6", label: "Participacion comunitaria", description: "Frecuencia e intensidad de participacion en actividades y decisiones comunitarias", value: null },
]

// ─── Normative Checks ────────────────────────────────────────────
export const mockNormativeChecks: NormativeCheck[] = [
  { id: "n1", label: "Indice de Construccion Sostenible (ICS)", description: "Score ICS dentro del rango permitido", status: "aprobado", detail: "ICS: 0.72 (minimo: 0.60)" },
  { id: "n2", label: "Contiguidad de predios", description: "Los predios seleccionados son contiguos o adyacentes", status: "aprobado", detail: "3 de 3 predios contiguos" },
  { id: "n3", label: "Tipologia compatible", description: "Uso del suelo compatible con el tipo de proyecto", status: "observacion", detail: "Verificar uso complementario en predio AAA-0002" },
  { id: "n4", label: "Litigiosidad", description: "Ausencia de litigios o conflictos legales sobre los predios", status: "aprobado", detail: "Sin litigios reportados" },
]

// ─── SinuBot Messages ────────────────────────────────────────────
export const sinuBotGreeting: ChatMessage = {
  id: "sb1",
  role: "assistant",
  content: "Hola! Soy SinuBot, tu asistente virtual de SkyMatch. Estoy aqui para ayudarte con cualquier pregunta sobre la plataforma ZIDA. Como puedo ayudarte hoy?",
  timestamp: new Date().toISOString(),
  quickActions: [
    "Como registro mi predio?",
    "Que es la caracterizacion social?",
    "Como funciona el mapa?",
    "Quiero hablar con soporte",
  ],
}

// ─── Map Markers ────────────────────────────────────────────────
// Deterministic positions for the satellite map, plus lot dimensions
export const mapMarkers: {
  id: string
  label: string
  intention: string
  x: number
  y: number
  lotWidth: number
  lotHeight: number
  areaMt2: number
}[] = [
  { id: "p1", label: "AAA-0001-BCDE", intention: "asociarse",   x: 35, y: 28, lotWidth: 4.2, lotHeight: 3.0, areaMt2: 120 },
  { id: "p2", label: "AAA-0002-FGHI", intention: "permanecer",  x: 52, y: 45, lotWidth: 3.5, lotHeight: 2.8, areaMt2: 85  },
  { id: "p3", label: "AAA-0003-JKLM", intention: "vender",      x: 25, y: 60, lotWidth: 5.5, lotHeight: 4.2, areaMt2: 200 },
  { id: "p4", label: "AAA-0004-NOPQ", intention: "asociarse",   x: 68, y: 35, lotWidth: 4.8, lotHeight: 3.5, areaMt2: 150 },
  { id: "p5", label: "AAA-0005-RSTU", intention: "no_definido", x: 42, y: 72, lotWidth: 3.8, lotHeight: 2.9, areaMt2: 95  },
  { id: "p6", label: "AAA-0006-VWXY", intention: "asociarse",   x: 75, y: 58, lotWidth: 5.0, lotHeight: 4.0, areaMt2: 175 },
]

// ─── Social Characterization Data ──────────────────────────────
export { mockSocialCharacterizations, socialCharacterizationStats } from "./social-characterization-data"

