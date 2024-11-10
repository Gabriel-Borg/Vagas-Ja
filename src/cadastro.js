// api/cadastro.js
export default function handler(req, res) {
    if (req.method === 'POST') {
        // Lógica para lidar com o cadastro
        res.status(200).json({ message: 'Cadastro realizado com sucesso!' });
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
document.querySelector('form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const nome = document.getElementById('nome').value;
    const rg = document.getElementById('rg').value;
    const email = document.getElementById('email').value;
    const celular = document.getElementById('celular').value;
    const senha = document.getElementById('senha').value;

    try {
        const response = await fetch('/cadastro', { // Use a rota da API
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ nome, rg, email, celular, senha }),
        });

        // Verifique se a resposta é OK (status 200)
        if (!response.ok) {
            throw new Error(`Erro: ${response.status} ${response.statusText}`);
        }

        const text = await response.text(); // Obtenha a resposta como texto
        console.log(text); // Log da resposta para depuração
        
        // Tente analisar a resposta como JSON
        const data = JSON.parse(text);
        
        alert(data.message);
    } catch (error) {
        console.error('Erro ao cadastrar:', error);
        alert('Erro ao cadastrar. Tente novamente mais tarde.');
    }

});
