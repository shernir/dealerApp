angular.module('retailer', ['ui.router','ngAnimate','ngCookies','ionic','ngSanitize','pascalprecht.translate','ksSwiper','ui.select']);

angular.module('retailer').config(function($stateProvider, $urlRouterProvider,$ionicConfigProvider,$translateProvider) {

  //setup localization settings
  $translateProvider.useStaticFilesLoader({
    prefix: 'i18n/',
    suffix: '.json'
  });

  $translateProvider.preferredLanguage('en');
    $stateProvider.state('master', {
        abstract: true,
        templateUrl: 'partial/master/master.html',
        controller:"MasterCtrl"
    });
    $stateProvider.state('landing', {
        url: '/landing',
        templateUrl: 'partial/landing/landing.html',
        controller:"LandingCtrl"
    });
    $stateProvider.state('master.home', {
        url: '/home',
        templateUrl: 'partial/master/home/home.html'
    });
    $stateProvider.state('master.reports', {
        url: '/reports',
        templateUrl: 'partial/master/reports/reports.html'
    });
    $stateProvider.state('master.admin-login', {
        url: '/admin-login',
        cache: false,
        templateUrl: 'partial/master/admin-login/admin-login.html'
    });
    $stateProvider.state('master.client-details', {
        url: '/client-details?:idType',
        templateUrl: 'partial/master/client-details/client-details.html'
    });
    $stateProvider.state('master.postpaid-type', {
        url: '/postpaid-type',
        templateUrl: 'partial/master/postpaid-type/postpaid-type.html'
    });
    $stateProvider.state('master.hala-id-type', {
        url: '/hala-type',
        templateUrl: 'partial/master/hala-id-type/hala-id-type.html'
    });
    $stateProvider.state('master.scan-number', {
        url: '/scan-number',
        templateUrl: 'partial/master/scan-number/scan-number.html'
    });
    $stateProvider.state('master.signature', {
        url: '/signature',
        templateUrl: 'partial/master/signature/signature.html'
    });
    $stateProvider.state('master.confirmation', {
        url: '/confirmation',
        templateUrl: 'partial/master/confirmation/confirmation.html'
    });
    $stateProvider.state('master.postpaid-products', {
        url: '/products/:type',
        templateUrl: 'partial/master/postpaid-products/postpaid-products.html'
    });
    $stateProvider.state('master.login', {
        url: '/login',
        templateUrl: 'partial/master/login/login.html'
    });
    $stateProvider.state('master.hala-go', {
        url: '/hala-go',
        templateUrl: 'partial/master/hala-go/hala-go.html'
    });
    $stateProvider.state('master.configuration', {
        url: '/configuration',
        cache: false,
        templateUrl: 'partial/master/configuration/configuration.html'
    });
    /* Add New States Above */
    if (!localStorage.getItem('device')) {
      $urlRouterProvider.otherwise('/configuration');

    } else {
      $urlRouterProvider.otherwise('/login');

    }

});

angular.module('retailer').run(function($rootScope,$ionicPlatform,$cookies) {

  $rootScope.lang = {
      name:"English",
      id:"en",
      flag:"img/en.svg"
    };
    $rootScope.availableLangs = [
      {
        name:"English",
        id:"en",
        flag:"img/en.svg"
      },
      {
        name:"العربية",
        id:"ar",
        flag:"img/ar.svg"
      },
      {
        name:"हिन्दी",
        id:"in",
        flag:"img/in.svg"
      }
    ];

  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.overlaysWebView(false);
      StatusBar.styleDefault();
    }
  });
    $rootScope.safeApply = function(fn) {
        var phase = $rootScope.$$phase;
        if (phase === '$apply' || phase === '$digest') {
            if (fn && (typeof(fn) === 'function')) {
                fn();
            }
        } else {
            this.$apply(fn);
        }
    };

});
var debugWatchers = function(selector, showExp) {
    var target, i, checkInsideFn, jq, items,
        nb_watchers = 0,
        nb_scopes = 0,
        scopes_id = {};

    if(typeof jQuery == 'undefined') {
        jq = document.createElement('script');
        jq.type = 'text/javascript';
        jq.src = '//ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js';
        jq.onload = function() { debugWatchers(selector, showExp); }
        document.getElementsByTagName('head')[0].appendChild(jq);
        console.info('loading jQuery..');
    } else {
        switch(true) {
            case (selector instanceof jQuery):
                if(selector.length > 1) {
                    console.error('Your selector target', selector.length, ' elements instead of only one. Please work on your selector, nth-child() is your friend!');
                    console.log($(selector));
                    return;
                } else if(selector.length == 0) {
                    console.error('Your selector target no element..');
                    return;
                }
                target = selector.get(0);
                break;
            case (typeof selector == 'object'):
                if(selector.nodeName) {
                    target = selector;
                } else {
                    console.error('Your selector is invalid..');
                    return;
                }
                break;
            case (typeof selector == 'string'):
                if($(selector).length > 1) {
                    console.error('Your selector target', $(selector).length, ' elements instead of only one. Please work on your selector, nth-child() is your friend!');
                    console.log($(selector));
                    return;
                } else if($(selector).length == 0) {
                    console.error('Your selector target no element..');
                    return;
                }
                target = document.querySelector(selector);
                break;
            default:
                selector = 'html';
                target = document.querySelector(selector);
                break;
        }

        checkInsideFn = function(elem) {
            var data = elem.data();
            if (data.hasOwnProperty('$scope') && data.$scope.$$watchers) {
                var scope = data.$scope;
                if(!scopes_id[scope.$id]) {
                    scopes_id[scope.$id] = true;
                    nb_watchers += scope.$$watchers.length;
                    nb_scopes++;
                    console.warn(nb_scopes, ' --> element: ', elem, ' - scope_id = ', scope.$id, ' - total watchers = ', scope.$$watchers.length);
                    if(showExp) {
                        angular.forEach(scope.$$watchers, function(elem) {
                            if(typeof elem.exp == 'function') console.info('expr = ', elem.exp.exp);
                            else console.info('expr = ', elem.exp);
                        });
                    }
                }
            }
        };

        console.info('Target blocked: ', target);
        checkInsideFn( angular.element(target) );
        items = target.getElementsByTagName("*");
        for(i = items.length; i--;) checkInsideFn( angular.element(items[i]) );
        console.info('Found', nb_scopes, ' scopes with ', nb_watchers, ' watchers');
    }
}
