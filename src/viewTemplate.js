/* eslint-disable */
(function () {
  const template = Handlebars.template; const
    templates = Handlebars.templates = Handlebars.templates || {};
  templates.view = template({
    1(container, depth0, helpers, partials, data) {
      return '';
    },
    3(container, depth0, helpers, partials, data) {
      let helper;

      return `			${
        container.escapeExpression(((helper = (helper = helpers.game_input || (depth0 != null ? depth0.game_input : depth0)) != null ? helper : helpers.helperMissing), (typeof helper === 'function' ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}), { name: 'game_input', hash: {}, data }) : helper)))
      }\n`;
    },
    5(container, depth0, helpers, partials, data) {
      let helper;

      return `			${
        container.escapeExpression(((helper = (helper = helpers.game_button || (depth0 != null ? depth0.game_button : depth0)) != null ? helper : helpers.helperMissing), (typeof helper === 'function' ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}), { name: 'game_button', hash: {}, data }) : helper)))
      }\n`;
    },
    compiler: [7, '>= 4.0.0'],
    main(container, depth0, helpers, partials, data) {
      let stack1; let helper; let options; const alias1 = depth0 != null ? depth0 : (container.nullContext || {}); const alias2 = helpers.helperMissing; let
        buffer = '<main class="page-container">\n	';
      stack1 = ((helper = (helper = helpers.h1 || (depth0 != null ? depth0.h1 : depth0)) != null ? helper : alias2), (options = {
        name: 'h1', hash: {}, fn: container.program(1, data, 0), inverse: container.noop, data,
      }), (typeof helper === 'function' ? helper.call(alias1, options) : helper));
      if (!helpers.h1) { stack1 = helpers.blockHelperMissing.call(depth0, stack1, options); }
      if (stack1 != null) { buffer += stack1; }
      return `${buffer}\n	<section class="control-elements-container">\n${
        (stack1 = helpers.each.call(alias1, (depth0 != null ? depth0.inputs : depth0), {
          name: 'each', hash: {}, fn: container.program(3, data, 0), inverse: container.noop, data,
        })) != null ? stack1 : ''
      }		${
        (stack1 = (helpers.slider || (depth0 && depth0.slider) || alias2).call(alias1, (depth0 != null ? depth0.speedSlider : depth0), {
          name: 'slider', hash: {}, fn: container.program(1, data, 0), inverse: container.noop, data,
        })) != null ? stack1 : ''
      }\n${
        (stack1 = helpers.each.call(alias1, (depth0 != null ? depth0.buttons : depth0), {
          name: 'each', hash: {}, fn: container.program(5, data, 0), inverse: container.noop, data,
        })) != null ? stack1 : ''
      }	</section>\n	${
        (stack1 = (helpers.canvas || (depth0 && depth0.canvas) || alias2).call(alias1, (depth0 != null ? depth0.field : depth0), {
          name: 'canvas', hash: {}, fn: container.program(1, data, 0), inverse: container.noop, data,
        })) != null ? stack1 : ''
      }\n</main>\n`;
    },
    useData: true,
  });
}());
