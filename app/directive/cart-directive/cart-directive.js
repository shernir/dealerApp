angular.module('retailer').directive('cartDirective', function(cart,$rootScope) {
    return {
        restrict: 'E',
        replace: true,
        scope: {
          cart:"=",
          creditLimit:"=",
          availableCreditLimit:"=",
        },
        templateUrl: 'directive/cart-directive/cart-directive.html',
        link: function(scope, element, attrs, fn) {
          $rootScope.total = cart.getTotalCart(scope.cart);
          scope.removeFromCart = function (carts,index) {
            cart.remove(carts,index);
          };


        }
    };
});
