# Guia de Configuração do Supabase

Este guia explica passo a passo como configurar o Supabase para o sistema Teacher Gabriel.

## 📋 Pré-requisitos

- Conta no Supabase (gratuita): [https://supabase.com](https://supabase.com)

## 🚀 Passo a Passo

### 1. Criar Projeto no Supabase

1. Acesse [https://app.supabase.com](https://app.supabase.com)
2. Clique em **"New Project"**
3. Preencha:
   - **Name**: Nome do seu projeto (ex: "teacher-gabriel")
   - **Database Password**: Escolha uma senha forte (salve em local seguro)
   - **Region**: Escolha a região mais próxima
4. Clique em **"Create new project"**
5. Aguarde alguns minutos enquanto o projeto é criado

### 2. Executar o Schema SQL

1. No painel do Supabase, vá em **SQL Editor** (ícone de banco de dados no menu lateral)
2. Clique em **"New query"**
3. Abra o arquivo `supabase/schema.sql` deste projeto
4. Copie todo o conteúdo do arquivo
5. Cole no editor SQL do Supabase
6. Clique em **"Run"** (ou pressione Ctrl+Enter)
7. Você deve ver a mensagem "Success. No rows returned"

### 3. Verificar Tabelas Criadas

1. No menu lateral, vá em **Table Editor**
2. Você deve ver duas tabelas:
   - `posts`
   - `replies`
3. Clique em cada uma para verificar a estrutura

### 4. Habilitar Realtime (Importante!)

1. No menu lateral, vá em **Database** > **Replication**
2. Certifique-se de que as tabelas `posts` e `replies` estão habilitadas para Realtime
3. Se não estiverem, clique no toggle ao lado de cada tabela

**Alternativamente**, você pode verificar se o Realtime está habilitado executando este SQL:

```sql
-- Verificar publicação do Realtime
SELECT * FROM pg_publication_tables WHERE pubname = 'supabase_realtime';
```

Você deve ver as tabelas `posts` e `replies` listadas.

### 5. Obter Credenciais da API

1. No menu lateral, vá em **Settings** (ícone de engrenagem)
2. Clique em **API**
3. Você verá:
   - **Project URL**: Copie este valor
   - **anon public key**: Copie este valor (não a `service_role` key!)

### 6. Configurar Variáveis de Ambiente

#### Desenvolvimento Local

Crie um arquivo `.env` na raiz do projeto:

```env
VITE_SUPABASE_URL=https://seu-projeto.supabase.co
VITE_SUPABASE_ANON_KEY=sua-chave-anon-aqui
```

**⚠️ Importante**: Substitua pelos valores reais do seu projeto!

#### Produção (Vercel)

1. No painel da Vercel, vá em seu projeto
2. Clique em **Settings** > **Environment Variables**
3. Adicione:
   - **Key**: `VITE_SUPABASE_URL`
   - **Value**: Sua URL do Supabase
4. Adicione:
   - **Key**: `VITE_SUPABASE_ANON_KEY`
   - **Value**: Sua chave anon do Supabase
5. Selecione os ambientes (Production, Preview, Development)
6. Clique em **Save**
7. Faça um novo deploy

### 7. Verificar Políticas RLS

1. No menu lateral, vá em **Authentication** > **Policies**
2. Você deve ver políticas para `posts` e `replies`
3. As políticas criadas pelo schema permitem:
   - Leitura pública (SELECT)
   - Inserção pública (INSERT)

**⚠️ Para produção**, considere adicionar autenticação mais robusta.

### 8. Testar a Conexão

1. Inicie o projeto localmente:
   ```bash
   npm run dev
   ```
2. Abra o console do navegador (F12)
3. Tente fazer login
4. Se houver erros, verifique:
   - Se as variáveis de ambiente estão corretas
   - Se o schema foi executado
   - Se o Realtime está habilitado

## 🔍 Verificações Finais

Execute estas queries no SQL Editor para verificar:

```sql
-- Verificar se as tabelas existem
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN ('posts', 'replies');

-- Verificar se o Realtime está habilitado
SELECT * FROM pg_publication_tables 
WHERE pubname = 'supabase_realtime' 
AND tablename IN ('posts', 'replies');

-- Verificar políticas RLS
SELECT * FROM pg_policies 
WHERE tablename IN ('posts', 'replies');
```

## 🐛 Problemas Comuns

### "Realtime não funciona"
- Verifique se habilitou o Realtime nas tabelas (Database > Replication)
- Confirme que executou o schema SQL completo
- Verifique o console do navegador para erros

### "Erro de permissão"
- Verifique se as políticas RLS estão criadas
- Confirme que está usando a chave `anon` e não `service_role`

### "Tabelas não encontradas"
- Execute novamente o schema SQL
- Verifique se não há erros no SQL Editor

## 📚 Recursos

- [Documentação Supabase](https://supabase.com/docs)
- [Supabase Realtime Guide](https://supabase.com/docs/guides/realtime)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)
