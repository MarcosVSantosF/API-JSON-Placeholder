import { getInitials } from '../utils/getInitials'

// Pares de cor (fundo + texto). As classes ficam escritas por inteiro de propósito:
// o Tailwind só gera as classes que encontra escritas no código.
const COLORS = [
  'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-200',
  'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-200',
  'bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-200',
  'bg-rose-100 text-rose-700 dark:bg-rose-900/50 dark:text-rose-200',
  'bg-sky-100 text-sky-700 dark:bg-sky-900/50 dark:text-sky-200',
  'bg-violet-100 text-violet-700 dark:bg-violet-900/50 dark:text-violet-200',
]

interface AvatarProps {
  name: string
}

// Círculo colorido com as iniciais do usuário
export default function Avatar({ name }: AvatarProps) {
  // Soma o código de cada letra do nome para escolher sempre a mesma cor para o mesmo nome
  const hash = [...name].reduce((sum, char) => sum + char.charCodeAt(0), 0)
  const color = COLORS[hash % COLORS.length]

  return (
    // aria-hidden: é um enfeite visual; o nome já aparece em texto ao lado
    <div
      aria-hidden="true"
      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-semibold ${color}`}
    >
      {getInitials(name)}
    </div>
  )
}