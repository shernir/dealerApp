angular.module('retailer').controller('MasterCtrl',function($scope,$rootScope,utility){
  $scope.client = {
    frontQID:"s",
    backQID:"a",
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
    account:{},
    customerRef:"",
    halaGoNumber:"",
    cart:[],
    mainTranstype:"",

  };
  $scope.resetClient = function () {
  $scope.client =  utility.resetClient();
};
  $rootScope.$on('$stateChangeSuccess',
function(event, toState, toParams, fromState, fromParams){
  if(toState.name === 'master.home'){
    $scope.client =  utility.resetClient();
  }
});
});
