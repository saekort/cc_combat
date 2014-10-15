'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('ccCombatApp'));

  var MainCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MainCtrl = $controller('MainCtrl', {
      $scope: scope
    });
  }));

  it('should have no initiatives to start', function () {
	  scope.combat = [];
	  expect(scope.combat.length).toBe(0);
	});
  
//  it('should add a initiative to the combat', function () {
//	  scope.combat = [];
//	  scope.newInitiative = 'Test 1';
//	  scope.addInitiative();
//	  expect(scope.combat.length).toBe(1);
//	});
//
//	it('should add then remove an initiative from the combat', function () {
//	  scope.combat = [];
//	  scope.newInitiative = 'Test 1';
//	  scope.addInitiative();
//	  scope.removeInitiative(0);
//	  expect(scope.combat.length).toBe(0);
//	});

});
