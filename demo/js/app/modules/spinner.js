define(
	['util'],
	function(_){
		var exports = {};

	_.extend(exports, {
		toggleSpinner: function(where) {
			var here;

			if(typeof where === 'string') {
				here = document.querySelector(where);
			} else {
				here = where;
			}
			existing = here.querySelector('#stage-spinner-overlay');
			if(existing) {
				existing.parentNode.removeChild(existing);
				console.log("Removed spinner");
			} else {
				var element = document.createElement('div');
				element.setAttribute('id', 'stage-spinner-overlay');
				element.innerHTML = '<div id="spinner"></div>';
				here.appendChild(element);
				console.log("Appended spinner");
			}
		}
	});

	return exports;
})