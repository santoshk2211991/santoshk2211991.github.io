'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute','ngAnimate',
  'myApp.amortization'
  ]).
config(['$routeProvider', function($routeProvider) {
	console.log('\n\n\nentering\n\n\n');
  $routeProvider.otherwise({redirectTo: '/amortization'});
}]);
