angular.module('retailer').controller('LoginCtrl',function($scope,$translate,loading,$state,xhrService,$rootScope,alertService){
  $scope.device = JSON.parse(localStorage.getItem('device'));

  $rootScope.location = $scope.device.Name;
  $scope.store = {
    location:"",
    dealerName :"",
    dealerCode:"",
  };
  $scope.user = {
    usernmae:"",
    password:"",
  };

 //  $scope.init = function  () {
 //  //TODO: static init service parameter
 //   xhrService.call({
 //       url: 'device/validate',
 //       method: 'POST',
 //       headers: { "Content-Type": "application/json" },
 //       contentType: 'application/json',
 //       data:{"DeviceId":"77360bc7-efb9-47f1-9e6f-65adb465f4cd","DeviceName":"IITC-WS-WP10"}
 //   }, true).then(function(data){
 //       $scope.store.location = data.LocationName;
 //       $scope.store.dealerName = data.DealerName;
 //       $rootScope.location =data.LocationName;
 //
 //   }).catch(function(err){
 //     $scope.isFail = true;
 //   });
 // };
  $scope.login = function (user,password) {
    //TODO: static login  parameter
    //$state.go('master.home');
    loading.show();
    //var deviceName = cordova.plugins.deviceName.name;
    var deviceName = "af19da30-Web";
    xhrService.call({
        url: 'device/login',
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        contentType: 'application/json',
        data:{
          "DealerCode":$scope.device.DealerCode,
          "DealerName":$scope.device.DealerName,
          "Location":$scope.device.Name,
          "LocationId":$scope.device.Id,
          "IPadName":deviceName,
          "UserName":user,
          "Password":password,
        }
    }, true).then(function(data){
      loading.hide();
      if (data.Code === 0) {
        $rootScope.user = {name:user};
        $state.go('master.home');
        localStorage.setItem('token',data.Token);
        console.log(data.Token);
        localStorage.setItem('permissions',JSON.stringify(data.Permissions));
        $rootScope.permissions = data.Permissions;

      }else {
        //alertService.alert($translate.instant('CONFIRMATION.ERROR'),data.Message);
      }
    }).catch(function(err){
      loading.hide();

    });

  };

  //$scope.init();
});
