Frameworkless Stage [![NPM Version](http://img.shields.io/npm/v/frameworkless-stage.svg?style=flat)](https://www.npmjs.org/package/frameworkless-stage) [![Bower Version](http://img.shields.io/bower/v/frameworkless-stage.svg?style=flat)](http://bower.io/search/?q=frameworkless-stage)
=============

Transition those views to the stage.

[![Build Status](https://img.shields.io/travis/synacorinc/frameworkless-stage.svg?style=flat&branch=master)](https://travis-ci.org/synacorinc/frameworkless-stage)
[![Dependency Status](http://img.shields.io/david/synacorinc/frameworkless-stage.svg?style=flat)](https://david-dm.org/synacorinc/frameworkless-stage)
[![devDependency Status](http://img.shields.io/david/dev/synacorinc/frameworkless-stage.svg?style=flat)](https://david-dm.org/synacorinc/frameworkless-stage#info=devDependencies)


Use a Package Manager
---------------------

**bower:**

```bash
bower install frameworkless-stage
# copy the stuff you want
cp bower_components/frameworkless-stage/dist/stage.js src/lib
cp bower_components/frameworkless-stage/dist/less/stage.less src/less/lib
```

**npm:**

```bash
npm install frameworkless-stage
# copy the stuff you want
cp node_modules/frameworkless-stage/dist/stage.js src/lib
cp node_modules/frameworkless-stage/dist/less/stage.less src/less/lib
```


---


Use the Source
--------------

Get started right away, so you can disassemble and play around at your leisure.

```bash
# Clone frameworkless-stage
git clone git@github.com:synacorinc/frameworkless-stage.git

# Install development dependencies
npm install

# Build the library
npm run-script build      # or just `grunt` if you have grunt-cli installed globally

# Check out the demo
PORT=8080 npm start       # this just does `node server.js`
```


---


Quick Repo Tour
---------------

* `/src` is where the source code lives
* `/dist` is the built library
* `/demo` is a simple demo, using [requirejs](http://requirejs.org)


---


Usage
-----

```JavaScript
var stage = require('stage');

// stage views into <body>:
stage.init(document.body);

// A view can just be a DOM node:
var view = document.createElement('div');
view.innerHTML = '<h1>Hello, world!</h1>';

// Push the view onto the stage:
stage.show(view, {
	animation : 'fade',
	duration : 500
}, function() {

	// add some content to the view after it has been shown:
	var more = document.createElement('p');
	more.textContent = 'I am visible now!';
	view.appendChild(more);

});
```


---


Usage with `frameworkless-view`
-------------------------------

**Setup:**

```JavaScript
define(['stage'], function(stage) {
	stage.init(document.body);
});
```


**In a route:**

```JavaScript
define(['view', 'stage'], function(view, stage) {
	return view({
		template : '<h1>Hello, world!</h1>',

		load : function() {
			// push the view-presenter onto the stage:
			stage.show(this);
		}
	});
});
```
