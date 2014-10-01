define([
	'util',
	'view', 
	'stage',
	'../modules/spinner',
	'text!templates/8.html'
], function(util, view, stage, spinner, template) {

	var route = {
		url : '/8',
		
		load : function(params, router) {
			
			if (!this.view) {
				// initialize a view:
				this.view = new view(template);
				
				// wire up event handlers:
				//this.view.hookEvents(this.events);
			}
			
			spinner.toggleSpinner('#main');
			stage.show(this.view, {
				animation: 'stretch',
				duration: 500
			});
			setTimeout(function() {
				spinner.toggleSpinner('#main');
			}, 500);
		},
		
		unload : function() {
			// remove view from DOM:
		}
	};

	return route;
});