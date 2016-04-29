'use strict';

angular.module('myApp.test1', ['ngRoute','ngAnimate'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/test1', {
    templateUrl: 'test1/test1.html',
    controller: 'Test1Ctrl'
  });
}])

.controller('Test1Ctrl', ['$scope',function($scope) {

	 $scope.items = [];

  $scope.push = function() {
    $scope.items.push(+new Date());
  };

  $scope.pop = function() {
    $scope.items.pop();
  };


}]);


