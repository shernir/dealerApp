angular.module('retailer').controller('MasterCtrl',function($scope,$rootScope,$ionicModal){
  $scope.client = {
    frontQID:"",
    backQID:"",
    QID:"",
    entity:"",
    entityType:"",
    nationality:"",
    birthdate:"",
    firstName:"",
    middleName:"",
    lastName:"",
    poBox:"",
    email:"",
    simNumber:"",
    altNumber:"",
    creditLimit:1000,
    availableCreditLimit:700,
    cart:[]

  };
  $ionicModal.fromTemplateUrl('modal/alert-modal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;

  });
  $scope.alertMsg = function (msg) {
    $scope.msg = msg;
    $scope.modal.show();
  };
});
