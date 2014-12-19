angular.module('lytroremote', ['ngMaterial','ui.router','ngRoute',
                            'lytroremote.controllers', 'lytroremote.services'])

.run(function() {
  FastClick.attach(document.body);
})
.config(['$routeProvider' ,function($routeProvider) {
  $routeProvider
  .when('/', {
    templateUrl: 'templates/home.html',
    controller: 'HomeCtrl'
  })
  .when('/test', {
    templateUrl: 'templates/landing.html',
    controller: ['$scope','$location','$window',function($scope,$location,$window){
    }]
  })
    .otherwise({redirectTo: '/'});
}]);
