import { useEffect, useState } from 'react'
import type { User } from '../types/user'


// Endereço da API pública que devolve a lista de usuários
const API_URL = 'https://jsonplaceholder.typicode.com/users'

// Define o formato do que o hook devolve para quem o usa
interface UseUsersResult {
  users: User[]
  loading: boolean
  error: string | null
}

export function useUsers(): UseUsersResult {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const controller = new AbortController()

    async function loadUsers() {
      try {
        // Faz a requisição, ligando-a ao controller para poder cancelar
        const response = await fetch(API_URL, { signal: controller.signal })

        // O fetch não lança erro em 404/500, então checamos manualmente
        if (!response.ok) {
          throw new Error(`Erro HTTP ${response.status}`)
        }
        
        // Converte o corpo da resposta (JSON) para a lista tipada
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

    // Função de limpeza: roda quando o componente é desmontado
    return () => controller.abort()
  }, [])

  return { users, loading, error }
}