# Teacher Gabriel

Sistema web multiusuário com comunicação em tempo real usando **Supabase Realtime** e **PostgreSQL**, totalmente compatível com **Vercel** e arquitetura serverless.

## 🚀 Tecnologias

### Frontend
- **React 18** - Biblioteca JavaScript para construção de interfaces
- **TypeScript** - Superset do JavaScript com tipagem estática
- **Tailwind CSS** - Framework CSS utility-first
- **Supabase JS Client** - Cliente para comunicação com Supabase e Realtime

### Backend & Infraestrutura
- **Supabase** - Backend as a Service (BaaS)
  - **PostgreSQL** - Banco de dados relacional
  - **Realtime** - Subscriptions em tempo real via WebSockets gerenciados
- **Vercel** - Hospedagem serverless do frontend

## 📋 Funcionalidades

- ✅ Sistema multiusuário com suporte a múltiplas conexões simultâneas
- ✅ Autenticação simples (apenas nome e papel - teacher ou student)
- ✅ Gerenciamento de sessões via localStorage
- ✅ Teachers podem criar posts
- ✅ Students podem visualizar posts e responder
- ✅ Atualizações em tempo real para todos os usuários conectados via Supabase Realtime
- ✅ Interface moderna e responsiva
- ✅ Sem necessidade de refresh da página
- ✅ **Totalmente compatível com Vercel e arquitetura serverless**
- ✅ Persistência de dados em PostgreSQL
- ✅ Escalável e pronto para produção

## 🛠️ Instalação

### 1. Clone o repositório

```bash
git clone <seu-repositorio>
cd teacher-gabriel
npm install
```

### 2. Configure o Supabase

