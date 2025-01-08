const express = require("express");
const bcrypt = require('bcrypt');
const mysql = require('mysql2/promise');
const cors = require("cors");
const path = require("path");

// Configurações
const app = express();
const PORT = 3000;
app.use(cors());
app.use(express.json());

// Serve arquivos estáticos da pasta 'public'
app.use(express.static('../public'));

// Rota para servir o arquivo index.html (opcional)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Configuração do banco de dados
const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'piggy'
};

// CRUD: Rotas

// Rota de cadastro
app.post('/cadastro', async (req, res) => {
    const { nome, email, senha, endereco } = req.body;

    console.log("req body, backend ->", req.body);

    if (!nome || !email || !senha, !endereco) {
        return res.status(400).json({ message: 'Preencha todos os campos.' });
    }

    try {
        const connection = await mysql.createConnection(dbConfig);

        // Verificar se o email já está cadastrado
        const [rows] = await connection.execute('SELECT * FROM Usuario WHERE email = ?', [email]);
        if (rows.length > 0) {
            return res.status(400).json({ message: 'E-mail já cadastrado.' });
        }

        // Iniciar a transação para garantir que ambos (usuário e conta) sejam criados
        await connection.beginTransaction();
        console.log("Iniciar a transação para garantir que ambos (usuário e conta) sejam criados")

         // 1. Criar a conta vazia
         const [resultConta] = await connection.execute('INSERT INTO TbConta (saldo, tarefas) VALUES (?, ?)', [0.00, '']);
         const idConta = resultConta.insertId;
         console.log("1. Criou uma conta vazia")
         console.log("Conta criada com ID:", idConta);

        // 2. Criar o usuário e associar à conta recém-criada
        await connection.execute('INSERT INTO Usuario (senha, nome, email, endereco, id_conta) VALUES (?, ?, ?, ?, ?)', [senha, nome, email, endereco, idConta]);
        console.log("2. Criou o usuário e associar à conta recém-criada")
        console.log('Inserindo em Usuario:', [senha, nome, email, endereco, idConta]);

        // Commit da transação
        await connection.commit();
        console.log("Commit da transação")

        await connection.end(); 
        console.log("fecha conexão com o banco")       

        res.status(201).json({ message: 'Usuário cadastrado com sucesso.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao cadastrar usuário.' });
    }
});

// Rota de login
app.post('/login', async (req, res) => {
    const { email, senha } = req.body;

    console.log("req body, login ->", req.body);

    if (!email || !senha) {
        return res.status(400).json({ message: 'Preencha todos os campos.' });
    }

    try {
        // Conexão com o banco de dados
        const connection = await mysql.createConnection(dbConfig);
        console.log("inicia conexão banco para login");

         // Consultar usuário pelo email
        const [rows] = await connection.execute('SELECT * FROM Usuario WHERE email = ?', [email]);
        
        if (rows.length === 0) {
            await connection.end();
            return res.status(404).json({ message: 'Usuário não encontrado.' });        }

        const usuario = rows[0];

        // Validar senha (aqui estamos comparando diretamente; considere usar bcrypt para senhas criptografadas)
        if (usuario.senha !== senha) {
            await connection.end();
            return res.status(401).json({ message: 'Senha incorreta.' });
        }

        // Fechar a conexão
        await connection.end();

        // Retornar sucesso com informações do usuário
        res.status(200).json({
            message: 'Login realizado com sucesso.',
            user: {
                id: usuario.id,
                nome: usuario.nome,
                email: usuario.email,
                endereco: usuario.endereco,
                idConta: usuario.id_conta
            }
        });

        
        // await connection.end();

        // if (rows.length === 0 || !(await bcrypt.compare(senhaRequest, rows[0].senha))) {
        //     return res.status(401).json({ message: 'E-mail ou senha inválidos.' });
        // }

        // const user = rows[0];
        // res.json({ message: 'Login realizado com sucesso.', nomeUsuario: user.nome });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao realizar login.' });
    }
});

// Rota para atualizar saldo
app.put('/saldo', async (req, res) => {
    const { id, saldo } = req.body;

    if (id === undefined || saldo === undefined) {
        return res.status(400).json({ message: 'ID ou saldo não fornecido.' });
    }

    try {
        const connection = await mysql.createConnection(dbConfig);

        await connection.execute('UPDATE TbConta SET saldo = ? WHERE id = ?', [saldo, id]);
        await connection.end();

        res.json({ message: 'Saldo atualizado com sucesso.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao atualizar saldo.' });
    }
});

// Rota para cadastrar uma nova despesa
app.post('/despesas/cadastrar', async (req, res) => {
    const { titulo, descricao } = req.body;

    console.log("Recebido do cliente:", req.body);

    if (!titulo || !descricao) {
        return res.status(400).json({ message: "Título e descrição são obrigatórios." });
    }

    try {
        const connection = await mysql.createConnection(dbConfig);
        console.log("Conexão com o banco estabelecida.");

        const query = 'INSERT INTO TbMovimenta (titulo, gastos) VALUES (?, ?)';
        console.log("Executando SQL:", query, "Parâmetros:", [titulo, descricao]);

        const [result] = await connection.execute(query, [titulo, descricao]);
        console.log("Resultado da execução:", result);

        await connection.end();
        console.log("Conexão encerrada.");

        res.status(201).json({ message: 'Despesa cadastrada com sucesso.' });
    } catch (error) {
        console.error("Erro ao executar SQL:", error.message);
        res.status(500).json({ message: 'Erro ao cadastrar despesa.' });
    }
});

// Rota para listar todas as despesas
app.get('/despesas/ver', (req, res) => {
    const query = 'SELECT * FROM TbMovimenta';
    
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Erro ao carregar despesas' });
        }
        res.status(200).json(results);
    });
});

// Rota para editar uma despesa
app.put('/despesas/ver:id', (req, res) => {
    const { titulo, descricao } = req.body;
    const { id } = req.params;

    const query = 'UPDATE TbMovimenta SET titulo = ?, descricao = ? WHERE id = ?';

    db.query(query, [titulo, descricao, id], (err, result) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Erro ao editar despesa' });
        }
        res.status(200).json({ success: true, message: 'Despesa editada com sucesso!' });
    });
});

// Rota para deletar uma despesa
app.delete('/despesas/deletar:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM TbMovimenta WHERE id = ?';

    db.query(query, [id], (err, result) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Erro ao deletar despesa' });
        }
        res.status(200).json({ success: true, message: 'Despesa deletada com sucesso!' });
    });
});

// Inicializa o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
