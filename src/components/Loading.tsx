// Estado visual de "carregando": um círculo girando + texto
export default function Loading() {
  return (
    // role="status" avisa leitores de tela que o conteúdo é um status
    <div role="status" className="flex items-center gap-3 py-10 text-slate-600">
      {/* animate-spin faz o círculo girar; a borda de cima colorida cria o efeito */}
      <span className="h-5 w-5 animate-spin rounded-full border-2 border-slate-300 border-t-indigo-600" />
      <span>Carregando usuários...</span>
    </div>
  )
}