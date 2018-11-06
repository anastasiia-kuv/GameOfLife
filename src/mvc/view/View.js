import EventObserver from '../event-observer/EventObserver';
import constants from '../constants';

class View extends EventObserver {
  constructor() {
    super();
    this.initDOMElements();
    this.initEventListeners();
    this.cellSize = constants.CELL_SIZE;
  }

  initDOMElements() {
    this.$widthInput = $('.js-width-form__input');
    this.$heightInput = $('.js-height-form__input');
    this.$speedInput = $('.js-speed-form__input');
    this.$newGameButton = $('.js-new-game-form__button');
    this.$startGameButton = $('.js-start-game-form__button');
    this.$pauseGameButton = $('.js-pause-game-form__button');
    this.$canvas = $('.js-page-container__canvas');
  }

  initEventListeners() {
    this.$widthInput.on('blur', () => this.handleWidthInputBlur());
    this.$heightInput.on('blur', () => this.handleHeightInputBlur());
    this.$speedInput.on('change', () => this.handleSpeedInputChange());
    this.$newGameButton.on('click', () => this.handleNewGameButtonClick());
    this.$startGameButton.on('click', () => this.handleStartGameButtonClick());
    this.$pauseGameButton.on('click', () => this.handlePauseGameButtonClick());
    this.$canvas.on('click', event => this.handleCanvasClick(event));
  }

  handleWidthInputBlur() {
    const width = this.$widthInput.val();
    const height = this.$heightInput.val();
    this.notify('changeCanvasSize', { width, height });
  }

  handleHeightInputBlur() {
    const width = this.$widthInput.val();
    const height = this.$heightInput.val();
    this.notify('changeCanvasSize', { width, height });
  }

  handleSpeedInputChange() {
    this.notify('changeSpeed', this.$speedInput.val());
  }

  handleNewGameButtonClick() {
    this.notify('initGame');
  }

  handleStartGameButtonClick() {
    this.notify('startGame');
  }

  handlePauseGameButtonClick() {
    this.notify('pauseGame');
  }

  handleCanvasClick(event) {
    const x = (event.offsetX / this.cellSize) < 0
      ? Math.round(event.offsetX / this.cellSize)
      : Math.floor(event.offsetX / this.cellSize);
    const y = (event.offsetY / this.cellSize) < 0
      ? Math.round(event.offsetY / this.cellSize)
      : Math.floor(event.offsetY / this.cellSize);
    this.notify('сhangeСellStatus', { x, y });
  }

  updateCanvasSize(size) {
    const { width, height } = size;
    this.$canvas.get(0).width = width * this.cellSize;
    this.$canvas.get(0).height = height * this.cellSize;
    document.body.appendChild(this.$canvas.get(0));
  }

  updateField(updatedMatrix) {
    const width = updatedMatrix.length;
    const height = updatedMatrix[0].length;
    const field = this.$canvas.get(0).getContext('2d');
    field.clearRect(0, 0, width * this.cellSize, height * this.cellSize);
    updatedMatrix.forEach((col, i) => {
      col.forEach((cell, j) => {
        if (cell === 1) {
          field.fillRect(i * this.cellSize, j * this.cellSize, this.cellSize, this.cellSize);
        }
      });
    });
  }
}

export default View;
