angular.module('retailer').directive('navigation', function() {
    return {
        restrict: 'E',
        replace: true,
        scope: {
          next:"&",
          back:"&",
          isNext:"="

        },
        templateUrl: 'directive/navigation/navigation.html',
        link: function(scope, element, attrs, fn) {


        }
    };
});
