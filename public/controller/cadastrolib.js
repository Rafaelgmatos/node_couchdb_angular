function cadastrolib($scope, dtService) {

    this.excluir = (model) => {
      console.log('excluir:', model);
      if($scope[model+'_dto'] == undefined){
        //toastr.success('Selecione um registro para excluir!', 'Alerta');
      }else{
        //$scope.mensagem('excluir', function() {
            var url = '/model/'+model+'/excluir/';
            var dto = $scope[model+'_dto'];
            dtService.excluir(url, dto, function(dt){
              if(dt[0].msg == 'sucesso'){
                $scope.limpar(model);
              }else{
                console.log('Error[msg]:', dt);
              }
            });
  
        //})
      }
  
    }
  /*
  -------------------------------------------------------------------------------
  */
    this.salvar = (model) => {     
      //if ($scope[model].$valid) {
        var valido = true;
        var url = '/model/'+model;
        var dto = $scope[model + '_dto'];
        if(dto != undefined && dto.id == undefined){
          url +='/insert'
        }else if(dto != undefined){
          url +='/update'
        }
        var msgerror = [];
        dtService.salvar(url, dto, function(dt) {
            if(dt[0].msg =='sucesso'){
              $scope[model + '_dto'] = angular.extend($scope[model + '_dto'], dt[0]);
              //toastr.success( 'Sucesso', '' );
              $("#idmodal").attr({"style":"display: block;"});
            }else{
              toastr.error( dt[i].msg, dt[i].titulo );
            }
        });
      /*} else {
        $scope.camposInvalido(model);
        toastr.error('* obrigatorios!', 'Preencha campos');
      }*/
    }
    /*
    -------------------------------------------------------------------------------
    */
    this.camposInvalido =(model)=>{
      var forms = document.getElementsByClassName('formvalidacao');
      var validation = Array.prototype.filter.call(forms, function(form) {
          form.classList.add('was-validated');
      });
    }
    /*
    -------------------------------------------------------------------------------
    */
    this.getall = (model, filtros) => {
      var url = '/model/'+model+'/getall';
      dtService.getall(url, {}, function(dt) {
        $scope.produto_lista = dt;
      });
    }
    /*
    -------------------------------------------------------------------------------
    */
    this.limpar = (model) => {
      $scope[model] = {};
      $scope[model + '_dto'] = {};
    }
    /*
    -------------------------------------------------------------------------------
    */
    this.setall = (model, registro) => {
      $scope[model + '_dto'] = registro;
    }
    /*
    -------------------------------------------------------------------------------
    */
    this.mensagem = (type, cb) => {
  
      swal({
        title: 'Confirma exclusão?',
        text: "Você não poderá recuperar este registro!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Sim, Deletar!',
        animation: false,
        customClass: 'animated fadeInUp'
      }).then((result) => {
        console.log('result.value:::', result.value);
        if (result.value) {
          cb()
          //swal( 'Deleted!', 'Your file has been deleted.', 'success' )
        }
      })
    }
  
  
  /*
    this.notificacao = (type, object) => {
      var msg = {};
      switch (type) {
        case 'sucesso':
          var ob = {msg: 'Ação realizado com sucesso', titulo:'Operação'}
          ob = object == undefined ? ob : object ;
          toastr.success(ob.msg, ob.titulo);
          break;
  
        case 'info':
          var ob ={msg: 'Ação realizado com informativo', titulo:'Operação'}
          ob = object == undefined ? ob : object ;
          toastr.info(ob.msg, ob.titulo);
          break;
  
        case 'atencao':
          var ob ={msg: 'Ação realizado com atenção', titulo:'Operação'}
          ob = object == undefined ? ob : object ;
          toastr.warning(ob.msg, ob.titulo);
          break;
  
        case 'error':
          var ob ={msg: 'Ação realizado com error', titulo:'Operação'}
          ob = object == undefined ? ob : object ;
          toastr.error(ob.msg, ob.titulo);
          break;
      }
  
  
    }
    */
  
  
    //this.tela = (tela, model) => {
    //  element.append($compile(mylista)( scope ));
    //}
  } //fim function form
  