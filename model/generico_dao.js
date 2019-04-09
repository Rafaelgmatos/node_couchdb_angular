/*
Developer: Rafael Matos
Descrição: Modelo de class generica 
*/


//class
class Metodo{
  // Constructor
  constructor (req, res) {
    this.config = require('../util/couchdb.js').config;
    const NodeCouchDb = require('node-couchdb')
    this.db = new NodeCouchDb(this.config);


    this.req = req;
    this.res = res;
    var inp  = req.body;
    //param de definição de codumento ou tabela
    this.model = req.params.model;

    //criar modelo negerico basedo no dto
    //this.dto = require('./dto/'+this.model+'.js')[this.model];

    this.obj = {
      modelo    : inp.modelo  ,
      tamanho   : inp.tamanho ,
      estoque   : inp.estoque ,
      vendido   : inp.vendido ,
      ativo_logico: inp.ativo_logico == undefined ? true : inp.ativo_logico
    }

    if(inp._id != undefined){
      this.obj._id  = inp._id;
    }
    if(inp._rev != undefined){
      this.obj._rev  = inp._rev;
    }

  }



  //futuras implementações
  creatdoc() {

  }


  // methods
  get() {
    this.db.get(this.model, this.req.body._id).then((data, headers, status) => {
        this.res.send(data)
    }, err => {
      console.log('data::', err);
      this.res.send([{msg:'erro', erro: err}])
    });

  };

  // class methods
  getall() {
    this.db.get(this.model, "_all_docs",{include_docs:true}).then((data, headers, status) => {
        var newdata = data.data.rows.filter( ( elem )=>{
          return elem.doc.ativo_logico === true 
        })
        .map((elem)=>{
          return elem.doc
        });
        console.log('newdata::', newdata);
        this.res.send(newdata) 
    }, err => {
      console.log('data::', err);
      this.res.send([{msg:'erro', erro: err}])
    });

  };

  // class methods
  update() {
    console.log('Update teste', this.model, this.obj)
    this.db.update(this.model, this.obj).then((result)=>{
      console.log('dados::', result)
      this.res.send([{msg:'sucesso', _id: result.data.id, _rev : result.data.rev }])
    }, err=>{
      this.res.send([{msg:'erro', erro: err}])
    })

  };


  /*
   methods
   Essa classe não do modelo generico
  */
  compra() {
    console.log('Update teste', this.model, this.obj)
    this.db.update(this.model, this.obj).then((result)=>{
      console.log('dados::', result)
      this.res.send([{msg:'sucesso', _id: result.data.id, _rev : result.data.rev }])
    }, err=>{
      this.res.send([{msg:'erro', erro: err}])
    })

  };

  // methods
  insert() {
    this.db.insert(this.model, this.obj).then((result)=>{
      console.log('dados',result );
      
      this.res.send([{msg:'sucesso', _id: result.data.id , _rev : result.data.rev}])
    }, err=>{
      this.res.send([{msg:'erro', erro: err}])
    })
  };

  // methods
  excluir() {
    this.obj.ativo_logico = false;
    this.db.update(this.model, this.obj).then((result)=>{
      console.log('dados::', result)
      this.res.send([{msg:'sucesso'}])
    }, err=>{
      this.res.send([{msg:'erro', erro: err}])
    })

  };

}

// export the class
module.exports = Metodo;
