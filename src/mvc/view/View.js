import EventObserver from '../utils/EventObserver';
import constants from '../constants';

class View extends EventObserver {
  constructor() {
    super();
    super.addEmitter(this.constructor.name);
    this.initDOMElements();
    this.initHandleWidthFormInput();
    this.initHandleHeightFormInput();
    this.initHandleSpeedFormInput();
    this.initHandleNewGameFormButton();
    this.initHandleStartGameFormButton();
    this.initHandlePauseGameFormButton();
    this.initHandlePageContainerCanvas();
    this.cellSize = constants.CELL_SIZE;
  }

  initDOMElements() {
    this.$widthInput = $('.js-game__dashboard-control_assignment_width-input');
    this.$heightInput = $('.js-game__dashboard-control_assignment_height-input');
    this.$speedInput = $('.js-game__dashboard-control_assignment_speed-input');
    this.$newGameButton = $('.js-game__dashboard-control_assignment_new-game');
    this.$startGameButton = $('.js-game__dashboard-control_assignment_start');
    this.$pauseGameButton = $('.js-game__dashboard-control_assignment_pause');
    this.$canvas = $('.js-game__field');
  }

  initHandleWidthFormInput() {
    this.$widthInput.on('blur', () => {
      const width = this.$widthInput.val();
      const height = this.$heightInput.val();
      this.notify('changeCanvasSize', { width, height });
    });
  }

  initHandleHeightFormInput() {
    this.$heightInput.on('blur', () => {
      const width = this.$widthInput.val();
      const height = this.$heightInput.val();
      this.notify('changeCanvasSize', { width, height });
    });
  }

  initHandleSpeedFormInput() {
    this.$speedInput.on('change', () => {
      this.notify('changeSpeed', this.$speedInput.val());
    });
  }

  initHandleNewGameFormButton() {
    this.$newGameButton.on('click', () => {
      this.notify('initGame');
    });
  }

  initHandleStartGameFormButton() {
    this.$startGameButton.on('click', () => {
      this.notify('startGame');
    });
  }

  initHandlePauseGameFormButton() {
    this.$pauseGameButton.on('click', () => {
      this.notify('pauseGame');
    });
  }

  initHandlePageContainerCanvas() {
    this.$canvas.on('click', (event) => {
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
