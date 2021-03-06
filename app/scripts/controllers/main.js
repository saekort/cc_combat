'use strict';

(function() {
	
function MainCtrl($location, toaster) {
	// Important: Only do presentational logic in controllers
	// Important: Do business logic in services
	
	// Initialize the combat array
	this.newInitiative = {};
	this.combat = this.loadCombat();
	
	this.showAddControls = true;
	
	// Initialize the toaster
	this.toaster = toaster;
	
	// See if we have to run the demo
	if($location.search().demo)
	{
		this.demo = true;
	}
	else
	{
		this.demo = false;
	}
	
	if(this.demo)
	{
		// Demo initiative orders
		this.combat = [
		           	  new Initiative('Ragnor the Red',11,'pc'),
		           	  new Initiative('Violet the Vile',16,'pc'),
		           	  new Initiative('Nightstalker Nydia',4,'pc'),
		           	  new Initiative('Peter Patronum',26,'pc'),
		           	  new Initiative('Neruban Ninja',3,'pc'),
		           	  new Initiative('Barry the Bugbear', 14, 'monster')
		           	  ];
	}
	
	// Default sort order (on initiative)
	this.sort = '-init';
	
	// Combat mode false = 'input' or true = 'combat'
	this.mode = 'input';
	
	this.quotes = ['Roll for initiative monkey boy!',
	               'Just theoretically, how does one unsummon a demon?',
	               'What a useless scroll. It just says, HASTUR HASTUR HASTUR over and over again...',
	               'He hit me for HOW MUCH?????',
	               'AAAAAAAAAAAAAAAAAAAAAAAAHHHHHHH!',
	               'Don\'t worry, he is probably just first level.',
	               'I have this dungeon at home, I know where everything is!',
	               'I see HOW MANY wights?!',
	               'A Nightmare, huh? I\'ll attack for one round and prepare to run.',
	               'They need a twenty to hit me, I\'m invincible',
	               'OK! I moon the Balrog!',
	               'Well, we know he\'s LAWFUL evil, so he should keep his word when he promised not to betray us.',
	               'Yeah, I know it\'s dangerous, but think of the experience points.',
	               'They can\'t see me. I\'m invisible!',
	               'They don\'t look so tough.',
	               'What do you mean trolls regenerate!?!',
	               'Those noises are probably nothing.',
	               'He shot out my eye? Okay, I tear out my other eye and throw it at him as a gesture of defiance.',
	               'This is a push-over dungeon.',
	               'I know an illusion when I see one.',
	               'Is this one really able to breath fire?',
	               'There’s no such thing as a bottomless pit. Everybody knows that.',
	               'I spent seven hours rolling this guy up'
	               ];
	
	this.quote = this.getQuote();
}

/**
 * Adds a given initiative to the combat
 */
MainCtrl.prototype.addInitiative = function()
{
	// Add the new initiative to the combat
	if(this.mode === 'combat')
	{
		this.combat.unshift(new Initiative(this.newInitiative.name, 'N', this.newInitiative.type));
	}
	else
	{
		this.combat.push(new Initiative(this.newInitiative.name, parseInt(this.newInitiative.init), this.newInitiative.type));
	}
	
	this.counter++;
	
	// Save the name for toasting later
	var name = this.newInitiative.name;
	
	// Reset the form fields and return the user to the first one
	this.newInitiative.name = '';
	this.newInitiative.init = '';
	this.newInitiative.type = '';
	
	// Focus back on the name field
	document.getElementById('newInitiative.name').focus();
	
	this.toaster.pop('success', 'Challenger approaching!', name + ' added to combat');
	
	// See if we are adding in combat
	if(this.mode === 'combat')
	{
		// Hide the add controls again
		this.showAddControls = false;
	}
	
	// Save
	this.saveCombat();
};

/**
 * Removes a given initiative id from the combat
 */
MainCtrl.prototype.removeInitiative = function(initiative)
{
	var index = this.findWithAttr(this.combat, 'id', initiative.id);
	this.combat.splice(index, 1);
	
	this.toaster.pop('error', 'Looks like something died', initiative.name + ' removed from combat');
	
	// Save
	this.saveCombat();
};

/**
 * Set the mode of the combat
 */
MainCtrl.prototype.setMode = function(mode)
{
	if(mode === 'combat') {
		// We are switching to combat mode, change from initiative to actual combat order		
		// Set the sorting and mode to combat mode
		this.combat.sort(function(a, b) { if(a.init < b.init) { return 1; } if(a.init > b.init) { return -1; } return 0;});
		this.sort = '';
		this.mode = mode;
		this.showAddControls = false;
		this.toaster.pop('warning', 'Here we go!', 'Combat started');
		
		// Reset the initiative add fields
		this.newInitiative.name = '';
		this.newInitiative.init = '';
		this.newInitiative.type = '';
	}
};

/**
 * Go to the next initiative in a combat
 */
MainCtrl.prototype.nextInit = function()
{
	var current = this.combat.shift();
	this.combat.push(current);
	
	// Save
	this.saveCombat();
};

/**
 * Go to the previous initiative in a combat
 */
MainCtrl.prototype.previousInit = function()
{
	var current = this.combat.pop();
	this.combat.unshift(current);
	
	// Save
	this.saveCombat();
};

/**
 * Delay the current initiative
 */
MainCtrl.prototype.setDelay = function()
{
	// Grab the current initiative and set delay
	var current = this.combat[0];
	current.delay = true;
	
	// Proceed to the next initiative	
	this.nextInit();
	
	// Save
	this.saveCombat();
};

/**
 * Ready the current initiative
 */
MainCtrl.prototype.setReady = function()
{
	// Grab the current initiative and set ready	
	var current = this.combat[0];
	current.ready = true;
	
	// Proceed to the next initiative
	this.nextInit();
	
	// Save
	this.saveCombat();
};

/**
 * Let a given index take his delayed action
 */
MainCtrl.prototype.takeDelay = function(index)
{
	// Grab the delayed initiative and remove delayed status
	var current = this.combat[index];
	current.delay = false;
	
	// Temporarily remove the delayed initiative from the combat
	this.combat.splice(index, 1);
	
	// Apply the delayed initiative to the front of the combat order
	this.combat.unshift(current);
	
	// Save
	this.saveCombat();
};

/**
 * Let a given index take his readied action
 */
MainCtrl.prototype.takeReady = function(index)
{
	// Grab the delayed initiative and remove ready status
	var current = this.combat[index];
	current.ready = false;
	
	// Temporarily remove the readied initiative from the combat
	this.combat.splice(index, 1);
	
	// Apply the readied initiative to the front of the combat order
	this.combat.unshift(current);
	
	// Save
	this.saveCombat();
};

/**
 * Find a specific initiative's index
 */
MainCtrl.prototype.findWithAttr = function(array, attr, value) {
    for(var i = 0; i < array.length; i += 1) {
        if(array[i][attr] === value) {
            return i;
        }
    }
};

/**
 * Save the combat in local storage
 */
MainCtrl.prototype.saveCombat = function() {
	// Save the combat to local storage
	localStorage.setItem('combat', JSON.stringify(this.combat));
};

/**
 * Load a combat from local storage
 */
MainCtrl.prototype.loadCombat = function() {
	// Load from local storage
	if(localStorage.getItem('combat'))
	{
		// There is a combat in memory, use it
		return JSON.parse(localStorage.getItem('combat'));
	}
	else
	{
		// No combat yet, make a new one, no need to save it yet
		var emptycombat = [];
		return emptycombat;
	}
};

/**
 * Reset the current combat
 */
MainCtrl.prototype.resetCombat = function() {
	// Empty localstorage
	localStorage.removeItem('combat');
	
	// Create a new empty combat
	this.combat = this.loadCombat();
	
	this.showAddControls = true;
	this.mode = 'input';
	
	this.toaster.pop('error', 'Combat reset', 'Now go kill some PCs!');	
};

/**
 * Get a random quote to show at combat startup
 */
MainCtrl.prototype.getQuote = function()
{
	return this.quotes[Math.floor(Math.random() * this.quotes.length)];
};

/**
 * Initiative constructor
 * @param name
 * @param init
 * @param type
 * @returns
 */
function Initiative(name, init, type) {
	this.id = this.guid();
	this.name = name;
	this.init = init;
	this.type = type;
	this.delay = false;
	this.ready = false;
}

Initiative.prototype.guid = (function() {
	  function s4() {
		    return Math.floor((1 + Math.random()) * 0x10000)
		               .toString(16)
		               .substring(1);
		  }
		  return function() {
		    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
		           s4() + '-' + s4() + s4() + s4();
		  };
		})();

// Setup the angular app
angular
.module('ccCombatApp')
.controller('MainCtrl', MainCtrl)
.factory('Initiative', Initiative);

}());