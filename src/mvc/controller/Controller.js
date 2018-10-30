import EventObserver from '../utils/EventObserver';

class Controller extends EventObserver {
  constructor() {
    super();
    super.addEmitter(this.constructor.name);
  }

  changeCanvasSize(data) {
    this.notify('pause');
    this.notify('setFieldSize', { width: data.width, height: data.height });
    this.notify('updateCanvasSize', { width: data.width, height: data.height });
    this.notify('initNewGame');
  }

  initGame() {
    this.notify('pause');
    this.notify('initNewGame');
  }

  сhangeСellStatus(data) {
    this.notify('updateCell', { x: data.x, y: data.y });
  }

  сhangeField(data) {
    this.notify('updateField', { matrix: data.matrix, width: data.width, height: data.height });
  }

  startGame() {
    this.notify('start');
  }

  pauseGame() {
    this.notify('pause');
  }

  endGame() {
    this.notify('end');
  }

  changeSpeed(data) {
    this.notify('updateGameSpeed', { speed: data.speed });
  }

  getClassName() {
    return this.constructor.name;
  }
}

export default Controller;
