export default function () {
	let width = 30;
	let height = 30; 
	let cells = [];

	let initFieldDate = function() {
		for (let i=0; i< width; i++){
			cells[i]=[];
			for (let j=0; j< height; j++){
				cells[i][j]=0;
			}
		}
		$("body").trigger("updateField");
	};
	initFieldDate();

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

		newGame: function () {
			initFieldDate();
		},

		updateCellStatus:function (x,y) {
			cells[y][x] === 0 ? cells[y][x] = 1 : cells[y][x] = 0;

			$("body").trigger("updateField");
		},
		
		getCells: function() {
			return cells;
		}
	};
}