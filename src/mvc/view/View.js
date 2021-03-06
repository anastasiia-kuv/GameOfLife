import constants from '../constants';
import EventObserver from '../utils/EventObserver';

class View extends EventObserver {
  constructor() {
    super();
    super.addEmitter(this.constructor.name);
    this.initDOMElements();
    this.initEventListeners();
    this.cellSize = constants.CELL_SIZE;
  }

  initDOMElements() {
    this.$widthInput = $('.js-game__entry-field_assignment_width');
    this.$heightInput = $('.js-game__entry-field_assignment_height');
    this.$speedInput = $('.js-game__range-field_assignment_speed');
    this.$newGameButton = $('.js-game__dashboard-control_assignment_new-game');
    this.$startGameButton = $('.js-game__dashboard-control_assignment_start');
    this.$pauseGameButton = $('.js-game__dashboard-control_assignment_pause');
    this.$canvas = $('.js-game__field');
  }

  initEventListeners() {
    this.$widthInput.on('blur', this.handleWidthInputBlur);
    this.$heightInput.on('blur', this.handleHeightInputBlur);
    this.$speedInput.on('change', this.handleSpeedInputChange);
    this.$newGameButton.on('click', this.handleNewGameButtonClick);
    this.$startGameButton.on('click', this.handleStartGameButtonClick);
    this.$pauseGameButton.on('click', this.handlePauseGameButtonClick);
    this.$canvas.on('click', this.handleCanvasClick);
  }

  handleWidthInputBlur = () => {
    const width = this.$widthInput.val();
    const height = this.$heightInput.val();
    this.notify('changeCanvasSize', { width, height });
  }

  handleHeightInputBlur = () => {
    const width = this.$widthInput.val();
    const height = this.$heightInput.val();
    this.notify('changeCanvasSize', { width, height });
  }

  handleSpeedInputChange = () => {
    this.notify('changeSpeed', this.$speedInput.val());
  }

  handleNewGameButtonClick = () => {
    this.notify('initGame');
  }

  handleStartGameButtonClick = () => {
    this.notify('startGame');
  }

  handlePauseGameButtonClick = () => {
    this.notify('pauseGame');
  }

  handleCanvasClick = (event) => {
    const x = (event.originalEvent.offsetX / this.cellSize) < 0
      ? Math.round(event.originalEvent.offsetX / this.cellSize)
      : Math.floor(event.originalEvent.offsetX / this.cellSize);
    const y = (event.originalEvent.offsetY / this.cellSize) < 0
      ? Math.round(event.originalEvent.offsetY / this.cellSize)
      : Math.floor(event.originalEvent.offsetY / this.cellSize);
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

  getClassName() {
    return this.constructor.name;
  }
}

export default View;
