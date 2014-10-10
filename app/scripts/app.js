'use strict';

/**
 * @ngdoc overview
 * @name ccCombatApp
 * @description
 * # ccCombatApp
 *
 * Main module of the application.
 */
angular
  .module('ccCombatApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.sortable'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
