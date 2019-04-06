


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


  this.obj = {
    modelo    : inp.modelo  ,
    tamanho   : inp.tamanho ,
    estoque   : inp.estoque ,
    vendido   : inp.vendido,
    ativo_logico: inp.ativo_logico == undefined ? true : inp.ativo_logico
  }

  if(inp.id != undefined){
    this.obj._id  = inp.id;
  }


}

// class methods
Metodo.prototype.get = function() {
  this.db.get(this.model, this.req.body.id).then((data, headers, status) => {
      this.res.send(data)
  }, err => {
    console.log('data::', err);
    this.res.send([{msg:'erro'}])
  });

};

// class methods
Metodo.prototype.getall = function() {
  this.db.get(this.model, "_all_docs").then((data, headers, status) => {
      this.res.send(data)
  }, err => {
    console.log('data::', err);
    this.res.send([{msg:'erro'}])
  });

};

// class methods
Metodo.prototype.update = function() {
  this.db.update(this.model, this.obj).then((result)=>{
    this.res.send([{msg:'sucesso', id: result.data.id}])
  }, err=>{
    this.res.send([{msg:'erro'}])
  })

};

// class methods
Metodo.prototype.insert = function() {
  this.db.insert(this.model, this.obj).then((result)=>{
    this.res.send([{msg:'sucesso', id: result.data.id}])
  }, err=>{
    this.res.send([{msg:'erro'}])
  })
};

// class methods
Metodo.prototype.update = function() {

};

// export the class
module.exports = Metodo;
