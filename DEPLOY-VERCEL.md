# 🚀 DEPLOY NO VERCEL - GUIA VISUAL

## ✅ PASSO 1: Acessar Vercel
- Vá em: https://vercel.com
- Faça login (ou crie conta se ainda não tem)

## ✅ PASSO 2: Criar Novo Projeto
1. Na página inicial do Vercel, clique no botão **"Add New..."**
2. Escolha **"Project"**
3. Você verá a opção **"Import Git Repository"** ou **"Deploy"**

## ✅ PASSO 3: Fazer Upload dos Arquivos

### Opção A - Via CLI (recomendado):
1. Instale a CLI do Vercel:
   ```
   npm install -g vercel
   ```
2. Na pasta `backend-payevo`, execute:
   ```
   vercel
   ```
3. Siga as instruções (aperte Enter para aceitar os padrões)

### Opção B - Via Interface (mais fácil):
1. Na página do Vercel, procure por **"Import Project"**
2. Se não aparecer opção de upload direto, use GitHub:
   - Crie repositório no GitHub
   - Conecte o Vercel ao GitHub
   - Importe o repositório

## ✅ PASSO 4: Configurar Projeto

Quando o Vercel perguntar:
- **Framework Preset:** Deixe "Other" ou "Node.js"
- **Build Command:** Deixe vazio ou `npm install`
- **Output Directory:** Deixe vazio
- **Install Command:** `npm install`

## ✅ PASSO 5: Deploy

1. Clique em **"Deploy"**
2. Aguarde 1-2 minutos
3. ✅ **PRONTO!** O Vercel vai mostrar a URL

## ✅ PASSO 6: Copiar URL

A URL será algo como:
```
https://payevo-backend.vercel.app
```

ou

```
https://backend-payevo-abc123.vercel.app
```

**COPIE ESSA URL!** Você vai precisar dela!

## ✅ PASSO 7: Testar

Acesse no navegador:
```
https://SUA-URL-VERCEL.vercel.app/health
```

Deve aparecer:
```json
{"status":"ok","message":"Payevo Backend rodando!"}
```

Se aparecer isso, **FUNCIONOU!** ✅

---

## 🔧 PROBLEMAS?

### "Command failed"
- Certifique-se que o arquivo `vercel.json` está na pasta
- Certifique-se que o `package.json` está na pasta

### "Environment variables"
- Vá em **Settings** → **Environment Variables**
- Adicione: `PAYEVO_SECRET_KEY` com o valor da chave

### "Function timeout"
- Ignore, o Vercel aumenta o timeout automaticamente

---

## 📝 PRÓXIMOS PASSOS

Depois que o backend estiver no ar:
1. Copie a URL do Vercel
2. Atualize o front-end com essa URL
3. Faça upload do front-end para a Hostinger

**VOCÊ ESTÁ QUASE LÁ!** 🎉
