angular.module('retailer').controller('ClientDetailsCtrl',function($scope,$state,$stateParams,$ionicModal,$timeout,utility,xhrService,alertService,loading,$translate){
  $scope.idType = $stateParams.idType;
  $scope.$parent.client.idType = $stateParams.idType;
  $scope.customerIdValid = false;
  console.log($scope.$parent.client);
  $scope.alert = function () {
    alert("next");
  };
  $scope.alerta = function () {
    alert("back");
  };
$scope.accounts= [];
$scope.takePicture = function (type) {
  utility.takeImage().then(function(data){
    console.log(data);
    if (type == 'front') {
      $scope.$parent.client.frontQID = data;
    }
    else {
      $scope.$parent.client.backQID = data;

    }
  }).catch(function(data){
    console.log(data);

  });
};

$scope.scan = function () {
  utility.getCode().then(function(data){
    console.log(data);
    $scope.$parent.client.QID = data.text;
    $scope.validateId($scope.$parent.client.QID);
  }).catch(function(data){
    console.log(data);

  });
};

  $scope.updateSelection = function(position, items, title) {
        angular.forEach(items, function(subscription, index) {
            if (position != index)
                subscription.checked = false;
                $scope.$parent.client.account = title;
            }
        );
    }
  $ionicModal.fromTemplateUrl('modal/postpaid-accounts.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });

$scope.validateId = function (id) {
  var serviceType = $scope.$parent.client.entity === 'prepaid' ? 0 : 1;
  var idType = $scope.idType ? $scope.idType : 'QID' ;
  loading.show();
  xhrService.call({
      url: 'order/validateid',
      method: 'POST',
      data:{"Key":idType,"Value":id,"ServiceType":serviceType}
  }, true).then(function(data){
    if (data.Code == 0) {
      $scope.customerIdValid = true;
      if (data.Accounts) {
        $scope.accounts = data.Accounts;
        $scope.accounts.push({AccountNumber:"NEW ACCOUNT" , CreditLimit:data.Customer.NewAccountCreditLimit , Acl:data.Customer.NewAccountCreditLimit});
      } else {
        if ($scope.$parent.client.entity === 'prepaid') {
          $scope.$parent.client.account = {AccountNumber:"NEW ACCOUNT" , CreditLimit:data.Customer.NewAccountCreditLimit , Acl:data.Customer.NewAccountCreditLimit};
        }
      }
      $scope.$parent.client.firstName = data.Customer.FirstName;
      $scope.$parent.client.lastName = data.Customer.LastName;
      $scope.$parent.client.middleName = data.Customer.MiddleName;
      $scope.$parent.client.birthdate = data.Customer.DateOfBirth;
      $scope.$parent.client.customerRef = data.Customer.CustomerRef;
      $scope.$parent.client.nationality = data.Customer.Nationality;
      $scope.$parent.client.poBox = data.Customer.PoBox;
      $scope.$parent.client.email = data.Customer.Email;
    } else {
      $scope.customerIdValid = false;
    }
    loading.hide();

  }).catch(function(err){
    loading.hide();
    $scope.customerIdValid = false;
  });
};
$scope.next = function () {
  if ($scope.customerIdValid && $scope.$parent.client.frontQID && $scope.$parent.client.backQID) {
    if ($scope.$parent.client.entity === 'postpaid') {
        if ($scope.accounts.length > 0) {
          $scope.modal.show();
        } else {
          $state.go('master.postpaid-type');
        }
    }
    if ($scope.$parent.client.entity === 'prepaid') {
      $state.go('master.scan-number');
    }
    else if ($scope.$parent.client.entity === 'hala-go') {
      $state.go('master.hala-go');

    }
  } else {
    var title = $translate.instant('CONFIRMATION.ERROR');
    var body = $translate.instant('CLIENT_DETAILS.PLEASE_FILL_ALL_DATA');
    alertService.alert(title,body);
  }
};

});
