create database piggy;

use piggy;

CREATE TABLE TbConta (id INTEGER AUTO_INCREMENT PRIMARY KEY, saldo NUMERIC DEFAULT 0, tarefas VARCHAR(50) DEFAULT '');
CREATE TABLE Usuario (id INTEGER AUTO_INCREMENT PRIMARY KEY, senha VARCHAR(64), nome VARCHAR(30), email VARCHAR(100), endereco VARCHAR(255), id_conta INTEGER NULL, FOREIGN KEY (id_conta) REFERENCES TbConta(id));
CREATE TABLE TbMovimenta (id INTEGER AUTO_INCREMENT PRIMARY KEY, titulo VARCHAR(100) DEFAULT '' null, gastos VARCHAR(255) DEFAULT '' null, id_conta INTEGER, FOREIGN KEY (id_conta) REFERENCES TbConta(id));


INSERT INTO Usuario (senha, nome, email, endereco, id_conta) VALUES ('senha123', 'João Silva', 'joao.silva@example.com', "rua dos búzios", NULL), ('senha456', 'Maria Oliveira', 'maria.oliveira@example.com', "brasil", NULL), ('senha789', 'Carlos Santos', 'carlos.santos@example.com', "brasil", NULL);
INSERT INTO TbConta (saldo, tarefas) VALUES (0.00, 'Nenhuma tarefa'), (0.00, 'Nenhuma tarefa'), (0.00, 'Nenhuma tarefa');
UPDATE Usuario SET id_conta = 1 WHERE email = 'joao.silva@example.com'; UPDATE Usuario SET id_conta = 2 WHERE email = 'maria.oliveira@example.com'; UPDATE Usuario SET id_conta = 3 WHERE email = 'carlos.santos@example.com';

INSERT INTO TbMovimenta (titulo, gastos, id_conta) VALUES ('compras', '200 reais em compras', 1), ('alimentação', '500 reais em alimentação', 2), ('transporte', '300 reais em transporte', 3);