import { assert } from 'chai';
import Model from '../src/mvc/model/Model';
import View from '../src/mvc/view/View.js';

const view = new View;

describe("pow", () => {

  function makeTest(x) {
    var expected = x * x * x;
    it("при возведении " + x + " в степень 3 результат: " + expected, function() {
      assert.equal(view.pow(x, 3), expected);
    });
  }

  for (var x = 1; x <= 5; x++) {
    makeTest(x);
  }
});

describe("pow", () => {
  it('имя конструктора', () => {
    assert.equal(view.getClassName(), 'View');
  });
});

const model = new Model();
const width = 5;
const height = 5;

let testmatrix = [];
let testmatrixStep = [];

describe('checkActiveShapes', () => {
  describe('Проверка что фигура мигалка изменилась, как и ожидалось', () => {
    function checkFlasher(x) {
      it(`Фигура мигалка изменилась как и ожидалось на ${x} шагу`, () => {
        testmatrix = [
          [0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0],
          [0, 1, 1, 1, 0],
          [0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0],
        ];
        model.setmatrix(testmatrix, 5, 5);
        testmatrixStep = [
          [0, 0, 0, 0, 0],
          [0, 0, 1, 0, 0],
          [0, 0, 1, 0, 0],
          [0, 0, 1, 0, 0],
          [0, 0, 0, 0, 0],
        ];
        model.doOneStep();
        assert.deepEqual(model.getmatrix(), testmatrixStep);
        model.doOneStep();
        assert.deepEqual(model.getmatrix(), testmatrix);
      });
    }
    for (let x = 1; x <= 5; x++) {
      checkFlasher(x);
    }
  });

  describe('Проверка что фигура планер изменилась, как и ожидалось', () => {
    it('Фигура планер изменилась как и ожидалось на 1 шагу', () => {
      testmatrix = [
        [0, 0, 1, 0, 0],
        [0, 0, 0, 1, 0],
        [0, 1, 1, 1, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
      ];
      model.setmatrix(testmatrix, 5, 5);
      model.doOneStep();
      testmatrixStep = [
        [0, 0, 0, 0, 0],
        [0, 1, 0, 1, 0],
        [0, 0, 1, 1, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 0, 0, 0],
      ];
      assert.deepEqual(model.getmatrix(), testmatrixStep);
    });

    it('Фигура планер изменилась как и ожидалось на 2 шагу', () => {
      model.doOneStep();
      testmatrix = [
        [0, 0, 0, 0, 0],
        [0, 0, 0, 1, 0],
        [0, 1, 0, 1, 0],
        [0, 0, 1, 1, 0],
        [0, 0, 0, 0, 0],
      ];
      assert.deepEqual(model.getmatrix(), testmatrix);
    });

    it('Фигура планер изменилась как и ожидалось на 3 шагу', () => {
      model.doOneStep();
      testmatrix = [
        [0, 0, 0, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 0, 1, 1],
        [0, 0, 1, 1, 0],
        [0, 0, 0, 0, 0],
      ];
      assert.deepEqual(model.getmatrix(), testmatrix);
    });
  });
});

describe('checkStaticShapes', () => {
  describe('Проверка не изменилась ли фигура блок', () => {
    it('Фигура блок не изменилась', () => {
      testmatrix = [
        [0, 0, 0, 0, 0],
        [0, 1, 1, 0, 0],
        [0, 1, 1, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
      ];
      model.setmatrix(testmatrix, 5, 5);
      model.doOneStep();
      assert.deepEqual(model.getmatrix(), testmatrix);
    });
  });

  describe('Проверка не изменилась ли фигура улей', () => {
    it('Фигура улей не изменилась', () => {
      testmatrix = [
        [0, 0, 1, 0, 0],
        [0, 1, 0, 1, 0],
        [0, 1, 0, 1, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 0, 0, 0],
      ];
      model.setmatrix(testmatrix, 5, 5);
      model.doOneStep();
      assert.deepEqual(model.getmatrix(), testmatrix);
    });
  });

  describe('Проверка не изменилась ли фигура ящик', () => {
    it('Фигура ящик не изменилась', () => {
      testmatrix = [
        [0, 0, 1, 0, 0],
        [0, 1, 0, 1, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
      ];
      model.setmatrix(testmatrix, 5, 5);
      model.doOneStep();
      assert.deepEqual(model.getmatrix(), testmatrix);
    });
  });
});

describe('initMatrix', () => {
  before(() => {
    model.initMatrix(width, height);
  });
  describe('Проверка содержит ли массив matrix нули', () => {
    function checkCell(x, y) {
      const expected = 0;
      it(`ячейка [${x}][${y}] массива matrix содержит ${expected}`, () => {
        assert.equal(model.getmatrix()[x][y], expected);
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
        model.updateMatrixStatus(i, j);
      }
    }
  });

  describe('Проверка содержит ли массив matrix единицы', () => {
    function checkCell(x, y) {
      const expected = 1;
      it(`ячейка [${x}][${y}] массива matrix содержит ${expected}`, () => {
        assert.equal(model.getmatrix()[x][y], expected);
      });
    }
    for (let i = 0; i < width; i++) {
      for (let j = 0; j < height; j++) {
        checkCell(i, j);
      }
    }
  });
});
