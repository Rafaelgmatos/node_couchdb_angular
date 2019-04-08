
exports.metodo = function(req, res) {
  fs = require('fs');
  var ac = ['get', 'getall', 'salvar', 'compra','excluir','insert','update'];
  if (ac.indexOf(req.params.acao) == -1) {
    console.dir(`acao invalida:: ${req.params.acao}`);
    res.send([{
      "msg": "acao invalida!"
    }]);

  } else {
    console.dir(`exec acao:: ${req.params.acao}`);
    //const Metodo = require('../model/'+req.params.model+'_dao.js'); //duas opções 
    const Metodo = require('../model/generico_dao.js');
    new Metodo(req, res)[req.params.acao]();
  }
}

