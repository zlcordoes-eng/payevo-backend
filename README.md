# Backend Payevo - API Intermediária

Backend Node.js para integração com a API da Payevo, resolvendo problemas de CORS e mantendo as credenciais seguras no servidor.

## 🚀 Como usar

### 1. Instalar dependências
```bash
npm install
```

### 2. Configurar variáveis de ambiente
Copie o arquivo `env.example` para `.env` e configure suas credenciais:
```bash
cp env.example .env
```

### 3. Rodar localmente
```bash
npm start
```

O servidor estará rodando em `http://localhost:3000`

## 📡 Endpoints

### POST /api/create-pix
Cria uma nova transação PIX

**Body:**
```json
{
  "amount": 3000,
  "description": "#pedido1234",
  "customer": {
    "name": "cliente456",
    "email": "cliente456@cliente.com",
    "phone": "11999999999"
  },
  "pix": {
    "expiresInDays": 1
  },
  "metadata": {
    "utm_source": "facebook",
    "utm_campaign": "campanha1"
  }
}
```

**Resposta:**
```json
{
  "success": true,
  "transaction": {
    "id": "abc123",
    "status": "pending",
    "pix": {
      "qrcode": "00020126580014br.gov.bcb.pix..."
    }
  }
}
```

### GET /api/check-payment/:transactionId
Verifica o status de uma transação

**Resposta:**
```json
{
  "success": true,
  "status": "paid",
  "transaction": { ... }
}
```

## 🌐 Deploy

### Opção 1: Railway
1. Crie uma conta em https://railway.app
2. Clique em "New Project" → "Deploy from GitHub"
3. Conecte este repositório
4. Adicione a variável `PAYEVO_SECRET_KEY` no painel
5. Deploy automático!

### Opção 2: Vercel
1. Instale o Vercel CLI: `npm i -g vercel`
2. Execute: `vercel`
3. Siga as instruções
4. Adicione as variáveis de ambiente no painel

### Opção 3: Heroku
```bash
heroku create seu-app-payevo
heroku config:set PAYEVO_SECRET_KEY=sua_chave_aqui
git push heroku main
```

## 🔒 Segurança

- ✅ CORS configurado
- ✅ Credenciais no servidor (não expostas no front-end)
- ✅ Validação de dados
- ✅ Logs de requisições

## 📝 Notas

- A chave secreta está temporariamente hardcoded no código para facilitar testes
- **IMPORTANTE:** Em produção, sempre use variáveis de ambiente
- Após deploy, rotacione suas credenciais da Payevo
