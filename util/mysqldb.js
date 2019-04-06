//exports = {};
var mysql = require('mysql');
exports.query = function(objto, sucesso, err){
  const connection = mysql.createConnection({
    host      : "sql10.freemysqlhosting.net",
    user      : "sql10286408",
    password  : "IrlX9Tt3zG",
    database  : 'sql10286408',
    port      : 3306
  });

  if(objto.param == undefined){
    connection.query(objto.sql, function(error, results, fields){
        if(error){
          if(typeof err === 'function') err(error);
        }else{
          sucesso(results);
        connection.end();
        console.log('executou! ', fields);
      }
    });

  }else{
    connection.query(objto.sql, objto.param, function(error, results, fields){
        if(error){
          if(typeof err === 'function') err(error);
        }else{
          sucesso(results);
          connection.end();
          console.log('executou! ', fields);
        }
    });

  }
}
