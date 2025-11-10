# 🚀 DEPLOY NO RAILWAY - GUIA RÁPIDO

## ✅ PASSO 1: Criar Conta
1. Acesse: https://railway.app
2. Clique em **"Login"**
3. Escolha **"Login with GitHub"** (recomendado)
4. Autorize o acesso

## ✅ PASSO 2: Criar Novo Projeto
1. No dashboard do Railway, clique em **"New Project"**
2. Escolha **"Deploy from GitHub repo"**
3. Se não tiver repositório no GitHub ainda:
   - Clique em **"Empty Project"** primeiro
   - Depois adicione o GitHub

## ✅ PASSO 3: Conectar GitHub (se necessário)
1. Se escolheu "Empty Project", clique em **"Add GitHub Repo"**
2. Autorize o Railway a acessar seus repositórios
3. Selecione o repositório `payevo-backend` (ou crie um novo)

## ✅ PASSO 4: Configurar Variáveis de Ambiente
1. No projeto, clique na aba **"Variables"**
2. Clique em **"New Variable"**
3. Adicione:
   - **Variable Name:** `PAYEVO_SECRET_KEY`
   - **Value:** `sk_like_5gOaAP5LWxx6k710bJMZwYNe1qOVNgMwZicy1igGj9H84UPR`
4. Clique em **"Add"**

## ✅ PASSO 5: Gerar Domínio Público
1. Vá em **"Settings"** (engrenagem)
2. Role até **"Networking"** ou **"Domains"**
3. Clique em **"Generate Domain"**
4. **COPIE A URL** (exemplo: `https://backend-payevo-production.up.railway.app`)

## ✅ PASSO 6: Aguardar Deploy
- O Railway faz deploy automaticamente
- Aguarde aparecer **"Deployed"** (verde)
- Geralmente leva 1-2 minutos

## ✅ PASSO 7: Testar
Acesse no navegador:
```
https://SUA-URL-RAILWAY.up.railway.app/health
```

Deve aparecer:
```json
{"status":"ok","message":"Payevo Backend rodando!"}
```

## ✅ PASSO 8: Atualizar Front-end
Depois que funcionar, atualize:
- `RB/pagamento/index.html` → URL do Railway
- `RB/pixel/payment.js` → URL do Railway

---

## 🔧 PROBLEMAS?

### "Build failed"
- Verifique se o `package.json` está correto
- Verifique os logs no Railway

### "Port already in use"
- Railway define PORT automaticamente, não precisa configurar

### CORS ainda dando erro
- Railway geralmente não tem problemas com CORS
- Se der, me avise que ajusto

---

## 📝 VANTAGENS DO RAILWAY:
- ✅ CORS funciona melhor
- ✅ Mais simples de configurar
- ✅ Logs em tempo real
- ✅ Grátis para começar (500h/mês)

**VOCÊ ESTÁ QUASE LÁ!** 🎉

