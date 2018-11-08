class Checkers {
  constructor() {
    this.allEvents = {
      View: {
        Controller: ['changeCanvasSize', 'changeSpeed', 'initGame', 'startGame', 'pauseGame', 'сhangeСellStatus'],
      },
      Model: {
        Controller: ['сhangeField', 'initGame', 'startGame', 'pauseGame', 'endGame'],
      },
      Controller: {
        View: ['updateCanvasSize', 'updateField'],
        Model: ['setFieldSize', 'initNewGame', 'start', 'pause', 'end', 'updateMatrixElementValue', 'updateGameSpeed'],
      },
    };
  }

  hasAvailable(emitter, observer, method) {
    return this.allEvents[emitter][observer].some(elem => elem === method);
  }
}

export default Checkers;
