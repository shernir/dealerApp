angular.module('retailer').directive('sideMenu', function() {
    return {
        restrict: 'E',
        replace: true,
        scope: {
          isMaster:"="
        },
        templateUrl: 'directive/side-menu/side-menu.html',
        link: function(scope, element, attrs, fn) {

        }
    };
});
