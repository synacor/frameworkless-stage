/**	Provides a Class and mixin that implement simple HTML views using Zepto and Handlebars.  
 *	If called directly as a function, <code>view()</code> is an alias of {@link view.mixin}.
 *	@module view
 *
 *	@example
 *		<caption>Basic Usage:</caption>
 *
 *		var view = require('view');
 *		
 *		// Uses Handlebars templates:
 *		var template = '<h1>{{{title}}}</h1> <button id="hi">Click Me</button>';
 *		
 *		// Instantiate a view:
 *		var page = view( template );
 *		
 *		// Wire up some events:
 *		page.hookEvents({
 *			'click button#hi' : function() {
 *				alert( 'Title: ' + page.base.find('h1').text() );
 *			}
 *		});
 *		
 *		// Insert the view into the DOM:
 *		page.insertInto( document.body );
 *
 *	@example
 *		<caption>Integrated Example:</caption>
 *
 *		define([
 *			'util', 'view', 
 *			'text!templates/index.html'		// just an HTML file
 *		], function(util, view, template) {
 *			var page = {
 *				url : '/',
 *				
 *				events : {
 *					'click #submit' : function() {
 *						page.view.base.find('form').submit();
 *					}
 *				},
 *				
 *				load : function(params, router) {
 *					if (!this.view) {
 *						// initialize a view:
 *						this.view = view(template);
 *						
 *						// wire up event handlers:
 *						this.view.hookEvents(this.events);
 *					}
 *					
 *					// Template some data into the view:
 *					this.view.template({
 *						title : 'Test Title',
 *						params : params
 *					});
 *					
 *					// insert view into DOM:
 *					this.view.insertInto('#main');
 *				},
 *				
 *				unload : function() {
 *					// remove view from DOM:
 *					this.view.base.remove();
 *				}
 *			};
 *			return page;
 *		});
 */
(function(factory) {
	if (typeof define==='function' && define.amd) {
		define(['util', 'events', 'zepto', 'handlebars'], factory);
	}
	else {
		factory(window.util, window.EventEmitter, $, handlebars);
	}
}(function(_, events, $, handlebars) {
	var EventEmitter = events.EventEmitter || events;
	_ = _ || $;
	
	/**	A URL router.
	 *	@class module:view.View
	 *	@augments module:events.EventEmitter
	 */
	function View(tpl, name) {
		if (!(this instanceof View)) return new View(tpl, name);
		
		this.rawView = tpl;
		this.doTemplate = handlebars.compile(this.rawView);
		this.readyView = $(tpl);
		this.base = $(document.createElement('div'));
		this.base.html('').append(this.readyView);
		this.name = name;
		if (this.name) {
			this.base.attr('data-view', (name));
		}
	}
	
	_.inherits(View, EventEmitter);
	
	_.extend(View.prototype, /** @lends module:view.View# */ {

		/** Render the view using the given data.
		 *	@param {Object} data	Template fields to inject.
		 */
		template : function(data) {
			if (this.doTemplate) {
				this.templateData = data;
				this.readyView = $(data && this.doTemplate(data) || this.rawView);
				this.base.html('').append(this.readyView);
				return this;
			}
			return false;
		},

		/** Register a hash of selector-delegated event handler functions.
		 *	@param {Object} handlers	Handlers to register. Keys are of the form `event-type some#css.selector`.
		 *	@example
		 *		view.hookEvents({
		 *			"click input[type=submit]" : function() {
		 *				$(this).parent('form').submit();
		 *				return false;
		 *			}
		 *		});
		 */
		hookEvents : function(events) {
			var sep, evt, selector, c, x;
			if (this.readyView) {
				this.events = events;
				for (x in events) {
					if (events.hasOwnProperty(x)) {
						sep = x.split(' ');
						evt = sep[0];
						selector = sep.slice(1).join(' ');
						this.base.on(evt, selector, events[x]);
					}
				}
				return this;
			}
			return false;
		},
		
		/**	Insert the view into a given parent node.
		 *	@param {String|Element} selector		A DOM element, or a CSS selector representing one.
		 */
		insertInto : function(selector) {
			if (this.base) {
				$(selector).append(this.base);
			}
			return this;
		},
		
		/**	Insert the view immediately after a given sibling node.
		 *	@param {String|Element} selector		A DOM element, or a CSS selector representing one.
		 */
		insertAfter : function(selector) {
			if (this.base) {
				this.base.insertAfter($(selector));
			}
			return this;
		}
	});
	
	/**	If the module is called as a function, returns a new {@link view.View} instance.
	 *	@name view.view
	 *	@function view.view
	 */
	View.View = View.view = View;
	
	return View;
}));
