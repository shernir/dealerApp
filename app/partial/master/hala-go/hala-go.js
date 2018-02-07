angular.module('retailer').controller('HalaGoCtrl',function($scope,$state){

  $scope.next = function () {
    $state.go('master.scan-number');
  }
});
