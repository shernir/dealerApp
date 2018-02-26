angular.module('retailer').controller('AdminLoginCtrl',function($scope,$state,alertService,$translate){
  $scope.user = {password:""};
  $scope.login = function () {
    if ($scope.user.password === 'easypassword') {
        $state.go('master.configuration');
    } else {
      var title = $translate.instant('CONFIRMATION.ERROR');
      var body = $translate.instant('CONFIRMATION.WRONG_PASSWORD_PLEASE_TRY_AGAIN');
      alertService.alert(title,body);
    }
  };

});
