angular.module('retailer').controller('HomeCtrl',function($scope,$state,$rootScope,utility,loading,$timeout){


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
  // $scope.$on('$ionicView.enter', function() {
  //   $scope.$parent.client = angular.copy(utility.resetClient()) ;
  //   console.log($scope.$parent.client);
  // });
});
