import Model from '../src/js/Model.js';

import {assert} from 'chai';

const model = new Model();
const width = 5;
const height = 5;

let testCells = [];
let testCellsStep = [];

describe('checkActiveShapes', () => {
  describe('Проверка что фигура мигалка изменилась, как и ожидалось', () => {
    function checkFlasher (x) {
      it('Фигура мигалка изменилась как и ожидалось на ' + x + ' шагу', () => {
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
        model.doOneStep();
        assert.deepEqual(model.getCells(), testCellsStep);
        model.doOneStep();
        assert.deepEqual(model.getCells(), testCells);
      });
    }
    for (let x = 1; x <= 5; x++) {
      checkFlasher(x);
    }
  });

  describe('Проверка что фигура планер изменилась, как и ожидалось', () => {
    it('Фигура планер изменилась как и ожидалось на 1 шагу', () => {
      testCells = [
        [0, 0, 1, 0, 0],
        [0, 0, 0, 1, 0],
        [0, 1, 1, 1, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0]
      ];
      model.setCells(testCells, 5, 5);
      model.doOneStep();
      testCellsStep = [
        [0, 0, 0, 0, 0],
        [0, 1, 0, 1, 0],
        [0, 0, 1, 1, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 0, 0, 0]
      ];
      assert.deepEqual(model.getCells(), testCellsStep);
    });

    it('Фигура планер изменилась как и ожидалось на 2 шагу', () => {

      model.doOneStep();
      testCells = [
        [0, 0, 0, 0, 0],
        [0, 0, 0, 1, 0],
        [0, 1, 0, 1, 0],
        [0, 0, 1, 1, 0],
        [0, 0, 0, 0, 0]
      ];
      assert.deepEqual(model.getCells(), testCells);
    });

    it('Фигура планер изменилась как и ожидалось на 3 шагу', () => {
      model.doOneStep();
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

describe('checkStaticShapes', () => {
  describe('Проверка не изменилась ли фигура блок', () => {
    it('Фигура блок не изменилась', () => {
      testCells = [
        [0, 0, 0, 0, 0],
        [0, 1, 1, 0, 0],
        [0, 1, 1, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0]
      ];
      model.setCells(testCells, 5, 5);
      model.doOneStep();
      assert.deepEqual(model.getCells(), testCells);
    });
  });

  describe('Проверка не изменилась ли фигура улей', () => {
    it('Фигура улей не изменилась', () => {
      testCells = [
        [0, 0, 1, 0, 0],
        [0, 1, 0, 1, 0],
        [0, 1, 0, 1, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 0, 0, 0]
      ];
      model.setCells(testCells, 5, 5);
      model.doOneStep();
      assert.deepEqual(model.getCells(), testCells);
    });
  });

  describe('Проверка не изменилась ли фигура ящик', () => {
    it('Фигура ящик не изменилась', () => {
      testCells = [
        [0, 0, 1, 0, 0],
        [0, 1, 0, 1, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0]
      ];
      model.setCells(testCells, 5, 5);
      model.doOneStep();
      assert.deepEqual(model.getCells(), testCells);
    });
  });
});

describe('initFieldData', () => {
  before(() => {
    model.initFieldData(width, height);
  });
  describe('Проверка содержит ли массив cells нули', () => {
    function checkCell (x, y) {
      const expected = 0;
      it('ячейка ['+ x + '][' + y + '] массива cells содержит ' + expected, () => {
        assert.equal(model.getCells()[x][y], expected);
      });
    }
    for (let i = 0; i < width; i++) {
      for (let j = 0; j < height; j++) {
        checkCell(i, j);
      }
    }
  });
});

describe('checkFieldData', () => {
  before(() => {
    for (let i = 0; i < width; i++) {
      for (let j = 0; j < height; j++) {
        model.updateCellStatus(i, j);
      }
    }
  });

  describe('Проверка содержит ли массив cells единицы', () => {
    function checkCell (x, y) {
      const expected = 1;
      it('ячейка ['+ x + '][' + y + '] массива cells содержит ' + expected, () => {
        assert.equal(model.getCells()[x][y], expected);
      });
    }
    for (let i = 0; i < width; i++) {
      for (let j = 0; j < height; j++) {
        checkCell(i, j);
      }
    }
  });
});
