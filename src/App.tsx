import { useCallback, useMemo, useState } from 'react'
import type { User } from './types/user'
import { useUsers } from './hooks/useUsers'
import { useDebounce } from './hooks/useDebounce'
import { useTheme } from './hooks/useTheme'
import { normalizeText } from './utils/normalizeText'
import Loading from './components/Loading'
import ErrorMessage from './components/ErrorMessage'
import SearchInput from './components/SearchInput'
import ResultsCount from './components/ResultsCount'
import UserList from './components/UserList'
import UserModal from './components/UserModal'
import ThemeToggle from './components/ThemeToggle'

export default function App() {
  const { users, loading, error, refetch } = useUsers()
  const { theme, toggleTheme } = useTheme()

  const [search, setSearch] = useState('')
  const debouncedSearch = useDebounce(search, 300)

  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const handleCloseModal = useCallback(() => setSelectedUser(null), [])

  const filteredUsers = useMemo(() => {
    const term = normalizeText(debouncedSearch)
    return users.filter((user) => normalizeText(user.name).includes(term))
  }, [users, debouncedSearch])

  return (
    <main className="mx-auto min-h-screen max-w-5xl p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Usuários</h1>
        <ThemeToggle theme={theme} onToggle={toggleTheme} />
      </div>

      {loading && <Loading />}
      {error && <ErrorMessage message={error} onRetry={refetch} />}

      {!loading && !error && (
        <>
          <SearchInput value={search} onChange={setSearch} />
          <ResultsCount count={filteredUsers.length} search={debouncedSearch} />
          <UserList users={filteredUsers} onSelect={setSelectedUser} />
        </>
      )}

      {selectedUser && <UserModal user={selectedUser} onClose={handleCloseModal} />}
    </main>
  )
}