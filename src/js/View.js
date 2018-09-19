class View {
  constructor() {
    this.canvas = {};
    this.initView();
  }
    
  initView () {
    const $body = $('body');

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
    widthInput.setAttribute('value', '40');
    widthInput.setAttribute('tabindex', '1');
    widthInput.onblur = function onBlurWidthInput () {
      const event = jQuery.Event('changeSizeCanvas', { 
        'width': widthInput.value,
        'height': heightInput.value 
      });
      $body.trigger(event);
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
    heightInput.setAttribute('value', '30');
    heightInput.setAttribute('tabindex', '2');
    heightInput.onblur = function onBlurHeightInput () {
      const event = jQuery.Event('changeSizeCanvas', { 
        'width': widthInput.value, 
        'height': heightInput.value 
      });
      $body.trigger(event);
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
    speedInput.setAttribute('value', '2');
    speedInput.setAttribute('tabindex', '3');
    speedInput.onchange = function onChangeSpeed() {
      const event = jQuery.Event('changeSpeed', { 
        'speed': speedInput.value 
      });
      $body.trigger(event);
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
    newGameButton.onclick = function onClickNewGameButton() {
      const event = jQuery.Event('initNewGame');
      $body.trigger(event);
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
    startGameButton.onclick = function onClickStartGameButton() {
      const event = jQuery.Event('startGame');
      $body.trigger(event);
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
    pauseGameButton.onclick = function onClickPauseGameButton() {
      const event = jQuery.Event('pauseGame');
      $body.trigger(event);
    };
    pauseGameForm.appendChild(pauseGameButton);

    this.canvas = document.createElement('canvas');
    this.canvas.className = 'page-container__canvas';
    this.canvas.setAttribute('width', widthInput.value * 10);
    this.canvas.setAttribute('height', heightInput.value * 10);
    this.canvas.onclick = function onClickCanvas(e) {
      const event = jQuery.Event('сhangeСellStatus', { 
        'x': Math.floor(e.offsetX / 10), 
        'y': Math.floor(e.offsetY / 10) 
      });
      $body.trigger(event);
    };
    pageContainer.insertBefore(this.canvas, document.body.nextSibling);

  }
  
  updateSizeCanvas(width, height) {
    this.canvas.width = width * 10;
    this.canvas.height = height * 10;
    document.body.appendChild(this.canvas);
  }
  
  updateField(cells, width, height) {
    const c = this.canvas.getContext('2d');
    c.clearRect(0, 0, width * 10, height * 10);
    for (let i = 0; i < width; i++) {
      for (let j = 0; j < height; j++) {
        if (cells[i][j]) {
          c.fillRect(i * 10, j * 10, 10, 10);
        }
      }
    }
  } 
}

export default View;