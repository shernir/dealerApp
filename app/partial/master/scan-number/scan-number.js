angular.module('retailer').controller('ScanNumberCtrl',function($scope,$state,utility,xhrService,loading,cart,alertService,$translate){

  $scope.next = function () {
    if ($scope.isValid) {
      $state.go('master.signature');

    } else {
      alertService.alert($translate.instant('CONFIRMATION.ERROR'),$translate.instant('SCAN_NUMBER.PLEASE_SCAN_NUMBER_TO_CONTINUE'))
    }
  };
  $scope.scan = function () {
    utility.getCode().then(function(data){
      $scope.$parent.client.simNumber = data.text;
      $scope.validateSim($scope.$parent.client.simNumber);
    }).catch(function(data){

    });
  };
$scope.validateSim = function (id) {
  var serviceType = $scope.$parent.client.entity === 'prepaid' ? 0 : 1;
  loading.show();
  xhrService.call({
      url: 'order/validatesim',
      method: 'POST',
      data:{"SimNumber":id,"ServiceType":serviceType}
  }, true).then(function(data){
    if (data.Code == 0) {
      var entity = {Name:"Sim Fees" , Price:data.OneTimeCharge , Detail:"One time charge" , isMultiple:0 , type:"simCard"};
      var creditLimit = $scope.$parent.client.entity === 'postpaid'  ? $scope.$parent.client.account.Acl : 1000 ;
      $scope.isValid = cart.add($scope.$parent.client.cart,entity,creditLimit);
      //cart.add($scope.$parent.client.cart,entity,1000);

    }
    loading.hide();

  }).catch(function(err){
    loading.hide();

  });
};

});
