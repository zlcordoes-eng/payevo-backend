// Teste direto da API Payevo para ver campos obrigatórios
const fetch = require('node-fetch');

const PAYEVO_API_BASE_URL = 'https://apiv2.payevo.com.br/functions/v1';
const PAYEVO_SECRET_KEY = 'sk_like_5gOaAP5LWxx6k710bJMZwYNe1qOVNgMwZicy1igGj9H84UPR';

async function testarPayevo() {
    const authHeader = 'Basic ' + Buffer.from(PAYEVO_SECRET_KEY).toString('base64');
    
    // Teste 1: Payload mínimo
    const payload1 = {
        amount: 3000,
        paymentMethod: 'PIX',
        customer: {
            name: 'Teste Cliente',
            email: 'teste@teste.com',
            phone: '11999999999',
            document: {
                type: 'CPF',
                number: '12345678909'
            }
        }
    };
    
    console.log('\n🧪 TESTE 1: Payload mínimo');
    console.log(JSON.stringify(payload1, null, 2));
    
    try {
        const response = await fetch(`${PAYEVO_API_BASE_URL}/transactions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': authHeader
            },
            body: JSON.stringify(payload1)
        });
        
        const text = await response.text();
        console.log(`\n✅ Status: ${response.status}`);
        console.log('📄 Resposta:', text);
        
        if (response.status === 500) {
            console.log('\n❌ ERRO 500 - Payload mínimo NÃO funciona');
        } else if (response.status === 400) {
            console.log('\n⚠️ ERRO 400 - Veja o campo que está faltando:');
            const json = JSON.parse(text);
            console.log(json);
        } else if (response.status === 201 || response.status === 200) {
            console.log('\n✅ SUCESSO! Este payload funciona!');
        }
        
    } catch (error) {
        console.error('❌ Erro:', error.message);
    }
    
    // Teste 2: Com todos os campos possíveis
    console.log('\n\n🧪 TESTE 2: Payload completo');
    const payload2 = {
        amount: 3000,
        paymentMethod: 'PIX',
        description: 'Doação teste',
        customer: {
            name: 'Teste Cliente',
            email: 'teste@teste.com',
            phone: '11999999999',
            document: {
                type: 'CPF',
                number: '12345678909'
            }
        },
        pix: {
            expiresInDays: 1
        },
        notification: {
            url: 'https://webhook.site/unique-url'
        }
    };
    
    console.log(JSON.stringify(payload2, null, 2));
    
    try {
        const response = await fetch(`${PAYEVO_API_BASE_URL}/transactions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': authHeader
            },
            body: JSON.stringify(payload2)
        });
        
        const text = await response.text();
        console.log(`\n✅ Status: ${response.status}`);
        console.log('📄 Resposta:', text);
        
        if (response.status === 500) {
            console.log('\n❌ ERRO 500 - Payload completo TAMBÉM NÃO funciona');
            console.log('🔍 Isso indica problema com a CHAVE ou CONFIGURAÇÃO DA CONTA');
        } else if (response.status === 400) {
            console.log('\n⚠️ ERRO 400 - Veja o campo que está faltando:');
            const json = JSON.parse(text);
            console.log(json);
        } else if (response.status === 201 || response.status === 200) {
            console.log('\n✅ SUCESSO! Este payload funciona!');
            const json = JSON.parse(text);
            console.log('PIX Code:', json.pix?.qrcode);
        }
        
    } catch (error) {
        console.error('❌ Erro:', error.message);
    }
}

console.log('🚀 Iniciando testes da API Payevo...\n');
testarPayevo().then(() => {
    console.log('\n✅ Testes concluídos!');
    process.exit(0);
}).catch(err => {
    console.error('❌ Erro fatal:', err);
    process.exit(1);
});
