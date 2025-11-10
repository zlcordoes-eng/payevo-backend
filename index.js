require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
const PORT = process.env.PORT || 3000;

// Railway usa PORT automaticamente, mas garantimos que funciona

// Middleware para adicionar CORS em TODAS as respostas
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Accept, Origin, X-Requested-With');
    
    // Responde imediatamente para requisições OPTIONS (preflight)
    if (req.method === 'OPTIONS') {
        return res.sendStatus(204);
    }
    
    next();
});

app.use(express.json());

// Configurações da Payevo
const PAYEVO_API_BASE_URL = 'https://apiv2.payevo.com.br/functions/v1';
const PAYEVO_SECRET_KEY = process.env.PAYEVO_SECRET_KEY || 'sk_like_5gOaAP5LWxx6k710bJMZwYNe1qOVNgMwZicy1igGj9H84UPR';

// Função auxiliar para fazer requisições à API da Payevo
async function payevoRequest(endpoint, method = 'GET', body = null) {
    const authHeader = 'Basic ' + Buffer.from(PAYEVO_SECRET_KEY).toString('base64');
    
    const options = {
        method: method,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': authHeader
        }
    };

    if (body && method !== 'GET') {
        options.body = JSON.stringify(body);
    }

    console.log(`[PAYEVO] Chamando: ${method} ${PAYEVO_API_BASE_URL}${endpoint}`);
    
    const response = await fetch(`${PAYEVO_API_BASE_URL}${endpoint}`, options);
    
    console.log(`[PAYEVO] Status resposta: ${response.status}`);
    
    if (!response.ok) {
        const errorText = await response.text();
        console.error(`[PAYEVO] Erro (${response.status}):`, errorText);
        throw new Error(`Payevo API error (${response.status}): ${errorText}`);
    }

    const result = await response.json();
    console.log(`[PAYEVO] Resposta:`, JSON.stringify(result, null, 2));
    return result;
}

// Endpoint para criar transação PIX
app.post('/api/create-pix', async (req, res) => {
    try {
        const { amount, description, customer, pix, metadata } = req.body;

        // Validações básicas
        if (!amount || amount < 100) {
            return res.status(400).json({ 
                error: 'Valor inválido. Mínimo: R$ 1,00 (100 centavos)' 
            });
        }

        // Validar customer
        if (!customer || !customer.document || !customer.document.number) {
            return res.status(400).json({ 
                error: 'CPF do cliente é obrigatório' 
            });
        }

        // Monta o payload para a Payevo - FORMATO CORRETO com items obrigatório
        const payevoPayload = {
            customer: {
                name: customer.name || 'Cliente',
                email: customer.email || 'cliente@example.com',
                phone: customer.phone || '11999999999',
                document: {
                    number: customer.document.number,
                    type: 'CPF'
                }
            },
            paymentMethod: 'PIX',
            pix: {
                expiresInDays: 1
            },
            amount: amount,
            items: [
                {
                    title: description || 'Doação',
                    unitPrice: amount,
                    quantity: 1,
                    externalRef: description || 'DOACAO'
                }
            ]
        };

        console.log('Criando transação Payevo:', JSON.stringify(payevoPayload, null, 2));

        // Chama a API da Payevo
        const transaction = await payevoRequest('/transactions', 'POST', payevoPayload);

        console.log('Transação criada com sucesso:', transaction.id || transaction.uuid);

        // Retorna a resposta
        res.json({
            success: true,
            transaction: transaction
        });

    } catch (error) {
        console.error('Erro ao criar transação:', error.message);
        res.status(500).json({ 
            success: false,
            error: error.message 
        });
    }
});

// Endpoint para verificar status da transação
app.get('/api/check-payment/:transactionId', async (req, res) => {
    try {
        const { transactionId } = req.params;

        console.log('Verificando transação:', transactionId);

        // Consulta a API da Payevo
        const transaction = await payevoRequest(`/transactions/${transactionId}`, 'GET');

        res.json({
            success: true,
            status: transaction.status,
            transaction: transaction
        });

    } catch (error) {
        console.error('Erro ao verificar transação:', error.message);
        res.status(500).json({ 
            success: false,
            error: error.message 
        });
    }
});

// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'ok', message: 'Payevo Backend rodando!' });
});

// Inicia o servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
    console.log(`📡 Endpoints disponíveis:`);
    console.log(`   POST /api/create-pix - Criar transação PIX`);
    console.log(`   GET  /api/check-payment/:id - Verificar status`);
    console.log(`   GET  /health - Health check`);
});
