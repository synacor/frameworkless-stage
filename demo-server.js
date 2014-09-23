var express = require('express'),
	compression = require('compression'),
	serveStatic = require('serve-static'),
	app = express(),
	port = process.env.PORT || 8080;

app.use(compression());

app.use(function(req, res, next) {
	if (!req.url.match(/(^\/?(static|docs)\/|\.[a-z]+$)/g)) {
		req.url = '/';
	}
	next();
});

app.use(serveStatic('demo/'));

app.use('/docs', serveStatic('docs/'));

app.listen(port, function() {
	console.log('Server listening on localhost:'+port);
});
