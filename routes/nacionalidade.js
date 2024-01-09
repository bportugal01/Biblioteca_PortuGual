const express = require('express');
const router = express.Router();
const db = require('../utils/db.js');

// Rota para listar todos os autores cadastrados no banco de dados
router.get('/listar', (req, res) => {
  const cmd = `
    SELECT IdNacionalidade, NoNacionalidade
    FROM tbNacionalidade order by NoNacionalidade`;

  db.query(cmd, [], (erro, listagem) => {
    if (erro) {
    res.send(erro); // Retorna um status 500 em caso de erro
    }
    res.json( { resultado: listagem });
  });
});



// Exporta o router para ser utilizado em outros arquivos
module.exports = router;
