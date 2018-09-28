import EventObserver from './EventObserver.js';
class Controller extends EventObserver {
  constructor(view, model) {
    super();
    this.view = view;
    this.model = model;
  }
 
  changeSizeCanvas(data){
    this.model.pause();
    this.model.setWidth(data.width);
    this.model.setHeight(data.height);
  }

  updateSizeCanvas(data) {
    this.model.pause();
    this.view.updateSizeCanvas(data.width, data.height);
    this.model.initNewGame();
  }

  initNewGame() {
    this.model.pause();
    this.model.initNewGame();
  }

  сhangeСellStatus(data) {
    this.model.updateCellStatus(data.x, data.y);
  }

  updateField(data) {
    this.view.updateField(data.cells,  data.width, data.height);
  }

  startGame(){
    this.model.start();
  }

  pauseGame() {
    this.model.pause();
  }

  changeSpeed(data){
    this.model.updateSpeedGame(data.speed);
  }
}

export default Controller;
