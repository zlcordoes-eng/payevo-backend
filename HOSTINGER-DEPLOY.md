# 🚀 Deploy na Hostinger

## Opção 1: VPS Hostinger (Node.js direto)

### Pré-requisitos
- VPS ativo na Hostinger
- Acesso SSH ao VPS
- Node.js instalado (ou instalar)

### Passo 1: Conectar via SSH
```bash
ssh root@seu-ip-vps
# Use a senha fornecida pela Hostinger
```

### Passo 2: Instalar Node.js (se não tiver)
```bash
# Atualizar sistema
apt update && apt upgrade -y

# Instalar Node.js 18.x
curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
apt install -y nodejs

# Verificar instalação
node -v
npm -v
```

### Passo 3: Instalar PM2 (gerenciador de processos)
```bash
npm install -g pm2
```

### Passo 4: Fazer upload dos arquivos

**Opção A - Via FTP/SFTP:**
1. Use FileZilla ou WinSCP
2. Conecte no seu VPS
3. Faça upload da pasta `backend-payevo` para `/var/www/backend-payevo`

**Opção B - Via Git:**
```bash
cd /var/www
git clone https://github.com/SEU-USUARIO/SEU-REPO.git
cd SEU-REPO/RB/backend-payevo
```

### Passo 5: Instalar dependências
```bash
cd /var/www/backend-payevo
npm install
```

### Passo 6: Criar arquivo .env
```bash
nano .env
```

Cole isto:
```
PORT=3000
PAYEVO_SECRET_KEY=sk_like_5gOaAP5LWxx6k710bJMZwYNe1qOVNgMwZicy1igGj9H84UPR
```

Salve: `Ctrl+X`, depois `Y`, depois `Enter`

### Passo 7: Iniciar com PM2
```bash
pm2 start index.js --name payevo-backend
pm2 save
pm2 startup
```

### Passo 8: Configurar Nginx (proxy reverso)

```bash
nano /etc/nginx/sites-available/backend-payevo
```

Cole isto (substitua `seu-dominio.com`):
```nginx
server {
    listen 80;
    server_name api.seu-dominio.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```

Ative o site:
```bash
ln -s /etc/nginx/sites-available/backend-payevo /etc/nginx/sites-enabled/
nginx -t
systemctl reload nginx
```

### Passo 9: Configurar SSL (HTTPS)
```bash
apt install certbot python3-certbot-nginx -y
certbot --nginx -d api.seu-dominio.com
```

### Passo 10: Testar
```bash
curl http://localhost:3000/health
curl https://api.seu-dominio.com/health
```

---

## Opção 2: Hospedagem Compartilhada Hostinger (Node.js App)

⚠️ **ATENÇÃO**: A hospedagem compartilhada da Hostinger tem limitações para Node.js. 

### Se sua Hostinger suporta Node.js:

1. **Acesse o hPanel da Hostinger**
2. Vá em **"Aplicativos" → "Node.js"**
3. Clique em **"Criar Aplicação"**
4. Configure:
   - **Versão Node.js**: 18.x
   - **Modo**: Production
   - **Diretório**: `/backend-payevo`
   - **Arquivo de entrada**: `index.js`

5. **Upload via FTP**:
   - Use o gerenciador de arquivos da Hostinger
   - Faça upload da pasta `backend-payevo`

6. **Configurar variáveis de ambiente**:
   - No painel Node.js da Hostinger
   - Adicione: `PAYEVO_SECRET_KEY=sk_like_5gOaAP5LWxx6k710bJMZwYNe1qOVNgMwZicy1igGj9H84UPR`

7. **Iniciar aplicação** no painel

---

## Opção 3: Usar Railway/Vercel (MAIS FÁCIL!)

⚠️ **Se sua Hostinger NÃO suporta Node.js bem**, recomendo hospedar:
- **Front-end** → Hostinger (arquivos HTML/JS/CSS)
- **Backend** → Railway.app (grátis, fácil, rápido)

### Vantagens:
- ✅ Deploy em 2 minutos
- ✅ HTTPS automático
- ✅ Escalável
- ✅ Logs em tempo real
- ✅ Grátis para começar

---

## Após o Deploy

### Atualize o front-end

Em `RB/pagamento/index.html`, linha ~176:
```javascript
// Se VPS com domínio:
const BACKEND_API_URL = "https://api.seu-dominio.com";

// Se Railway:
const BACKEND_API_URL = "https://seu-app.railway.app";
```

Em `RB/pixel/payment.js`, linha ~148:
```javascript
const baseUrl = window.BACKEND_API_URL || "https://api.seu-dominio.com";
```

---

## Comandos Úteis (VPS)

```bash
# Ver logs
pm2 logs payevo-backend

# Reiniciar
pm2 restart payevo-backend

# Status
pm2 status

# Parar
pm2 stop payevo-backend

# Ver uso de memória
pm2 monit
```

---

## Problemas Comuns

### "Cannot find module"
```bash
cd /var/www/backend-payevo
npm install
pm2 restart payevo-backend
```

### "Port 3000 already in use"
```bash
# Mude a porta no .env
echo "PORT=3001" >> .env
pm2 restart payevo-backend
```

### "EACCES: permission denied"
```bash
chown -R www-data:www-data /var/www/backend-payevo
```

---

## Qual opção você tem na Hostinger?

- [ ] VPS (Servidor Virtual)
- [ ] Hospedagem Compartilhada com Node.js
- [ ] Hospedagem Compartilhada simples (sem Node.js)

Se for hospedagem compartilhada simples, **recomendo usar Railway para o backend** e deixar só o front-end na Hostinger!
