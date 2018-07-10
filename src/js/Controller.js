export default function (v, m) {

  const view = v;
  const model = m;
  const $body = $('body');
    
  $body.bind('changeSizeCanvas', (event) => {
    model.pause();
    model.setWidth(event.width);
    model.setHeight(event.height);
  });

  $body.bind('updateSizeCanvas', () => {
    model.pause();
    view.updateSizeCanvas(model.getWidth(), model.getHeight());
    model.newGame();
  });

  $body.bind('newGameButtonPressed', () => {
    model.pause();
    model.newGame();
  });

  $body.bind('cellChangeStatus', (event) => {
    model.updateCellStatus(event.x, event.y);
  });

  $body.bind('updateField', () => {
    view.updateField(model.getCells(), model.getWidth(), model.getHeight());
  });

  $body.bind('startGameButtonPressed', () => {
    model.start();
  });

  $body.bind('pauseGameButtonPressed', () => {
    model.pause();
  });

  $body.bind('changeSpeed', (event) => {
    model.updateSpeedGame(event.speed);
  });

}
