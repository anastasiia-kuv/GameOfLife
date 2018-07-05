import Model from "../src/js/model.js";
import View from "../src/js/view.js";
import Controller from "../src/js/controller.js";

let assert = require("chai").assert;

const model = new Model();
const view = new View();
const controller = new Controller(view, model);

let width = 40;
let height = 20; 

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

	after(function () {

		for (let i=0; i< width; i++){
			for (let j=0; j< height; j++){
				model.updateCellStatus(i, j);
			}
		}
	});
});    


describe("checkStaticShapes", function() {

	before(function () {
		model.updateCellStatus(1, 1);
		model.updateCellStatus(1, 2);
		model.updateCellStatus(2, 1);
		model.updateCellStatus(2, 2);

		model.updateCellStatus(6, 1);
		model.updateCellStatus(5, 2);
		model.updateCellStatus(5, 3);
		model.updateCellStatus(6, 4);
		model.updateCellStatus(7, 2);
		model.updateCellStatus(7, 3);

		model.updateCellStatus(12, 1);
		model.updateCellStatus(11, 2);
		model.updateCellStatus(12, 3);
		model.updateCellStatus(13, 2);

		model.oneStep();
	});

	describe("Проверка фигуры блок", function() {

		function checkLiveCells(x, y) {
			let expected = 1;

			it("ячейка [" + x + "][" + y + "] массива cells содержит " + expected, function() {
				assert.equal(model.getCells()[x][y], expected);
			});
		}
		checkLiveCells(1, 1);
		checkLiveCells(1, 2);
		checkLiveCells(2, 1);
		checkLiveCells(2, 2);

		function checkDeadCells(x, y) {
			let expected = 0;

			it("ячейка [" + x + "][" + y + "] массива cells содержит " + expected, function() {
				assert.equal(model.getCells()[x][y], expected);
			});
		}
		checkDeadCells(0, 0);
		checkDeadCells(0, 1);
		checkDeadCells(1, 0);
		checkDeadCells(0, 2);
		checkDeadCells(2, 0);
		checkDeadCells(0, 3);
		checkDeadCells(3, 0);
		checkDeadCells(1, 3);
		checkDeadCells(3, 1);
		checkDeadCells(2, 3);
		checkDeadCells(3, 2);
		checkDeadCells(3, 3);
	});


	describe("Проверка фигуры улей", function() {

		function checkLiveCells(x, y) {
			let expected = 1;

			it("ячейка [" + x + "][" + y + "] массива cells содержит " + expected, function() {
				assert.equal(model.getCells()[x][y], expected);
			});
		}
		checkLiveCells(6, 1);
		checkLiveCells(5, 2);
		checkLiveCells(5, 3);
		checkLiveCells(6, 4);
		checkLiveCells(7, 2);
		checkLiveCells(7, 3);


		function checkDeadCells(x, y) {
			let expected = 0;

			it("ячейка [" + x + "][" + y + "] массива cells содержит " + expected, function() {
				assert.equal(model.getCells()[x][y], expected);
			});
		}
		checkDeadCells(4, 1);
		checkDeadCells(4, 2);
		checkDeadCells(4, 3);
		checkDeadCells(4, 4);
		checkDeadCells(5, 0);
		checkDeadCells(5, 1);
		checkDeadCells(5, 4);
		checkDeadCells(5, 5);
		checkDeadCells(6, 0);
		checkDeadCells(6, 2);
		checkDeadCells(6, 3);
		checkDeadCells(6, 5);
		checkDeadCells(7, 0);
		checkDeadCells(7, 1);
		checkDeadCells(7, 4);
		checkDeadCells(7, 5);
		checkDeadCells(8, 1);
		checkDeadCells(8, 2);
		checkDeadCells(8, 3);
		checkDeadCells(8, 4);
	});	

	describe("Проверка фигуры ящик", function() {

		function checkLiveCells(x, y) {
			let expected = 1;

			it("ячейка [" + x + "][" + y + "] массива cells содержит " + expected, function() {
				assert.equal(model.getCells()[x][y], expected);
			});
		}
		checkLiveCells(12, 1);
		checkLiveCells(11, 2);
		checkLiveCells(12, 3);
		checkLiveCells(13, 2);

		function checkDeadCells(x, y) {
			let expected = 0;

			it("ячейка [" + x + "][" + y + "] массива cells содержит " + expected, function() {
				assert.equal(model.getCells()[x][y], expected);
			});
		}
		checkDeadCells(10, 1);
		checkDeadCells(10, 2);
		checkDeadCells(10, 3);
		checkDeadCells(11, 0);
		checkDeadCells(11, 1);
		checkDeadCells(11, 3);
		checkDeadCells(11, 4);
		checkDeadCells(12, 0);
		checkDeadCells(12, 2);
		checkDeadCells(12, 4);
		checkDeadCells(13, 0);
		checkDeadCells(13, 1);
		checkDeadCells(13, 3);
		checkDeadCells(13, 4);
		checkDeadCells(14, 1);
		checkDeadCells(14, 2);
		checkDeadCells(14, 3);
	});	

	after(function () {

		for (let i=0; i< width; i++){
			for (let j=0; j< height; j++){
				model.updateCellStatus(i, j);
			}
		}
	});
});    