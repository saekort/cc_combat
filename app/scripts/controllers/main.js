'use strict';

(function() {
	
function MainCtrl() {
	// Important: Only do presentational logic in controllers
	// Important: Do business logic in services
	
	// Initialize the combat array
	this.combat = new Array();
	this.newInitiative = {};
	
	// Demo initiative orders
	this.combat = [
	           	  new Initiative('Ragnor the Red',11,'pc'),
	           	  new Initiative('Violet the Vile',16,'pc'),
	           	  new Initiative('Nightstalker Nydia',4,'pc'),
	           	  new Initiative('Peter Patronum',26,'pc'),
	           	  new Initiative('Neruban Ninja',3,'pc')
	           	  ];
	
	// Default sort order (on initiative)
	this.sort = '-init';
	
	// Combat mode false = 'input' or true = 'combat'
	this.mode = 'input';
}

/**
 * Removes a given index from the combat
 */
MainCtrl.prototype.removeInitiative = function(index)
{
	this.combat.splice(index, 1);
}

/**
 * Adds a given initiative to the combat
 */
MainCtrl.prototype.addInitiative = function()
{
	// Add the new initiative to the combat
	this.combat.push(new Initiative(this.newInitiative.name, parseInt(this.newInitiative.init), this.newInitiative.type));
	
	// Reset the form fields and return the user to the first one
	this.newInitiative.name = '';
	this.newInitiative.init = 0;
	this.newInitiative.type = '';
	
	//TODO: This has got to be easier in Angular/jQuery
	document.getElementById('newInitiative.name').focus();
}

/**
 * Set the mode of the combat
 */
MainCtrl.prototype.setMode = function(mode)
{
	if(mode == 'combat') {
		// We are switching to combat mode, change from initiative to actual combat order
//		this.combat.forEach(function(x) {
//			// Set the order value of the initiative to the init value
//			x.order = x.init;
//		});
		
		// Set the sorting and mode to combat mode
//		this.sort = '-order';
		this.sort = '';
		this.mode = mode;
	}
}

/**
 * Go to the next initiative in a combat
 */
MainCtrl.prototype.nextInit = function()
{
	var current = this.combat.shift();
	this.combat.push(current);
}

/**
 * Go to the previous initiative in a combat
 */
MainCtrl.prototype.previousInit = function()
{
	var current = this.combat.pop();
	this.combat.unshift(current);
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
//	this.order = 0;
}

angular
.module('ccCombatApp')
.controller('MainCtrl', MainCtrl)
.factory('Initiative', Initiative);		

}());