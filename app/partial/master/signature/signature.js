angular.module('retailer').controller('SignatureCtrl',function($scope){

  var signaturePad;
  $scope.signAgain = function (){
    signaturePad.clear();
  };
  $scope.save = function (){
    a = signaturePad.isEmpty();
    var data = signaturePad.toDataURL('image/png');
  };

  $scope.$on('$ionicView.enter', function(){
    if (signaturePad) {
      signaturePad.clear();
    } else {
      var canvas = document.querySelector("canvas");
       signaturePad = new SignaturePad(canvas);
    }

  });
});
