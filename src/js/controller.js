export default function (view, model) {
	const _view = view;
	const _model = model;

	$("body").bind("changeSizeCanvas", function(e) {
		_model.pause();
		_model.widthField(e.width);
		_model.heightField(e.height);
	});

	$("body").bind("updateSizeCanvas", function() {
		_view.updateSizeCanvas(_model.getWidth(), _model.getHeight());
		_model.initFieldData();
	});

	$("body").bind("newGameButtonPressed", function() {
		_model.pause();
		_model.initFieldData();
	});

	$("body").bind("cellChangeStatus", function(e) {
		_model.updateCellStatus(e.x,e.y);
	});

	$("body").bind("updateField", function() {
		_view.updateField(_model.getCells(), _model.getWidth(), _model.getHeight());
	});

	$("body").bind("startButtonPressed", function() {
		_model.start();
	});

	$("body").bind("pauseButtonPressed", function() {
		_model.pause();
	});

	$("body").bind("changeSpeed", function(e) {
		_model.updateSpeedGame(e.speed);
	});
}