import { useReducer } from 'react'
import { getRevelation } from '../data/answer-key'
import { attemptsLeft, createInvestigation, nextLockedFragment, reduceInvestigation } from '../domain/investigation'
import { computeScore, rankResurrection } from '../domain/scoring'
import type { InvestigationCase } from '../domain/types'

// Conecta las reglas puras del dominio con React.
// useReducer guarda el estado y usa reduceInvestigation para cada acción;
// todo lo demás (puntaje, intentos, clasificación) se CALCULA a partir del estado en cada render.
export function useInvestigation(caseData: InvestigationCase) {
  const [state, dispatch] = useReducer(
    (current: Parameters<typeof reduceInvestigation>[1], action: Parameters<typeof reduceInvestigation>[2]) =>
      reduceInvestigation(caseData, current, action),
    caseData,
    createInvestigation,
  )

  const score = computeScore(caseData, state)
  const finished = state.status !== 'in-progress'

  return {
    state,
    score,
    finished,
    attemptsLeft: attemptsLeft(caseData, state),
    nextFragment: nextLockedFragment(caseData, state),
    rank: rankResurrection(score, state),
    lastEvent: state.events.at(-1),
    // La identidad solo sale del dominio cuando el caso terminó
    revelation: finished ? getRevelation(caseData.id) : undefined,
    revealNext: () => dispatch({ type: 'reveal-next' }),
    submit: (hypothesis: string) => dispatch({ type: 'submit', hypothesis }),
    reset: () => dispatch({ type: 'reset' }),
  }
}
