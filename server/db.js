const mysql = require("mysql2");

// Configuração da conexão
const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "root", // Substitua pela sua senha
    database: "piggy",
    waitForConnections: true,
    connectionLimit: 10,
});

// Exporta a conexão
module.exports = pool.promise();
