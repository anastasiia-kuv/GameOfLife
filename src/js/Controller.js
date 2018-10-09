import EventObserver from './EventObserver.js';
class Controller extends EventObserver {
  constructor() {
    super();
  }
 
  changeSizeCanvas(data){
    this.notify('pause');
    this.notify('setSizeCanvas', {width: data.width, height: data.height});
    this.notify('updateSizeCanvas', {width: data.width, height: data.height});
    this.notify('initNewGame');
  }

  initGame() {
    this.notify('pause');
    this.notify('initNewGame');
  }

  сhangeСellStatus(data) {
    this.notify('updateCellStatus', {x: data.x, y: data.y});
  }

  сhangeField(data) {
    this.notify('updateField', {cells: data.cells, width: data.width, height: data.height});
  }

  startGame(){
    this.notify('start');
  }

  pauseGame() {
    this.notify('pause');
  }

  endGame() {
    this.notify('end');
  }

  changeSpeed(data){
    this.notify('updateSpeedGame', {speed: data.speed});
  }
}

export default Controller;
