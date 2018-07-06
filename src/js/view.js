export default function () {

	let canvas;
	
	const initView = function () {
		let nameOfGame = document.createElement("h1");
		nameOfGame.className = "name-of-game";
		nameOfGame.innerHTML = "game of life";
		document.body.insertBefore(nameOfGame, document.body.firstChild);
    
		let controlElements = document.createElement("form");
		controlElements.className = "control-elements";
		document.body.appendChild(controlElements);
	
		let width = document.createElement("div");
		width.className = "width";
		controlElements.appendChild(width);

		let labelWidth = document.createElement("label");
		labelWidth.className = "label label-width";
		labelWidth.innerHTML = "width";
		width.appendChild(labelWidth);
    
		let widthField = document.createElement("input");
		widthField.className = "width-field";
		widthField.setAttribute("type", "number");
		widthField.setAttribute("value", "40");
		widthField.setAttribute("tabindex", "1");
		widthField.onblur = function() {
			let event = jQuery.Event("changeSizeCanvas");
			event.width = widthField.value;
			event.height = heightField.value;
			$("body").trigger(event);
		};
		width.appendChild(widthField);

		let height = document.createElement("div");
		height.className = "height";
		controlElements.appendChild(height);

		let labelHeight = document.createElement("label");
		labelHeight.className = "label label-height";
		labelHeight.innerHTML = "height";
		height.appendChild(labelHeight);
    
		let heightField = document.createElement("input");
		heightField.className = "height-field";
		heightField.setAttribute("type", "number");
		heightField.setAttribute("value", "30");
		heightField.setAttribute("tabindex", "2");
		heightField.onblur = function() {
			let event = jQuery.Event("changeSizeCanvas");
			event.width = widthField.value;
			event.height = heightField.value;
			$("body").trigger(event);
		};
		height.appendChild(heightField);
		
		let speed = document.createElement("div");
		speed.className = "speed";
		controlElements.appendChild(speed);
		
		let labelSpeed = document.createElement("label");
		labelSpeed.className = "label label-speed";
		labelSpeed.innerHTML = "speed";
		speed.appendChild(labelSpeed);
    
		let rangeSpeed = document.createElement("input");
		rangeSpeed.className = "range-speed";
		rangeSpeed.setAttribute("type", "range");
		rangeSpeed.setAttribute("min", "1");
		rangeSpeed.setAttribute("max", "10");
		rangeSpeed.setAttribute("value", "5");
		rangeSpeed.setAttribute("tabindex", "3");
		rangeSpeed.onchange = function() {
			let event = jQuery.Event("changeSpeed");
			event.speed = rangeSpeed.value;
			$("body").trigger(event);
		};
		speed.appendChild(rangeSpeed);
   
		let newGameButton = document.createElement("input");
		newGameButton.className = "button new-game-button";
		newGameButton.setAttribute("type", "button");
		newGameButton.setAttribute("value", "New game");
		newGameButton.setAttribute("tabindex", "4");
		newGameButton.onclick = function(){
			let event = jQuery.Event("newGameButtonPressed");
			$("body").trigger(event);
		};
		controlElements.appendChild(newGameButton);

		let startButton = document.createElement("input");
		startButton.className = "button start-button";
		startButton.setAttribute("type", "button");
		startButton.setAttribute("value", "Start");
		startButton.setAttribute("tabindex", "5");
		startButton.onclick =  function(){
			let event = jQuery.Event("startButtonPressed");
			$("body").trigger(event);
		};
		controlElements.appendChild(startButton);
    
		let pauseButton = document.createElement("input");
		pauseButton.className = "button pause-button";
		pauseButton.setAttribute("type", "button");
		pauseButton.setAttribute("value", "Pause");
		pauseButton.setAttribute("tabindex", "6");
		pauseButton.onclick =  function(){
			let event = jQuery.Event("pauseButtonPressed");
			$("body").trigger(event);
		};
		controlElements.appendChild(pauseButton);
		
		canvas = document.createElement("canvas");
		canvas.className = "canvas";
		canvas.setAttribute("width", widthField.value * 10);
		canvas.setAttribute("height", heightField.value * 10);
		canvas.style.width = widthField.value * 10 + "px";
		canvas.style.height = heightField.value * 10 + "px";
		canvas.onclick = function(e){
			let event = jQuery.Event("cellChangeStatus");
			event.x = Math.floor(e.offsetX/10); 
			event.y = Math.floor(e.offsetY/10);
			$("body").trigger(event);
		};
		document.body.appendChild(canvas);  
	};
	initView();

	const updateSizeCanvas = function(width, height) {
		canvas.width = width * 10;
		canvas.height = height * 10;
		canvas.style.width = width * 10 + "px";
		canvas.style.height = height * 10 + "px";
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