angular.module('retailer').controller('ConfirmationCtrl',function($scope,$state,$stateParams,xhrService,loading){

$scope.email = "";
$scope.order = $stateParams.order
$scope.sendEmail = function (email) {
  loading.show();

  xhrService.call({
      url: 'order/sendEmail',
      method: 'POST',
      data:{OrderNumber:$scope.order.OrderNumber,EmailId:email}
  }, true).then(function(data){
    loading.hide();
    // $ionicHistory.clearCache();
    // $ionicHistory.clearHistory();
    if(data.Code == 0){
      $state.go('master.home');
    }

  }).catch(function(err){

  });
}

});
