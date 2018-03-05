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
    utility.resetClient = function () {
      return {
        frontQID:"a",
        backQID:"a",
        QID:"",
        entity:"",
        entityType:"",
        nationality:"",
        birthdate:"",
        firstName:"",
        middleName:"",
        lastName:"",
        poBox:"",
        email:"",
        simNumber:"",
        altNumber:"",
        account:{},
        customerRef:"",
        cart:[]

      };
    };
    utility.getListOfCategory = function (array) {
      var categories = [];
      for (var i = 0; i < array.length; i++) {
        var index = _.findIndex(categories, function(o) { return o.CategoryId == array[i].CategoryId; })
         if (index == -1) {
           categories.push({
             CategoryName:array[i].CategoryName,
             CategoryId:array[i].CategoryId,
             "IsMultiple": array[i].IsMultiple,
             tarrifs:[{
                       "Name": array[i].Name,
                        "Id": array[i].Id,
                        "Price": array[i].Price,
                        "CategoryName": array[i].CategoryName,
                        "CategoryId": array[i].CategoryId,
                        "PormotionName": array[i].PormotionName,
                        "PromotionId": array[i].PromotionId,
                        "PromotionDiscount": array[i].PromotionDiscount,
                        "Details": array[i].Details,
                        "Detail": array[i].Detail,

         }]
       })
     } else {
       categories[index].tarrifs.push({
                   "Name": array[i].Name,
                    "Id": array[i].Id,
                    "Price": array[i].Price,
                    "CategoryName": array[i].CategoryName,
                    "CategoryId": array[i].CategoryId,
                    "PormotionName": array[i].PormotionName,
                    "PromotionId": array[i].PromotionId,
                    "PromotionDiscount": array[i].PromotionDiscount,
                    "Details": array[i].Details,
                    "Detail": array[i].Detail,

                  });
     }
    }
      return categories;
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
