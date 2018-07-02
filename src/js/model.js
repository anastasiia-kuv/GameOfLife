export default function () {
	var width = 0;
	var height = 0; 

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
		}
	};
}