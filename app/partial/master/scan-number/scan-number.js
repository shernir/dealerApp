angular.module('retailer').controller('ScanNumberCtrl',function($scope,$state,utility,xhrService,loading,cart){

  $scope.next = function () {
    $state.go('master.signature');
  };
  $scope.scan = function () {
    utility.getCode().then(function(data){
      $scope.$parent.client.simNumber = data.text;
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
      var entity = {Name:"Sim Fees" , Price:data.OneTimeCharge , Detail:"One time charge"};
      var creditLimit = serviceType === 1 ? $scope.$parent.client.account.Acl : 1000 ;
      //cart.add($scope.$parent.client.cart,entity,$scope.$parent.client.account.Acl);
      cart.add($scope.$parent.client.cart,entity,1000);

    }
    loading.hide();

  }).catch(function(err){
    loading.hide();

  });
};

});
