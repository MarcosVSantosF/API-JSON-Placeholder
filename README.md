# Lista de Usuários — JSONPlaceholder

Aplicação front-end desenvolvida como desafio técnico para a vaga de **Desenvolvedor Front-End Júnior**.

Consome a API pública [JSONPlaceholder](https://jsonplaceholder.typicode.com) e exibe uma lista de usuários com busca, detalhes em modal, tema claro/escuro e estados de carregamento e erro.

## ✨ Funcionalidades

- Listagem de usuários (nome e e-mail)
- Busca por nome com debounce e normalização (ignora acentos e maiúsculas)
- Modal de detalhes ao clicar em um usuário (nome, e-mail, telefone, empresa e cidade)
- Estados visuais de carregamento e erro (com botão de tentar novamente)
- Tema claro/escuro com preferência salva no `localStorage`
- Contador de resultados da busca
- Avatar com iniciais do nome
- Acessibilidade: navegação por teclado, foco gerenciado no modal, `aria-labels` e roles semânticos

## 🛠️ Tecnologias

- **React 19** + **TypeScript**
- **Vite**
- **Tailwind CSS 4**
- **Vitest** + **React Testing Library**
- Fetch API (sem bibliotecas extras de requisição)

## 🚀 Como rodar

### Pré-requisitos

- Node.js 18+ (recomendado 20+)

### Instalação

```bash
# Clone o repositório
git clone https://github.com/MarcosVSantosF/API-JSON-Placeholder.git

# Entre na pasta
cd API-JSON-Placeholder

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

A aplicação estará disponível em `http://localhost:5173`.

### Scripts disponíveis

| Comando | Descrição |
| --- | --- |
| `npm run dev` | Sobe o servidor de desenvolvimento |
| `npm run build` | Gera o build de produção |
| `npm run preview` | Visualiza o build de produção |
| `npm run lint` | Executa o ESLint |
| `npm test` | Roda os testes em modo watch |
| `npm run test:run` | Roda os testes uma vez e encerra |

## 📁 Estrutura do projeto

```text
src/
├── components/          # Componentes de UI
│   ├── Avatar.tsx
│   ├── ErrorMessage.tsx
│   ├── Loading.tsx
│   ├── ResultsCount.tsx
│   ├── SearchInput.tsx
│   ├── ThemeToggle.tsx
│   ├── UserCard.tsx
│   ├── UserList.tsx
│   └── UserModal.tsx
├── hooks/               # Hooks customizados
│   ├── useDebounce.ts
│   ├── useTheme.ts
│   └── useUsers.ts
├── types/               # Tipagens TypeScript
│   └── user.ts
├── utils/               # Funções utilitárias
│   ├── getInitials.ts
│   └── normalizeText.ts
├── test/                # Setup dos testes
│   └── setup.ts
├── App.tsx
├── App.test.tsx
├── index.css
└── main.tsx
```

## 🧪 Testes

Os testes cobrem:

- Funções utilitárias (`normalizeText` e `getInitials`)
- Fluxo principal da aplicação:
  - Carregamento e listagem de usuários
  - Tratamento de erro com retry
  - Filtro por nome (com normalização)
  - Mensagem quando não há resultados
  - Abertura/fechamento do modal (incluindo tecla Esc e restauração de foco)

Para executar:

```bash
npm run test:run
```

## 🎨 Tema escuro

O tema inicia seguindo a preferência do sistema operacional.  
O usuário pode alternar manualmente pelo botão sol/lua no topo da página.  
A escolha é persistida no `localStorage`.

## 📡 API

Endpoint utilizado:

```text
GET https://jsonplaceholder.typicode.com/users
```

## 📝 Observações

- O código está componentizado e tipado com TypeScript
- A busca normaliza o texto (remove acentos e converte para minúsculas)
- O modal gerencia foco, bloqueia o scroll da página e fecha com a tecla `Esc`
- O e-mail no modal é um link `mailto:`

## 👤 Autor

**Marcos V. Santos**  
[GitHub](https://github.com/MarcosVSantosF)