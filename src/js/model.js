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

	let countNeighbors = function(x,y) {
		let neighbors = 0;
		for (let i = x-1; i <= x+1; i++) {
			for (let j = y-1; j <= y+1; j++) {
				if (x!=i || y!=j) {
					let tempI=i;
					let tempJ=j;

					if (i === -1) {
						tempI = width-1;
					}

					if (j === -1) {
						tempJ = height-1;
					}

					if (i === width) {
						tempI = 0;
					}

					if (j === height) {
						tempJ = 0;
					}

					if (cells[tempI][tempJ] == 1) {
						neighbors++;
					}
				}
			}
		}

		return ((cells[x][y] === 0 && neighbors ===3) || (cells[x][y] === 1 && (neighbors === 2 || neighbors === 3))) ? 1 : 0;

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
		widthField:function (w) {
			width = w;

			$("body").trigger("updateSizeCanvas");
		},

		getWidth:function () {
			return width;
		},

		heightField:function (h) {
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
		}
	};
}