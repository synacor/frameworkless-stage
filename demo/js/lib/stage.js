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
		currentlyShowing = null,
		initialized = false,
		
		viewStack = [];
	
	
	function initContainer(container) {
		if (typeof container === 'string') {
			stage = $(container);
			stage.addClass('stage');
		}
	}
	
	function addView(view, options) {
		if (!view.stage) {
			console.log("Adding view!", view, options);
			
			stage.append(view.base);
			
			view.stage = exports;
			view.stageOptions = options;
			
			return true;
		}
		return false;
	}
	
	function handleAnimation(animView, animation, direction, callback) {
		if (animation === 'fade'){
			if (direction){
				console.log("This should be fading in!");
				if (!animView.base.hasClass('fade-out')) animView.base.addClass('fade-out');
				animView.base.addClass('staged');
				setTimeout(function() {
					animView.base.removeClass('fade-out');
					if (callback) callback();
				}, 15);
			}else {
				animView.base.addClass('fade-out');
				setTimeout(function() {
					animView.base.removeClass('staged');
					if (callback) callback();
				}, 500);
			}
		}else if (animation === 'slide') {
			if (direction) {
				if (!animView.base.hasClass('slide-out')) animView.base.addClass('slide-out');
				animView.base.addClass('staged');
				setTimeout(function() {
					animView.base.removeClass('slide-out');
				}, 15);
			}else{
				
			}
		}
	}
	
	function hideCurrent(callback) {
		if (currentlyShowing) {
			console.log("Hide the view!", currentlyShowing.stageOptions);
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
	
	function showView(view) {
		var before = Date.now();
		hideCurrent(function() {
			console.log("Took " + (Date.now() - before) + " to hide.");
			console.log("Show the view!", view.stageOptions);
			if (view.stageOptions && view.stageOptions.animation) {
				console.log("View has an animation!!");
				handleAnimation(view, view.stageOptions.animation, true, function() {
					console.log("ANIMATION OVER");
					currentlyShowing = view;
				});
			}else{
				view.base.addClass('staged');
				currentlyShowing = view;
			}
			
			
		});
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
			
			showView(view);
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
			if (typeof where === 'string'){
				
			}
		}
	});
	
	return exports;
}));
