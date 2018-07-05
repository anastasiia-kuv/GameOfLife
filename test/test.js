import Model from "../src/js/model.js";
import View from "../src/js/view.js";
import Controller from "../src/js/controller.js";

let assert = require("chai").assert;

const model = new Model();
const view = new View();
const controller = new Controller(view, model);

let width = 5;
let height = 5; 

describe("checkStaticShapes", function() {

	let testCells;

	describe("Проверка фигуры блок", function() {

		testCells = [
			[0, 0, 0, 0, 0],
			[0, 1, 1, 0, 0],
			[0, 1, 1, 0, 0],
			[0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0]
		];
		model.setCells(testCells, 5, 5);
		model.oneStep();
		it("Проверка не изменилась ли фигура блок", function() {
			assert.deepEqual(model.getCells(), testCells);
		});
	});

	describe("Проверка фигуры улей", function() {
		testCells = [
			[0, 0, 1, 0, 0],
			[0, 1, 0, 1, 0],
			[0, 1, 0, 1, 0],
			[0, 0, 1, 0, 0],
			[0, 0, 0, 0, 0]
		];
		model.setCells(testCells, 5, 5);
		model.oneStep();
		it("Проверка не изменилась ли фигура улей", function() {
			assert.deepEqual(model.getCells(), testCells);
		});
	});

	describe("Проверка фигуры ящик", function() {
		testCells = [
			[0, 0, 1, 0, 0],
			[0, 1, 0, 1, 0],
			[0, 0, 1, 0, 0],
			[0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0]
		];
		model.setCells(testCells, 5, 5);
		model.oneStep();
		it("Проверка не изменилась ли фигура ящик", function() {
			assert.deepEqual(model.getCells(), testCells);
		});
	});
});    

describe("initFieldData", function() {

	before(function () {
		model.initFieldData(width, height);
	});

	describe("Проверка содержит ли массив cells нули", function() {
    
		function checkCell(x, y) {
			let expected = 0;

			it("ячейка [" + x + "][" + y + "] массива cells содержит " + expected, function() {
				assert.equal(model.getCells()[x][y], expected);
			});
		}
        
		for (let i=0; i< width; i++){
			for (let j=0; j< height; j++){
				checkCell(i, j);
			}
		}
	});  

});

describe("checkFieldData", function() {

	before(function () {

		for (let i=0; i< width; i++){
			for (let j=0; j< height; j++){
				model.updateCellStatus(i, j);
			}
		}
	});

	describe("Проверка содержит ли массив cells единицы", function() {

		function checkCell(x, y) {
			let expected = 1;

			it("ячейка [" + x + "][" + y + "] массива cells содержит " + expected, function() {
				assert.equal(model.getCells()[x][y], expected);
			});
		}
        
		for (let i=0; i< width; i++){
			for (let j=0; j< height; j++){
				checkCell(i, j);
			}
		}
	});
});   