import { describe, it, expect, vi, afterEach } from 'vitest'
import { render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'
import type { User } from './types/user'

// Usuários falsos usados no lugar da API real
const mockUsers: User[] = [
  {
    id: 1,
    name: 'Leanne Graham',
    email: 'sincere@april.biz',
    phone: '1-770-736-8031',
    company: { name: 'Romaguera-Crona' },
    address: { city: 'Gwenborough' },
  },
  {
    id: 2,
    name: 'Clementine Bauch',
    email: 'nathan@yesenia.net',
    phone: '1-463-123-4447',
    company: { name: 'Romaguera-Jacobson' },
    address: { city: 'McKenziehaven' },
  },
  {
    id: 3,
    name: 'Clementina DuBuque',
    email: 'rey.padberg@karina.biz',
    phone: '024-648-3804',
    company: { name: 'Hoeger LLC' },
    address: { city: 'Lebsackbury' },
  },
]

// Troca o fetch real por uma versão falsa que responde com os usuários acima.
// Cada chamada devolve uma Response nova, porque o corpo de uma Response só pode ser lido uma vez.
function mockFetchSuccess() {
  return vi
    .spyOn(globalThis, 'fetch')
    .mockImplementation(async () => new Response(JSON.stringify(mockUsers)))
}

// Depois de cada teste, desfaz as simulações (fetch e console) para não afetar o próximo
afterEach(() => {
  vi.restoreAllMocks()
})

describe('App', () => {
  it('mostra o estado de carregando e depois a lista de usuários', async () => {
    mockFetchSuccess()
    render(<App />)

    // Logo após renderizar, o componente Loading (role="status") está na tela
    expect(screen.getByRole('status')).toBeInTheDocument()

    // findBy espera o elemento aparecer (a requisição falsa é assíncrona)
    expect(await screen.findByText('Leanne Graham')).toBeInTheDocument()
    expect(screen.getByText('Clementine Bauch')).toBeInTheDocument()

    // Com os dados carregados, o "carregando" some
    expect(screen.queryByRole('status')).not.toBeInTheDocument()
  })

  it('mostra uma mensagem amigável quando a API falha e permite tentar novamente', async () => {
    const user = userEvent.setup()
    // O hook registra o erro técnico no console; silenciamos aqui para não poluir o terminal
    vi.spyOn(console, 'error').mockImplementation(() => {})

    // A PRIMEIRA chamada falha (status 500); as seguintes funcionam
    mockFetchSuccess().mockImplementationOnce(async () => new Response(null, { status: 500 }))

    render(<App />)

    // O usuário vê a mensagem amigável, sem detalhes técnicos
    expect(await screen.findByRole('alert')).toHaveTextContent(
      'Não foi possível carregar os usuários',
    )

    // Clica em "Tentar novamente": a segunda chamada dá certo
    await user.click(screen.getByRole('button', { name: 'Tentar novamente' }))

    expect(await screen.findByText('Leanne Graham')).toBeInTheDocument()
    expect(screen.queryByRole('alert')).not.toBeInTheDocument()
  })

  it('filtra os usuários pelo nome, ignorando maiúsculas e acentos', async () => {
    const user = userEvent.setup()
    mockFetchSuccess()
    render(<App />)
    await screen.findByText('Leanne Graham')

    // Digita no campo de busca (o campo é achado pelo rótulo acessível)
    await user.type(screen.getByRole('searchbox', { name: 'Buscar usuário por nome' }), 'CLE')

    // A busca tem debounce de 300 ms; o waitFor repete a checagem até a lista atualizar
    await waitFor(() => {
      expect(screen.queryByText('Leanne Graham')).not.toBeInTheDocument()
    })

    expect(screen.getByText('Clementine Bauch')).toBeInTheDocument()
    expect(screen.getByText('Clementina DuBuque')).toBeInTheDocument()
    expect(screen.getByText('2 resultados para “CLE”')).toBeInTheDocument()
  })

  it('avisa quando nenhum usuário combina com a busca', async () => {
    const user = userEvent.setup()
    mockFetchSuccess()
    render(<App />)
    await screen.findByText('Leanne Graham')

    await user.type(screen.getByRole('searchbox', { name: 'Buscar usuário por nome' }), 'xyz')

    expect(await screen.findByText('Nenhum usuário encontrado.')).toBeInTheDocument()
  })

  it('abre o modal com os detalhes, fecha com Esc e devolve o foco ao card', async () => {
    const user = userEvent.setup()
    mockFetchSuccess()
    render(<App />)

    // Clica no card do primeiro usuário
    const card = await screen.findByRole('button', { name: /Leanne Graham/ })
    await user.click(card)

    // O modal aparece, e procuramos os detalhes SOMENTE dentro dele (within)
    const dialog = screen.getByRole('dialog', { name: 'Detalhes do usuário' })
    expect(within(dialog).getByText('1-770-736-8031')).toBeInTheDocument()
    expect(within(dialog).getByText('Romaguera-Crona')).toBeInTheDocument()
    expect(within(dialog).getByText('Gwenborough')).toBeInTheDocument()

    // O email é um link mailto:
    expect(within(dialog).getByRole('link', { name: 'sincere@april.biz' })).toHaveAttribute(
      'href',
      'mailto:sincere@april.biz',
    )

    // Esc fecha o modal...
    await user.keyboard('{Escape}')
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()

    // ...e o foco volta para o card que abriu o modal
    expect(card).toHaveFocus()
  })

  it('alterna entre tema claro e escuro e guarda a escolha', async () => {
    const user = userEvent.setup()
    mockFetchSuccess()
    render(<App />)
    await screen.findByText('Leanne Graham')

    // No jsdom não há preferência de sistema, então começa no tema claro.
    // Clicar no botão liga o tema escuro: a classe "dark" vai para o <html>
    // e a escolha é guardada no localStorage
    await user.click(screen.getByRole('button', { name: 'Ativar tema escuro' }))
    expect(document.documentElement).toHaveClass('dark')
    expect(localStorage.getItem('theme')).toBe('dark')

    // Clicar de novo volta para o tema claro
    await user.click(screen.getByRole('button', { name: 'Ativar tema claro' }))
    expect(document.documentElement).not.toHaveClass('dark')
    expect(localStorage.getItem('theme')).toBe('light')
  })
})