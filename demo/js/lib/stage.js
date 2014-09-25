(function(factory) {
	if (typeof define==='function' && define.amd) {
		define(['view', 'util', 'events', 'zepto'], factory);
	}
	else {
		factory(View, window.util, window.EventEmitter, $, window.View);
	}
}(function(View, _, events, $) {
	var exports = new events(),
		stage = null,
		queue = [],
		working = false,
		currentlyShowing = null,
		initialized = false;


	function initContainer(container) {
		if (typeof container === 'string') {
			stage = $(container);
			stage.addClass('stage');
		}
	}
	
	function addView(view, options) {
		if (!view.stage) {
			
			stage.append(view.base);
			
			if(options.duration) {

				view.base.css({
					'transition-duration': options.duration +'ms',
					'-webkit-transition-duration': options.duration+'ms',
					'-moz-transition-duration': options.duration+'ms'
				});
			}

			if(options.timingFunction) {
				view.base.css({
					'transition-timing-function': options.timingFunction
				});
			}

			view.stage = exports;
			view.stageOptions = options;
			
			return true;
		}
		return false;
	}
	
	function handleAnimation(animView, animation, direction, callback) {
		if (direction){
			if (!animView.base.hasClass(animation + '-out')) animView.base.addClass(animation + '-out');
			animView.base.addClass('staged');
			setTimeout(function() {
				animView.base.removeClass(animation + '-out');
				if (callback) callback();
			}, 15);
		}else {
			animView.base.addClass(animation + '-out');
			setTimeout(function() {
				animView.base.removeClass('staged');
				if (callback) callback();
			}, animView.stageOptions.duration || 500);
		}
	}

	function hideCurrent(callback) {
		if (currentlyShowing) {
			if (currentlyShowing.stageOptions && currentlyShowing.stageOptions.animation){
				handleAnimation(currentlyShowing, currentlyShowing.stageOptions.animation, false, callback);
			}else{
				currentlyShowing.base.removeClass('staged');
				if (callback) callback();
			}
		}else{
			if (callback) callback();
		}
	}
	
	function showView(view, callback) {
		working = true;
		var before = Date.now();
		hideCurrent(function() {
			if (view.stageOptions && view.stageOptions.animation) {
				handleAnimation(view, view.stageOptions.animation, true, function() {
					currentlyShowing = view;
					working = false;
					if (callback) callback();
				});
			}else{
				view.base.addClass('staged');
				currentlyShowing = view;
				working = false;
				if (callback) callback();
			}
		});
	}

	function bufferShow(view) {
		if (working || queue.length) {
			queue.push(showView.bind(exports, view, cb));
		}else{
			showView(view, cb);
		}

		function cb() {
			if (queue.length){
				queue.pop()();
			}
		}
	}
	
	_.extend(exports, {
		
		init: function(options) {
			if (!options.container) return false;
			
			initContainer(options.container);
			
			initialized = true;
		},
		
		show: function(options, view) {
			if (!initialized) return false;
			
			if (options instanceof View) {
				view = options;
				options = null;
			}
			
			options = options || view.stageOptions || {
				animation: false
			};
			
			if (!view || !view.base) return false;
			
			if (!view.stage) addView(view, options);
			
			bufferShow(view);
		},
		
		hide: function(options, view) {
			if (!initialized) return false;
			
			if (options instanceof view) {
				view = options;
				options = null;
			}
			
			options = options || false;
			
			if (!view || !view.base) return false;
			
			if (currentlyShowing !== view.base) return false;
			
			hideCurrent(options);
		},

		spinner: function(where) {
			var here, existing;

			if(typeof where === 'string') {
				here = $(where);
			} else {
				here = where;
			}
			existing = here.find('#stage-spinner-overlay');

			if(existing.length) {
				$('#stage-spinner-overlay').remove();
			} else {
				here.append('<div id="stage-spinner-overlay"><div id="spinner"></div></div>');
			}
		}

		/*addSpinner: function(where) {
			if(typeof where === 'string')
				$(where).append('<div id="overlay"><div id="spinner"></div></div>');
		},

		removeSpinner: function() {
			$('#overlay').remove();
		}*/
	});
	
	return exports;
}));
