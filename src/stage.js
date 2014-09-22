(function(factory) {
	if (typeof define==='function' && define.amd) {
		define(['util', 'events', 'zepto'], factory);
	}
	else {
		factory(window.util, window.EventEmitter, $);
	}
}(function(_, events, $) {
	var exports = new events(),
		viewStack = [];
	
	_.extend(exports, {
		pushView: function(newView) {
			
		},
		
		popView: function() {
			
		}
	});
);