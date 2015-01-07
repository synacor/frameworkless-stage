define([
	'view', 'stage',
	'text!templates/index.html'
], function(view, stage, tpl) {
	return {
		isDefault : true,
		url : '/:animation',

		load : function(params) {
			var v = view(tpl, 'demo').template({
				params : params
			});

			// show some color to make the view change more obvious
			v.$$('h1').style.color = '#' + parseInt('111111' + params.animation, 36).toString(16).split('').reverse().join('').substring(0,6);

			stage.show(v, {
				animation : params.animation || 'fade',
				duration : Math.round(params.$query.duration) || 300
			}, function() {
				// done
				v.$$('.page').classList.add('showing');
			});
		}
	};
});
