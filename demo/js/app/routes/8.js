define([
	'util',
	'view', 
	'stage',
	'text!templates/8.html'
], function(util, view, stage, template) {

	var route = {
		url : '/8',
		
		load : function(params, router) {
			
			if (!this.view) {
				// initialize a view:
				this.view = new view(template);
				
				// wire up event handlers:
				//this.view.hookEvents(this.events);
			}
			
			stage.spinner('#main');
			stage.show(this.view, {
				animation: 'stretch',
				duration: 500
			});
			setTimeout(function() {
				stage.spinner('#main');
			}, 500);
		},
		
		unload : function() {
			// remove view from DOM:
		}
	};

	return route;
});