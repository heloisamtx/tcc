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
    password: 'root',
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
    const { titulo, descricao, idConta } = req.body;

    console.log("Recebido do cliente:", req.body);
    
    if (!titulo || !descricao) {
        return res.status(400).json({ message: "Título e descrição são obrigatórios." });
    }

    try {
        const connection = await mysql.createConnection(dbConfig);
        console.log("Conexão com o banco estabelecida.");

        const query = 'INSERT INTO TbMovimenta (titulo, gastos, id_conta) VALUES (?, ?, ?)';
        console.log("Executando SQL:", query, "Parâmetros:", [titulo, descricao, idConta]);

        const [result] = await connection.execute(query, [titulo, descricao, idConta]);
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
app.get('/despesas/ver/:idConta', async (req, res) => {
    const { idConta } = req.params;

    try {
        // Estabelece a conexão com o banco de dados
        const connection = await mysql.createConnection(dbConfig);
        console.log("Conexão com o banco estabelecida.");

        // Query para buscar as despesas com base no idConta
        const query = 'SELECT id, titulo, gastos, id_conta FROM TbMovimenta WHERE id_conta = ?';
        console.log("Executando SQL:", query, "Parâmetros:", [idConta]);

        const [rows] = await connection.execute(query, [idConta]);
        console.log("Despesas encontradas:", rows);


        // Encerra a conexão com o banco
        await connection.end();
        console.log("Conexão encerrada.");
        
        console.log("Despesas encontradas (com ID):", JSON.stringify(rows, null, 2));


        // Retorna os dados encontrados para o frontend

        res.status(200).json(rows);
    } catch (error) {
        console.error("Erro ao executar SQL:", error.message);
        res.status(500).json({ message: 'Erro ao buscar despesas.', error: error.message });
    }
});

// Rota para deletar uma conta com base no idConta
app.delete('/contas/deletar/:idConta', async (req, res) => {
    console.log("CHEGUEI NO BACKEND PRA DELETAR");
    const { idConta } = req.params;

    console.log("CHEGUEI NO BACKEND PRA DELETAR");


    try {
        // Estabelece a conexão com o banco de dados
        console.log("Requisição recebida para deletar conta com id:", idConta);
        const connection = await mysql.createConnection(dbConfig);
        console.log("Conexão com o banco estabelecida PARA DELETAR A CONTA.");

        console.log("VAI COMEÇAR A PUTARIA");

        await connection.execute('DELETE FROM TbMovimenta WHERE id_conta = ?', [idConta]);
        await connection.execute('DELETE FROM Usuario WHERE id_conta = ?', [idConta]);



        // Query para deletar a conta
        const query = 'DELETE FROM TbConta WHERE id = ?';
        console.log("Executando SQL:", query, "Parâmetro:", idConta);

        console.log("TERMINOU A PUTARIA");


        const [result] = await connection.execute(query, [idConta]);

        // Encerra a conexão com o banco
        await connection.end();
        console.log("Conexão encerrada.");

        // Verifica se a conta foi realmente deletada
        if (result.affectedRows === 0) {
            console.log("Nenhuma conta encontrada com o ID fornecido.");
            return res.status(404).json({ message: "Conta não encontrada." });
        } else {
            console.log("Conta deletada com sucesso.");
            return res.status(200).json({ success: true, message: "Conta deletada com sucesso." });
        }

        
    } catch (error) {
        console.error("Erro ao deletar conta:", error.message);
        return res.status(500).json({ message: 'Erro ao deletar conta.', error: error.message });
    }
});


// Inicializa o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
