var app = angular.module('app',[]);
app.service('dtService', function($http) {
  this.getall = function( url, dto, cb) {
    $http.post(url, dto).then((dt)=>{
      if(dt.status == 200){
        cb(dt.data);
      }else{
        cb([{msg: 'Com erros'}]);
      }
    });
  };

  this.salvar = function( url, dto, cb) {
    $http.post(url, dto).then((dt)=>{
      if(dt.status == 200){
        cb(dt.data);
      }else{
        cb([{msg: 'Com erros'}]);
      }
    });
  };

  this.excluir = function( url, dto, cb) {
    $http.post(url, dto).then((dt)=>{
      if(dt.status == 200){
        cb(dt.data);
      }else{
        cb([{msg: 'Com erros'}]);
      }
    });
  };

})

app.controller('Cadastro', ['$scope','dtService', function($scope, dtService) {
  $scope.notificacao = new cadastrolib($scope, dtService).notificacao;
  $scope.camposInvalido = new cadastrolib($scope, dtService).camposInvalido;
  $scope.mensagem = new cadastrolib($scope, dtService).mensagem;
  $scope.salvar = new cadastrolib($scope, dtService).salvar;
  $scope.limpar = new cadastrolib($scope, dtService).limpar;
  $scope.getall = new cadastrolib($scope, dtService).getall;
  $scope.setall = new cadastrolib($scope, dtService).setall;
  $scope.excluir = new cadastrolib($scope, dtService).excluir;
}]);