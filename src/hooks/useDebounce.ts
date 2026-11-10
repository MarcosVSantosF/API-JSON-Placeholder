import { useEffect, useState } from 'react'

// Devolve o "value" só depois que ele parar de mudar por "delay" milissegundos.
// Útil na busca: em vez de filtrar a cada letra, espera a pessoa pausar a digitação.
export function useDebounce<T>(value: T, delay = 300): T {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    // Agenda a atualização para daqui a "delay" ms
    const timer = setTimeout(() => setDebouncedValue(value), delay)

    // Se o valor mudar antes do tempo acabar (nova letra digitada), cancela o agendamento
    return () => clearTimeout(timer)
  }, [value, delay])

  return debouncedValue
}