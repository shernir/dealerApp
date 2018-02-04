angular.module('retailer').controller('ReportsCtrl',function($scope){
  $scope.type = 1;
  $scope.toggleView = function () {
    if($scope.type === 1) {
      $scope.type = 2;
    } else {
      $scope.type = 1;
    }
  };
});
