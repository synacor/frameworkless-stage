define([
	'util',
	'view', 
	'stage',
	'text!templates/four.html'
], function(util, view, stage, template) {

	var route = {
		url : '/four',
		
		load : function(params, router) {
			
			if (!this.view) {
				// initialize a view:
				this.view = new view(template);
				
				// wire up event handlers:
				//this.view.hookEvents(this.events);
			}
			
			stage.show(this.view);
		},
		
		unload : function() {
			// remove view from DOM:
		}
	};

	return route;
});