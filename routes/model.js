
exports.metodo = function(req, res) {
  fs = require('fs');
  var ac = ['get', 'getall', 'salvar', 'excluir','insert','update'];
  console.log('1 teste acao:: ',req.params.model ,  req.params.acao, ac.indexOf(req.params.acao));
  if (ac.indexOf(req.params.acao) == -1) {
    console.dir(`acao invalida:: ${req.params.acao}`);
    res.send([{
      "msg": "acao invalida!"
    }]);

  } else {
    console.dir(`exec acao:: ${req.params.acao}`);
    const Metodo = require('../model/generico_dao.js');
    new Metodo(req, res)[req.params.acao]();
  }
}


/*
exports.metodo = function(req, res){
  fs = require('fs');
  var ac =['get','getall','salvar','excluir','generico'];
  console.log('1 teste acao.', ac.indexOf(req.params.acao) );
  if(ac.indexOf(req.params.acao) == -1){
    res.send([{"msg":"acao invalida!"}]);

  }else if (fs.existsSync('./model/'+req.params.model+'_dao.js')){
    Promise.all([
      new Promise((resolve, reject)=>{
            const model = require('../model/'+req.params.model+'_dao.js');
            console.dir('2 model:::',model);
            if (model[req.params.acao] != undefined){
              console.dir('executa metodo');
              resolve(model[req.params.acao](req,res))
              //model[req.params.acao](req,res)
            }else{
              console.dir('3 caso nao exista testa se tem o automatico');
              res.send([{"msg":"Metodo não existe"}]);
            }
      })
      ]).then(result=>{
        console.info('sucesso');
      }).catch(reason=>{
        console.warn('4 Failed!', reason);
        res.send([{"msg":"Error inesperado."}]);
    });

  }
}
*/
