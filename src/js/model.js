export default function () {
	let width = 40;
	let height = 30; 
	let cells = [];
	let timer;
	let isRun = false;
	let speedGame = 500;

	let initFieldData = function(width, height) {
		for (let i=0; i< width; i++){
			cells[i]=[];
			for (let j=0; j< height; j++){
				cells[i][j]=0;
			}
		}
		$("body").trigger("updateField");
	};

	initFieldData(width, height);

	let countNeighbors = function(i,j) {
		let neighbors = 0;
		if (cells[checkLeft(i)-1][j]==1) {
			neighbors++;
		}
		if (cells[i][checkBottom(j)+1]==1)  {
			neighbors++;
		}
		if (cells[checkRight(i)+1][j]==1)  {
			neighbors++;
		}
		if (cells[i][checkTop(j)-1]==1)  {
			neighbors++;
		}
		if (cells[checkLeft(i)-1][checkBottom(j)+1]==1)  {
			neighbors++;
		}
		if (cells[checkRight(i)+1][checkBottom(j)+1]==1)  {
			neighbors++;
		}
		if (cells[checkRight(i)+1][checkTop(j)-1]==1)  {
			neighbors++;
		}
		if (cells[checkLeft(i)-1][checkTop(j)-1]==1)  {
			neighbors++;
		}

		return ((cells[i][j] === 0 && neighbors ===3) || (cells[i][j] === 1 && (neighbors === 2 || neighbors === 3))) ? 1 : 0;
	};


	let checkTop = function (j){
		if(j==0) return height;
		else return j;
	};

	let checkBottom = function (j){
		if(j==height-1) return -1;
		else return j;
	};

	let checkLeft = function (i){
		if(i==0) return width;
		else return i;
	};

	let checkRight = function (i){
		if(i==width -1) return -1;
		else return i;
	};

	let step = function () {
		let tempCells = [];
			
		for (let i = 0; i < width; i++){
			tempCells[i] = [];
			for (let j = 0; j < height; j++){
				tempCells[i][j] = 0;
			}
		}

		for (let i = 0; i < width; i++) {
			for (let j = 0; j < height; j++) {
				tempCells[i][j] = countNeighbors(i, j);
			}
		}
		return tempCells;
	};

	let updateCells = function() {

		cells = step();

		$("body").trigger("updateField");
	};
	
	return  {
		setWidth:function (w) {
			width = w;

			$("body").trigger("updateSizeCanvas");
		},

		getWidth:function () {
			return width;
		},

		setHeight:function (h) {
			height = h;

			$("body").trigger("updateSizeCanvas");
		},

		getHeight:function () {
			return height;
		},

		getSpeedGame:function () {
			return speedGame;
		},

		initFieldData: function (width, height) {
			initFieldData(width, height);
		},

		newGame: function () {
			isRun === false;
			initFieldData(width, height);
		},

		updateCellStatus:function (x,y) {
			cells[x][y] === 0 ? cells[x][y] = 1 : cells[x][y] = 0;

			$("body").trigger("updateField");
		},
		
		getCells: function() {
			return cells;
		},

		start: function() {
			if (isRun === false) {
				timer = setInterval(function () {
					updateCells();
				}, speedGame);
				isRun=true;
			}
		},

		pause:function () {
			clearInterval(timer);
			isRun = false;
		},

		updateSpeedGame: function (speed) {
			speedGame = speed * 100;
			if (isRun === true) {
				this.pause();
				this.start();
			}
		},

		oneStep:function () {
			cells = step();
			return cells;
		},

		setCells: function (testCells, w, h){
			cells = testCells;
			width = w; 
			height = h;
		}
	};
}