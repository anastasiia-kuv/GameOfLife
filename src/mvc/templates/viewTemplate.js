/* eslint-disable */
import constants from '../constants';

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
  field: { width: constants.DEFAULT_WIDTH * constants.CELL_SIZE, height: constants.DEFAULT_HEIGHT * constants.CELL_SIZE },
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
      +`<label class="game__label_assignment_${name}">${name}</label>`
      + `<input class="game__entry-field_assignment_${name} js-game__entry-field_assignment_${name}" type="number" value="${value}" tabindex="${tabindex}">`
    +`</div>`
  );
});

Handlebars.registerHelper('slider', speedSlider => new Handlebars.SafeString(
  `<div class="game__dashboard-control_assignment_${speedSlider.name}">`
    +`<label class="game__label_assignment_${speedSlider.name}">${speedSlider.name}</label>`
    + `<input class="game__range-field_assignment_${speedSlider.name} js-game__range-field_assignment_${speedSlider.name}" type="range" min="${speedSlider.minValue}" max="${speedSlider.maxValue}" value="${speedSlider.value}" tabindex="${speedSlider.tabindex}">`
    + `<label class="game__range-captions">`
      + `<label class="game__range-caption_value_min">min</label>`
      + `<label class="game__range-caption_value_max">max</label>`
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
  `<canvas class="game__field js-game__field" width="${field.width}" height="${field.height} ">`
  + '</canvas>',
));

const templateScript = Handlebars.templates.view(context);

document.write(templateScript);
