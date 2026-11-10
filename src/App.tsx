import { useCallback, useMemo, useState } from 'react'
import type { User } from './types/user'
import { useUsers } from './hooks/useUsers'
import { normalizeText } from './utils/normalizeText'
import Loading from './components/Loading'
import ErrorMessage from './components/ErrorMessage'
import SearchInput from './components/SearchInput'
import UserList from './components/UserList'
import UserModal from './components/UserModal'

export default function App() {
  // Dados e estados vindos do nosso hook
  const { users, loading, error } = useUsers()

  // Texto digitado no campo de busca
  const [search, setSearch] = useState('')

  // Usuário clicado (null = nenhum modal aberto)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)

  // Função de fechar com identidade estável (useCallback), para o useEffect do
  // modal não reinscrever o ouvinte de teclado a cada renderização
  const handleCloseModal = useCallback(() => setSelectedUser(null), [])

  // Lista filtrada pelo nome (só recalcula quando users ou search mudam)
  const filteredUsers = useMemo(() => {
    const term = normalizeText(search)
    return users.filter((user) => normalizeText(user.name).includes(term))
  }, [users, search])

  return (
    <main className="mx-auto min-h-screen max-w-5xl p-6">
      <h1 className="mb-6 text-2xl font-bold">Usuários</h1>

      {loading && <Loading />}
      {error && <ErrorMessage message={error} />}

      {!loading && !error && (
        <>
          <SearchInput value={search} onChange={setSearch} />
          {/* Ao clicar em um card, guardamos o usuário escolhido, o que abre o modal */}
          <UserList users={filteredUsers} onSelect={setSelectedUser} />
        </>
      )}

      {/* O modal só existe na tela enquanto houver um usuário selecionado */}
      {selectedUser && <UserModal user={selectedUser} onClose={handleCloseModal} />}
    </main>
  )
}