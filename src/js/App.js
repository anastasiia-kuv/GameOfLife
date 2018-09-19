import Controller from './Controller.js';
import Model from './Model.js';
import View from './View.js';
class App {
  constructor(){
    this.model = new Model();
    this.view = new View();
    new Controller(this.view, this.model);
  }
}

$(document).ready(() => {
  new App();
});
