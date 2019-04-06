(function(angular) {
  'use strict';
angular.module('ngViewApp', ['ngRoute', 'ngAnimate'])
/*
  .config(['$routeProvider', '$locationProvider',
    function($routeProvider, $locationProvider) {
      $routeProvider
        .when('/', {
          templateUrl: '/layout/dashboard/dashboard.html',
          controller: 'MainCtrl',
          controllerAs: 'book',
          animation: ' fadeOut animation'
        })
        .when('/chat', {
          templateUrl: '/layout/chat/chat.html',
          controller: 'MainCtrl',
          controllerAs: 'book',
          animation: ' animated fadeInUp'
        })
        .when('/usuario', {
          templateUrl: '/layout/formularios/usuario.html',
          controller: 'MainCtrl',
          animation: ' animated fadeInUp'
        });

      $locationProvider.html5Mode(true);
  }])
  */
  /*
  ------------------------------------------------------------------------------
  Service
  ------------------------------------------------------------------------------
  */
  .service('dtService', function($http) {

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

  //.directive('required', required)
  /*
  ------------------------------------------------------------------------------
  controller cadastro
  ------------------------------------------------------------------------------
  */
  .controller('Cadastro', ['$scope','$route', '$routeParams', '$location','dtService', function MainCtrl($scope, $route, $routeParams, $location, dtService) {
      console.log('dtService', dtService, $scope);
      $scope.notificacao = new cadastrolib($scope, dtService).notificacao;
      $scope.camposInvalido = new cadastrolib($scope, dtService).camposInvalido;

      $scope.mensagem = new cadastrolib($scope, dtService).mensagem;
      $scope.salvar = new cadastrolib($scope, dtService).salvar;
      $scope.limpar = new cadastrolib($scope, dtService).limpar;
      $scope.getall = new cadastrolib($scope, dtService).getall;
      $scope.setall = new cadastrolib($scope, dtService).setall;
      $scope.excluir_generico = new cadastrolib($scope, dtService).excluir_generico;
  }])
})(window.angular);
