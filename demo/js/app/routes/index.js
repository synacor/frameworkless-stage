define([
	'util',
	'view', 
	'stage',
	'text!templates/index.html'
], function(util, view, stage, template) {

	var route = {
		url : '/',
		
		events : {
			'click #submit' : function() {
				page.view.base.find('form').submit();
			},
			'click #reset' : function() {
				page.view.base.find('form').reset();
			}
		},
		
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