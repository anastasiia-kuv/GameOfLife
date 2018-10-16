import EventObserver from '../event-observer/EventObserver.js';
import constants from '../constants.js';
class View extends EventObserver {
  constructor() {
    super();
    this.initDOMElements();
    this.initHandlers();
  }

  initDOMElements() {
    this.widthInput = $('.js-width-form__input');
    this.heightInput = $('.js-height-form__input');
    this.speedInput = $('.js-speed-form__input');
    this.newGameButton = $('.js-new-game-form__button');
    this.startGameButton = $('.js-start-game-form__button');
    this.pauseGameButton = $('.js-pause-game-form__button');
    this.canvas = $('.js-page-container__canvas');
  }

  initHandlers() {
    this.widthInput.on('blur', () => {
      this.notify('changeSizeCanvas', {height: this.heightInput.val(), width: this.widthInput.val()});
    });

    this.heightInput.on('blur', () => {
      this.notify('changeSizeCanvas', {height: this.heightInput.val(), width: this.widthInput.val()});
    });

    this.speedInput.on('change', () => {
      this.notify('changeSpeed', {speed: this.speedInput.val()});
    });

    this.newGameButton.on('click', () => {
      this.notify('initGame');
    });

    this.startGameButton.on('click', () => {
      this.notify('startGame');
    });

    this.pauseGameButton.on('click', () => {
      this.notify('pauseGame');
    });

    this.canvas.on('click', (event) => {
      const x = Math.floor(event.offsetX / constants.CELL_SIZE);
      const y = Math.floor(event.offsetY / constants.CELL_SIZE);
      this.notify('сhangeСellStatus', {x: x, y: y});
    });
  }

  updateSizeCanvas(data) {
    this.canvas.get(0).width = data.width * constants.CELL_SIZE;
    this.canvas.get(0).height = data.height * constants.CELL_SIZE;
    document.body.appendChild(this.canvas.get(0));
  }
  
  updateField(data) {
    const c = this.canvas.get(0).getContext('2d');
    c.clearRect(0, 0, data.height * constants.CELL_SIZE, data.width * constants.CELL_SIZE);
    Array.from({ length: data.height }, (_, i) => Array.from({ length: data.width }, (_, j) => data.cells[i][j] ? c.fillRect(i * constants.CELL_SIZE, j * constants.CELL_SIZE, constants.CELL_SIZE, constants.CELL_SIZE) : 0)); 
  } 
}

export default View;
