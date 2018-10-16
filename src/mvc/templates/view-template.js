import constants from '../constants.js';
let context = {
  title: 'game of life',
  inputs: [
      {name: 'width', value: constants.DEFAULT_WIDTH, tabindex: '1'},
      {name: 'height', value: constants.DEFAULT_HEIGHT, tabindex: '2'}
  ],
  speedSlider: {name: 'speed', minValue: constants.MIN_VALUE_SPEED_SLIDER, maxValue: constants.MAX_VALUE_SPEED_SLIDER, value: constants.CURRENT_VALUE_SPEED_SLIDER, tabindex: '3'},
  buttons: [
      {name: 'new-game', value: 'New game', tabindex: '4'},
      {name: 'start-game', value: 'Start', tabindex: '5'},
      {name: 'pause-game', value: 'Pause', tabindex: '6'}
  ],
  field: {nameContainer: 'page-container', width: constants.DEFAULT_WIDTH * constants.CELL_SIZE, height: constants.DEFAULT_HEIGHT * constants.CELL_SIZE}
};

Handlebars.registerHelper('h1', function() {
  return new Handlebars.SafeString(
    "<h1 class=\"page-container__title\">"
    + this.title
    +"</h1>"
  );
});

Handlebars.registerHelper('game_input', function() {
  let name = Handlebars.escapeExpression(this.name);
  let value = Handlebars.escapeExpression(this.value);
  let tabindex = Handlebars.escapeExpression(this.tabindex);

  return new Handlebars.SafeString(
    "<form class=\"" + name + "-form\">" 
    +  "<label class=\"" + name + "-form__label\">" + name + "</label>" 
    +  "<input class=\"" + name + "-form__input js-" + name + "-form__input\" type=\"number\" value=\"" + value + "\" tabindex=\"" + tabindex  + "\">"
    +"</form>"
  );
});

Handlebars.registerHelper('slider', function(speedSlider) {
  return new Handlebars.SafeString(
      "<form class=\"" + speedSlider.name + "-form\">"
      +  "<label class=\"" + speedSlider.name + "-form__label\">" + speedSlider.name + "</label>" 
      +  "<input class=\"" + speedSlider.name + "-form__input js-" + speedSlider.name + "-form__input\" type=\"range\" min=\"" + speedSlider.minValue + "\" max=\"" + speedSlider.maxValue + "\" value=\"" + speedSlider.value + "\" tabindex=\"" + speedSlider.tabindex + "\">"
      +  "<label class=\"" + speedSlider.name + "-form__range-label\">" 
      +    "<label class=\"" + speedSlider.name + "-form__range-label_min\">min</label>" 
      +    "<label class=\"" + speedSlider.name + "-form__range-label_max\">max</label></label>" 
      +"</form>"
  );
});

Handlebars.registerHelper('game_button', function() {
  let name = Handlebars.escapeExpression(this.name);
  let value = Handlebars.escapeExpression(this.value);
  let tabindex = Handlebars.escapeExpression(this.tabindex);

  return new Handlebars.SafeString(
    "<form class=\"" + name + "-form\">" 
    +  "<input class=\"" + name + "-form__button js-" + name + "-form__button\" type=\"button\" value=\"" + value + "\" tabindex=\"" + tabindex  + "\">" 
    +"</form>"
  );
});

Handlebars.registerHelper('canvas', function(field) {
  return new Handlebars.SafeString(
    "<canvas class=\"" + field.nameContainer + "__canvas js-" + field.nameContainer + "__canvas\" width=\"" + field.width + "\" height=\"" + field.height + " \">" 
    +"</canvas>"
  );
});

  let templateScript = Handlebars.templates.view(context);

  document.write(templateScript);
  