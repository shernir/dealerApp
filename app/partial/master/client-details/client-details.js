angular.module('retailer').controller('ClientDetailsCtrl',function($scope,$ionicModal,$timeout){
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
 $timeout(function () {
  $scope.modal.show();
 }, 500);


});
