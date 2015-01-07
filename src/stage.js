(function(g, factory) {
	if (typeof define==='function' && define.amd) {
		define([], factory);
	}
	else {
		g.stage = g['frameworkless-stage'] = factory();
	}
}(this, function() {
	var exports,
		queue = [],
		stage, working, current, initialized;

	exports = {
		/** Initialize the stage within a given container element.
		 *	@param {Element} container		A parent node into which the stage should be placed
		 */
		init : function(options) {
			var c = options.container || options;
			stage = typeof c==='string' ? document.querySelector(c) : c;
			if (!stage || !stage.nodeName) {
				return false;
			}
			addClass(stage, 'stage');
			initialized = true;
		},

		show : function(view, options, callback) {
			var el = view.base || view;
			el = el[0] || el;

			if (!initialized || !view || !el) return false;

			options = options || view.stageOptions || {
				animation: false
			};

			if (!el.stage) {
				addView(el, options);
			}

			bufferShow(el, callback);
			return true;
		},

		hide : function(options, view) {
			var cur;
			if (!view) {
				view = options;
				options = null;
			}

			cur = view && view.base && current===view.base;
			if (cur) {
				hideCurrent(options || false);
			}
			return cur;
		}
	};

	function addView(view, options) {
		var s = view.style;
		if (!view.stage) {
			stage.appendChild(view);

			if (options.duration) {
				s.transitionDuration = s.webkitTransitionDuration = s.mozTransitionDuration = options.duration + 'ms';
			}

			if (options.timingFunction) {
				s.transitionTimingFunction = s.webkitTransitionTimingFunction = s.mozTransitionTimingFunction = options.timingFunction;
			}

			view.stage = exports;
			view.stageOptions = options;
		}
	}

	function handleAnimation(node, animation, direction, callback) {
		var className = animation + '-out',
			dur = Math.round(node.stageOptions.duration) || 500;

		addClass(node, className);

		if (direction) {
			addClass(node, 'staged');
			setTimeout(function() {
				removeClass(node, className);
			}, 15);
		}

		setTimeout(function() {
			if (!direction) {
				removeClass(node, 'staged');
			}
			call(callback);
		}, dur+10);
	}

	function hideCurrent(callback) {
		var opt;
		if (current) {
			opt = current.stageOptions;
			if (opt && opt.animation) {
				return handleAnimation(current, opt.animation, false, callback);
			}
			removeClass(current.base, 'staged');
		}

		call(callback);
	}

	function showView(view, callback) {
		var opt = view.stageOptions;
		working = true;

		function done() {
			current = view;
			working = false;
			call(callback);
		}

		hideCurrent(function() {
			if (opt && opt.animation) {
				return handleAnimation(view, opt.animation, true, done);
			}
			addClass(view, 'staged');
			done();
		});
	}

	function bufferShow(view, callback) {
		function work() {
			showView(view, function() {
				if (queue.length) {
					queue.pop()();
				}
				call(callback);
			});
		}

		if (working || queue.length) {
			return queue.push(work);
		}
		work();
	}

	function addClass(node, className) {
		node.classList.add(className);
	}

	function removeClass(node, className) {
		node.classList.remove(className);
	}

	function call(fn) {
		if (typeof fn==='function') return fn();
	}

	return exports;
}));
