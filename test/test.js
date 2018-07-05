import Model from "../src/js/model.js";

let assert = require("chai").assert;

const model = new Model();
const width = 5;
const height = 5; 

let testCells;
let testCellsStep;

describe("checkActiveShapes", function() {

	describe("Проверка что фигура мигалка изменилась, как и ожидалось", function() {

		function checkFlasher(x) {

			it("Фигура мигалка изменилась как и ожидалось на " + x + " шагу", function() {
				testCells = [
					[0, 0, 0, 0, 0],
					[0, 0, 0, 0, 0],
					[0, 1, 1, 1, 0],
					[0, 0, 0, 0, 0],
					[0, 0, 0, 0, 0]
				];
				model.setCells(testCells, 5, 5);
				testCellsStep = [
					[0, 0, 0, 0, 0],
					[0, 0, 1, 0, 0],
					[0, 0, 1, 0, 0],
					[0, 0, 1, 0, 0],
					[0, 0, 0, 0, 0]
				];
				model.oneStep();
				assert.deepEqual(model.getCells(), testCellsStep);
				model.oneStep();
				assert.deepEqual(model.getCells(), testCells);
			});
		}
        
		for (let x=1; x<= 5; x++){
			checkFlasher(x);
		}
	});

	describe("Проверка что фигура планер изменилась, как и ожидалось", function() {

		it("Фигура планер изменилась как и ожидалось на 1 шагу", function() {
			testCells = [
				[0, 0, 1, 0, 0],
				[0, 0, 0, 1, 0],
				[0, 1, 1, 1, 0],
				[0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0]
			];
			model.setCells(testCells, 5, 5);
			model.oneStep();
			testCellsStep = [
				[0, 0, 0, 0, 0],
				[0, 1, 0, 1, 0],
				[0, 0, 1, 1, 0],
				[0, 0, 1, 0, 0],
				[0, 0, 0, 0, 0]
			];
			assert.deepEqual(model.getCells(), testCellsStep);
		});

		it("Фигура планер изменилась как и ожидалось на 2 шагу", function() {
			model.oneStep();
			testCells = [
				[0, 0, 0, 0, 0],
				[0, 0, 0, 1, 0],
				[0, 1, 0, 1, 0],
				[0, 0, 1, 1, 0],
				[0, 0, 0, 0, 0]
			];
			assert.deepEqual(model.getCells(), testCells);
		});

		it("Фигура планер изменилась как и ожидалось на 3 шагу", function() {
			model.oneStep();
			testCells = [
				[0, 0, 0, 0, 0],
				[0, 0, 1, 0, 0],
				[0, 0, 0, 1, 1],
				[0, 0, 1, 1, 0],
				[0, 0, 0, 0, 0]
			];
			assert.deepEqual(model.getCells(), testCells);
		});

	});
   
}); 

describe("checkStaticShapes", function() {

	describe("Проверка не изменилась ли фигура блок", function() {

		it("Фигура блок не изменилась", function() {
			testCells = [
				[0, 0, 0, 0, 0],
				[0, 1, 1, 0, 0],
				[0, 1, 1, 0, 0],
				[0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0]
			];
			model.setCells(testCells, 5, 5);
			model.oneStep();
			assert.deepEqual(model.getCells(), testCells);
		});
	});

	describe("Проверка не изменилась ли фигура улей", function() {

		it("Фигура улей не изменилась", function() {
			testCells = [
				[0, 0, 1, 0, 0],
				[0, 1, 0, 1, 0],
				[0, 1, 0, 1, 0],
				[0, 0, 1, 0, 0],
				[0, 0, 0, 0, 0]
			];
			model.setCells(testCells, 5, 5);
			model.oneStep();
			assert.deepEqual(model.getCells(), testCells);
		});
	});

	describe("Проверка не изменилась ли фигура ящик", function() {

		it("Фигура ящик не изменилась", function() {
			testCells = [
				[0, 0, 1, 0, 0],
				[0, 1, 0, 1, 0],
				[0, 0, 1, 0, 0],
				[0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0]
			];
			model.setCells(testCells, 5, 5);
			model.oneStep();
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
			const expected = 0;

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
			const expected = 1;

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