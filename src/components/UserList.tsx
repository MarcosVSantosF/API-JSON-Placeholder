import type { User } from '../types/user'
import UserCard from './UserCard'

// Propriedades: a lista a exibir e a função repassada para cada card
interface UserListProps {
  users: User[]
  onSelect: (user: User) => void
}

// Lista de usuários em grade responsiva
export default function UserList({ users, onSelect }: UserListProps) {
  // Se não houver nenhum usuário (ex.: busca sem resultado), mostra um aviso
  if (users.length === 0) {
    return <p className="py-10 text-center text-slate-500">Nenhum usuário encontrado.</p>
  }

  return (
    // Grade: 1 coluna no celular, 2 em telas médias, 3 em telas grandes
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {users.map((user) => (
        // key ajuda o React a identificar cada item da lista
        <li key={user.id}>
          <UserCard user={user} onSelect={onSelect} />
        </li>
      ))}
    </ul>
  )
}