# Guia de Deploy na Vercel

Este guia explica como fazer deploy do sistema Teacher Gabriel na Vercel.

## 📋 Pré-requisitos

- Conta na Vercel (gratuita): [https://vercel.com](https://vercel.com)
- Projeto Supabase configurado (veja `SUPABASE_SETUP.md`)
- Repositório Git (GitHub, GitLab ou Bitbucket)

## 🚀 Passo a Passo

### 1. Preparar o Código

Certifique-se de que:
- ✅ Todas as dependências estão no `package.json`
- ✅ O arquivo `vercel.json` existe
- ✅ Não há erros de lint ou build
- ✅ As variáveis de ambiente estão documentadas

### 2. Fazer Commit e Push

```bash
git add .
git commit -m "Preparar para deploy na Vercel"
git push origin main
```

### 3. Conectar com a Vercel

1. Acesse [https://vercel.com](https://vercel.com)
2. Faça login com sua conta GitHub/GitLab/Bitbucket
3. Clique em **"Add New Project"**
4. Importe o repositório `teacher-gabriel`
5. A Vercel detectará automaticamente que é um projeto Vite

### 4. Configurar Variáveis de Ambiente

**⚠️ CRÍTICO**: Configure as variáveis antes do primeiro deploy!

1. Na tela de configuração do projeto, role até **"Environment Variables"**
2. Adicione as seguintes variáveis:

   **Variável 1:**
   - **Name**: `VITE_SUPABASE_URL`
   - **Value**: Sua URL do Supabase (ex: `https://xxxxx.supabase.co`)
   - **Environments**: Marque todas (Production, Preview, Development)

   **Variável 2:**
   - **Name**: `VITE_SUPABASE_ANON_KEY`
   - **Value**: Sua chave anon do Supabase
   - **Environments**: Marque todas (Production, Preview, Development)

3. Clique em **"Save"**

### 5. Configurar Build Settings

A Vercel deve detectar automaticamente:
- **Framework Preset**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

Se não detectar, configure manualmente:
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

### 6. Fazer Deploy

1. Clique em **"Deploy"**
2. Aguarde o build completar (geralmente 1-2 minutos)
3. Quando concluir, você verá uma URL como: `https://teacher-gabriel.vercel.app`

### 7. Verificar o Deploy

1. Acesse a URL fornecida pela Vercel
2. Teste as funcionalidades:
   - ✅ Login funciona
   - ✅ Posts são criados
   - ✅ Respostas são criadas
   - ✅ Atualizações em tempo real funcionam
   - ✅ Múltiplos usuários veem atualizações simultâneas

### 8. Configurar Domínio Personalizado (Opcional)

1. No painel da Vercel, vá em **Settings** > **Domains**
2. Adicione seu domínio
3. Siga as instruções para configurar DNS

## 🔄 Deploys Automáticos

A Vercel faz deploy automático quando:
- Você faz push para a branch `main` (produção)
- Você cria um Pull Request (preview)
- Você faz push para outras branches (preview)

## 🐛 Troubleshooting

### Build falha

**Erro**: "Environment variable not found"
- **Solução**: Verifique se as variáveis de ambiente estão configuradas corretamente

**Erro**: "Module not found"
- **Solução**: Execute `npm install` localmente e verifique se todas as dependências estão no `package.json`

**Erro**: "Build timeout"
- **Solução**: Verifique se não há processos longos no build

### Realtime não funciona em produção

**Problema**: Atualizações em tempo real não aparecem
- **Solução 1**: Verifique se as variáveis de ambiente estão configuradas
- **Solução 2**: Verifique se o Realtime está habilitado no Supabase
- **Solução 3**: Abra o console do navegador e verifique erros
- **Solução 4**: Verifique se o schema SQL foi executado no Supabase

### CORS Errors

**Problema**: Erros de CORS no console
- **Solução**: Supabase já está configurado para aceitar requisições de qualquer origem. Se persistir, verifique a URL do Supabase.

## 📊 Monitoramento

### Logs

1. No painel da Vercel, vá em **Deployments**
2. Clique em um deployment
3. Veja os logs do build e runtime

### Analytics

1. No painel da Vercel, vá em **Analytics**
2. Veja métricas de performance e uso

## 🔒 Segurança

### Variáveis de Ambiente

- ✅ Nunca commite o arquivo `.env`
- ✅ Use variáveis de ambiente na Vercel
- ✅ Use a chave `anon` do Supabase (não `service_role`)

### RLS (Row Level Security)

- ⚠️ As políticas atuais permitem leitura/escrita públicas
- ⚠️ Para produção, considere adicionar autenticação mais robusta
- ⚠️ Configure políticas RLS mais restritivas se necessário

## 📚 Recursos

- [Documentação Vercel](https://vercel.com/docs)
- [Vercel Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)
- [Vite Deployment](https://vitejs.dev/guide/static-deploy.html#vercel)

## ✅ Checklist de Deploy

Antes de fazer deploy, verifique:

- [ ] Supabase configurado e funcionando
- [ ] Schema SQL executado no Supabase
- [ ] Realtime habilitado nas tabelas
- [ ] Variáveis de ambiente configuradas na Vercel
- [ ] Build local funciona (`npm run build`)
- [ ] Testes locais passaram
- [ ] Código commitado e pushed
- [ ] README atualizado

Após o deploy:

- [ ] Site acessível na URL da Vercel
- [ ] Login funciona
- [ ] Posts são criados
- [ ] Respostas são criadas
- [ ] Realtime funciona (teste em múltiplas abas)
- [ ] Sem erros no console do navegador
