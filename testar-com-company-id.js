// Teste com Company ID da Payevo
const fetch = require('node-fetch');

const PAYEVO_API_BASE_URL = 'https://apiv2.payevo.com.br/functions/v1';
const PAYEVO_SECRET_KEY = 'sk_like_5gOaAP5LWxx6k710bJMZwYNe1qOVNgMwZicy1igGj9H84UPR';
const PAYEVO_COMPANY_ID = '080faefb-4484-49b8-b929-334a47a89624';

async function testarComCompanyId() {
    const authHeader = 'Basic ' + Buffer.from(PAYEVO_SECRET_KEY).toString('base64');
    
    const payload = {
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
    
    // TESTE 1: Company ID no header
    console.log('\n🧪 TESTE 1: Company ID no header X-Company-Id');
    try {
        const response = await fetch(`${PAYEVO_API_BASE_URL}/transactions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': authHeader,
                'X-Company-Id': PAYEVO_COMPANY_ID
            },
            body: JSON.stringify(payload)
        });
        
        const text = await response.text();
        console.log(`Status: ${response.status}`);
        console.log('Resposta:', text);
        
        if (response.status === 201 || response.status === 200) {
            console.log('✅ SUCESSO COM COMPANY ID NO HEADER!');
            return;
        }
    } catch (error) {
        console.error('Erro:', error.message);
    }
    
    // TESTE 2: Company ID no payload
    console.log('\n🧪 TESTE 2: Company ID no payload (companyId)');
    const payload2 = { ...payload, companyId: PAYEVO_COMPANY_ID };
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
        console.log(`Status: ${response.status}`);
        console.log('Resposta:', text);
        
        if (response.status === 201 || response.status === 200) {
            console.log('✅ SUCESSO COM COMPANY ID NO PAYLOAD!');
            return;
        }
    } catch (error) {
        console.error('Erro:', error.message);
    }
    
    // TESTE 3: Company ID na URL
    console.log('\n🧪 TESTE 3: Company ID na URL');
    try {
        const response = await fetch(`${PAYEVO_API_BASE_URL}/companies/${PAYEVO_COMPANY_ID}/transactions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': authHeader
            },
            body: JSON.stringify(payload)
        });
        
        const text = await response.text();
        console.log(`Status: ${response.status}`);
        console.log('Resposta:', text);
        
        if (response.status === 201 || response.status === 200) {
            console.log('✅ SUCESSO COM COMPANY ID NA URL!');
            return;
        }
    } catch (error) {
        console.error('Erro:', error.message);
    }
    
    // TESTE 4: Bearer token ao invés de Basic
    console.log('\n🧪 TESTE 4: Bearer token ao invés de Basic');
    try {
        const response = await fetch(`${PAYEVO_API_BASE_URL}/transactions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${PAYEVO_SECRET_KEY}`
            },
            body: JSON.stringify(payload)
        });
        
        const text = await response.text();
        console.log(`Status: ${response.status}`);
        console.log('Resposta:', text);
        
        if (response.status === 201 || response.status === 200) {
            console.log('✅ SUCESSO COM BEARER TOKEN!');
            return;
        }
    } catch (error) {
        console.error('Erro:', error.message);
    }
    
    console.log('\n❌ Nenhum formato funcionou. O problema está na conta/chave Payevo.');
}

console.log('🚀 Testando diferentes formas de enviar Company ID...\n');
testarComCompanyId().then(() => {
    console.log('\n✅ Testes concluídos!');
    process.exit(0);
}).catch(err => {
    console.error('❌ Erro fatal:', err);
    process.exit(1);
});
