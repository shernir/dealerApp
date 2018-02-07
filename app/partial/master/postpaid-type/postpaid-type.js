angular.module('retailer').controller('PostpaidTypeCtrl',function($scope,$state,$cookies,$ionicHistory){
  //TODO: Set view permissions
  if($cookies.get('persmissions')) {
    $scope.persmissions = JSON.parse($cookies.get('permissions'));
  }
  $scope.goToProduct = function (type) {
    $scope.$parent.client.entityType = type;
    $state.go('master.postpaid-products');
  };
});
