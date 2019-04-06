


// Constructor
function Metodo(req, res) {

  this.config = require('../util/couchdb.js').config;
  const NodeCouchDb = require('node-couchdb')
  this.db = new NodeCouchDb(this.config);


  this.req = req;
  this.res = res;
  var inp  = req.body;
  this.model = req.params.model;
  console.log('model::',req.params )

  //criar modelo negerico com dto
  //this.dto = require('./dto/'+this.model+'.js')[this.model];

  this.obj = {
    modelo    : inp.modelo  ,
    tamanho   : inp.tamanho ,
    estoque   : inp.estoque ,
    vendido   : inp.vendido ,
    ativo_logico: inp.ativo_logico == undefined ? true : inp.ativo_logico
  }

  if(inp.id != undefined){
    this.obj._id  = inp.id;
  }
  if(inp.id != undefined){
    this.obj._rev  = inp._rev;
  }


}

//futuras implementações
Metodo.prototype.creatdoc = function() {

}


// class methods
Metodo.prototype.get = function() {
  this.db.get(this.model, this.req.body._id).then((data, headers, status) => {
      this.res.send(data)
  }, err => {
    console.log('data::', err);
    this.res.send([{msg:'erro', erro: err}])
  });

};

// class methods
Metodo.prototype.getall = function() {
  this.db.get(this.model, "_all_docs",{include_docs:true}).then((data, headers, status) => {
      newdata = data.data.rows.map( function( elem ) {
        if(elem.doc.ativo_logico === true) return elem.doc
      });
      this.res.send(newdata) 
  }, err => {
    console.log('data::', err);
    this.res.send([{msg:'erro', erro: err}])
  });

};

// class methods
Metodo.prototype.update = function() {
  this.db.update(this.model, this.obj).then((result)=>{
    this.res.send([{msg:'sucesso', _id: result.data.id, _rev : result.data.rev }])
  }, err=>{
    this.res.send([{msg:'erro', erro: err}])
  })

};

// class methods
Metodo.prototype.insert = function() {
  this.db.insert(this.model, this.obj).then((result)=>{
    console.log('dados',result );
    
    this.res.send([{msg:'sucesso', _id: result.data.id , _rev : result.data.rev}])
  }, err=>{
    this.res.send([{msg:'erro', erro: err}])
  })
};

// class methods
Metodo.prototype.excluir = function() {
  this.obj.ativo_logico = false;
  this.db.update(this.model, this.obj).then((result)=>{
    this.res.send([{msg:'sucesso'}])
  }, err=>{
    this.res.send([{msg:'erro', erro: err}])
  })

};

// export the class
module.exports = Metodo;
