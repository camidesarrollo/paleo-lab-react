import type { InvestigationCase, InvestigationState, ResurrectionRank } from './types'

// Fórmula determinista y fácil de explicar (requerimientos.md, sección 5):
// 100 puntos − coste de cada fragmento analizado − 20 por cada hipótesis fallida, mínimo 0.
export const SCORING = {
  base: 100,
  wrongGuessPenalty: 20,
  perfectThreshold: 80,
  stableThreshold: 50,
} as const

export function computeScore(caseData: InvestigationCase, state: InvestigationState): number {
  if (state.status === 'failed') return 0

  const fragmentCost = caseData.fragments
    .filter((fragment) => state.revealedFragmentIds.includes(fragment.id))
    .reduce((total, fragment) => total + fragment.unlockCost, 0)
  const errorCost = state.wrongGuesses.length * SCORING.wrongGuessPenalty

  return Math.max(0, SCORING.base - fragmentCost - errorCost)
}

// Clasificación de la resurrección:
// perfecta  → sin errores y puntaje alto
// estable   → puntaje medio
// asistida  → muchas ayudas o errores
export function rankResurrection(score: number, state: InvestigationState): ResurrectionRank {
  if (state.status === 'failed') return 'failed'
  if (score >= SCORING.perfectThreshold && state.wrongGuesses.length === 0) return 'perfect'
  if (score >= SCORING.stableThreshold) return 'stable'
  return 'assisted'
}
