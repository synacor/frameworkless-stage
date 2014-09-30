define([
	'util',
	'view', 
	'stage',
	'text!templates/7.html'
], function(util, view, stage, template) {

	var route = {
		url : '/7',
		
		load : function(params, router) {
			
			if (!this.view) {
				// initialize a view:
				this.view = new view(template);
				
				// wire up event handlers:
				//this.view.hookEvents(this.events);
			}
			
			stage.spinner('#main');
			stage.show(this.view, {
				animation: 'flip-v',
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