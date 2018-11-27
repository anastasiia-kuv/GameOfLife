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
const spyCallInitNewGame = sinon.spy(model, 'initNewGame');
const spyCallStart = sinon.spy(model, 'start');
const spyCallPause = sinon.spy(model, 'pause');
const spyCallEnd = sinon.spy(model, 'end');

describe('changeCanvasSize', () => {
  it('Изменение размера канвас', () => {
    const spyCallSetFieldSize = sinon.spy(model, 'setFieldSize');
    const spyCallUpdateCanvasSize = sinon.spy(view, 'updateCanvasSize');
    const size = { width: 15, height: 20 };
    controller.changeCanvasSize(size);
    assert.isTrue(spyCallPause.called);
    assert.isTrue(spyCallSetFieldSize.calledOnceWith(size));
    assert.isTrue(spyCallUpdateCanvasSize.calledOnceWith(size));
    assert.isTrue(spyCallInitNewGame.called);
  });
});

describe('initGame', () => {
  it('Вызов инициализации игры', () => {
    controller.initGame();
    assert.isTrue(spyCallPause.called);
    assert.isTrue(spyCallInitNewGame.called);
  });
});

describe('сhangeСellStatus', () => {
  it('Изменение стутуса ячейки', () => {
    const spyCallUpdateMatrixElementValue = sinon.spy(model, 'updateMatrixElementValue');
    const position = { x: 5, y: 8 };
    controller.сhangeСellStatus(position);
    assert.isTrue(spyCallUpdateMatrixElementValue.calledOnceWith(position));
  });
});

describe('сhangeField', () => {
  it('Изменение поля', () => {
    const spyCallUpdateField = sinon.spy(view, 'updateField');
    const updatedMatrix = [ 
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ];
    controller.сhangeField(updatedMatrix);
    assert.isTrue(spyCallUpdateField.calledOnceWith(updatedMatrix));
  });
});

describe('startGame', () => {
  it('Вызов новой игры', () => {
    controller.startGame();
    assert.isTrue(spyCallStart.called);
  });
});

describe('pauseGame', () => {
  it('Вызов паузы в игре', () => {
    controller.pauseGame();
    assert.isTrue(spyCallPause.called);
  });
});

describe('endGame', () => {
  it('Вызов конца игры', () => {
    controller.endGame();
    assert.isTrue(spyCallEnd.called);
  });
});

describe('changeSpeed', () => {
  it('Изменение скорости игры', () => {
    const spyCallUpdateGameSpeed = sinon.spy(model, 'updateGameSpeed');
    const speed = 5;
    controller.changeSpeed(speed);
    assert.isTrue(spyCallUpdateGameSpeed.calledOnceWith(speed));
  });
});

describe('getClassName', () => {
  const expectedName = 'Controller';
  it(`Имя класса как и ожидалось ${expectedName}`, () => {
    assert.equal(controller.getClassName(), expectedName);
  });
});
