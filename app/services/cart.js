angular.module('retailer').factory('cart',function($rootScope,$translate,alertService) {

    var cart = {};

    cart.getTotalCart =function (cart) {
      var total = 0;
      if (cart.length !== 0) {
        for (var i = 0; i < cart.length; i++) {
          total += cart[i].Price;
        }
      }
      return total;
    };
    cart.add = function (cart,item,availableCreditLimit) {
      //check if this product is exist and remove it
      var alreadyExist = _.findIndex(cart, { 'Id': item.Id, 'CategoryId': item.CategoryId });
      if (alreadyExist === -1) {
        //check if category not Multiple
        var typeIndex = _.findIndex(cart, {'type': item.type });
        if (!item.isMultiple && typeIndex > -1 ) {
          this.remove(cart,typeIndex);
        }
        //get total cart before adding
        var total =  this.getTotalCart(cart) ;
        //check the total before add
        if ((total + item.Price) < availableCreditLimit) {
          cart.push(item);
          $rootScope.total = this.getTotalCart(cart);
        } else {
          alertService.alert($translate.instant('CONFIRMATION.ERROR'),$translate.instant('CART.NOT_ENOUGH_CREDIT'));
          return false;
        }
      } else {
        this.remove(cart,alreadyExist);
      }
      return true;
    };
    cart.remove = function (cart,index) {
      cart.splice(index, 1);
      $rootScope.total = this.getTotalCart(cart);

    };

    return cart;
});
