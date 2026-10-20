import { describe, expect, it } from 'vitest'
import { normalizeName } from './normalize'

describe('normalizeName', () => {
  it('ignora mayúsculas y espacios alrededor', () => {
    expect(normalizeName('  GENGAR ')).toBe('gengar')
  })

  it('quita tildes', () => {
    expect(normalizeName('Géngar')).toBe('gengar')
  })

  it('quita espacios internos, puntos, guiones y apóstrofos', () => {
    expect(normalizeName('Mr. Mime')).toBe('mrmime')
    expect(normalizeName('mr-mime')).toBe('mrmime')
    expect(normalizeName("Farfetch'd")).toBe('farfetchd')
  })

  it('convierte los símbolos de género igual que PokeAPI', () => {
    expect(normalizeName('Nidoran♀')).toBe(normalizeName('nidoran-f'))
    expect(normalizeName('Nidoran♂')).toBe(normalizeName('nidoran-m'))
  })

  it('devuelve vacío si solo hay símbolos', () => {
    expect(normalizeName('  ?! ')).toBe('')
  })
})
