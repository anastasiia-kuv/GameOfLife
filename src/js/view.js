export default function () {
	const initView = function () {
		var nameOfGame = document.createElement("h1");
		nameOfGame.className = "name-of-game";
		nameOfGame.innerHTML = "Game of Life";
		document.body.insertBefore(nameOfGame, document.body.firstChild);
    
		var buttonsContainer = document.createElement("div");
		buttonsContainer.className = "buttons-container";
		document.body.appendChild(buttonsContainer);
    
		var labelWidth = document.createElement("label");
		labelWidth.className = "label-width";
		labelWidth.innerHTML = "Width";
		buttonsContainer.appendChild(labelWidth);
    
		var widthField = document.createElement("input");
		widthField.className = "width-field";
		widthField.setAttribute("value", "30");
		widthField.setAttribute("id", "width");
		buttonsContainer.appendChild(widthField);
    
		var labelHeight = document.createElement("label");
		labelHeight.className = "label-height";
		labelHeight.innerHTML = "Height";
		buttonsContainer.appendChild(labelHeight);
    
		var heightField = document.createElement("input");
		heightField.className = "height-field";
		heightField.setAttribute("value", "30");
		heightField.setAttribute("id", "height");
		buttonsContainer.appendChild(heightField);
    
		var labelSpeed = document.createElement("label");
		labelSpeed.className = "label-speed";
		labelSpeed.innerHTML = "Speed";
		buttonsContainer.appendChild(labelSpeed);
    
		var rangeSpeed = document.createElement("input");
		rangeSpeed.className = "range-speed";
		rangeSpeed.setAttribute("type", "range");
		rangeSpeed.setAttribute("min", "1");
		rangeSpeed.setAttribute("max", "10");
		rangeSpeed.setAttribute("value", "5");
		rangeSpeed.setAttribute("id", "speed");
		buttonsContainer.appendChild(rangeSpeed);
    
		var newGameButton = document.createElement("input");
		newGameButton.className = "button new-game-button";
		newGameButton.setAttribute("type", "button");
		newGameButton.setAttribute("value", "New game");
		newGameButton.setAttribute("id", "new-game-button");
		buttonsContainer.appendChild(newGameButton);
    
		var startButton = document.createElement("input");
		startButton.className = "button start-button";
		startButton.setAttribute("type", "button");
		startButton.setAttribute("value", "Start");
		startButton.setAttribute("id", "start-button");
		buttonsContainer.appendChild(startButton);
    
		var pauseButton = document.createElement("input");
		pauseButton.className = "button pause-button";
		pauseButton.setAttribute("type", "button");
		pauseButton.setAttribute("value", "Pause");
		pauseButton.setAttribute("id", "pause-button");
		buttonsContainer.appendChild(pauseButton);
    
		var canvas = document.createElement("canvas");
		canvas.className = "canvas";
		canvas.setAttribute("id", "canvas");
		canvas.setAttribute("width", "300");
		canvas.setAttribute("height", "300");
		canvas.style.marginTop = "5%";
		canvas.style.marginLeft = "40%";
        document.body.appendChild(canvas);      
	};
	initView();
}