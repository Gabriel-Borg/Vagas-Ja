document.querySelector('form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const nome = document.getElementById('nome').value;
    const rg = document.getElementById('rg').value;
    const email = document.getElementById('email').value;
    const celular = document.getElementById('celular').value;
    const senha = document.getElementById('senha').value;

    try {
        const response = await fetch('https://vagas-ja.vercel.app/cadastro', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ nome, rg, email, celular, senha }),
        });
    
        const text = await response.text(); // Obtenha a resposta como texto
        console.log(await response.text()); // Adicione esta linha para verificar a resposta do servidor
        console.log(text); // Log da resposta para depuração
        const data = JSON.parse(text); // Tente analisar como JSON
    
        alert(data.message);
    } catch (error) {
        console.error('Erro ao cadastrar:', error);
    }
    
});
