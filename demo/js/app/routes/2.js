define([
	'util',
	'view', 
	'stage',
	'../modules/spinner',
	'text!templates/2.html'
], function(util, view, stage, spinner, template) {

	var route = {
		url : '/2',
		
		
		load : function(params, router) {
			
			if (!this.view) {
				// initialize a view:
				this.view = new view(template);
				
				// wire up event handlers:
				//this.view.hookEvents(this.events);
			}
			
			spinner.toggleSpinner('#main');
			stage.show(this.view, {
				animation: 'slide-up',
				duration: 300
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