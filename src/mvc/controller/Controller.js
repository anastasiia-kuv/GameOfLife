import EventObserver from '../utils/EventObserver';

class Controller extends EventObserver {
  constructor() {
    super();
    super.addEmitter(this.constructor.name);
  }

  changeCanvasSize(data) {
    this.notify('pause');
    this.notify('setFieldSize', { width, height });
    this.notify('updateCanvasSize', { width, height });
    this.notify('initNewGame');
  }

  initGame() {
    this.notify('pause');
    this.notify('initNewGame');
  }

  сhangeСellStatus(position) {
    const { x, y } = position;
    this.notify('updateMatrixElementValue', { x, y });
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
