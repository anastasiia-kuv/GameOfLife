import EventObserver from '../event-observer/EventObserver';
import constants from '../constants';

class View extends EventObserver {
  constructor() {
    super();
    this.initDOMElements();
    this.initHandlers();
    this.cellSize = constants.CELL_SIZE;
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
      this.notify('changeCanvasSize', { width: this.widthInput.val(), height: this.heightInput.val() });
    });

    this.heightInput.on('blur', () => {
      this.notify('changeCanvasSize', { width: this.widthInput.val(), height: this.heightInput.val() });
    });

    this.speedInput.on('change', () => {
      this.notify('changeSpeed', { speed: this.speedInput.val() });
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
      const x = (event.offsetX / this.cellSize) < 0
        ? Math.round(event.offsetX / this.cellSize)
        : Math.floor(event.offsetX / this.cellSize);
      const y = (event.offsetY / this.cellSize) < 0
        ? Math.round(event.offsetY / this.cellSize)
        : Math.floor(event.offsetY / this.cellSize);
      this.notify('сhangeСellStatus', { x, y });
    });
  }

  updateCanvasSize(data) {
    this.canvas.get(0).width = data.width * this.cellSize;
    this.canvas.get(0).height = data.height * this.cellSize;
    document.body.appendChild(this.canvas.get(0));
  }

  updateField(data) {
    const c = this.canvas.get(0).getContext('2d');
    c.clearRect(0, 0, data.width * this.cellSize, data.height * this.cellSize);
    Array.from(
      { length: data.width }, (row, i) => Array.from(
        { length: data.height }, (col, j) => (data.matrix[i][j]
          ? c.fillRect(i * this.cellSize, j * this.cellSize, this.cellSize, this.cellSize)
          : 0),
      ),
    );
  }
}

export default View;
