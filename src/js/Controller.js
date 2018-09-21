import EventObserver from './EventObserver.js';
class Controller {
  constructor(view, model){
    this.view = view;
    this.model = model;
    this.observer = new EventObserver();
    this.model.setObserver(this.observer);
    this.view.setObserver(this.observer);
    this.initEvent();
  }
  
  initEvent(){
    this.observer.subscribe(data => {
      switch (data.nameEvent) {
        case 'changeSizeCanvas':
          this.changeSizeCanvas(data.width, data.height);
          break;
        case 'updateSizeCanvas':
          this.updateSizeCanvas(data.width, data.height);
          break;
        case 'initNewGame':
          this.initNewGame();
          break;
        case 'сhangeСellStatus':
          this.сhangeСellStatus(data.x, data.y);
          break;
        case 'updateField':
          this.updateField();
          break;
        case 'startGame':
          this.startGame();
          break;
        case 'pauseGame':
          this.pauseGame();
          break;
        case 'changeSpeed':
          this.changeSpeed(data.speed);
          break;
      }
    });
  }

  changeSizeCanvas(width, height){
    this.model.pause();
    this.model.setWidth(width);
    this.model.setHeight(height);
  }

  updateSizeCanvas(width, height) {
    this.model.pause();
    this.view.updateSizeCanvas(width, height);
    this.model.initNewGame();
  }

  initNewGame() {
    this.model.pause();
    this.model.initNewGame();
  }

  сhangeСellStatus(x, y) {
    this.model.updateCellStatus(x, y);
  }

  updateField() {
    this.view.updateField(this.model.getCells(), this.model.getWidth(), this.model.getHeight());
  }

  startGame(){
    this.model.start();
  }

  pauseGame() {
    this.model.pause();
  }

  changeSpeed(speed){
    this.model.updateSpeedGame(speed);
  }
}

export default Controller;
