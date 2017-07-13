// Init App
var_app_history = [];

var myApp = new Framework7({
	modalTitle: 'Gshopper',
	// Enable Material theme
	material: true,
	materialRipple: false
});

// Expose Internal DOM library
var $$ = Dom7;

// Add main view
var mainView = myApp.addView('.view-main', {});