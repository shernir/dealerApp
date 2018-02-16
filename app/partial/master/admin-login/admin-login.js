angular.module('retailer').controller('AdminLoginCtrl',function($scope,$state,alertService){
  $scope.user = {password:""};
  $scope.login = function () {
    if ($scope.user.password === 'easypassword') {
        $state.go('master.configuration');
    } else {
      alertService.alert('Error !','Worng password please try again');
    }
  };

});
