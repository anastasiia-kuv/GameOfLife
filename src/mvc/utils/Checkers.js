class Checkers {
  constructor() {
    this.allEvents = [
      {
        View: [{
          Controller: ['changeCanvasSize', 'changeSpeed', 'initGame', 'startGame', 'pauseGame', 'сhangeСellStatus'],
        }],
        Model: [{
          Controller: ['сhangeField', 'initGame', 'startGame', 'pauseGame', 'endGame'],
        }],
        Controller: [{
          View: ['updateCanvasSize', 'updateField'],
          Model: ['setFieldSize', 'initNewGame', 'start', 'pause', 'end', 'updateCell', 'updateGameSpeed'],
        }],
      },
    ];
  }

  hasAvailable(emitter, observer, method) {
    return this.allEvents[0][emitter][0][observer].some(elem => elem === method);
  }
}

export default Checkers;
