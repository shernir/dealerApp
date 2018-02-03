angular.module('retailer').controller('LoginCtrl',function($scope,$state){

  $scope.login = function (user,password) {
      $state.go('master.home');
  };
});
