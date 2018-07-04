import Model from "../src/js/model.js";
import View from "../src/js/view.js";
import Controller from "../src/js/controller.js";

let assert = require("chai").assert;

const model = new Model();
const view = new View();
const controller = new Controller(view, model);

describe("initFieldData", function() {

	before(function () {
		model.initFieldData(40, 20);
	});

	describe("Проверка содержит ли массив cells ноли", function() {
    
		function chekCell(x, y) {
			let expected = 0;

			it("ячейка [" + x + "][" + y + "] массива cells содержит " + expected, function() {
				assert.equal(model.getCells()[x][y], expected);
			});
		}
        
		for (let i=0; i< 40; i++){
			for (let j=0; j< 20; j++){
				chekCell(i, j);
			}
		}
	});
});