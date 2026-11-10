// Estado de carregamento: cartões cinza "pulsando" com o mesmo formato dos cards reais
export default function Loading() {
  return (
    <div role="status">
      {/* Texto invisível na tela, mas lido por leitores de tela */}
      <span className="sr-only">Carregando usuários...</span>

      {/* Mesma grade da lista real, para a tela não "pular" quando os dados chegam.
          aria-hidden: os cartões são só visuais */}
      <ul aria-hidden="true" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {/* Array.from cria 9 itens de enfeite (3 linhas completas na grade) */}
        {Array.from({ length: 9 }, (_, index) => (
          <li
            key={index}
            // animate-pulse faz o cartão piscar suavemente
            className="flex animate-pulse items-center gap-4 rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-800"

// no círculo e nas três barras, troque bg-slate-200 por:
bg-slate-200 dark:bg-slate-700
          >
            {/* Círculo do avatar */}
            <div className="h-10 w-10 shrink-0 rounded-full bg-slate-200 dark:bg-slate-700" />
            {/* Três barras: nome, email e empresa/cidade */}
            <div className="flex-1 space-y-2">
              <div className="h-4 w-3/4 rounded bg-slate-200 dark:bg-slate-700" />
              <div className="h-3 w-full rounded bg-slate-200 dark:bg-slate-700" />
              <div className="h-3 w-1/2 rounded bg-slate-200 dark:bg-slate-700" />
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}