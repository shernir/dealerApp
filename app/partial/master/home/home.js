angular.module('retailer').controller('HomeCtrl',function($scope,$state,$rootScope,utility,loading,$timeout,$cookies){

  $rootScope.user = {name:"sherif"};
  //TODO: Set view persmissions
  if($cookies.get('persmissions')) {
    $scope.persmissions = JSON.parse($cookies.get('permissions'));
  }
  $scope.goToEntity = function (entity) {
    $scope.$parent.client.entity = entity;
    if(entity === "postpaid"){
      $state.go('master.client-details');
    }
    else if (entity === "prepaid"){
      $state.go('master.hala-id-type');
    }
    else if (entity === "hala-go"){
      $state.go('master.client-details');

    }
  };

});
