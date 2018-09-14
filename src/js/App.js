import '../favicons/favicons';
import '../style.styl';
import Controller from './Controller.js';
import Model from './Model.js';
import View from './View.js';

const $document = $(document);

$document.ready(() => {
  const model = Model();
  const view = View();
  Controller(view, model);
});
