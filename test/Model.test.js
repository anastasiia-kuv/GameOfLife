import { assert } from 'chai';
import Model from '../src/mvc/model/Model';
import View from '../src/mvc/view/View';
import Controller from '../src/mvc/controller/Controller';

const model = new Model();
const view = new View();
const controller = new Controller();
model.subscribe(controller);
view.subscribe(controller);
controller.subscribe(view);
controller.subscribe(model);
const spyCallIsMatrixRepeated = sinon.spy(model, 'isMatrixRepeated');
const spyCallGetCountAliveNeighbours = sinon.spy(model, 'getCountAliveNeighbours');

describe('updateMatrixElementValue', () => {
  it('Обновление значения элемента матрицы', () => {
    const spyCallChangeField = sinon.spy(controller, 'сhangeField');
    model.matrix = [ 
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
    ];
    model.width = 5;
    model.height = 5;
    const position = { x: 3, y: 3 };
    model.updateMatrixElementValue(position);
    assert.equal(model.matrix[3][3], 1);
    assert.isTrue(spyCallChangeField.calledWith(model.matrix));
    spyCallChangeField.restore();
  });
});

describe('initMatrix', () => {
  it('Инициализация матрицы', () => {
    const spyCallChangeField = sinon.spy(controller, 'сhangeField');
    const width = 5;
    const height = 5;
    model.initMatrix(width, height);
    assert.equal(model.matrix.length, width);
    assert.equal(model.matrix[0].length, height);
    assert.equal(model.pastMatrixStates, '');
    assert.isTrue(spyCallChangeField.calledOnceWith(model.matrix));
    spyCallChangeField.restore();
  });
});

describe('updateMatrix', () => {
  it('Вызов обновление матрицы', () => {
    model.updateMatrix();
    assert.isTrue(spyCallIsMatrixRepeated.called);
  });
});

describe('isMatrixRepeated', () => {
  it('Вызов проверки матрицы на повторение', () => {
    model.matrix = [ 
      [0, 0, 0, 0, 0],
      [0, 0, 1, 0, 0],
      [0, 0, 1, 0, 0],
      [0, 0, 1, 0, 0],
      [0, 0, 0, 0, 0],
    ];
    model.pastMatrixStates = [[ 
      [0, 0, 0, 0, 0],
      [0, 0, 1, 0, 0],
      [0, 0, 1, 0, 0],
      [0, 0, 1, 0, 0],
      [0, 0, 0, 0, 0],
    ]];
    assert.deepEqual(model.isMatrixRepeated(), true);
  });
});

describe('getCellState', () => {
  it('Получение значения элемента матрицы', () => {
    const row = 2;
    const column = 1;
    model.matrix = [ 
      [0, 0, 0, 0, 0],
      [0, 0, 1, 0, 0],
      [0, 0, 1, 0, 0],
      [0, 0, 1, 0, 0],
      [0, 0, 0, 0, 0],
    ];
    assert.equal(model.getCellState(row, column), 1);
  });
});

describe('getCountAliveNeighbours', () => {
  it('Получение числа живых соседий', () => {
    const row = 1;
    const column = 2;
    model.matrix = [ 
      [0, 0, 0, 0, 0],
      [0, 0, 1, 0, 0],
      [0, 0, 1, 0, 0],
      [0, 0, 1, 0, 0],
      [0, 0, 0, 0, 0],
    ];
    model.getCountAliveNeighbours(row, column);
    assert.equal(spyCallGetCountAliveNeighbours.calledWith(column, row), 1);
  });
});

describe('initNewGame', () => {
  it('Вызов инициализации новой игры', () => {
    const spyCallInitMatrix = sinon.spy(model, 'initMatrix');
    model.initNewGame();
    assert.isTrue(spyCallInitMatrix.calledOnceWith(model.width, model.height));
  });
});

describe('start', () => {
  it('Вызов начала игры', () => {
    model.start();
    assert.isTrue(model.isRunning);
  });
});

describe('pause', () => {
  it('Вызов паузы игры', () => {
    model.pause();
    assert.isNotTrue(model.isRunning);
  });
});

describe('end', () => {
  it('Вызов конца игры', () => {
    const spyCallInitGame = sinon.spy(controller, 'initGame');
    model.end();
    assert.isNotTrue(model.isRunning);
    assert.isTrue(spyCallInitGame.called);
  });
});

describe('setFieldSize', () => {
  it('Установка размеров матрицы', () => {
    const size = { width: 15, height: 20 };
    model.setFieldSize(size);
    assert.equal(model.width, 15);
    assert.equal(model.height, 20);
  });
});

describe('updateGameSpeed', () => {
  it('Обновление скорости таймера', () => {
    const spyCallPauseGame = sinon.spy(controller, 'pauseGame');
    const spyCallStartGame = sinon.spy(controller, 'startGame');
    const speed = 5;
    model.isRunning = true;
    model.updateGameSpeed(speed);
    assert.equal(model.gameSpeed, 200);
    assert.isTrue(spyCallPauseGame.called);
    assert.isTrue(spyCallStartGame.called);
  });
});

describe('getClassName', () => {
  const expectedName = 'Model';
  it(`Имя класса как и ожидалось ${expectedName}`, () => {
    assert.equal(model.getClassName(), expectedName);
  });
});
