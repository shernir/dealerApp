angular.module('retailer').directive('navigation', function() {
    return {
        restrict: 'E',
        replace: true,
        scope: {
          next:"&",
          back:"&",
          isNext:"=",
          isBack:"="

        },
        templateUrl: 'directive/navigation/navigation.html',
        link: function(scope, element, attrs, fn) {

          scope.back = function () {
            window.history.back();
          };
          scope.nextBtn = function () {
            console.log(scope.next);
              scope.next();
          };
        }
    };
});
