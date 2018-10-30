/* eslint-disable no-new */
import Controller from './controller/Controller';
import Model from './model/Model';
import View from './view/View';

class App {
  constructor() {
    this.model = new Model();
    this.view = new View();
    this.controller = new Controller();
    this.model.subscribe(this.controller);
    this.view.subscribe(this.controller);
    this.controller.subscribe(this.view);
    this.controller.subscribe(this.model);
  }
}

$(document).ready(() => {
  new App();
});
