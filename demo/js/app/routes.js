define([
	'util', 'router', 'events',
	'./routes/index',
], function(util, router, events) {
	var routes = router();

	for (var i=3; i<arguments.length; i++) {
		routes.get(arguments[i].url, arguments[i]);
	}

	routes.init = function(path) {
		// If a <base href="/" /> is present, have the router account for it:
		var base = document.getElementsByTagName('base')[0];
		if (base && base.href) {
			routes.setBaseUrl(base.getAttribute('href'));
			//console.log('Using baseUrl: ' + routes.baseUrl);
		}

		// Hook up links delegation to the router:
		document.body.addEventListener('createTouch' in document ? 'touchstart' : 'click', linkHandler);

		// Initialize the router with the page's current URL,
		// without adding a history entry and taking any baseUrl into account:
		routes.route( (path || location.pathname || location.hash || '/').replace(/(?:^(\/)#\/|\/$)/g, '$1'), true, false);
	};

	// Automatically route to pages
	function linkHandler(e) {
		var t=e.target, href;
		do {
			href = t.nodeName==='A' && t.getAttribute('href');
			if (href && href.match(/^\/(#!?)?/g)) {
				if (routes.route(href.replace(/(?:^(\/)(#!?)?\/*|\/+$)/g,'$1'))===true) {
					e.preventDefault();
					return false;
				}
				return;
			}
		} while (t=t.parentNode);
	}

	return routes;
});
