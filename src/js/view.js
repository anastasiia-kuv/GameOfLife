export default function () {

	let canvas;
	
	const initView = function () {
		let pageContainer = document.createElement("div");
		pageContainer.className = "page-container";
		document.body.insertBefore(pageContainer, document.body.firstChild);

		let nameOfGame = document.createElement("h1");
		nameOfGame.className = "title";
		nameOfGame.innerHTML = "game of life";
		pageContainer.appendChild(nameOfGame);
    
		let controlElements = document.createElement("div");
		controlElements.className = "control-elements";
		pageContainer.appendChild(controlElements);
	
		let widthForm = document.createElement("form");
		widthForm.className = "form width-form";
		controlElements.appendChild(widthForm);

		let widthLabel = document.createElement("label");
		widthLabel.className = "label width-form__label";
		widthLabel.innerHTML = "width";
		widthForm.appendChild(widthLabel);
    
		let widthInput = document.createElement("input");
		widthInput.className = "input width-form__input";
		widthInput.setAttribute("type", "number");
		widthInput.setAttribute("value", "40");
		widthInput.setAttribute("tabindex", "1");
		widthInput.onblur = function() {
			let event = jQuery.Event("changeSizeCanvas");
			event.width = widthInput.value;
			event.height = heightInput.value;
			$("body").trigger(event);
		};
		widthForm.appendChild(widthInput);

		let heightForm = document.createElement("form");
		heightForm.className = "form height-form";
		controlElements.appendChild(heightForm);

		let heightLabel = document.createElement("label");
		heightLabel.className = "label height-form__label";
		heightLabel.innerHTML = "height";
		heightForm.appendChild(heightLabel);
    
		let heightInput = document.createElement("input");
		heightInput.className = "input height-form__input";
		heightInput.setAttribute("type", "number");
		heightInput.setAttribute("value", "30");
		heightInput.setAttribute("tabindex", "2");
		heightInput.onblur = function() {
			let event = jQuery.Event("changeSizeCanvas");
			event.width = widthInput.value;
			event.height = heightInput.value;
			$("body").trigger(event);
		};
		heightForm.appendChild(heightInput);
		
		let speedForm = document.createElement("form");
		speedForm.className = "form speed-form";
		controlElements.appendChild(speedForm);
		
		let speedLabel = document.createElement("label");
		speedLabel.className = "label speed-form__label";
		speedLabel.innerHTML = "speed";
		speedForm.appendChild(speedLabel);
    
		let speedInput = document.createElement("input");
		speedInput.className = "input speed-form__input";
		speedInput.setAttribute("type", "range");
		speedInput.setAttribute("min", "1");
		speedInput.setAttribute("max", "10");
		speedInput.setAttribute("value", "5");
		speedInput.setAttribute("tabindex", "3");
		speedInput.onchange = function() {
			let event = jQuery.Event("changeSpeed");
			event.speed = speedInput.value;
			$("body").trigger(event);
		};
		speedForm.appendChild(speedInput);
		
		let newGameForm = document.createElement("form");
		newGameForm.className = "form new-game-form";
		controlElements.appendChild(newGameForm);

		let newGameButton = document.createElement("input");
		newGameButton.className = "button new-game-form__button";
		newGameButton.setAttribute("type", "button");
		newGameButton.setAttribute("value", "New game");
		newGameButton.setAttribute("tabindex", "4");
		newGameButton.onclick = function(){
			let event = jQuery.Event("newGameButtonPressed");
			$("body").trigger(event);
		};
		newGameForm.appendChild(newGameButton);

		let startGameForm = document.createElement("form");
		startGameForm.className = "form start-game-form";
		controlElements.appendChild(startGameForm);

		let startGameButton = document.createElement("input");
		startGameButton.className = "button start-game-form__button";
		startGameButton.setAttribute("type", "button");
		startGameButton.setAttribute("value", "Start");
		startGameButton.setAttribute("tabindex", "5");
		startGameButton.onclick =  function(){
			let event = jQuery.Event("startGameButtonPressed");
			$("body").trigger(event);
		};
		startGameForm.appendChild(startGameButton);
	
		let pauseGameForm = document.createElement("form");
		pauseGameForm.className = "form pause-game-form";
		controlElements.appendChild(pauseGameForm);

		let pauseGameButton = document.createElement("input");
		pauseGameButton.className = "button pause-game-form__button";
		pauseGameButton.setAttribute("type", "button");
		pauseGameButton.setAttribute("value", "Pause");
		pauseGameButton.setAttribute("tabindex", "6");
		pauseGameButton.onclick =  function(){
			let event = jQuery.Event("pauseGameButtonPressed");
			$("body").trigger(event);
		};
		pauseGameForm.appendChild(pauseGameButton);
		
		canvas = document.createElement("canvas");
		canvas.className = "canvas";
		canvas.setAttribute("width", widthInput.value * 10);
		canvas.setAttribute("height", heightInput.value * 10);
		canvas.onclick = function(e){
			let event = jQuery.Event("cellChangeStatus");
			event.x = Math.floor(e.offsetX/10); 
			event.y = Math.floor(e.offsetY/10);
			$("body").trigger(event);
		};
		pageContainer.appendChild(canvas);  
	};
	initView();

	const updateSizeCanvas = function(width, height) {
		canvas.width = width * 10;
		canvas.height = height * 10;
		document.body.appendChild(canvas);
	};

	const updateField = function (cells, width, height) {
		let c = canvas.getContext("2d");
		c.clearRect(0, 0, width * 10, height * 10);
		for (let i=0; i< width; i++){
			for (let j=0; j< height; j++){
				if (cells[i][j]===1){
					c.fillRect(i*10, j*10, 10, 10);
				} 
			}
		}
	};

	return  {
		updateSizeCanvas: function (width, height) {
			updateSizeCanvas(width, height);
		},

		updateField: function (cells, width, height) {
			updateField(cells, width, height);
		}
	};
}