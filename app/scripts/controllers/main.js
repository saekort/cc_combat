'use strict';

(function() {
	
function MainCtrl() {
	// Important: Only do presentational logic in controllers
	// Important: Do business logic in services
	
	// Initialize the combat array
	this.combat = new Array();
	this.newInitiative = {};
	
	this.combat = [
	           	  new Initiative('Ragnor the Red','11','pc'),
	           	  new Initiative('Violet the Vile','16','pc'),
	           	  new Initiative('Nightstalker Nydia','4','pc'),
	           	  new Initiative('Peter Patronum','26','pc'),
	           	  new Initiative('Neruban Ninja','3','pc')
	           	  ];
	
	// Default sort order (on initiative)
	this.sort = '-init';
}

MainCtrl.prototype.removeInitiative = function(index)
{
	this.combat.splice(index, 1);
}

MainCtrl.prototype.addInitiative = function()
{
	// Add the new initiative to the combat
	this.combat.push(new Initiative(this.newInitiative.name, this.newInitiative.init, this.newInitiative.type));
	
	// Reset the form fields and return the user to the first one
	this.newInitiative.name = '';
	this.newInitiative.init = '';
	this.newInitiative.type = '';
	
	//TODO: This has got to be easier in Angular/jQuery
	document.getElementById('newInitiative.name').focus();
}

/**
 * Initiative constructor
 * @param name
 * @param init
 * @param type
 * @returns
 */
function Initiative(name, init, type) {
	this.name = name;
	this.init = init;
	this.type = type;
}

angular
.module('ccCombatApp')
.controller('MainCtrl', MainCtrl)
.factory('Initiative', Initiative);		

}());