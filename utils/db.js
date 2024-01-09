const mysql = require('mysql');
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    port: 3306,
    database: 'dbbiblioteca',
    // varias consultas em uma unica query
    multipleStatements: true
})

db.connect((erro) => {
    if (erro) {
        // arremeça o erro
        throw erro;
    }
    console.log('Conectado ao banco de dados');
});

global.db = db;
module.exports = db;