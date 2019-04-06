function cadastrolib($scope, dtService) {


    //criar mensagem de confirmação para exclusão
    this.excluir = (model) => {
        var url = '/model/'+model+'/excluir/';
        var dto = $scope[model+'_dto'];
        dtService.excluir(url, dto, function(dt){
          if(dt[0].msg == 'sucesso'){
            var updatelist = $scope[model+'_lista'].filter((elem)=> {
              return elem._id != dto._id 
            });
            $scope[model+'_lista'] = updatelist;
            $scope.limpar(model);
            $scope.crtgrid('limpaselecao')
          }else{
            console.log('Error[msg]:', dt);
          }
        });
  
    }
  /*
  -------------------------------------------------------------------------------
  */
    this.salvar = (model) => {     
      //if ($scope[model].$valid) {
        var valido = true;
        var url = '/model/'+model;
        var dto = $scope[model + '_dto'];
        var acao = ''
        if(dto != undefined && dto._id == undefined){
          url +='/insert'
        }else if(dto != undefined){
          url +='/update'
        }

        var msgerror = [];
        dtService.salvar(url, dto, function(dt) {
            if(dt[0].msg =='sucesso'){
              $scope[model + '_lista'].push(angular.extend($scope[model + '_dto'], dt[0]));
              $scope.limpar(model)
              //fechar modal
              //toastr.success( 'Sucesso', '' );
              $('#idmodal').modal('hide');
              //$("#idmodal").attr({"style":"display: block;"});
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
        $scope[model+'_lista'] = dt;
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
    this.fecharModal = (model) => {
      //$scope[model] = {};
      //$scope[model + '_dto'] = {};
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
   this.crtgrid = (index) => {
     var igrid = document.getElementById($scope.selecao+'_grid')
     if($scope.selecao != undefined && igrid != null){
      igrid.classList.remove("'alert-warning'")
     }
    $scope.selecao = index;

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
  