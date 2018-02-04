angular.module('retailer').directive('sideMenu', function() {
    return {
        restrict: 'E',
        replace: true,
        scope: {
          isMaster:"="
        },
        templateUrl: 'directive/side-menu/side-menu.html',
        link: function(scope, element, attrs, fn) {

          scope.active = function (type) {
            if(type === 'home'){
              $('#report').removeClass('active')
              $('#home').addClass('active');
            }else {
              $('#home').removeClass('active')
              $('#report').addClass('active');
            }
          };
        }
    };
});
