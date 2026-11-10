// Propriedades: o texto atual do campo e a função chamada a cada digitação
interface SearchInputProps {
  value: string
  onChange: (value: string) => void
}

// Campo de busca "controlado": quem guarda o texto é o componente pai (App)
export default function SearchInput({ value, onChange }: SearchInputProps) {
  return (
    <div className="mb-6">
      {/* sr-only: label invisível na tela, mas lida por leitores de tela */}
      <label htmlFor="search" className="sr-only">
        Buscar usuário por nome
      </label>
      <input
        id="search"
        type="search"
        value={value}
        // A cada letra digitada, enviamos o novo texto para o componente pai
        onChange={(event) => onChange(event.target.value)}
        placeholder="Buscar usuário por nome..."
        className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2 shadow-sm placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
      />
    </div>
  )
}