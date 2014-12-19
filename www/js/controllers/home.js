angular.module('lytroremote.controllers.home', [])

.controller('HomeCtrl', function($scope,$http,$window,$location,$mdDialog) {
  var connectionID = null;
  $scope.isConnected = false;

  $scope.connect = function(){
    window.tlantic.plugins.socket.connect(
      function (connectionId) {
        connectionID = connectionId
        console.log('worked! This is the connection ID: ', connectionId);
        $scope.isConnected = true;
        $scope.$apply();
      },

      function () {
        console.log('failed!');
      },
      '10.100.1.1',
      5678
    );
  }
  $scope.disconnect = function(){
    window.tlantic.plugins.socket.disconnect(
      function () {
        console.log('worked!');
        $scope.isConnected = false;
        $scope.$apply();
      },

      function () {
        console.log('failed!');
        $scope.isConnected = false;
        $scope.$apply();
      },
      connectionID
    );
  }


  $scope.snap = function(){
    window.tlantic.plugins.socket.send(
      function () {
        console.log('worked!');
      },

      function () {
        console.log('failed!');
      },
      connectionID,
      "\xaf\x55\xaa\xfa\x00\x00\x00\x00\x00\x00\x00\x00\xc0\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00"
    );
  }
});
