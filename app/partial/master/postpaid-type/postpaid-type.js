angular.module('retailer').controller('PostpaidTypeCtrl',function($scope,$state,$ionicHistory){
  //TODO: Set view permissions

  $scope.goToProduct = function (type) {
    $scope.$parent.client.entityType = type;
    $state.go('master.postpaid-products');
  };
});
