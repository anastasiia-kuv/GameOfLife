import EventObserver from '../utils/EventObserver';

class Controller extends EventObserver {
  constructor() {
    super();
    super.addEmitter(this.constructor.name);
  }

  changeCanvasSize(size) {
    this.notify('pause');
    this.notify('setFieldSize', size);
    this.notify('updateCanvasSize', size);
    this.notify('initNewGame');
  }

  initGame() {
    this.notify('pause');
    this.notify('initNewGame');
  }

  сhangeСellStatus(position) {
    this.notify('updateMatrixElementValue', position);
  }

  сhangeField(updatedMatrix) {
    this.notify('updateField', updatedMatrix);
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

  changeSpeed(speed) {
    this.notify('updateGameSpeed', speed);
  }

  getClassName() {
    return this.constructor.name;
  }
}

export default Controller;
