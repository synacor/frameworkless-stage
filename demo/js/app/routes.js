define([
	'util', 'router', 'events',
	'./routes/index',
	'./routes/1',
	'./routes/2',
	'./routes/3',
	'./routes/4',
	'./routes/5',
	'./routes/6',
	'./routes/7',
	'./routes/8',
	'./routes/9',
	'./routes/10',
	'./routes/11',
	'./routes/12',
	'./routes/13',
	'./routes/14',
	'./routes/15',
	'./routes/16',
	'./routes/17'
], function(util, router, events) {
	var routes = router();
	events.mixin(routes);
	
	// Automatically add any routes
	for (var i=3; i<arguments.length; i++) {
		routes.get(arguments[i].url, arguments[i]);
	}
	
	routes.init = function(path) {
		var base = document.getElementsByTagName('base')[0];
		if (base && base.href) {
			routes.setBaseUrl(base.getAttribute('href'));
		}
		
		document.body.addEventListener('createTouch' in document ? 'touchstart' : 'click', linkHandler);
		routes.route(path || location.pathname || location.hash || '/', true, false);
	};
	
	// Automatically route to pages
	function linkHandler(e) {
		var t=e.target, href;
		do {
			href = t.nodeName==='A' && t.getAttribute('href');
			if (href && href.match(/^\/#/g)) {
				routes.route(href.replace(/^\/#\/*/g,'/'));
				e.preventDefault();
				return false;
			}
		} while (t=t.parentNode);
	}
	
	return routes;
});