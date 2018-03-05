angular.module('retailer').controller('HalaGoCtrl',function($scope,$state,xhrService,alertService,loading){
  var numberIsvalid;
  // $scope.next = function () {
  //   if(numberIsvalid) {
  //   }
  // };

  $scope.next = function functionName() {
    if ($scope.$parent.client.halaGoNumber) {
      loading.show();
      xhrService.call({
          url: 'order/validatenumber',
          method: 'POST',
          headers: { "Content-Type": "application/json" },
          contentType: 'application/json',
          data:{"ServiceIdentifier":$scope.$parent.client.halaGoNumber,"CustomerRef":$scope.$parent.client.customerRef}
      }, true).then(function(data){
        if (data.Code == 0) {
          $state.go('master.signature');

        } else {
          //alertService.alert('Error!',data.Message);

        }
        loading.hide();
      }).catch(function(err){
      });
    } else {
      alertService.alert('Error!',"Please , fill all data");
      loading.hide();
    }

  };
});
