import { useCallback, useEffect, useState } from 'react'
import type { User } from '../types/user'

// Endereço da API pública que devolve a lista de usuários
const API_URL = 'https://jsonplaceholder.typicode.com/users'

// Formato do que o hook devolve (agora inclui a função refetch)
interface UseUsersResult {
  users: User[]
  loading: boolean
  error: string | null
  refetch: () => void // busca os usuários de novo
}

export function useUsers(): UseUsersResult {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Contador que, ao mudar, faz o useEffect rodar de novo (nova requisição)
  const [reloadKey, setReloadKey] = useState(0)

  useEffect(() => {
    const controller = new AbortController()

    async function loadUsers() {
      try {
        const response = await fetch(API_URL, { signal: controller.signal })

        if (!response.ok) {
          throw new Error(`Erro HTTP ${response.status}`)
        }

        const data: User[] = await response.json()
        setUsers(data)
        setLoading(false)
      } catch (err) {
        if (err instanceof DOMException && err.name === 'AbortError') return

        console.error('Falha ao buscar usuários:', err)
        setError('Não foi possível carregar os usuários. Verifique sua conexão e tente novamente.')
        setLoading(false)
      }
    }

    loadUsers()

    return () => controller.abort()
    // reloadKey na lista de dependências: cada vez que ele muda, o efeito roda de novo
  }, [reloadKey])

  // Função chamada pelo botão "Tentar novamente"
  // useCallback mantém a mesma função entre renderizações (identidade estável)
  const refetch = useCallback(() => {
    setError(null) // limpa o erro anterior
    setLoading(true) // volta a mostrar o "carregando"
    setReloadKey((key) => key + 1) // dispara o useEffect de novo
  }, [])

  return { users, loading, error, refetch }
}