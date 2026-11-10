// Extrai as iniciais de um nome: "Clementine Bauch" vira "CB".
// Ignora títulos ("Mrs.", "Dr.") e sufixos de uma letra ("V"),
// que existem em nomes da API como "Mrs. Dennis Schulist" e "Nicholas Runolfsdottir V".
export function getInitials(name: string): string {
  const words = name
    .split(' ')
    // Mantém só palavras com mais de 1 letra que não terminam em ponto
    .filter((word) => word.length > 1 && !word.endsWith('.'))

  // Se sobrou nada (nome vazio, por exemplo), mostra um "?"
  if (words.length === 0) return '?'

  // Primeira letra da primeira palavra + primeira letra da última (se houver mais de uma)
  const first = words[0][0]
  const last = words.length > 1 ? words[words.length - 1][0] : ''

  return (first + last).toUpperCase()
}