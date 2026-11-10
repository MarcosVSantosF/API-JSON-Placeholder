// Propriedades: a mensagem e, opcionalmente, o que fazer ao clicar em "Tentar novamente"
interface ErrorMessageProps {
  message: string
  onRetry?: () => void // o "?" significa que é opcional: sem ela, o botão não aparece
}

// Estado visual de erro: caixa vermelha com a mensagem e o botão de nova tentativa
export default function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  return (
    <div
      role="alert"
            className="flex flex-col gap-3 rounded-lg border border-red-200 bg-red-50 p-4 text-red-700 sm:flex-row sm:items-center sm:justify-between dark:border-red-900 dark:bg-red-950 dark:text-red-200"
    >
      <p>{message}</p>

      {/* O botão só é renderizado se a função onRetry foi passada */}
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="shrink-0 rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
        >
          Tentar novamente
        </button>
      )}
    </div>
  )
}