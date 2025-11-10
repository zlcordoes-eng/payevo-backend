# 🚀 Guia Rápido de Deploy

## Opção 1: Railway (RECOMENDADO - mais fácil)

1. **Crie uma conta**: https://railway.app (pode usar GitHub)

2. **Novo Projeto**:
   - Clique em "New Project"
   - Selecione "Deploy from GitHub repo"
   - Autorize o Railway a acessar seu repositório
   - Selecione este projeto

3. **Configurar variável de ambiente**:
   - No painel do Railway, vá em "Variables"
   - Adicione: `PAYEVO_SECRET_KEY` = `sk_like_5gOaAP5LWxx6k710bJMZwYNe1qOVNgMwZicy1igGj9H84UPR`

4. **Deploy automático**: O Railway faz deploy automaticamente!

5. **Copie a URL**: Após o deploy, copie a URL (exemplo: `https://seu-app.railway.app`)

6. **Atualize o front-end**: 
   - Abra `RB/pagamento/index.html`
   - Mude `const BACKEND_API_URL = "http://localhost:3000";`
   - Para `const BACKEND_API_URL = "https://seu-app.railway.app";`

---

## Opção 2: Vercel (serverless)

1. **Instale o Vercel CLI**:
```bash
npm i -g vercel
```

2. **Faça login**:
```bash
vercel login
```

3. **Deploy**:
```bash
cd RB/backend-payevo
vercel
```

4. **Configure variáveis**:
   - No painel da Vercel, vá em Settings → Environment Variables
   - Adicione `PAYEVO_SECRET_KEY`

5. **Copie a URL** e atualize no front-end

---

## Opção 3: Render

1. **Crie uma conta**: https://render.com

2. **Novo Web Service**:
   - Conecte seu repositório GitHub
   - Root Directory: `RB/backend-payevo`
   - Build Command: `npm install`
   - Start Command: `npm start`

3. **Adicione variável**: `PAYEVO_SECRET_KEY`

4. **Copie a URL** e atualize no front-end

---

## Após o Deploy

### 1. Atualize o front-end

Em `RB/pagamento/index.html`, linha ~176:
```javascript
const BACKEND_API_URL = "https://SUA-URL-AQUI.railway.app";
```

Em `RB/pixel/payment.js`, linha ~148:
```javascript
const baseUrl = window.BACKEND_API_URL || "https://SUA-URL-AQUI.railway.app";
```

### 2. Teste

1. Abra sua página de pagamento
2. Tente gerar um PIX
3. Verifique o console do navegador (F12)
4. Deve ver: "Resposta do backend: ..." com sucesso!

### 3. Segurança (IMPORTANTE!)

⚠️ Após confirmar que funciona:

1. **Rotacione** suas chaves da Payevo
2. Atualize a variável `PAYEVO_SECRET_KEY` no Railway/Vercel
3. **Delete** as chaves antigas desta conversa

---

## Problemas Comuns

### "CORS error"
- Certifique-se que o backend está rodando
- Verifique se a URL está correta no front-end

### "Failed to fetch"
- Verifique se o backend está online
- Teste acessando: `https://sua-url.railway.app/health`

### "Unauthorized"
- Verifique se `PAYEVO_SECRET_KEY` está configurada corretamente

---

## Checklist Final

- [ ] Backend deployado no Railway/Vercel/Render
- [ ] Variável `PAYEVO_SECRET_KEY` configurada
- [ ] URL do backend atualizada em `pagamento/index.html`
- [ ] URL do backend atualizada em `pixel/payment.js`
- [ ] Testado em ambiente de produção
- [ ] Chaves antigas rotacionadas (segurança)

🎉 **Pronto! Seu sistema de pagamento PIX está rodando!**
