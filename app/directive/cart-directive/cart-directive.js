angular.module('retailer').directive('cartDirective', function() {
    return {
        restrict: 'E',
        replace: true,
        scope: {
          cart:"="
        },
        templateUrl: 'directive/cart-directive/cart-directive.html',
        link: function(scope, element, attrs, fn) {
          console.log(scope.cart);

        }
    };
});
