angular.module('retailer').factory('loading',function($ionicLoading) {

    var loading = {};
    loading.show = function () {
      $ionicLoading.show({
      template: '<ion-spinner></ion-spinner>',
    }).then(function(){
       console.log("The loading indicator is now displayed");
    });
    };
    loading.hide = function () {
      $ionicLoading.hide().then(function(){
       console.log("The loading indicator is now hidden");
    });
    }
    return loading;
});
