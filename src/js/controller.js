export default function (view, model) {
	const _view = view;
	const _model = model;

	$("body").bind("changeSizeCanvas", function(e) {
		_model.pause();
		_model.setWidth(e.width);
		_model.setHeight(e.height);
	});

	$("body").bind("updateSizeCanvas", function() {
		_model.pause();
		_view.updateSizeCanvas(_model.getWidth(), _model.getHeight());
		_model.newGame();
	});

	$("body").bind("newGameButtonPressed", function() {
		_model.pause();
		_model.newGame();
	});

	$("body").bind("cellChangeStatus", function(e) {
		_model.updateCellStatus(e.x,e.y);
	});

	$("body").bind("updateField", function() {
		_view.updateField(_model.getCells(), _model.getWidth(), _model.getHeight());
	});

	$("body").bind("startGameButtonPressed", function() {
		_model.start();
	});

	$("body").bind("pauseGameButtonPressed", function() {
		_model.pause();
	});

	$("body").bind("changeSpeed", function(e) {
		_model.updateSpeedGame(e.speed);
	});
}