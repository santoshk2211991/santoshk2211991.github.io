'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'ngAnimate',
  'myApp.amortization',
  'myApp.test1',
  'myApp.trail'
  ]).
config(['$routeProvider', function($routeProvider) {
	console.log('\n\n\nentering\n\n\n');
$routeProvider.when('/trial', {
    templateUrl: 'trial/trial.html',
    controller: 'TrialCtrl'
  });
  $routeProvider.otherwise({redirectTo: '/trial'});
}]);
