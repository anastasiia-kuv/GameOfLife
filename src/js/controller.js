export default function (view, model) {
	const _view = view;
	const _model = model;

	$("body").bind("changeSizeCanvas", function(e) {
		_model.widthField(e.width);
		_model.heightField(e.height);
	});

	$("body").bind("updateSizeCanvas", function() {
		_view.updateSizeCanvas(_model.getWidth(), _model.getHeight());
	});
}