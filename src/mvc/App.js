/* eslint-disable no-new */
import Controller from './controller/Controller';
import Model from './model/Model';
import View from './view/View';

class App {
  constructor() {
    const model = new Model();
    const view = new View();
    const controller = new Controller();
    model.subscribe(controller);
    view.subscribe(controller);
    controller.subscribe(view);
    controller.subscribe(model);
  }
}

$(document).ready(() => {
  new App();
});
