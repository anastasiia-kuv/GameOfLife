/* eslint-disable */
import constants from '../constants';
import * as Handlebars from 'handlebars';
import template from './view.handlebars';

const context = {
  title: 'game of life',
  inputs: [
    { name: 'width', value: constants.DEFAULT_WIDTH, tabindex: '1' },
    { name: 'height', value: constants.DEFAULT_HEIGHT, tabindex: '2' },
  ],
  speedSlider: {
    name: 'speed', minValue: constants.MIN_VALUE_SPEED_SLIDER, maxValue: constants.MAX_VALUE_SPEED_SLIDER, value: constants.CURRENT_VALUE_SPEED_SLIDER, tabindex: '3',
  },
  buttons: [
    { name: 'new-game', value: 'New game', tabindex: '4' },
    { name: 'start', value: 'Start', tabindex: '5' },
    { name: 'pause', value: 'Pause', tabindex: '6' },
  ],
  field: { nameContainer: 'game', width: constants.DEFAULT_WIDTH * constants.CELL_SIZE, height: constants.DEFAULT_HEIGHT * constants.CELL_SIZE },
};

Handlebars.registerHelper('h1', function () {
  return new Handlebars.SafeString(
    `<h1 class="game__title">${
      this.title
    }</h1>`,
  );
});

Handlebars.registerHelper('game_input', function () {
  const name = Handlebars.escapeExpression(this.name);
  const value = Handlebars.escapeExpression(this.value);
  const tabindex = Handlebars.escapeExpression(this.tabindex);

  return new Handlebars.SafeString(
    `<div class="game__dashboard-control_assignment_${name}">`
      +`<label class="game__dashboard-control_assignment_${name}-label">${name}</label>`
      + `<input class="game__dashboard-control_assignment_${name}-input js-game__dashboard-control_assignment_${name}-input" type="number" value="${value}" tabindex="${tabindex}">`
    +`</div>`
  );
});

Handlebars.registerHelper('slider', speedSlider => new Handlebars.SafeString(
  `<div class="game__dashboard-control_assignment_${speedSlider.name}">`
    +`<label class="game__dashboard-control_assignment_${speedSlider.name}-label">${speedSlider.name}</label>`
    + `<input class="game__dashboard-control_assignment_${speedSlider.name}-input js-game__dashboard-control_assignment_${speedSlider.name}-input" type="range" min="${speedSlider.minValue}" max="${speedSlider.maxValue}" value="${speedSlider.value}" tabindex="${speedSlider.tabindex}">`
    + `<label class="game__dashboard-control_assignment_${speedSlider.name}-range-label">`
      + `<label class="game__dashboard-control_assignment_${speedSlider.name}-range-label_min">min</label>`
      + `<label class="game__dashboard-control_assignment_${speedSlider.name}-range-label_max">max</label>`
    +`</label>`
  +`</div>`
));

Handlebars.registerHelper('game_button', function () {
  const name = Handlebars.escapeExpression(this.name);
  const value = Handlebars.escapeExpression(this.value);
  const tabindex = Handlebars.escapeExpression(this.tabindex);

  return new Handlebars.SafeString(
    `<input class="game__dashboard-control_assignment_${name} js-game__dashboard-control_assignment_${name}" type="button" value="${value}" tabindex="${tabindex}">`
  );
});

Handlebars.registerHelper('canvas', field => new Handlebars.SafeString(
  `<canvas class="${field.nameContainer}__field js-${field.nameContainer}__field" width="${field.width}" height="${field.height} ">`
  + '</canvas>',
));

const html = Handlebars.compile(template)(context);

document.write(html);
