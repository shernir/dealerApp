angular.module('retailer').controller('PostpaidProductsCtrl',function($scope,$ionicModal){
  $scope.array = [1,2,3,4,5,6];
  $scope.array1=[1,2];
  $scope.accounts= [{
    account:"Banglidash",
    price:"200",
    checked:false
  },
  {
    account:"Egypt Key",
    price:"300",
    checked:false
  },
  {
    account:"100734123",
    price:"400",
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
    };
  $scope.showProductModal = function (type,title){
    $scope.productType = type;
    $scope.productModalTitle = title;
    $scope.modal.show();
  };
  $ionicModal.fromTemplateUrl('modal/products-modal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });
});
