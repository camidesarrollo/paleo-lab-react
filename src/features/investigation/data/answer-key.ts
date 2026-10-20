import { normalizeName } from '../domain/normalize'
import type { Revelation } from '../domain/types'

// Clave de respuestas: separada del catálogo público.
//
// Los componentes NUNCA importan este archivo: solo lo usan el dominio (para validar)
// y el hook useInvestigation (para pedir la revelación cuando el caso terminó).
// En una app solo de navegador esto evita revelaciones accidentales en la interfaz,
// pero no protege contra alguien que inspeccione el código (para eso hará falta un servidor).

const answerKey: Record<string, Revelation> = {
  'case-001': {
    pokemonId: 140,
    name: 'Kabuto',
    acceptedNames: ['kabuto'],
    genus: 'Pokémon Marisco',
    summary: 'Restaurado a partir del Fósil Domo. Vivió en playas hace 300 millones de años y evoluciona en Kabutops.',
  },
  'case-002': {
    pokemonId: 131,
    name: 'Lapras',
    acceptedNames: ['lapras'],
    genus: 'Pokémon Transporte',
    summary: 'Inteligente y amable, transporta personas por el mar. Su población casi desaparece por la caza.',
  },
  'case-003': {
    pokemonId: 94,
    name: 'Gengar',
    acceptedNames: ['gengar'],
    genus: 'Pokémon Sombra',
    summary: 'Se esconde en las sombras y baja la temperatura del entorno. Evoluciona de Haunter por intercambio.',
  },
}

export function isCorrectHypothesis(caseId: string, hypothesis: string): boolean {
  const answer = answerKey[caseId]
  if (!answer) return false
  const normalized = normalizeName(hypothesis)
  return answer.acceptedNames.some((name) => normalizeName(name) === normalized)
}

export function getRevelation(caseId: string): Revelation | undefined {
  return answerKey[caseId]
}
