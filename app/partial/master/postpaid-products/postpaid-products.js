angular.module('retailer').controller('PostpaidProductsCtrl',function($scope,cart,$state,loading,$ionicModal,utility,xhrService){
  // $scope.array = [1,2,3,4,5,6];
  $scope.array1=[1,2];
  //$scope.selectedCategory = "Shahry Super";
  $scope.tarrifDetails = {};
$scope.addToCart = function (entity,isMultiple,canDelete,type) {
  entity.isMultiple = isMultiple;
  entity.canDelete = canDelete;
  entity.type = type;
  //TODO add actual ACL
  //cart.add($scope.$parent.client.cart,entity,$scope.$parent.client.account.Acl);
  cart.add($scope.$parent.client.cart,entity,1000);
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
  $scope.$parent.client.mainTranstype = entityType;
  loading.show();
  xhrService.call({
      url: 'order/getProducts',
      method: 'POST',
      data:{"Type":entityType}
  }, true).then(function(data){
    $scope.tarrifs = utility.getListOfCategory(data.Tariffs);
    $scope.addons = utility.getListOfCategory(data.AddOns);
    $scope.selectedCategory = $scope.tarrifs[0].CategoryName;
    console.log($scope.addons);
    loading.hide();

  }).catch(function(err){
    loading.hide();
  });
};
$scope.changeTab = function (category) {
  $scope.selectedCategory = category;
};

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
  $scope.$on('$ionicView.enter', function(){
    $scope.getProducts();

  });
});
