angular.module('retailer').directive('header', function($rootScope,$translate) {
    return {
        restrict: 'E',
        replace: true,
        scope: {

        },
        templateUrl: 'directive/header/header.html',
        link: function(scope, element, attrs, fn) {


          scope.changeLang = function (lang) {
            if (lang == 'ar') {
              $rootScope.dir = "rtl";
            } else {
              $rootScope.dir = "ltr";
            }

            $rootScope.lang = lang;
            $translate.use(lang.id);
          };

          $('.dropbtn , .dropbtn *').click(function(){

            // $("ion-pane[nav-view='active'] #lang-dropdown").addClass('show');
            $("ion-pane[nav-view='active'] #lang-dropdown").slideDown('fast');

          });
          $('.user-crtl , .user-crtl *').click(function(){

            // $("ion-pane[nav-view='active'] #user-dropdown").addClass('show');
            $("ion-pane[nav-view='active'] #user-dropdown").slideDown('fast');

          });
          // Close the dropdown if the user clicks outside of it
          window.onclick = function(event) {
            if (!event.target.matches('.dropbtn-el')) {

              var dropdowns = document.getElementsByClassName("dropdown-content");
              var i;
              for (i = 0; i < dropdowns.length; i++) {
                var openDropdown = dropdowns[i];
                $(openDropdown).slideUp('fast')
                // var openDropdown = dropdowns[i];
                // if (openDropdown.classList.contains('show')) {
                //   openDropdown.classList.remove('show');
                // }
              }
            }
          }


        }
    };
});
