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
    model.initNewGame();
  });

  $body.bind('initNewGame', () => {
    model.pause();
    model.initNewGame();
  });

  $body.bind('сhangeСellStatus', (event) => {
    model.updateCellStatus(event.x, event.y);
  });

  $body.bind('updateField', () => {
    view.updateField(model.getCells(), model.getWidth(), model.getHeight());
  });

  $body.bind('startGame', () => {
    model.start();
  });

  $body.bind('pauseGame', () => {
    model.pause();
  });

  $body.bind('changeSpeed', (event) => {
    model.updateSpeedGame(event.speed);
  });

}
