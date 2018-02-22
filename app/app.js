angular.module('retailer', ['ui.router','ngAnimate','ngCookies','ionic','ngSanitize','pascalprecht.translate','ksSwiper','ui.select']);

angular.module('retailer').config(function($stateProvider, $urlRouterProvider,$ionicConfigProvider,$translateProvider,CONFIG) {
//  $ionicConfigProvider.views.transition('none');

  //setup localization settings
  $translateProvider.useStaticFilesLoader({
    prefix: 'i18n/',
    suffix: '.json'
  });

  $translateProvider.preferredLanguage(CONFIG.DEFAULT_LANG);
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
        params: {
          order:""
        },
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

angular.module('retailer').run(function($rootScope,$ionicPlatform,$cookies,CONFIG) {
  function fireBaseInit() {
    firebase.initializeApp(CONFIG.FIREBASE_CONFIG);
  }
  var langIndex = _.findIndex(CONFIG.LANG_LIST, { 'id': CONFIG.DEFAULT_LANG});
  $rootScope.lang = CONFIG.LANG_LIST[langIndex];
  $rootScope.availableLangs = CONFIG.LANG_LIST;
//     var options = {
//   "direction"        : "left", // 'left|right|up|down', default 'left' (which is like 'next')
//   "duration"         :  300, // in milliseconds (ms), default 400
//   "slowdownfactor"   :    -1, // overlap views (higher number is more) or no overlap (1). -1 doesn't slide at all. Default 4
// //  "iosdelay"         :  60, // ms to wait for the iOS webview to update before animation kicks in, default 60
//   "androiddelay"     :  150, // same as above but for Android, default 70
//   "winphonedelay"    :  250, // same as above but for Windows Phone, default 200,
//   "fixedPixelsTop"   :    0, // the number of pixels of your fixed header, default 0 (iOS and Android)
//   "fixedPixelsBottom":   0  // the number of pixels of your fixed footer (f.i. a tab bar), default 0 (iOS and Android)
// };
//
// $rootScope.$on('$stateChangeSuccess',
// function(event, toState, toParams, fromState, fromParams){
//   window.plugins.nativepagetransitions.slide(
//     options,
//     function (msg) {console.log("success: " + msg)},
//     function (msg) {alert("error: " + msg)}
//   );
// })
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
    fireBaseInit();
});
