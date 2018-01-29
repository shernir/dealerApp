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
    DEFAULT_LOGIN_STATE: 'landing.login',
    DEFAULT_HOME_STATE: 'master.projects',
    //all date formats provided below should follow momentjs formats
    DATE_FORMAT: 'MMMM D, YYYY',
    DATE_TIME_FORMAT: 'MMMM D, YYYY hh:mm a',
    LONG_DATE_FORMAT: 'dddd, MMMM D, YYYY',
    LONG_DATE_TIME_FORMAT: 'dddd, MMMM D, YYYY hh:mm a',
    LANG_LIST: ['en', 'ar'], //Used in localeService
    APP_VERSION: '0.0.1',
    ENVIRONMENTS : {
        'dev': { name: 'Development', backendUrl: 'http://ooredoo-task.getsandbox.com/' },
        'staging': { name: 'Staging & QA', backendUrl: 'http://mmsdemo.cloudapp.net:5050/' },
        'live': { name: 'Live', backendUrl: 'http://mmsdemo.cloudapp.net:8888/' }
    },
    ACTIVE_ENVIRONMENT: 'dev',
    TIMEOUT: 200000,
    GET_BACKEND_URL: function () {
        return this.ENVIRONMENTS[this.ACTIVE_ENVIRONMENT].backendUrl;
    }
});