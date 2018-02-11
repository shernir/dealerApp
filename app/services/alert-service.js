angular.module('retailer').factory('alertService',function($ionicPopup) {

    var alertService = {};
    alertService.alert = function(title,body) {
   var alertPopup = $ionicPopup.alert({
     title: title,
     template: body
   });
 }
    return alertService;
});
