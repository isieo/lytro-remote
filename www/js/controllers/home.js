angular.module('lytroremote.controllers.home', [])

.controller('HomeCtrl', function($scope,$http,$window,$location,$mdDialog,$timeout) {
  var connectionID = null;
  var t = $timeout(checkConnection,500)
  $scope.isConnected = false;

  function checkConnection(){
    window.tlantic.plugins.socket.isConnected(connectionID,function(result){
      $scope.isConnected =( result == 1) ? true : false
      $scope.$apply();
      t = $timeout(checkConnection,500)
    },function(){

    });
  }


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
    window.tlantic.plugins.socket.sendBinary(
      function () {
        console.log('worked!');
      },

      function () {
        console.log('failed!');
      },
      connectionID,
      [0xaf, 0x55, 0xaa, 0xfa, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
       0xc0, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
       0x00, 0x00, 0x00, 0x00, 0x00, 0x00]
    );
  }
});
