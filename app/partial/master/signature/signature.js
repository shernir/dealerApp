angular.module('retailer').controller('SignatureCtrl',function($scope){

  var canvas = document.querySelector("canvas");
  var signaturePad = new SignaturePad(canvas);
  $scope.signAgain = function (){
    signaturePad.clear();
  };
  $scope.save = function (){
    a = signaturePad.isEmpty();
    var data = signaturePad.toDataURL('image/png');
  };
});
