import { useCallback, useEffect, useState } from 'react'

export type Theme = 'light' | 'dark'

// Nome da chave usada para guardar a escolha no navegador
const STORAGE_KEY = 'theme'

// Decide o tema inicial: primeiro a escolha salva, depois a preferência do sistema
function getInitialTheme(): Theme {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved === 'light' || saved === 'dark') return saved
  } catch {
    // localStorage pode estar bloqueado (ex.: modo privado): seguimos sem ele
  }

  // matchMedia não existe em todos os ambientes (o jsdom dos testes não tem), então checamos antes
  if (
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-color-scheme: dark)').matches
  ) {
    return 'dark'
  }

  return 'light'
}

export function useTheme() {
  // Passamos a função (e não o resultado) para ela rodar só na primeira renderização
  const [theme, setTheme] = useState<Theme>(getInitialTheme)

  // Sempre que o tema muda, liga/desliga a classe "dark" no <html>.
  // É essa classe que ativa todas as variantes dark: do Tailwind
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])

  const toggleTheme = useCallback(() => {
    const next: Theme = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)

    // Só guardamos quando a pessoa escolhe de verdade: enquanto não escolher,
    // o app continua seguindo a configuração do sistema
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {
      // sem localStorage, o tema só vale até recarregar a página
    }
  }, [theme])

  return { theme, toggleTheme }
}