const express = require('express');
const mysql = require('mysql');
const bcrypt = require('bcrypt'); // Adicione isso para o bcrypt
const app = express();
const port = 3000;

// Configuração da conexão com o banco de dados
const db = mysql.createConnection({
  host: 'prudishly-hospitable-buzzard.data-1.use1.tembo.io',
  user: 'postgres',
  password: '535UuhtcCjQWu8gj',
  database: 'postgres'
});

// Conectar ao banco de dados
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Conectado ao banco de dados MySQL');
});

// Middleware para interpretar JSON no corpo das requisições
app.use(express.json()); // Adicione isso

// Rota para cadastro de novos clientes
app.post('/cadastro', (req, res) => {
    const { nome, rg, email, celular, senha } = req.body;

    // Criptografar a senha
    bcrypt.hash(senha, 10, (err, hashedPassword) => {
        if (err) {
            return res.status(500).json({ error: 'Erro ao criar conta.' });
        }

        // Inserir o cliente no banco de dados
        let sql = 'INSERT INTO Cliente (nome, rg, email, celular, senha) VALUES (?, ?, ?, ?, ?)';
        db.query(sql, [nome, rg, email, celular, hashedPassword], (err, results) => {
            if (err) {
                return res.status(500).json({ error: 'Erro ao inserir dados.' });
            }
            res.status(201).json({ message: 'Cliente cadastrado com sucesso!' });
        });
    });
});

// Rota para login (exemplo)
app.post('/login', (req, res) => {
    // Lógica de login
});

// Rota para obter dados do banco de dados
app.get('/dados', (req, res) => {
    let sql = 'SELECT * FROM sua_tabela';
    db.query(sql, (err, results) => {
        if (err) {
            throw err;
        }
        res.json(results);
    });
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
