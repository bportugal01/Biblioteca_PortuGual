// Importa o módulo express e cria uma instância do router
var express = require('express');
var router = express.Router();
var db = require('../utils/db.js');

//-------------------------------------------------------------------------------------------------
/* GET home page. */
// Rota para a página inicial (GET /)
router.get('/', function (req, res, next) {
  // Renderiza a página 'index' com o título 'Bruno Gatão'
  res.render('index', { title: 'Bruno Lindo' });
});



//-------------------------------------------------------------------------------------------------
// Exporta o router para ser utilizado em outros arquivos
module.exports = router;


