angular.module('retailer').controller('ScanNumberCtrl',function($scope,$state){

  $scope.cart = {}
  $scope.next = function () {
    $state.go('master.signature');
  }
});
