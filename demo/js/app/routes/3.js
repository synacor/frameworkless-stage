define([
	'util',
	'view', 
	'stage',
	'text!templates/3.html'
], function(util, view, stage, template) {

	var route = {
		url : '/3',
		
		load : function(params, router) {
			
			if (!this.view) {
				// initialize a view:
				this.view = new view(template);
				
				// wire up event handlers:
				//this.view.hookEvents(this.events);
			}
			
			stage.spinner('#main');
			stage.show(this.view, {
				animation: 'slide-down',
				duration: 500,
				timingFunction: 'ease'
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