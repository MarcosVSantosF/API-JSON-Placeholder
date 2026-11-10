interface ResultsCountProps {
  count: number // quantos usuários estão na tela
  search: string // texto da busca aplicado
}

// Mostra "10 usuários" ou, durante uma busca, "2 resultados para “cle”"
export default function ResultsCount({ count, search }: ResultsCountProps) {
  const term = search.trim()

  const label = term
    ? `${count} ${count === 1 ? 'resultado' : 'resultados'} para “${term}”`
    : `${count} ${count === 1 ? 'usuário' : 'usuários'}`

  return (
    // aria-live="polite": leitores de tela anunciam a mudança do número sem interromper
    <p aria-live="polite" className="mb-4 text-sm text-slate-500" dark:text-slate-400>
      {label}
    </p>
  )
}