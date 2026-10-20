import { isCorrectHypothesis } from '../data/answer-key'
import { normalizeName } from './normalize'
import { SCORING } from './scoring'
import type { EvidenceFragment, InvestigationCase, InvestigationEvent, InvestigationState } from './types'

// Todas las reglas de una investigación, como FUNCIONES PURAS:
// reciben el estado actual y devuelven uno nuevo, sin tocar React, la red ni el DOM.
// Por eso se pueden probar con tests sin abrir el navegador.

export type InvestigationAction =
  | { type: 'reveal-next' }
  | { type: 'submit'; hypothesis: string }
  | { type: 'reset' }

function addEvent(state: InvestigationState, kind: InvestigationEvent['kind'], message: string): InvestigationEvent[] {
  return [...state.events, { id: state.events.length + 1, kind, message }]
}

function sortedFragments(caseData: InvestigationCase): EvidenceFragment[] {
  return [...caseData.fragments].sort((a, b) => a.order - b.order)
}

// Estado inicial: solo los fragmentos gratuitos (coste 0) están revelados
export function createInvestigation(caseData: InvestigationCase): InvestigationState {
  return {
    caseId: caseData.id,
    status: 'in-progress',
    revealedFragmentIds: caseData.fragments.filter((fragment) => fragment.unlockCost === 0).map((fragment) => fragment.id),
    attemptsUsed: 0,
    wrongGuesses: [],
    events: [{ id: 1, kind: 'start', message: 'Registro biológico parcialmente dañado recuperado.' }],
  }
}

// El siguiente fragmento que se puede analizar (se desbloquean en orden)
export function nextLockedFragment(caseData: InvestigationCase, state: InvestigationState): EvidenceFragment | undefined {
  return sortedFragments(caseData).find((fragment) => !state.revealedFragmentIds.includes(fragment.id))
}

export function attemptsLeft(caseData: InvestigationCase, state: InvestigationState): number {
  return caseData.maxAttempts - state.attemptsUsed
}

export function reduceInvestigation(
  caseData: InvestigationCase,
  state: InvestigationState,
  action: InvestigationAction,
): InvestigationState {
  if (action.type === 'reset') return createInvestigation(caseData)

  // Un caso terminado no admite más acciones
  if (state.status !== 'in-progress') return state

  if (action.type === 'reveal-next') {
    const fragment = nextLockedFragment(caseData, state)
    if (!fragment) return state
    return {
      ...state,
      revealedFragmentIds: [...state.revealedFragmentIds, fragment.id],
      events: addEvent(state, 'reveal', `Fragmento ${fragment.code} analizado: ${fragment.title} (-${fragment.unlockCost} pts).`),
    }
  }

  // action.type === 'submit'
  const hypothesis = action.hypothesis.trim()
  const normalized = normalizeName(hypothesis)
  if (!normalized) return state

  // Repetir una hipótesis ya descartada no gasta intentos: el error fue informativo, no se cobra dos veces
  if (state.wrongGuesses.includes(normalized)) {
    return { ...state, events: addEvent(state, 'repeat', `"${hypothesis}" ya fue descartada. No se consumió un intento.`) }
  }

  const attemptsUsed = state.attemptsUsed + 1

  if (isCorrectHypothesis(caseData.id, hypothesis)) {
    return {
      ...state,
      status: 'solved',
      attemptsUsed,
      events: addEvent(state, 'solved', 'Identidad confirmada. Iniciando resurrección.'),
    }
  }

  const missed: InvestigationState = {
    ...state,
    attemptsUsed,
    wrongGuesses: [...state.wrongGuesses, normalized],
    events: addEvent(state, 'miss', `"${hypothesis}" no coincide con la firma biológica (-${SCORING.wrongGuessPenalty} pts).`),
  }

  if (attemptsUsed < caseData.maxAttempts) return missed

  // Sin intentos: el caso se pierde, pero se revelan todas las pistas para aprender de él
  return {
    ...missed,
    status: 'failed',
    revealedFragmentIds: caseData.fragments.map((fragment) => fragment.id),
    events: addEvent(missed, 'failed', 'Intentos agotados. El registro se degradó, pero las evidencias quedan disponibles.'),
  }
}
