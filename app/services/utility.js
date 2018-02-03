angular.module('retailer').factory('utility',function($q,$timeout) {

    var utility = {};
    utility.takeImage = function () {
      var deferred = $q.defer();
      navigator.camera.getPicture(function(img){
        var imgURI = "data:image/jpeg;base64," + img;
        deferred.resolve(imgURI);
      }, function(err){
        deferred.reject(err);
      },
      {
        destinationType: Camera.DestinationType.DATA_URL,
      });

      return deferred.promise;
    };

    utility.getCode = function () {
      var deferred = $q.defer();
      cordova.plugins.barcodeScanner.scan(
        function (result) {
            deferred.resolve(result);
        },
        function (err) {
          deferred.reject(err);
        },
        {
            showFlipCameraButton : true, // iOS and Android
            showTorchButton : true, // iOS and Android
            prompt : "Place a barcode inside the scan area", // Android
            resultDisplayDuration: 500, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
            orientation : "landscape", // Android only (portrait|landscape), default unset so it rotates with the device
            disableAnimations : true, // iOS
            disableSuccessBeep: false // iOS and Android
        }
     );

      return deferred.promise;
    };
    return utility;
});
