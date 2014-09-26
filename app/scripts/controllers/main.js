'use strict';

/**
 * @ngdoc function
 * @name ccCombatApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the ccCombatApp
 */
angular.module('ccCombatApp')
  .controller('MainCtrl', function ($scope) {
    //$scope.combat = ['Ragnor the red', 'Violet the vile', 'Nightstalker Nydia', 'Peter Patronum', 'Neruban Ninja'];
	  $scope.combat = [];
    
    $scope.addInitiative = function () {
    	$scope.combat.push($scope.newInitiative);
    	$scope.newInitiative = '';
    };
    
    $scope.removeInitiative = function (index) {
    	$scope.combat.splice(index, 1);
    };
  });
