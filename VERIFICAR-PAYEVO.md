# 🔍 Verificar Configurações da Payevo

Se você está recebendo **erro 500** ao criar transações PIX, siga este checklist:

## ✅ Checklist de Verificação

### 1. **Verificar Ambiente (Sandbox vs Produção)**

No painel da Payevo:
- Vá em **"Settings"** ou **"Configurações"**
- Verifique se está em modo **"Sandbox"** (teste) ou **"Produção"**
- A chave que você está usando (`sk_like_...`) deve corresponder ao ambiente

**Chaves de Sandbox** geralmente começam com:
- `sk_test_...`
- `sk_sandbox_...`

**Chaves de Produção** geralmente começam com:
- `sk_live_...`
- `sk_prod_...`

### 2. **Verificar se PIX está habilitado**

- Vá em **"Payment Methods"** ou **"Métodos de Pagamento"**
- Certifique-se que **PIX está ATIVADO**
- Pode haver configurações adicionais necessárias

### 3. **Verificar Limites da Conta**

- Vá em **"Account"** → **"Limits"**
- Verifique se há limites de:
  - Valor mínimo/máximo por transação
  - Número de transações por dia
  - Transações em modo teste

### 4. **Verificar API Logs (IMPORTANTE!)**

- Vá em **"Developers"** → **"API Debug Logs"**
- Procure pela última requisição que você fez
- Clique nela para ver o **erro detalhado**
- **Tire um print e me envie!**

### 5. **Verificar Webhooks/Callbacks**

Alguns gateways exigem:
- URL de callback configurada
- URL de webhook para notificações

### 6. **Testar com dados de teste**

Se estiver em Sandbox, use CPFs de teste:
- `111.111.111-11`
- `222.222.222-22`
- `333.333.333-33`

### 7. **Verificar Conta Bancária**

Para PIX funcionar em produção, você pode precisar:
- Cadastrar conta bancária
- Validar identidade
- Ativar recebimento PIX

---

## 🚨 Possíveis Causas do Erro 500

### Causa 1: Conta não verificada
- **Solução:** Complete o processo de verificação da conta

### Causa 2: PIX não configurado
- **Solução:** Configure uma chave PIX no painel

### Causa 3: Ambiente errado
- **Solução:** Use chave de sandbox para testes ou produç��o para real

### Causa 4: Limite atingido
- **Solução:** Verifique limites ou entre em contato com suporte

### Causa 5: Campo obrigatório faltando
- **Solução:** Veja os API Logs para identificar o campo

---

## 📞 Suporte Payevo

Se nada funcionar, entre em contato:

- **Painel:** Menu "Suporte" ou "Help"
- **E-mail:** Verifique no painel da Payevo
- **Chat:** Se disponível no site

---

## 🧪 Teste Alternativo

Enquanto resolve, você pode:

1. **Testar com outro gateway** (MercadoPago, Asaas, etc)
2. **Usar modo simulação** (PIX falso para testes de UX)
3. **Continuar com localhost** para demonstração

---

## ❓ Me Envie

Para eu te ajudar melhor, me envie prints de:

1. ✅ **API Debug Logs** da Payevo (erro detalhado)
2. ✅ **Configurações de PIX** no painel
3. ✅ **Tipo de conta** (Sandbox/Produção)
4. ✅ **Limites** configurados

Com essas informações, consigo identificar o problema exato! 🎯
