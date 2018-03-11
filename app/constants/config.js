/**
 * @type constant
 * @name CONFIG
 *
 * @description
 * Application Configuration Constants
 *
 */
angular.module('retailer').constant('CONFIG', {
    DEFAULT_LANG: 'en',
    DEFAULT_LOGIN_STATE: 'master.login',
    FIREBASE_CONFIG:{
      apiKey: "AIzaSyAXX3sZlqsUpq8MJoJDoYQ8pI9XXx6m3ww",
      authDomain: "dealers-app-ooredoo.firebaseapp.com",
      databaseURL: "https://dealers-app-ooredoo.firebaseio.com",
      projectId: "dealers-app-ooredoo",
      storageBucket: "dealers-app-ooredoo.appspot.com",
      messagingSenderId: "654908761167"
    },
    //all date formats provided below should follow momentjs formats
    DATE_FORMAT: 'MMMM D, YYYY',
    DATE_TIME_FORMAT: 'MMMM D, YYYY hh:mm a',
    LONG_DATE_FORMAT: 'dddd, MMMM D, YYYY',
    LONG_DATE_TIME_FORMAT: 'dddd, MMMM D, YYYY hh:mm a',
    LANG_LIST: [
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
    ], //Used in localeService
    APP_VERSION: '2.0.0',
    ENVIRONMENTS : {
        'dev': { name: 'Development', backendUrl: 'http://simple-mock-example.getsandbox.com/api/' },
        'staging': { name: 'Staging & QA', backendUrl: 'http://172.16.225.182:8005/api/' },
        'live': { name: 'Live', backendUrl: 'http://172.16.112.22:8005/api/' }
    },
    ACTIVE_ENVIRONMENT: 'dev',
    TIMEOUT: 200000,
    GET_BACKEND_URL: function () {
        return this.ENVIRONMENTS[this.ACTIVE_ENVIRONMENT].backendUrl;
    }
});
