// Teste com formato EXATO da documentação Payevo
const fetch = require('node-fetch');

const PAYEVO_API_BASE_URL = 'https://apiv2.payevo.com.br/functions/v1';
const PAYEVO_SECRET_KEY = 'sk_like_5gOaAP5LWxx6k710bJMZwYNe1qOVNgMwZicy1igGj9H84UPR';

async function testarFormatoCorreto() {
    const authHeader = 'Basic ' + Buffer.from(PAYEVO_SECRET_KEY).toString('base64');
    
    // Formato EXATO da documentação
    const payload = {
        customer: {
            name: "Jorge Santos",
            email: "jorge.santos@gmail.com",
            phone: "11983272733",
            document: {
                number: "04281554645",
                type: "CPF"
            }
        },
        paymentMethod: "PIX",
        pix: {
            expiresInDays: 1
        },
        amount: 100,
        items: [
            {
                title: "Produto Teste 01",
                unitPrice: 100,
                quantity: 1,
                externalRef: "PRODTESTE01"
            }
        ]
    };
    
    console.log('\n🧪 Testando com formato EXATO da documentação');
    console.log(JSON.stringify(payload, null, 2));
    
    try {
        const response = await fetch(`${PAYEVO_API_BASE_URL}/transactions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'accept': 'application/json',
                'authorization': authHeader
            },
            body: JSON.stringify(payload)
        });
        
        const text = await response.text();
        console.log(`\n✅ Status: ${response.status}`);
        console.log('📄 Resposta:', text);
        
        if (response.status === 201 || response.status === 200) {
            console.log('\n🎉🎉🎉 SUCESSO! ENCONTRAMOS O FORMATO CORRETO! 🎉🎉🎉');
            const json = JSON.parse(text);
            console.log('\n📱 Código PIX:', json.pix?.qrcode);
        } else if (response.status === 500) {
            console.log('\n❌ Ainda erro 500 - pode precisar de mais campos');
        } else if (response.status === 400) {
            console.log('\n⚠️ Erro 400 - Veja qual campo está faltando:');
            const json = JSON.parse(text);
            console.log(json);
        }
        
    } catch (error) {
        console.error('❌ Erro:', error.message);
    }
}

console.log('🚀 Testando formato correto da Payevo...\n');
testarFormatoCorreto().then(() => {
    console.log('\n✅ Teste concluído!');
    process.exit(0);
}).catch(err => {
    console.error('❌ Erro fatal:', err);
    process.exit(1);
});
