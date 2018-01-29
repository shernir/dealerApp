angular.module('retailer').controller('LandingCtrl',function($scope,$state,xhrService){

  $scope.testXHR = function () {
      xhrService.call({
          url: 'nojoom-rewards',
          method: 'GET',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          contentType: 'application/x-www-form-urlencoded',
      }, true).then(function(data){
        console.log(data);

      }).catch(function(err){
        console.log(err);
      });
  };
  $scope.testXHR()
  $scope.login = function (user,password) {
      $state.go('master.home');
  };
});
