angular.module('retailer').controller('LandingCtrl',function($scope,$state){

  $scope.login = function (user,password) {
      $state.go('master.home');
  };
});
