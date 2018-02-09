angular.module('retailer').factory('cart',function() {

    var cart = {};

    cart.add = function (cart,item) {
      cart.push(item);
    };
    cart.remove = function (cart,index) {
      cart.splice(index, 1);
    };
    return cart;
});
