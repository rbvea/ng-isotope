'use strict';

angular.module('ngIsotopeApp', [
  'ngCookies',
  'ngResource',
  'ngRoute',
  'ngSanitize',
  'rbvea.isotope'
])
  .config(function ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'partials/main',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
    $locationProvider.html5Mode(true);
  });
