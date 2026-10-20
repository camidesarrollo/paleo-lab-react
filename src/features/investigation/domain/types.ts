// Modelo del sistema de expedientes forenses (requerimientos.md, secciones 3 y 10).
// Estos tipos NO dependen de React ni de PokeAPI: son las reglas del juego.

export type EvidenceType =
  | 'biometry'
  | 'elemental-signature'
  | 'moves'
  | 'habitat'
  | 'evolution'
  | 'cry'
  | 'anomaly'

export type Reading = {
  label: string
  value: string
}

export type EvidenceFragment = {
  id: string
  type: EvidenceType
  // Letra visible: A, B, C, D
  code: string
  title: string
  clue: string
  readings: Reading[]
  // Puntos que se descuentan al analizarlo (0 = disponible desde el inicio)
  unlockCost: number
  order: number
  optional?: boolean
}

// Lo que el jugador puede ver de un caso. No incluye el nombre ni nada que lo revele.
export type InvestigationCase = {
  id: string
  number: string
  difficulty: 1 | 2 | 3 | 4 | 5
  fragments: EvidenceFragment[]
  maxAttempts: number
}

// Identidad real de la especie. Solo se entrega a la interfaz cuando el caso terminó.
export type Revelation = {
  pokemonId: number
  name: string
  acceptedNames: string[]
  genus: string
  summary: string
}

export type InvestigationStatus = 'in-progress' | 'solved' | 'failed'

export type ResurrectionRank = 'perfect' | 'stable' | 'assisted' | 'failed'

export type InvestigationEvent = {
  id: number
  kind: 'start' | 'reveal' | 'miss' | 'repeat' | 'solved' | 'failed'
  message: string
}

// Progreso del jugador en un caso. El puntaje NO se guarda: se calcula a partir de esto.
export type InvestigationState = {
  caseId: string
  status: InvestigationStatus
  revealedFragmentIds: string[]
  attemptsUsed: number
  // Hipótesis incorrectas ya normalizadas, para no cobrar dos veces la misma
  wrongGuesses: string[]
  events: InvestigationEvent[]
}
