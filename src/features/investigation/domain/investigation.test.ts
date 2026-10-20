import { describe, expect, it } from 'vitest'
import { cases } from '../data/cases'
import { attemptsLeft, createInvestigation, nextLockedFragment, reduceInvestigation } from './investigation'
import type { InvestigationAction } from './investigation'
import { computeScore, rankResurrection } from './scoring'
import type { InvestigationState } from './types'

// case-001: fragmentos A (0), B (10), C (20), D (30) · 3 intentos · respuesta "kabuto"
const caseData = cases[0]

// Aplica varias acciones seguidas, como haría el jugador
function play(...actions: InvestigationAction[]): InvestigationState {
  return actions.reduce((state, action) => reduceInvestigation(caseData, state, action), createInvestigation(caseData))
}

const reveal: InvestigationAction = { type: 'reveal-next' }
const guess = (hypothesis: string): InvestigationAction => ({ type: 'submit', hypothesis })

describe('inicio del expediente', () => {
  it('empieza en curso, sin intentos usados y solo con el fragmento gratuito', () => {
    const state = createInvestigation(caseData)
    expect(state.status).toBe('in-progress')
    expect(state.attemptsUsed).toBe(0)
    expect(state.revealedFragmentIds).toEqual(['case-001-a'])
    expect(computeScore(caseData, state)).toBe(100)
  })

  it('el estado inicial no contiene la respuesta', () => {
    expect(JSON.stringify(createInvestigation(caseData)).toLowerCase()).not.toContain('kabuto')
  })
})

describe('pistas progresivas', () => {
  it('se desbloquean en orden y descuentan su coste', () => {
    const state = play(reveal, reveal)
    expect(state.revealedFragmentIds).toEqual(['case-001-a', 'case-001-b', 'case-001-c'])
    expect(computeScore(caseData, state)).toBe(100 - 10 - 20)
    expect(nextLockedFragment(caseData, state)?.code).toBe('D')
  })

  it('no hace nada cuando ya no quedan fragmentos', () => {
    const all = play(reveal, reveal, reveal)
    expect(play(reveal, reveal, reveal, reveal)).toEqual(all)
  })
})

describe('validación de hipótesis', () => {
  it('acepta la respuesta con mayúsculas, espacios y tildes', () => {
    expect(play(guess('  KÁBUTO ')).status).toBe('solved')
  })

  it('una hipótesis incorrecta gasta un intento y resta 20 puntos', () => {
    const state = play(guess('Omanyte'))
    expect(state.status).toBe('in-progress')
    expect(attemptsLeft(caseData, state)).toBe(2)
    expect(computeScore(caseData, state)).toBe(80)
  })

  it('repetir una hipótesis descartada no cobra otro intento', () => {
    const state = play(guess('Omanyte'), guess('omanyte '))
    expect(state.attemptsUsed).toBe(1)
    expect(state.events.at(-1)?.kind).toBe('repeat')
  })

  it('ignora una hipótesis vacía', () => {
    expect(play(guess('   '))).toEqual(createInvestigation(caseData))
  })

  it('al agotar los intentos el caso falla y revela todas las evidencias', () => {
    const state = play(guess('Omanyte'), guess('Aerodactyl'), guess('Kabutops'))
    expect(state.status).toBe('failed')
    expect(state.revealedFragmentIds).toHaveLength(4)
    expect(computeScore(caseData, state)).toBe(0)
  })

  it('un caso terminado no acepta más acciones', () => {
    const solved = play(guess('Kabuto'))
    expect(reduceInvestigation(caseData, solved, guess('Omanyte'))).toBe(solved)
    expect(reduceInvestigation(caseData, solved, reveal)).toBe(solved)
  })
})

describe('clasificación de la resurrección', () => {
  const rankOf = (state: InvestigationState) => rankResurrection(computeScore(caseData, state), state)

  it('perfecta: pocas pistas y sin errores', () => {
    expect(rankOf(play(reveal, guess('Kabuto')))).toBe('perfect') // 90 pts
  })

  it('estable: varias evidencias analizadas', () => {
    expect(rankOf(play(reveal, reveal, guess('Kabuto')))).toBe('stable') // 70 pts
  })

  it('un error impide la clasificación perfecta aunque el puntaje sea alto', () => {
    expect(rankOf(play(guess('Omanyte'), guess('Kabuto')))).toBe('stable') // 80 pts con 1 error
  })

  it('asistida: muchas ayudas', () => {
    expect(rankOf(play(reveal, reveal, reveal, guess('Kabuto')))).toBe('assisted') // 40 pts
  })

  it('fallida: sin intentos', () => {
    expect(rankOf(play(guess('a'), guess('b'), guess('c')))).toBe('failed')
  })
})
