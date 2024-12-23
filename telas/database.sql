CREATE DATABASE IF NOT EXISTS piggybank;
USE piggybank;

-- Tabela TbEndereco
CREATE TABLE TbEndereco (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    nome_rua VARCHAR(50),
    n_casa NUMERIC,
    bairro VARCHAR(50),
    cidade VARCHAR(30),
    uf CHAR(2)
);

-- Tabela TbConta
CREATE TABLE TbConta (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    meta NUMERIC,
    saldo NUMERIC,
    tarefas VARCHAR(50)
);

-- Tabela TbUsuario
CREATE TABLE TbUsuario (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    login VARCHAR(30),
    senha VARCHAR(30),
    nome VARCHAR(30),
    acessos INTEGER,
    email VARCHAR(30),
    id_endereco INTEGER,
    id_conta INTEGER,
    FOREIGN KEY (id_endereco) REFERENCES TbEndereco(id),
    FOREIGN KEY (id_conta) REFERENCES TbConta(id)
);

-- Tabela TbMovimenta
CREATE TABLE TbMovimenta (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    quantidade NUMERIC,
    datast DATE,
    hora TIME,
    motivo VARCHAR(80),
    id_conta INTEGER,
    id_usuario INTEGER,
    FOREIGN KEY (id_conta) REFERENCES TbConta(id),
    FOREIGN KEY (id_usuario) REFERENCES TbUsuario(id)
);
