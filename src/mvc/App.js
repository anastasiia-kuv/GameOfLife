import Controller from './controller/Controller.js';
import Model from './model/Model.js';
import View from './view/View.js';
class App {
  constructor(){
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
