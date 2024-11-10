const express = require('express');
const { Pool } = require('pg');
const app = express();
const port = 3000;

// Configuração da conexão com o banco de dados
const { Pool } = pg;
const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
})

// Rota para obter dados do banco de dados
app.get('/dados', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM sua_tabela');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro ao acessar o banco de dados');
  }
});

// Rota para cadastrar usuário
app.post('/cadastro', async (req, res) => {
  const { nome, rg, email, celular, senha } = req.body;

  // Aqui você deve adicionar o código para criptografar a senha
  // e realizar a inserção no banco de dados

  try {
    const query = 'INSERT INTO Cliente (nome, rg, email, celular, senha) VALUES ($1, $2, $3, $4, $5)';
    await pool.query(query, [nome, rg, email, celular, senha]);
    res.status(201).json({ message: 'Usuário cadastrado com sucesso' });
  } catch (error) {
    console.error('Erro ao cadastrar:', error);
    res.status(500).json({ message: 'Erro ao cadastrar' });
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});