# Teacher Gabriel

Sistema web multiusuário com comunicação em tempo real usando WebSockets (Socket.IO).

## 🚀 Tecnologias

### Frontend
- **React 18** - Biblioteca JavaScript para construção de interfaces
- **TypeScript** - Superset do JavaScript com tipagem estática
- **Tailwind CSS** - Framework CSS utility-first
- **Socket.IO Client** - Cliente para comunicação em tempo real

### Backend
- **Node.js** - Runtime JavaScript
- **Express** - Framework web para Node.js
- **Socket.IO** - Biblioteca para comunicação em tempo real via WebSockets
- **TypeScript** - Tipagem estática

## 📋 Funcionalidades

- ✅ Sistema multiusuário com suporte a múltiplas conexões simultâneas
- ✅ Autenticação simples (apenas nome e papel - teacher ou student)
- ✅ Gerenciamento de sessões por conexão WebSocket
- ✅ Teachers podem criar posts
- ✅ Students podem visualizar posts e responder
- ✅ Atualizações em tempo real para todos os usuários conectados
- ✅ Interface moderna e responsiva
- ✅ Sem necessidade de refresh da página

## 🛠️ Instalação

```bash
npm install
```

## 🏃 Desenvolvimento

O projeto usa `concurrently` para rodar o servidor e o cliente simultaneamente:

```bash
npm run dev
```

Isso iniciará:
- **Backend**: `http://localhost:3001` (Socket.IO server)
- **Frontend**: `http://localhost:5173` (Vite dev server)

### Comandos individuais

```bash
# Apenas o servidor
npm run dev:server

# Apenas o cliente
npm run dev:client
```

## 📁 Estrutura do Projeto

```
teacher-gabriel/
├── server/              # Backend
│   ├── index.ts        # Servidor Express + Socket.IO
│   └── tsconfig.json   # Configuração TypeScript do servidor
├── src/                # Frontend
│   ├── components/     # Componentes React
│   │   ├── Login.tsx          # Tela de login
│   │   ├── Dashboard.tsx      # Dashboard principal
│   │   ├── PostForm.tsx       # Formulário de criação de posts
│   │   └── ReplyForm.tsx      # Formulário de respostas
│   ├── contexts/       # Contextos React
│   │   └── UserContext.tsx    # Contexto do usuário logado
│   ├── lib/           # Utilitários
│   │   └── socket.ts          # Configuração do Socket.IO client
│   ├── types/         # Tipos TypeScript
│   │   └── index.ts           # Definições de tipos
│   ├── App.tsx        # Componente principal
│   ├── main.tsx       # Ponto de entrada
│   └── index.css      # Estilos globais com Tailwind
├── package.json
├── tsconfig.json
├── vite.config.ts
└── tailwind.config.js
```

## 🎯 Como Usar

1. **Inicie o servidor e cliente**:
   ```bash
   npm run dev
   ```

2. **Acesse a aplicação**:
   - Abra `http://localhost:5173` no navegador

3. **Faça login**:
   - Informe seu nome
   - Escolha seu papel: **Teacher** ou **Student**
   - Clique em "Entrar"

4. **Como Teacher**:
   - Você pode criar posts usando o formulário no topo
   - Todos os posts criados aparecem instantaneamente para todos os students conectados
   - Você pode ver todas as respostas dos students em tempo real

5. **Como Student**:
   - Você pode visualizar todos os posts criados pelos teachers
   - Você pode responder a qualquer post
   - Suas respostas aparecem instantaneamente para todos os usuários conectados

## 🔌 Eventos Socket.IO

### Cliente → Servidor

- `login` - Autenticação do usuário
- `create-post` - Criar novo post (apenas teachers)
- `create-reply` - Criar resposta (apenas students)

### Servidor → Cliente

- `login-success` - Confirmação de login bem-sucedido
- `posts-updated` - Lista completa de posts (enviado ao conectar)
- `post-created` - Novo post criado (broadcast para todos)
- `reply-created` - Nova resposta criada (broadcast para todos)
- `user-connected` - Notificação de usuário conectado
- `user-disconnected` - Notificação de usuário desconectado
- `error` - Mensagem de erro

## 🔒 Permissões

- **Teachers**: Podem criar posts
- **Students**: Podem visualizar posts e criar respostas
- As permissões são validadas no servidor

## 🌐 Escalabilidade

O sistema está preparado para escalar:
- Gerenciamento de múltiplas conexões simultâneas
- Broadcast eficiente de eventos
- Armazenamento em memória (pode ser facilmente migrado para banco de dados)
- Estrutura modular e separação clara de responsabilidades

## 📝 Notas

- O sistema usa armazenamento em memória (dados são perdidos ao reiniciar o servidor)
- Para produção, considere adicionar persistência com banco de dados
- O sistema suporta múltiplos usuários conectados simultaneamente
- Todas as atualizações são em tempo real via WebSockets
