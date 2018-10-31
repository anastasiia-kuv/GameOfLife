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
      const width = this.widthInput.val();
      const height = this.heightInput.val();
      this.notify('changeCanvasSize', { width, height });
    });

    this.heightInput.on('blur', () => {
      const width = this.widthInput.val();
      const height = this.heightInput.val();
      this.notify('changeCanvasSize', { width, height });
    });

    this.speedInput.on('change', () => {
      this.notify('changeSpeed', this.speedInput.val());
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

  updateCanvasSize(size) {
    const { width, height } = size;
    this.canvas.get(0).width = width * this.cellSize;
    this.canvas.get(0).height = height * this.cellSize;
    document.body.appendChild(this.canvas.get(0));
  }

  updateField(updatedMatrix) {
    const width = updatedMatrix.length;
    const height = updatedMatrix[0].length;
    const field = this.canvas.get(0).getContext('2d');
    field.clearRect(0, 0, width * this.cellSize, height * this.cellSize);
    Array.from(
      { length: width }, (row, i) => Array.from(
        { length: height }, (col, j) => (updatedMatrix[i][j]
          ? field.fillRect(i * this.cellSize, j * this.cellSize, this.cellSize, this.cellSize)
          : 0),
      ),
    );
  }
}

export default View;
