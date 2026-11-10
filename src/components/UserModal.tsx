import { useEffect } from 'react'
import type { User } from '../types/user'

// Propriedades: o usuário a exibir e a função que fecha o modal
interface UserModalProps {
  user: User
  onClose: () => void
}

// Pequeno componente auxiliar: uma linha "rótulo + valor" dos detalhes
function DetailItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs font-medium uppercase tracking-wide text-slate-500">{label}</dt>
      <dd className="text-slate-800">{value}</dd>
    </div>
  )
}

export default function UserModal({ user, onClose }: UserModalProps) {
  // Fecha o modal ao apertar a tecla Esc
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose()
    }

    // Começa a "escutar" o teclado quando o modal aparece...
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  return (
    // Fundo escuro que cobre a tela toda; clicar nele fecha o modal
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      {/* A caixa branca do modal.
          role="dialog" e aria-modal avisam leitores de tela que é uma janela de diálogo */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl"
        // stopPropagation: cliques DENTRO da caixa não chegam ao fundo, então não fecham o modal
        onClick={(event) => event.stopPropagation()}
      >
        {/* Cabeçalho: título e botão de fechar */}
        <div className="mb-5 flex items-start justify-between gap-4">
          <h2 id="modal-title" className="text-xl font-bold text-slate-800">
            Detalhes do usuário
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar"
            className="rounded-md p-1 text-slate-500 transition hover:bg-slate-100 hover:text-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
          >
            ✕
          </button>
        </div>

        {/* <dl> é a tag semântica para listas de "termo + descrição" */}
        <dl className="space-y-4">
          <DetailItem label="Nome completo" value={user.name} />
          <DetailItem label="Email" value={user.email} />
          <DetailItem label="Telefone" value={user.phone} />
          <DetailItem label="Empresa" value={user.company.name} />
          <DetailItem label="Cidade" value={user.address.city} />
        </dl>
      </div>
    </div>
  )
}