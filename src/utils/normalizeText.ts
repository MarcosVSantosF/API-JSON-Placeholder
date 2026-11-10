// Deixa o texto "comparável": sem acentos, sem maiúsculas e sem espaços nas pontas.
// Assim, buscar "jose" também encontra "José", e "ANA" encontra "Ana".
export function normalizeText(text: string): string {
  return text
    .normalize('NFD') // separa as letras dos acentos (ex.: "é" vira "e" + "´")
    .replace(/[\u0300-\u036f]/g, '') // remove os acentos separados
    .toLowerCase() // tudo em minúsculo
    .trim() // tira espaços do começo e do fim
}