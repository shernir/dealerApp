angular.module('retailer').controller('LandingCtrl',function($scope,$state,xhrService){

  $scope.testXHR = function () {
    
  };
  $scope.testXHR()
  $scope.login = function (user,password) {
      $state.go('master.home');
  };
});
