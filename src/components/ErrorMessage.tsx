// Define que este componente recebe um texto (a mensagem) como propriedade
interface ErrorMessageProps {
  message: string
}

// Estado visual de erro: caixa vermelha com a mensagem recebida
export default function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    // role="alert" faz leitores de tela anunciarem o erro imediatamente
    <div role="alert" className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
      {message}
    </div>
  )
}