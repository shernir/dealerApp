angular.module('retailer').controller('HomeCtrl',function($scope,$rootScope,$cookies,utility,loading,$timeout){

  $rootScope.user = {name:"sherif"};
  loading.show();

  $cookies.put('cookie',JSON.stringify($rootScope.user));
  $timeout(function(){
    loading.hide();
  },2000);
console.log(JSON.parse($cookies.get('cookie')));

});
