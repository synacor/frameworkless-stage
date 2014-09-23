define(
	[
		'util',
		'events',
		'app/routes',
		'stage'
	], function(util, events, routes, stage) {
	var app = events();
	
	app.on('init', routes.init);
	
	routes.on('route', function(e) {
		console.log('routed to '+e.url+' ('+e.rawUrl+')');
	});
	
	stage.init({
		container: '#main'
	});
	
	return app.emit('init');
});