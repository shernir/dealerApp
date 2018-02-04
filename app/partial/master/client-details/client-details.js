angular.module('retailer').controller('ClientDetailsCtrl',function($scope,$ionicModal,$timeout,utility){

  console.log($scope.$parent.client);
  $scope.alert = function () {
    alert("next");
  };
  $scope.alerta = function () {
    alert("back");
  };
  $scope.accounts= [{
    account:"1007347198",
    checked:false
  },
  {
    account:"1007347193",
    checked:false
  },
  {
    account:"100734123",
    checked:false
  },
  {
    account:"NEW ACCOUNT",
    checked:false
  }
];
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
  }).catch(function(data){
    console.log(data);

  });
};

  $scope.updateSelection = function(position, items, title) {
        angular.forEach(items, function(subscription, index) {
            if (position != index)
                subscription.checked = false;
                $scope.selected = title;
            }
        );
    }
  $ionicModal.fromTemplateUrl('modal/postpaid-accounts.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });


$scope.openModal = function () {
  $scope.modal.show();
};

});
