
function cadastrolib($scope, dtService) {

    this.novo = (model) => {
      $scope[model+'_dto'] = {}
    }
    /*
    -------------------------------------------------------------------------------
    */
    //criar mensagem de confirmação para exclusão
    this.excluir = (model) => {
      $scope.mensagem('excluir', function() {
        var url = '/model/'+model+'/excluir/';
        var dto = $scope[model+'_dto'];
        dtService.excluir(url, dto, function(dt){
          if(dt[0].msg == 'sucesso'){
            var updatelist = $scope[model+'_lista'].filter((elem)=> {
              return elem._id != dto._id 
            });
            $scope[model+'_lista'] = updatelist;
            $scope[model+'_dto'] = {};
            $scope.crtgrid('limpaselecao')
          }else{
            console.log('Error[msg]:', dt);
          }
        });
      })
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
              $('#idmodel').modal('hide');
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
      setTimeout(()=>{
        $scope[model] = {};
        $scope[model + '_dto'] = {};
      },5)
    }
    /*
    -------------------------------------------------------------------------------
    */
    this.setall = (model, registro, index) => {
      $scope[model + '_dto'] = registro;
      $scope[model + '_index'] = index;
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
   this.comprar = (model) => {
     var estoque = parseFloat($scope[model + '_dto'].estoque);
     var vendido = parseFloat($scope[model + '_dto'].vendido == undefined ? 0 : $scope[model + '_dto'].vendido);
     var id = $scope[model + '_dto']._id;
     $scope.disblecompra = false;

     if($scope['temp_'+id] == undefined){
      $scope['temp_'+id] = []
     }



     if(estoque > 0){
      $scope[model + '_dto'].estoque = estoque - 1
      $scope[model + '_dto'].vendido = vendido + 1

      var url = '/model/'+model+'/update';
      var dto = $scope[model + '_dto'];

      console.log('event::', event)

      dtService.salvar(url, dto, function(dt) {
          $scope.disblecompra = true;
          if(dt[0].msg =='sucesso'){
            $scope[model + '_lista'][$scope[model + '_index']] = angular.extend($scope[model + '_dto'], dt[0]);
            if($scope['temp_'+id] == undefined){
             $scope['temp_'+id] = []
            }
            $scope['temp_'+id].push(moment().format('DD/MM/YYYY HH:mm'))

            $scope['interv_'+id]  = $scope['temp_'+id].map((elem, index, arr)=>{
              if(arr[index+1] != undefined) {
                x = moment.utc(moment(arr[index+1], 'DD/MM/YYYY HH:mm').diff( moment(elem, 'DD/MM/YYYY HH:mm'))).format("mm"); 
                if (parseFloat(x) > 0){
                  console.log('retorno x::', x, parseFloat(x))
                  return parseFloat(x)
                } 
                
              }
            })
            .filter(el => el != undefined)
            
            console.log('retorno::', $scope['interv_'+id])

          }else{
            //toastr.error( dt[i].msg, dt[i].titulo );
          }
      });
     }else{
      alert('Quantidade indisponível!')
     }


   }
    /*
    -------------------------------------------------------------------------------
    */
   this.tempovenda = (obj) => {
     var tempo = $scope['interv_'+obj._id];
     var estoque = parseFloat(obj.estoque);
     var resultado = 0;
    if(tempo != undefined && tempo.length == 1){
      resultado = estoque * tempo[0];
    }else if(tempo != undefined && tempo.length > 1){
      intervalo = tempo.reduce((accumulator, currentValue) => {
        return accumulator + currentValue
      })
      resultado = estoque * intervalo;
    }
    return resultado+' min'
   }

   /*
    var dtPartida = "20170620 11:20";
    var dtChegada = "20170620 16:40";

    var date1 = new Date(dtPartida.slice(0,4), dtPartida.slice(4,6),dtPartida.slice(6,8), dtPartida.slice(9,11), dtPartida.slice(12,14)),
        date2 = new Date(dtChegada.slice(0,4), dtChegada.slice(4,6),dtChegada.slice(6,8), dtChegada.slice(9,11), dtChegada.slice(12,14));

    var diffMs = (date2 - date1);
    var diffHrs = Math.floor((diffMs % 86400000) / 3600000);
    var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000);
    var diff = diffHrs + 'h ' + diffMins + 'm';
    console.log(diff);
   ---------------------------------------------------------------------------
    var date1 = new Date("7/11/2010");
    var date2 = new Date("12/12/2010");
    var timeDiff = Math.abs(date2.getTime() - date1.getTime());
    var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); 
    alert(diffDays);
    */

    /*
      this.setItem(key, value) {
        window.localStorage.setItem(key, JSON.stringify(value));
      };
  
      this.getItem(key) {
        return  JSON.parse(window.localStorage.getItem(key));
      };
  
      this.delItem(key){
        window.localStorage.removeItem(key);
      }
      */
 

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

  } //fim function form
  