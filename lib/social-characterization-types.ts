// ─── Tipos para Caracterización Social Avanzada ────────────────────────

export type LikertScale5 =
  | "Muy negativo"
  | "Negativo"
  | "Ni positivo ni negativo"
  | "Positivo"
  | "Muy positivo"

export type LikertAgreement5 =
  | "Muy en desacuerdo"
  | "En desacuerdo"
  | "Ni acuerdo ni desacuerdo"
  | "De acuerdo"
  | "Muy de acuerdo"

export type LikertIntensity4 = "Nada" | "Poco" | "Algo" | "Mucho"

export type LikertImportance5 =
  | "Nada importante"
  | "Poco importante"
  | "Algo importante"
  | "Importante"
  | "Muy importante"

export type IntentionType =
  | "Quedarme en mi predio (no vender)"
  | "Vender y mudarme a otro lugar"
  | "No responde"

export type SellingPreference =
  | "Comprar en el mismo sector"
  | "Comprar algo en otro sector"
  | "No responde"

export type AssociationInterest =
  | "Sí me interesa"
  | "Tal vez, si los beneficios están claros"
  | "Me es indiferente"
  | "No me interesa"
  | "Otra opción"
  | "No responde"

export type DecisionTimeframe =
  | "Menos de 6 meses"
  | "Entre 6 meses y 1 año"
  | "Entre 1 y 3 años"
  | "Más de 3 años"
  | "No lo sé"

export type GroupSizePreference =
  | "Me sentiría incómodo asociándome con otros vecinos"
  | "Solo con 2 o 3 vecinos cercanos"
  | "Con la manzana completa"
  | "Con varias manzanas del barrio"
  | "Con un grupo definido por la Alcaldía / operador urbano"
  | "No lo sé"
  | "No responde"

export type PropertyActivityLastYear =
  | "Ninguna"
  | "Ha recibido ofertas de compra (o el dueño)"
  | "Ha pensado vender (o el dueño)"
  | "Ambas"
  | "Otra opción"
  | "No responde"

export type AssociationProbability =
  | "Muy probable"
  | "Algo probable"
  | "Poco probable"
  | "Nada probable"
  | "No sabe"
  | "No responde"

// ─── Interfaz Principal de Caracterización Social ──────────────────────

export interface SocialCharacterization {
  id: string
  encuestadoId: string
  propertyId: string
  fecha: string

  // Sección 0: Información básica
  zonaAeroportuaria: "Directa" | "Indirecta" | "No Aplica"
  tratamientoUrbanistico: "Renovación" | "Consolidación" | "No Aplica"
  inAEDAF: boolean

  // Sección 1: Identificación
  nombreMorador: string
  tipoMorador: "Propietario" | "Arrendatario" | "Poseedor" | "Tenedor"
  direccion: string
  edad: number | null

  // Sección 2: Percepción del entorno
  percepcionEntorno: {
    ruido: LikertScale5 | "No responde"
    contaminacionAire: LikertScale5 | "No responde"
    traficoVehicular: LikertScale5 | "No responde"
    traficoCarga: LikertScale5 | "No responde"
  }

  // Sección 2.2: Oportunidades
  oportunidades: {
    empleo: LikertAgreement5 | "No responde"
    valorPredios: LikertAgreement5 | "No responde"
    beneficiosGenerales: LikertAgreement5 | "No responde"
  }

  // Sección 2.3 y 2.4: Actividad del predio
  actividadPredioUltimoAno: PropertyActivityLastYear
  probabilidadAsociacionVecinos: AssociationProbability

  // Sección 3: Disposición a la asociatividad
  disposicion: {
    intencionPrincipal: IntentionType
    preferenciaSiVende: SellingPreference | ""
    interesAsociacion: AssociationInterest
    aspectosAtractivos: {
      infoClaraBeneficios: boolean
      mayorGananciaVentaConjunta: boolean
      ingresosPeriodicos: boolean
      pagoUnico: boolean
      opcionesReubicacion: boolean
      otraOpcion: string
    }
    tiempoDecision: DecisionTimeframe
    tamanoGrupo: GroupSizePreference
  }

  // Sección 3.7: Herramientas digitales
  herramientasDigitales: {
    comodidadUso: LikertAgreement5 | "No responde"
    preferenciaApoyo: LikertAgreement5 | "No responde"
    necesidadReunionesPresenciales: LikertAgreement5 | "No responde"
  }

  // Sección 4.1: Barreras percibidas
  barreras: {
    faltaInformacion: LikertIntensity4 | "No responde"
    desconfianza: LikertIntensity4 | "No responde"
    faltaClaridad: LikertIntensity4 | "No responde"
    problemasLegales: LikertIntensity4 | "No responde"
    esperaMasUnAno: LikertIntensity4 | "No responde"
    opinionFamilia: LikertIntensity4 | "No responde"
    dependenciaIngresos: LikertIntensity4 | "No responde"
    relacionesSociales: LikertIntensity4 | "No responde"
    faltaExperiencia: LikertIntensity4 | "No responde"
    temorReubicacion: LikertIntensity4 | "No responde"
    temorProyectoNoRentable: LikertIntensity4 | "No responde"
  }

  // Sección 4.2: Factores motivadores
  factoresMotivadores: {
    cercania Red Apoyo: LikertImportance5 | "No responde"
    mejorarIngresos: LikertImportance5 | "No responde"
    mejorarCalidadVivienda: LikertImportance5 | "No responde"
    claridadJuridica: LikertImportance5 | "No responde"
    actividadesEconomicas: LikertImportance5 | "No responde"
  }

  // Sección 4.3: Actitudes frente al cambio
  actitudesCambio: {
    prefiereNadaCambie: LikertAgreement5 | "No responde"
    dispuestoConsiderarCambios: LikertAgreement5 | "No responde"
    preocupaDecisionSinResidentes: LikertAgreement5 | "No responde"
    deseaParticipar: LikertAgreement5 | "No responde"
  }

  // Preferencias declaradas (Fichas A/B)
  preferenciasDeclaradas: {
    ficha1: "A" | "B" | "No responde"
    ficha2: "A" | "B" | "No responde"
    ficha3: "A" | "B" | "No responde"
    ficha4: "A" | "B" | "No responde"
    ficha5: "A" | "B" | "No responde"
    ficha6: "A" | "B" | "No responde"
  }
}

// ─── Estadísticas Agregadas ────────────────────────────────────────────

export interface SocialCharacterizationStats {
  totalEncuestas: number
  promedioEdad: number

  // Distribución por zona
  distribucionZona: {
    directa: number
    indirecta: number
    noAplica: number
  }

  // Distribución por intención
  distribucionIntencion: {
    quedarse: number
    vender: number
    noResponde: number
  }

  // Interés en asociación
  interesAsociacion: {
    siMeInteresa: number
    talVez: number
    indiferente: number
    noMeInteresa: number
    otraOpcion: number
  }

  // Barreras principales (top 5)
  barrerasPrincipales: Array<{
    nombre: string
    intensidadPromedio: number
    porcentajeAlto: number
  }>

  // Factores motivadores principales (top 5)
  factoresMotivadoresPrincipales: Array<{
    nombre: string
    importanciaPromedio: number
    porcentajeMuyImportante: number
  }>

  // Percepción del entorno
  percepcionPromedioEntorno: {
    ruido: number
    contaminacion: number
    trafico: number
    traficoCarga: number
  }

  // Tiempo de decisión
  distribucionTiempoDecision: {
    menosSeisMeses: number
    seisADoce: number
    unoATres: number
    masTres: number
    noSabe: number
  }
}
