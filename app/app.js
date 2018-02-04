angular.module('retailer', ['ui.router','ngAnimate','ngCookies','ionic','ngSanitize','pascalprecht.translate','ksSwiper']);

angular.module('retailer').config(function($stateProvider, $urlRouterProvider,$ionicConfigProvider,$translateProvider) {

  //setup localization settings
  $translateProvider.useStaticFilesLoader({
    prefix: 'i18n/',
    suffix: '.json'
  });
  // $translateProvider.useSanitizeValueStrategy(['escaped']);
  // $translateProvider.useSanitizeValueStrategy('escaped');
  // $translateProvider.useSanitizeValueStrategy('sanitize');
  $translateProvider.preferredLanguage('en');

  // tmhDynamicLocaleProvider.localeLocationPattern('i18n/angular-locale_{{locale}}.js');
  //
  // tmhDynamicLocaleProvider.defaultLocale('en');



  //$ionicConfigProvider.views.transition('fade-in-out');
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
    $stateProvider.state('master.client-details', {
        url: '/client-details/:idType',
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
    /* Add New States Above */
    $urlRouterProvider.otherwise('/login');

});

angular.module('retailer').run(function($rootScope,$ionicPlatform) {



  $rootScope.lang = {
      name:"English",
      id:"en",
      flag:"img/en.svg"
    }
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
