const express = require('express');
const router = express.Router();
const db = require('../utils/db.js');

// Rota para listar todos os autores cadastrados no banco de dados
router.get('/listar', (req, res) => {
  const cmd = `
    SELECT a.IdAutor, a.NoAutor, n.NoNacionalidade
    FROM tbautor AS a
    INNER JOIN tbnacionalidade AS n ON a.IdNacionalidade = n.IdNacionalidade
    ORDER BY NoNacionalidade`;

  db.query(cmd, [], (erro, listagem) => {
    if (erro) {
      return res.status(500).send(erro); // Retorna um status 500 em caso de erro
    }
    res.render('autores-lista', { resultado: listagem });
  });
});



// Rota para exibir o formulário de adição de autor
router.get('/add', (req, res) => {
  res.render('autores-add', { resultado: {} });
});



// Rota para inserir autores no banco de dados
router.post('/add', (req, res) => {
  var nome = req.body.nome;
  var nacionalidade = req.body.nacionalidade;

  const cmd = `INSERT INTO tbautor (NoAutor, IdNacionalidade) VALUES (?, ?);`;

  db.query(cmd, [nome, nacionalidade], function (erro, listagem) {
    if (erro) {
      res.send(erro); // Retorna um status 500 em caso de erro
    }
    res.redirect('/autores/listar');
  });
});



// Rota que seleciona todos os campos de um autor específico
router.get('/edit/:id', (req, res) => {
  var id = req.params.id;

  const cmd = `SELECT IdAutor, NoAutor, IdNacionalidade FROM tbautor WHERE IdAutor = ?;`;

  db.query(cmd, [id], (erro, listagem) => {
    if (erro) {
      return res.status(500).send(erro); // Retorna um status 500 em caso de erro
    }
    res.render('autores-add', { resultado: listagem[0] });
  });
});



// Rota para atualizar os dados de um autor específico
router.put('/edit/:id', (req, res) => {
  var id = req.params.id;
  var nome = req.body.nome;
  var nacionalidade = req.body.nacionalidade;

  const cmd = 'UPDATE tbautor SET NoAutor = ?, IdNacionalidade = ? WHERE IdAutor = ?';

  db.query(cmd, [nome, nacionalidade, id], function (erro, listagem) {
    if (erro) {
      res.status(500).send(erro); // Retorna um status 500 em caso de erro
      return;
    }
    res.redirect(303, '/autores/listar');
  });
});


// Rota para excluir um autor específico

router.delete('/delete/:id', (req, res) => {
  var id = req.params.id;

  const cmd = 'DELETE FROM tbautor WHERE IdAutor = ?;';

  db.query(cmd, [id], function (erro, listagem) {
    if (erro) {
      res.send(erro); // Retorna um status 500 em caso de erro
      return;
    }
    res.redirect(303, '/autores/listar');
  });
});

router.post('/autores/buscar', (req, res) => {
  var NoAutor = req.body.NoAutor;

  const cmd = `
      SELECT * FROM Cliente WHERE NoAutor LIKE ?`;

  db.query(cmd, [`%${NoAutor}%`], (erro, listagem) => {
      if (erro) {
          return res.status(500).send(erro); // Retorna um status 500 em caso de erro
      }
      res.render('autores-lista', { resultado: listagem });
  });
});


// Exporta o router para ser utilizado em outros arquivos
module.exports = router;
