angular.module('retailer').controller('ConfigurationCtrl',function($scope,xhrService,loading){
  loading.show();
  var dealers;
  var locations;
  var tempLocations =[];
  $scope.selectedDealer = {};
  $scope.selectedLocation = {};
  var config = {
    title: "",
    items:[],
    selectedValue: "",
    doneButtonLabel: "Done",
    cancelButtonLabel: "Cancel"
};

xhrService.call({
    url: 'getDealers',
    method: 'GET',
    headers: { "Content-Type": "application/json" },
    contentType: 'application/json',
}, true).then(function(data){
  dealers = data.Dealers;
  locations= data.Location;

  loading.hide();

}).catch(function(err){
  loading.hide();
});
  $scope.openDropDown = function (title,type) {
    // Show the picker
  config.title = title;
  if (type === 'dealer') {

    config.items = constructDropdown(dealers);
  } else {

    config.items = constructDropdown(tempLocations);
  }
  window.plugins.listpicker.showPicker(config,
      function(item) {
        if (type === 'dealer') {
          var index = _.findIndex(dealers, function(o) { return o.Id == item; });
          $scope.selectedDealer = dealers[index];
          console.log($scope.selectedDealer);
          $scope.selectedLocation = "";
          tempLocations.length = 0;
          for (var i = 0; i < locations.length; i++) {
            if (locations[i].DealerId == $scope.selectedDealer.Id ) {
              tempLocations.push(locations[i]);
            }
          }
        } else {
          var index = _.findIndex(locations, function(o) { return o.Id == item; });
          $scope.selectedLocation = locations[index];
          console.log($scope.selectedLocation);
        }
        $scope.$apply();
      },
      function() {
          alert("You have cancelled");
      }
  );
};
  $scope.addLocation = function () {
    localStorage.setItem('device',JSON.stringify($scope.selectedLocation));
  }
  function constructDropdown(array) {
      var arr = [];
      for (var i = 0; i < array.length; i++) {
        arr.push({
          text:  array[i].Name,
          value:array[i].Id,
        })

      }
    return arr;
  }
});
