angular.module('retailer').controller('SignatureCtrl',function($scope,$state,utility,loading,xhrService,$ionicModal,$rootScope){
  var oneTimeCharge;
  var signaturePad;
  $ionicModal.fromTemplateUrl('modal/confirmation-modal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });
  $ionicModal.fromTemplateUrl('modal/TC.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.TCmodal = modal;
  });
  $scope.signAgain = function (){
    signaturePad.clear();
  };
  $scope.openTC = function () {
    $scope.TCmodal.show();
  }
  // $scope.confirm = function (){
  //     //$scope.modal.show();
  // };
  $scope.next = function () {
    if (!signaturePad.isEmpty()) {
      loading.show();
      $scope.modal.hide();
      var signature = signaturePad.toDataURL('image/png');
      var tarrifIndex = _.findIndex($scope.$parent.client.cart, {'type': 'shahryTarrif'});
      var tarrif = $scope.$parent.client.cart[tarrifIndex];
      var addons = [] ;
      for (var i = 0; i < $scope.$parent.client.cart.length; i++) {
        if ($scope.$parent.client.cart[i].type && $scope.$parent.client.cart[i].type != 'shahryTarrif' ) {
          addons.push({
            Id:$scope.$parent.client.cart[i].Id,
            Name:$scope.$parent.client.cart[i].Name,
            Category:$scope.$parent.client.cart[i].CategoryName,
            Price:$scope.$parent.client.cart[i].Price
          })
        } else if (!$scope.$parent.client.cart[i].CategoryName) {
         oneTimeCharge =$scope.$parent.client.cart[i].Price;
        }
      }
      var order = {
        ServiceType:$scope.$parent.client.entity === 'prepaid' ? 0 : 1,
        customer:{
          IdType:$scope.$parent.client.idType ? $scope.$parent.client.idType : 'QID',
          IdValue:$scope.$parent.client.QID,
          FirstName:$scope.$parent.client.firstName,
          MiddleName:$scope.$parent.client.middleName,
          LastName:$scope.$parent.client.lastName,
          PoBox:$scope.$parent.client.poBox,
          Email:$scope.$parent.client.email,
          AlternateNumber:$scope.$parent.client.altNumber,
          DateOfBirth:$scope.$parent.client.birthdate,
          Nationality:$scope.$parent.client.nationality,
          CustomerRef:$scope.$parent.client.customerRef,
        },
        AccountNumber:$scope.$parent.client.account.AccountNumber != "NEW ACCOUNT" ? $scope.$parent.client.account.AccountNumber : null,
        SimNumber:$scope.$parent.client.simNumber,
        SalesManNo:"",
        TariffId:tarrif ? tarrif.Id : null,
        TariffName:tarrif ? tarrif.Name: null,
        TariffPrice:tarrif ? tarrif.Price : null,
        PromoId:tarrif ? tarrif.PromotionId : null,
        PromoName:tarrif ? tarrif.PormotionName : null,
        AddOns:addons,
        Signature:encodeURIComponent(signature),
        FrontQid:encodeURIComponent($scope.$parent.client.frontQID),
        BackQid:encodeURIComponent($scope.$parent.client.backQID),
        HalaGoMobileNO:$scope.$parent.client.halaGoNumber,
        MainTranstype:$scope.$parent.client.mainTranstype,
        SimPrice:oneTimeCharge,
        TotalPrice:$rootScope.total

      }
      xhrService.call({
          url: 'order/submit',
          method: 'POST',
          data:order
      }, true).then(function(data){
        loading.hide();
        // $ionicHistory.clearCache();
        // $ionicHistory.clearHistory();
        if(data.Code == 0){
          $scope.$parent.resetClient();
            $state.go('master.confirmation',{order:data});

        }

      }).catch(function(err){

      });
    }
    //$state.go('master.confirmation');
  };
  $scope.$on('$ionicView.enter', function(){
    if (signaturePad) {
      signaturePad.clear();
    } else {
      var canvas = document.querySelector("canvas");
       signaturePad = new SignaturePad(canvas);
    }

  });
});
