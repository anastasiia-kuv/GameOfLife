export default function () {

  let canvas = {};

  (function _initView () {
    const $body = $('body');

    const pageContainer = document.createElement('div');
    pageContainer.className = 'page-container';
    document.body.insertBefore(pageContainer, document.body.firstChild);

    const nameOfGame = document.createElement('h1');
    nameOfGame.className = 'title';
    nameOfGame.innerHTML = 'game of life';
    pageContainer.appendChild(nameOfGame);

    const controlElementsContainer = document.createElement('div');
    controlElementsContainer.className = 'control-elements-container';
    pageContainer.appendChild(controlElementsContainer);

    const widthForm = document.createElement('form');
    widthForm.className = 'form width-form';
    controlElementsContainer.appendChild(widthForm);

    const widthLabel = document.createElement('label');
    widthLabel.className = 'label width-form__label';
    widthLabel.innerHTML = 'width';
    widthForm.appendChild(widthLabel);

    const widthInput = document.createElement('input');
    widthInput.className = 'input width-form__input';
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
    heightForm.className = 'form height-form';
    controlElementsContainer.appendChild(heightForm);

    const heightLabel = document.createElement('label');
    heightLabel.className = 'label height-form__label';
    heightLabel.innerHTML = 'height';
    heightForm.appendChild(heightLabel);

    const heightInput = document.createElement('input');
    heightInput.className = 'input height-form__input';
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
    speedForm.className = 'form speed-form';
    controlElementsContainer.appendChild(speedForm);

    const speedLabel = document.createElement('label');
    speedLabel.className = 'label speed-form__label';
    speedLabel.innerHTML = 'speed';
    speedForm.appendChild(speedLabel);

    const speedInput = document.createElement('input');
    speedInput.className = 'input speed-form__input';
    speedInput.setAttribute('type', 'range');
    speedInput.setAttribute('min', '1');
    speedInput.setAttribute('max', '10');
    speedInput.setAttribute('value', '5');
    speedInput.setAttribute('tabindex', '3');
    speedInput.onchange = function onChangeSpeed() {
      const event = jQuery.Event('changeSpeed', { 
        'speed': speedInput.value 
      });
      $body.trigger(event);
    };
    speedForm.appendChild(speedInput);

    const newGameForm = document.createElement('form');
    newGameForm.className = 'form new-game-form';
    controlElementsContainer.appendChild(newGameForm);

    const newGameButton = document.createElement('input');
    newGameButton.className = 'button new-game-form__button';
    newGameButton.setAttribute('type', 'button');
    newGameButton.setAttribute('value', 'New game');
    newGameButton.setAttribute('tabindex', '4');
    newGameButton.onclick = function onClickNewGameButton() {
      const event = jQuery.Event('initNewGame');
      $body.trigger(event);
    };
    newGameForm.appendChild(newGameButton);

    const startGameForm = document.createElement('form');
    startGameForm.className = 'form start-game-form';
    controlElementsContainer.appendChild(startGameForm);

    const startGameButton = document.createElement('input');
    startGameButton.className = 'button start-game-form__button';
    startGameButton.setAttribute('type', 'button');
    startGameButton.setAttribute('value', 'Start');
    startGameButton.setAttribute('tabindex', '5');
    startGameButton.onclick = function onClickStartGameButton() {
      const event = jQuery.Event('startGame');
      $body.trigger(event);
    };
    startGameForm.appendChild(startGameButton);

    const pauseGameForm = document.createElement('form');
    pauseGameForm.className = 'form pause-game-form';
    controlElementsContainer.appendChild(pauseGameForm);

    const pauseGameButton = document.createElement('input');
    pauseGameButton.className = 'button pause-game-form__button';
    pauseGameButton.setAttribute('type', 'button');
    pauseGameButton.setAttribute('value', 'Pause');
    pauseGameButton.setAttribute('tabindex', '6');
    pauseGameButton.onclick = function onClickPauseGameButton() {
      const event = jQuery.Event('pauseGame');
      $body.trigger(event);
    };
    pauseGameForm.appendChild(pauseGameButton);

    canvas = document.createElement('canvas');
    canvas.className = 'canvas';
    canvas.setAttribute('width', widthInput.value * 10);
    canvas.setAttribute('height', heightInput.value * 10);
    canvas.onclick = function onClickCanvas(e) {
      const event = jQuery.Event('сhangeСellStatus', { 
        'x': Math.floor(e.offsetX / 10), 
        'y': Math.floor(e.offsetY / 10) 
      });
      $body.trigger(event);
    };
    pageContainer.insertBefore(canvas, document.body.nextSibling);

  }());

  function _updateSizeCanvas(width, height) {
    canvas.width = width * 10;
    canvas.height = height * 10;
    document.body.appendChild(canvas);
  }

  function _updateField(cells, width, height) {
    const c = canvas.getContext('2d');
    c.clearRect(0, 0, width * 10, height * 10);
    for (let i = 0; i < width; i++) {
      for (let j = 0; j < height; j++) {
        if (cells[i][j]) {
          c.fillRect(i * 10, j * 10, 10, 10);
        }
      }
    }
  }

  return {
    updateField (cells, width, height) {
      _updateField(cells, width, height);
    },

    updateSizeCanvas (width, height) {
      _updateSizeCanvas(width, height);
    }
  };

}
