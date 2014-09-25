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
			stage.spinner('#main');
			stage.show({
				animation: 'slide-left',
				duration: 500,
				timingFunction: 'ease'
			}, this.view);
			setTimeout(function() {
				stage.spinner('#main');
			}, 500);
			
		},
		
		unload : function() {
			// remove view from DOM:
		},

		isRunning : function() {
			if(stage.isComplete()) return true;

			return false;
		}
	}

	return route;
});