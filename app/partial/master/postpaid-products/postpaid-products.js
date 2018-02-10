angular.module('retailer').controller('PostpaidProductsCtrl',function($scope,cart,$state,loading,$ionicModal,utility,xhrService){
  // $scope.array = [1,2,3,4,5,6];
  $scope.array1=[1,2];
  $scope.selectedCategory = "Shahry Super";
  $scope.tarrifDetails = {};
$scope.addToCart = function (entity,isMultiple,canDelete,type) {
  entity.isMultiple = isMultiple;
  entity.canDelete = canDelete;
  entity.type = type;
  cart.add($scope.$parent.client.cart,entity,$scope.$parent.client.availableCreditLimit);
};
$scope.getProducts = function () {
  var entityType ;
  if ($scope.$parent.client.entityType === 'without-pormotion') {
    entityType = 0;
  }else if ($scope.$parent.client.entityType === 'with-pormotion') {
    entityType = 1;

  }else if ($scope.$parent.client.entityType === 'mbb'){
    entityType = 2;
  }
  loading.show();
  xhrService.call({
      url: 'i18n/products.json',
      method: 'GET',
      data:{"Type":entityType}
  }, true).then(function(data){
    $scope.tarrifs = utility.getListOfCategory(data.Tariffs);
    $scope.addons = utility.getListOfCategory(data.AddOns);
    console.log($scope.addons);
    loading.hide();

  }).catch(function(err){
    loading.hide();
  });
};
$scope.changeTab = function (category) {
  $scope.selectedCategory = category;
};

  $scope.accounts= [{
    account:"Data Pack 20",
    price:"20",
    checked:false
  },
  {
    account:"Data Pack 70",
    price:"70",
    checked:false
  },
  {
    account:"Data Pack 200",
    price:"200",
    checked:false
  }
];
console.log($scope.$parent.client);
$scope.next = function () {
  $state.go('master.scan-number')
}
  $scope.updateSelection = function(position, items, title) {
        angular.forEach(items, function(subscription, index) {
            if (position != index)
                subscription.checked = false;
                $scope.selected = title;
            }
        );
    };
  $scope.showProductModal = function (type,title,products){
    $scope.isMultiple = type;
    $scope.productModalTitle = title;
    $scope.addOnsProducts = products;
    $scope.modal.show();
  };
  $ionicModal.fromTemplateUrl('modal/products-modal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });
  $ionicModal.fromTemplateUrl('modal/product-details.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.Detailsmodal = modal;
  });
  $scope.activeEntity = function (item) {
    var index = _.findIndex($scope.$parent.client.cart,{ 'Id': item.Id, 'CategoryId': item.CategoryId });
    return index === -1 ? false : true;
  };
  $scope.showDeatils = function (tarrif) {
    $scope.tarrifDetails = tarrif;
    $scope.Detailsmodal.show();
  }
  $scope.getProducts();
});
