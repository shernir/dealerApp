angular.module('retailer').controller('ReportsCtrl',function($scope,xhrService,loading){
  //$scope.reports = [];
  $scope.type = 1;
  $scope.toggleView = function () {
    if($scope.type === 1) {
      $scope.type = 4;
      $scope.getReport ($scope.type);
    } else {
      $scope.type = 1;
      $scope.getReport ($scope.type);
    }
  };

  $scope.getReport = function (mode) {
    loading.show();
    xhrService.call({
        url: 'report/get?Mode='+mode,
        method: 'GET',

    }, true).then(function(data){
      loading.hide();
      $scope.reports = data.HalaReportList;
    }).catch(function(err){

    });
  }
$scope.getReport (1);

});
