const db = require('../util/mysqldb.js');

//get registro - param id
exports.get = function (req , res, cb){
  //parametos
  var input = req.boby
  //query objeto
  var objeto={
    sql :`SELECT
            id,
            modelo,
            tamanho,
            estoque,
            vendido
          FROM sql10286408.produto
          WHERE id = ?`
    ,param : [input.id]
    }

  //exec query
  db.query(objeto,function(result){
    //valid callback
    if(typeof cb == 'function'){
      cb(result)
    }else{
      res.send(result)
    }
  })

}


//getALL PRODUTOS
exports.getall= function (req , res){
  var input = req.boby
  var objeto={
    sql :`SELECT
            id,
            modelo,
            tamanho,
            estoque,
            vendido
          FROM sql10286408.produto`
    }

  db.query(objeto,function(dados){
    console.log('dados *** ', dados );
    res.send(dados)
  })


}

//SALVAR PRODUTOS
exports.salvar= function (req , res){
  let lib = this;
  lib.get(req , res, (result)=>{
    if(result.leght > 0){
      lib.update(req , res)
    }else{
      lib.insert(req , res)
    }
  })

}

//INSERT NA TABELA PRODUTO
exports.insert= function (req , res){
  //parametos
  var input = req.boby
  //query objeto
  var objeto={
    sql :`INSERT INTO sql10286408.produto
            ( modelo, tamanho, estoque, vendido)
          VALUES
            ( ?, ?, ?, ?)`,
    param : [
      input.modelo
      , input.tamanho
      , input.estoque
      , input.vendido == undefined ? 0 :input.vendido
     ]
    }

  //exec query
  db.query(objeto,function(result){
    //valid callback
    if(typeof cb == 'object'){
      cb(result)
    }else{
      res.send(result)
    }
  })

}

//UPDATE NA TABELA PRODUTO
exports.update= function (req , res){
  //parametos
  var input = req.boby
  //query objeto
  var objeto={
    sql :`UPDATE sql10286408.produto
          SET
          modelo =   ? ,
          tamanho =  ? ,
          estoque =  ? ,
          vendido =  ?
          WHERE id = ?`,
    param : [
        input.modelo
      , input.tamanho
      , input.estoque
      , input.vendido == undefined ? 0 :input.vendido
      , input.id

     ]
    }

  //exec query
  db.query(objeto,function(result){
    //valid callback
    if(typeof cb == 'object'){
      cb(result)
    }else{
      res.send(result)
    }
  })

}



/*
exports.sessao_login= function (req , res){

  var input = req.boby
  var objeto={
    sql :'select \
            id\
            ,email\
            ,pessoa_id\
            ,ativo\
          from  login\
          where email = ?\
          and   senha = md5( ? )\
          and   delete = true',
    param : [input.email, input.senha]
    }


  db.query(objeto,function(dados){
    console.log('dados *** ', dados );
    res.send(dados)
  })

}
*/
