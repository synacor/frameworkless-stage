(function(factory) {
	if (typeof define==='function' && define.amd) {
		define(['view', 'util', 'events'], factory);
	}
	else {
		factory(View, window.util, window.EventEmitter, window.View);
	}
}(function(View, _, events) {
	var exports = new events(),
		stage = null,
		queue = [],
		working = false,
		currentlyShowing = null,
		initialized = false;


	function initContainer(container) {
		if (typeof container === 'string') {
			stage = document.querySelector(container);

			if(!stage) return false;
			//stage = $(container);

			addClass(stage, 'stage');
			//stage.addClass('stage');
		}
	}
	
	function addView(view, options) {
		
		if (!view.stage) {
			stage.appendChild(view);
			
			if(options.duration) {

				view.style.transitionDuration = options.duration +'ms';
				view.style.webkitTransitionDuration = options.duration +'ms';
				view.style.mozTransitionDuration = options.duration +'ms';
			}

			if(options.timingFunction) {
				view.style.transitionDuration = options.timingFunction;
				view.style.webkitTransitionDuration = options.timingFunction;
				view.style.mozTransitionDuration = options.timingFunction;
			}

			view.stage = exports;
			view.stageOptions = options;
			
			return true;
		}
		return false;
	}

	function handleAnimation(animView, animation, direction, callback) {
		var className = animation + '-out';

		if (direction){
			if (!hasClass(animView, className)){
				addClass(animView, className);
			} 
			addClass(animView, 'staged');
			setTimeout(function() {
				removeClass(animView, className);
				if (callback) callback();
			}, 15);
		}else {
			addClass(animView, className);
			setTimeout(function() {
				removeClass(animView, 'staged');

				if (callback) callback();
			}, animView.stageOptions.duration || 500);
		}
	}

	function hideCurrent(callback) {
		console.log("hideCurrent Called");
		if (currentlyShowing) {
			if (currentlyShowing.stageOptions && currentlyShowing.stageOptions.animation){
				handleAnimation(currentlyShowing, currentlyShowing.stageOptions.animation, false, callback);
			}else{
				removeClass(currentlyShowing.base[0], 'staged');
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
				addClass(view, 'staged');
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
	
	function addClass(selector, className) {
		if(!selector.classList.contains(className))	selector.classList.add(className);
	}

	function removeClass(selector, className) {
		selector.classList.remove(className);
	}

	function hasClass(selector, className) {
		return selector.classList.contains(className);
	}

	function findNode(selector, childName) {
		console.log(childName);
		var child = document.getElementById(childName);
		console.log(child);
		return child;
	}

	_.extend(exports, {
		
		init: function(options) {
			if (!options.container) return false;
			
			initContainer(options.container);
			
			initialized = true;
		},
		
		show: function(view, options) {
			if (!initialized) return false;
			
			if (!view) return false;

			var viewNode;

			if (view instanceof HTMLElement || view instanceof Element){
				viewNode = view;
			}else if (view.hasOwnProperty('base')) {
				viewNode = view.base[0];
			}else if (view.hasOwnProperty('0')){
				viewNode = view[0];
			}
			
			options = options || view.stageOptions || {
				animation: false
			};
			
			if (!viewNode) return false;
			if (!viewNode.stage) addView(viewNode, options);
			
			bufferShow(viewNode);
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
		}
	});
	
	return exports;
}));
