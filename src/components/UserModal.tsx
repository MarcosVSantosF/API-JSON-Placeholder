import { useEffect, useRef } from 'react'
import type { ReactNode } from 'react'
import type { User } from '../types/user'

// Propriedades: o usuário a exibir e a função que fecha o modal
interface UserModalProps {
  user: User
  onClose: () => void
}

// Linha "rótulo + conteúdo". Agora o conteúdo pode ser um texto OU um elemento
// (como o link de email), por isso usamos "children" em vez de "value"
function DetailItem({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <dt className="text-xs font-medium uppercase tracking-wide text-slate-500">{label}</dt>
      <dd className="text-slate-800">{children}</dd>
    </div>
  )
}

export default function UserModal({ user, onClose }: UserModalProps) {
  // Referência à caixa do modal, para controlarmos o foco do teclado
  const dialogRef = useRef<HTMLDivElement>(null)

  // MELHORIA 1 — FOCO: ao abrir, o foco vai para dentro do modal;
  // ao fechar, volta para o elemento que estava focado (o card clicado)
  useEffect(() => {
    // Guarda quem tinha o foco antes de o modal abrir (o card)
    const previouslyFocused = document.activeElement as HTMLElement | null

    // Move o foco para a caixa do modal (leitores de tela passam a ler o título)
    dialogRef.current?.focus()

    // Função de limpeza: roda quando o modal fecha e devolve o foco ao card
    return () => previouslyFocused?.focus()
  }, [])

  // MELHORIA 2 — ROLAGEM: impede a página de trás de rolar enquanto o modal está aberto
  useEffect(() => {
    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    // Ao fechar, restaura o valor que existia antes
    return () => {
      document.body.style.overflow = originalOverflow
    }
  }, [])

  // TECLADO: Esc fecha o modal e Tab fica "preso" dentro dele
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onClose()
        return
      }

      // Qualquer outra tecla que não seja Tab não nos interessa
      if (event.key !== 'Tab' || !dialogRef.current) return

      // Lista os elementos que podem receber foco dentro do modal (link e botão)
      const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])',
      )
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      const active = document.activeElement

      if (event.shiftKey && (active === first || active === dialogRef.current)) {
        // Shift+Tab no primeiro elemento: pula para o último (dá a volta)
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && active === last) {
        // Tab no último elemento: volta para o primeiro (dá a volta)
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  return (
    // Fundo escuro que cobre a tela toda; clicar nele fecha o modal.
    // MELHORIA 3 — ANIMAÇÃO: motion-safe só anima para quem não desativou
    // animações no sistema (respeita a preferência de acessibilidade)
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 motion-safe:animate-fade-in"
      onClick={onClose}
    >
      {/* Caixa do modal.
          tabIndex={-1}: permite receber foco por código (sem entrar na ordem do Tab) */}
      <div
        ref={dialogRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl outline-none motion-safe:animate-scale-in"
        // Cliques DENTRO da caixa não chegam ao fundo, então não fecham o modal
        onClick={(event) => event.stopPropagation()}
      >
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

        <dl className="space-y-4">
          <DetailItem label="Nome completo">{user.name}</DetailItem>

          {/* MELHORIA 4 — EMAIL CLICÁVEL: mailto: abre o programa de email do usuário */}
          <DetailItem label="Email">
            <a
              href={`mailto:${user.email}`}
              className="rounded text-indigo-600 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
            >
              {user.email}
            </a>
          </DetailItem>

          <DetailItem label="Telefone">{user.phone}</DetailItem>
          <DetailItem label="Empresa">{user.company.name}</DetailItem>
          <DetailItem label="Cidade">{user.address.city}</DetailItem>
        </dl>
      </div>
    </div>
  )
}