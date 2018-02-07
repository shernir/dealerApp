angular.module('retailer').controller('ReportsCtrl',function($scope,xhrService){
  $scope.type = 1;
  $scope.toggleView = function () {
    if($scope.type === 1) {
      $scope.type = 2;
    } else {
      $scope.type = 1;
    }
  };

  xhrService.call({
      url: 'report/get',
      method: 'GET',

  }, true).then(function(data){

  }).catch(function(err){

  });

});
