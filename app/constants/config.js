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
        'dev': { name: 'Development', backendUrl: 'http://simple-mock-example.getsandbox.com/api/' },
        'staging': { name: 'Staging & QA', backendUrl: 'http://172.16.225.182:8005/api/' },
        'live': { name: 'Live', backendUrl: '' }
    },
    ACTIVE_ENVIRONMENT: 'live',
    TIMEOUT: 200000,
    GET_BACKEND_URL: function () {
        return this.ENVIRONMENTS[this.ACTIVE_ENVIRONMENT].backendUrl;
    }
});