1. Acesse [https://supabase.com](https://supabase.com) e crie uma conta (grátis)
2. Crie um novo projeto
3. Vá em **SQL Editor** e execute o script em `supabase/schema.sql`
4. Vá em **Settings > API** e copie:
   - **Project URL**
   - **anon/public key**

### 3. Configure as variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
VITE_SUPABASE_URL=sua_url_do_supabase
VITE_SUPABASE_ANON_KEY=sua_chave_anon_do_supabase
```

**Para produção na Vercel:**
- Adicione essas variáveis em **Settings > Environment Variables** no painel da Vercel

## 🏃 Desenvolvimento Local

```bash
npm run dev
```

O frontend estará disponível em `http://localhost:5173`

## 📁 Estrutura do Projeto

```
teacher-gabriel/
├── supabase/
│   └── schema.sql          # Schema do banco de dados PostgreSQL
├── src/
│   ├── components/         # Componentes React
│   │   ├── Login.tsx       # Tela de login
│   │   ├── Dashboard.tsx   # Dashboard principal
│   │   ├── PostForm.tsx    # Formulário de criação de posts
│   │   └── ReplyForm.tsx   # Formulário de respostas
│   ├── contexts/           # Contextos React
│   │   └── UserContext.tsx # Contexto do usuário logado
│   ├── lib/                # Utilitários
│   │   └── supabase.ts     # Configuração do cliente Supabase
│   ├── types/              # Tipos TypeScript
│   │   └── index.ts        # Definições de tipos
│   ├── App.tsx             # Componente principal
│   ├── main.tsx            # Ponto de entrada
│   └── index.css           # Estilos globais com Tailwind
├── .env.example            # Exemplo de variáveis de ambiente
├── vercel.json             # Configuração do Vercel
├── package.json
├── tsconfig.json
├── vite.config.ts
└── tailwind.config.js
```

## 🎯 Como Usar

1. **Configure o Supabase** (veja seção de instalação acima)

2. **Inicie o desenvolvimento**:
   ```bash
   npm run dev
   ```

3. **Acesse a aplicação**:
   - Abra `http://localhost:5173` no navegador

4. **Faça login**:
   - Informe seu nome
   - Escolha seu papel: **Teacher** ou **Student**
   - Clique em "Entrar"

5. **Como Teacher**:
   - Você pode criar posts usando o formulário no topo
   - Todos os posts criados aparecem instantaneamente para todos os students conectados
   - Você pode ver todas as respostas dos students em tempo real

6. **Como Student**:
   - Você pode visualizar todos os posts criados pelos teachers
   - Você pode responder a qualquer post
   - Suas respostas aparecem instantaneamente para todos os usuários conectados

## 🚀 Deploy na Vercel

### 1. Prepare o repositório

```bash
git add .
git commit -m "Preparar para deploy"
git push origin main
```

### 2. Conecte com a Vercel

1. Acesse [https://vercel.com](https://vercel.com)
2. Importe seu repositório
3. Configure as variáveis de ambiente:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
4. Deploy!

### 3. Verifique o funcionamento

Após o deploy, acesse sua URL da Vercel e teste:
- Login de múltiplos usuários
- Criação de posts em tempo real
- Respostas em tempo real
- Sincronização entre diferentes navegadores/abas

## 🔌 Como Funciona o Realtime

O sistema usa **Supabase Realtime Subscriptions** para escutar mudanças no banco de dados:

1. **Posts**: Quando um teacher cria um post, ele é inserido no PostgreSQL
2. **Subscription**: Todos os clientes conectados recebem o evento `INSERT` via Realtime
3. **Respostas**: Quando um student responde, o mesmo processo acontece
4. **Sincronização**: Todos os usuários veem as atualizações instantaneamente

### Eventos Realtime

- `postgres_changes` na tabela `posts` (evento: `INSERT`)
- `postgres_changes` na tabela `replies` (evento: `INSERT`)

## 🗄️ Estrutura do Banco de Dados

### Tabela `posts`
- `id` (UUID) - Chave primária
- `teacher_name` (TEXT) - Nome do teacher
- `content` (TEXT) - Conteúdo do post
- `created_at` (TIMESTAMP) - Data de criação

### Tabela `replies`
- `id` (UUID) - Chave primária
- `post_id` (UUID) - Referência ao post
- `student_name` (TEXT) - Nome do student
- `content` (TEXT) - Conteúdo da resposta
- `created_at` (TIMESTAMP) - Data de criação

## 🔒 Permissões

- **Teachers**: Podem criar posts (validação no frontend)
- **Students**: Podem visualizar posts e criar respostas (validação no frontend)
- **RLS (Row Level Security)**: Configurado para permitir leitura e escrita públicas
  - ⚠️ Para produção, considere adicionar autenticação mais robusta

## 🌐 Arquitetura Serverless

Este sistema é **100% compatível com Vercel** porque:

- ✅ Não usa conexões WebSocket persistentes no servidor
- ✅ Não depende de estado em memória
- ✅ Usa Supabase Realtime (gerenciado externamente)
- ✅ Todas as operações são via API REST + Realtime subscriptions
- ✅ Frontend estático pode ser servido pela Vercel
- ✅ Banco de dados externo (Supabase PostgreSQL)

## 📝 Notas Importantes

- O sistema usa **localStorage** para persistir a sessão do usuário
- Dados são armazenados permanentemente no PostgreSQL do Supabase
- O Realtime funciona mesmo após refresh da página
- Suporta múltiplos usuários conectados simultaneamente
- Escalável automaticamente com Supabase

## 🐛 Troubleshooting

### Realtime não funciona
- Verifique se as variáveis de ambiente estão configuradas corretamente
- Confirme que o schema SQL foi executado no Supabase
- Verifique se o Realtime está habilitado no projeto Supabase (Settings > API)

### Erro de CORS
- Supabase já está configurado para aceitar requisições de qualquer origem
- Verifique se a URL do Supabase está correta

### Dados não aparecem
- Verifique o console do navegador para erros
- Confirme que as tabelas foram criadas no Supabase
- Verifique as políticas RLS no Supabase

## 📚 Recursos

- [Documentação Supabase](https://supabase.com/docs)
- [Supabase Realtime](https://supabase.com/docs/guides/realtime)
- [Vercel Documentation](https://vercel.com/docs)
