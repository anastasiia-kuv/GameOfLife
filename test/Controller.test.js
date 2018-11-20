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

describe('getClassName', () => {
  const expected = 'Controller';
  it(`Имя класса как и ожидалось ${expected}`, () => {
    assert.equal(controller.getClassName(), expected);
  });
});
