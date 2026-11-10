import '@testing-library/jest-dom/vitest'
import { afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'

afterEach(() => {
  cleanup()
  // Zera o tema guardado e a classe do <html> entre os testes
  localStorage.clear()
  document.documentElement.classList.remove('dark')
})