import type { User } from '../types/user'
import Avatar from './Avatar'

interface UserCardProps {
  user: User
  onSelect: (user: User) => void
}

export default function UserCard({ user, onSelect }: UserCardProps) {
  return (
        <button
      type="button"
      onClick={() => onSelect(user)}
      className="flex w-full items-center gap-4 rounded-lg border border-slate-200 bg-white p-4 text-left shadow-sm transition hover:border-indigo-400 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 dark:border-slate-700 dark:bg-slate-800 dark:hover:border-indigo-400"
    >
      <Avatar name={user.name} />

      <div className="min-w-0">
        <p className="truncate font-semibold text-slate-800 dark:text-slate-100">{user.name}</p>
        <p className="truncate text-sm text-slate-600 dark:text-slate-300">{user.email}</p>
        <p className="mt-1 truncate text-xs text-slate-500 dark:text-slate-400">
          {user.company.name} · {user.address.city}
        </p>
      </div>
    </button>
    
    
    
  )
}