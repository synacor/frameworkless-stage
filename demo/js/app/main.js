define(['stage', 'app/routes'], function(stage, routes) {
	stage.init({
		container: '#main'
	});
	routes.on('route', function(e) {
		[].forEach.call(document.querySelectorAll('a[href]'), function(n) {
			n.classList[n.getAttribute('href')===e.url ? 'add' : 'remove']('current');
		});
	});
	routes.init();
});
