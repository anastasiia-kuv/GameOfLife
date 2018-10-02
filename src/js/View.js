import EventObserver from './eventObserver.js';
import constants from './constants.js';
class View extends EventObserver {
  constructor() {
    super();
    this.canvas = {};
    this.initView();
  }

  initView() {
    const pageContainer = document.createElement('main');
    pageContainer.className = 'page-container';
    document.body.insertBefore(pageContainer, document.body.firstChild);

    const nameOfGame = document.createElement('h1');
    nameOfGame.className = 'page-container__title';
    nameOfGame.innerHTML = 'game of life';
    pageContainer.appendChild(nameOfGame);

    const controlElementsContainer = document.createElement('section');
    controlElementsContainer.className = 'control-elements-container';
    pageContainer.appendChild(controlElementsContainer);

    const widthForm = document.createElement('form');
    widthForm.className = 'width-form';
    controlElementsContainer.appendChild(widthForm);

    const widthLabel = document.createElement('label');
    widthLabel.className = 'width-form__label';
    widthLabel.innerHTML = 'width';
    widthForm.appendChild(widthLabel);

    const widthInput = document.createElement('input');
    widthInput.className = 'width-form__input';
    widthInput.setAttribute('type', 'number');
    widthInput.setAttribute('value', constants.DEFAULT_WIDTH);
    widthInput.setAttribute('tabindex', '1');
    widthInput.onblur = () => {
      this.notify('changeSizeCanvas', {width: widthInput.value, height: heightInput.value});
    };
    widthForm.appendChild(widthInput);

    const heightForm = document.createElement('form');
    heightForm.className = 'height-form';
    controlElementsContainer.appendChild(heightForm);

    const heightLabel = document.createElement('label');
    heightLabel.className = 'height-form__label';
    heightLabel.innerHTML = 'height';
    heightForm.appendChild(heightLabel);

    const heightInput = document.createElement('input');
    heightInput.className = 'height-form__input';
    heightInput.setAttribute('type', 'number');
    heightInput.setAttribute('value', constants.DEFAULT_HEIGHT);
    heightInput.setAttribute('tabindex', '2');
    heightInput.onblur = () => {
      this.notify('changeSizeCanvas', {width: widthInput.value, height: heightInput.value});
    };
    heightForm.appendChild(heightInput);

    const speedForm = document.createElement('form');
    speedForm.className = 'speed-form';
    controlElementsContainer.appendChild(speedForm);

    const speedLabel = document.createElement('label');
    speedLabel.className = 'speed-form__label';
    speedLabel.innerHTML = 'speed';
    speedForm.appendChild(speedLabel);

    const speedInput = document.createElement('input');
    speedInput.className = 'speed-form__input';
    speedInput.setAttribute('type', 'range');
    speedInput.setAttribute('min', '1');
    speedInput.setAttribute('max', '5');
    speedInput.setAttribute('value', '3');
    speedInput.setAttribute('tabindex', '3');
    speedInput.onchange = () => {
      this.notify('changeSpeed', {speed: speedInput.value});
    };
    speedForm.appendChild(speedInput);

    const speedRangeLabel = document.createElement('label');
    speedRangeLabel.className = 'speed-form__range-label';
    speedForm.appendChild(speedRangeLabel);

    const speedRangeLabelMin = document.createElement('label');
    speedRangeLabelMin.className = 'speed-form__range-label_min';
    speedRangeLabelMin.innerHTML = 'min';
    speedRangeLabel.appendChild(speedRangeLabelMin);

    const speedRangeLabelMax = document.createElement('label');
    speedRangeLabelMax.className = 'speed-form__range-label_max';
    speedRangeLabelMax.innerHTML = 'max';
    speedRangeLabel.appendChild(speedRangeLabelMax);

    const newGameForm = document.createElement('form');
    newGameForm.className = 'new-game-form';
    controlElementsContainer.appendChild(newGameForm);

    const newGameButton = document.createElement('input');
    newGameButton.className = 'new-game-form__button';
    newGameButton.setAttribute('type', 'button');
    newGameButton.setAttribute('value', 'New game');
    newGameButton.setAttribute('tabindex', '4');
    newGameButton.onclick = () => {
      this.notify('initGame');
    };
    newGameForm.appendChild(newGameButton);

    const startGameForm = document.createElement('form');
    startGameForm.className = 'start-game-form';
    controlElementsContainer.appendChild(startGameForm);

    const startGameButton = document.createElement('input');
    startGameButton.className = 'start-game-form__button';
    startGameButton.setAttribute('type', 'button');
    startGameButton.setAttribute('value', 'Start');
    startGameButton.setAttribute('tabindex', '5');
    startGameButton.onclick = () => {
      this.notify('startGame');
    };
    startGameForm.appendChild(startGameButton);

    const pauseGameForm = document.createElement('form');
    pauseGameForm.className = 'pause-game-form';
    controlElementsContainer.appendChild(pauseGameForm);

    const pauseGameButton = document.createElement('input');
    pauseGameButton.className = 'pause-game-form__button';
    pauseGameButton.setAttribute('type', 'button');
    pauseGameButton.setAttribute('value', 'Pause');
    pauseGameButton.setAttribute('tabindex', '6');
    pauseGameButton.onclick = () => {
      this.notify('pauseGame');
    };
    pauseGameForm.appendChild(pauseGameButton);

    this.canvas = document.createElement('canvas');
    this.canvas.className = 'page-container__canvas';
    this.canvas.setAttribute('width', widthInput.value * constants.CELL_SIZE);
    this.canvas.setAttribute('height', heightInput.value * constants.CELL_SIZE);
    this.canvas.onclick = (event) => {
      const x = Math.floor(event.offsetX / constants.CELL_SIZE);
      const y = Math.floor(event.offsetY / constants.CELL_SIZE);
      this.notify('сhangeСellStatus', {x: x, y: y});
    };
    pageContainer.insertBefore(this.canvas, document.body.nextSibling);    
  }

  updateSizeCanvas(data) {
    this.canvas.width = data.width * constants.CELL_SIZE;
    this.canvas.height = data.height * constants.CELL_SIZE;
    document.body.appendChild(this.canvas);
  }
  
  updateField(data) {
    const c = this.canvas.getContext('2d');
    c.clearRect(0, 0, data.width * constants.CELL_SIZE, data.height * constants.CELL_SIZE);
    for (let i = 0; i < data.width; i++) {
      for (let j = 0; j < data.height; j++) {
        if (data.cells[i][j]) {
          c.fillRect(i * constants.CELL_SIZE, j * constants.CELL_SIZE, constants.CELL_SIZE, constants.CELL_SIZE);
        }
      }
    }
  } 
}

export default View;
