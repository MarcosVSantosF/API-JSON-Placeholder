import { describe, it, expect } from 'vitest'
import { getInitials } from './getInitials'

describe('getInitials', () => {
  it('usa a primeira letra do primeiro e do último nome', () => {
    expect(getInitials('Clementine Bauch')).toBe('CB')
  })

  it('ignora títulos como "Mrs."', () => {
    expect(getInitials('Mrs. Dennis Schulist')).toBe('DS')
  })

  it('ignora sufixos de uma letra, como "V"', () => {
    expect(getInitials('Nicholas Runolfsdottir V')).toBe('NR')
  })

  it('funciona com um nome só', () => {
    expect(getInitials('Madonna')).toBe('M')
  })

  it('devolve "?" quando não há nome', () => {
    expect(getInitials('')).toBe('?')
  })
})