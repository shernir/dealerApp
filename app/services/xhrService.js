angular.module('retailer').factory('xhrService', function (CONFIG, $q, $http,$window,$cookies,alertService,$state) {

    var xhrService = {};
    var token = $cookies.get('token');
    // Default options of any HTTP request
    function getDefaultOptions() {
        return {
            method: 'GET',
            headers: { 'Authorization': "Bearer "+localStorage.getItem('token') },
            timeout: CONFIG.TIMEOUT,
            cache: false,
            data: null,
            params: null,
            responseType: ""
        };
    }

    // Construct HTTP request data
    function constructPayload(payloadObj) {
        if (!angular.isObject(payloadObj)) {
            console.error('Invalid Parameter "payloadObj"');
        }
        else if (!payloadObj.url) {
            console.error('Missing Parameter "payloadObj.url"');
        }

        payloadObj.url = CONFIG.GET_BACKEND_URL() + payloadObj.url;
        return angular.extend({}, getDefaultOptions(), payloadObj);
    }

    // Get service url
    function getServiceUrl(optsObj) {
        return optsObj.url;
    }

    function accept(data) {
        return $q.when(data);
    }

    function reject( data, overwriteDefaultError) {
        var error = {
            serverResponse: data
        };

        if (overwriteDefaultError) {

            return $q.reject(error);
        } else {

            return $q.reject(error);
        }
    }

    // Initiates the HTTP request
    xhrService.call = function (options, overwriteDefaultError) {
        var finalOptions = constructPayload(options);

        return $http(finalOptions).then(function (response) { //Then Fn

            var rejection;
            if (response.data) {
                //Accept Data - Resolve Expected Behavior
                if (response.data.Code != 0) {
                    alertService.alert('Error !',response.data.Message)
                }
                console.log('%cIncoming | Service: ' + getServiceUrl(options) + ' | Response: ', 'color: green', response.data);
                return accept(response.data);

            }


            return reject(rejection, response.data, overwriteDefaultError);

        }, function (response) { //Catch Fn
            var rejection;
            if (['401', '404'].indexOf(response.status) >= 0) {
                console.error('| Service:', getServiceUrl(options), '| Response:', response);
            } else if (response.status === 0 || response.status === -1) { // '500', '0'
                //Technical Rejection
                $state.go('master.login');
                console.error('| Service:', getServiceUrl(options), '| Response:', response);
            } else if (response.status === 400 && response.data && response.data.error === 'invalid_grant') {
                //special case when user login with invalid username or password
            } else { // 500, ...
                console.error('| Service:', getServiceUrl(options), '| AjaxStatus: ' + response.status + '| AjaxStatusText:', response.statusText, '| Response:', response);
            }
            // TODO: handle generic error messages
            return reject(response.data, overwriteDefaultError);
        });
    };

    return xhrService;
});
