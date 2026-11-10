import { describe, it, expect } from 'vitest'
import { normalizeText } from './normalizeText'

describe('normalizeText', () => {
  it('converte o texto para minúsculas', () => {
    expect(normalizeText('CLEMENTINE')).toBe('clementine')
  })

  it('remove acentos', () => {
    expect(normalizeText('José Ângelo')).toBe('jose angelo')
  })

  it('remove espaços no começo e no fim', () => {
    expect(normalizeText('  ana  ')).toBe('ana')
  })
})