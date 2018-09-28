import Controller from './Controller.js';
import Model from './Model.js';
import View from './View.js';
class App {
  constructor(){
    this.model = new Model();
    this.view = new View();
    this.controller = new Controller(this.view, this.model);
    this.model.subscribe(this.controller);
    this.view.subscribe(this.controller);
    this.controller.subscribe(this.view, this.model);
  }
}

$(document).ready(() => {
  new App();
});
