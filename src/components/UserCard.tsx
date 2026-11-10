import type { User } from '../types/user'

// Propriedades: o usuário a exibir e a função chamada ao clicar no card
interface UserCardProps {
  user: User
  onSelect: (user: User) => void
}

// Card de um usuário: mostra nome e email
export default function UserCard({ user, onSelect }: UserCardProps) {
  return (
    // Usamos <button> (e não <div>) para o card ser clicável também pelo teclado
    <button
      type="button"
      onClick={() => onSelect(user)} // avisa o componente pai qual usuário foi clicado
      className="w-full rounded-lg border border-slate-200 bg-white p-4 text-left shadow-sm transition hover:border-indigo-400 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
    >
      <p className="font-semibold text-slate-800">{user.name}</p>
      <p className="text-sm text-slate-500">{user.email}</p>
    </button>
  )
}