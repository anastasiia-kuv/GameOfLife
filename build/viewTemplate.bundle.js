!function(n){var e={};function t(a){if(e[a])return e[a].exports;var l=e[a]={i:a,l:!1,exports:{}};return n[a].call(l.exports,l,l.exports,t),l.l=!0,l.exports}t.m=n,t.c=e,t.d=function(n,e,a){t.o(n,e)||Object.defineProperty(n,e,{enumerable:!0,get:a})},t.r=function(n){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(n,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(n,"__esModule",{value:!0})},t.t=function(n,e){if(1&e&&(n=t(n)),8&e)return n;if(4&e&&"object"==typeof n&&n&&n.__esModule)return n;var a=Object.create(null);if(t.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:n}),2&e&&"string"!=typeof n)for(var l in n)t.d(a,l,function(e){return n[e]}.bind(null,l));return a},t.n=function(n){var e=n&&n.__esModule?function(){return n.default}:function(){return n};return t.d(e,"a",e),e},t.o=function(n,e){return Object.prototype.hasOwnProperty.call(n,e)},t.p="",t(t.s=7)}({7:function(n,e){!function(){var n=Handlebars.template;(Handlebars.templates=Handlebars.templates||{}).view=n({1:function(n,e,t,a,l){return""},3:function(n,e,t,a,l){var r;return"\t\t\t"+n.escapeExpression("function"==typeof(r=null!=(r=t.game_input||(null!=e?e.game_input:e))?r:t.helperMissing)?r.call(null!=e?e:n.nullContext||{},{name:"game_input",hash:{},data:l}):r)+"\n"},5:function(n,e,t,a,l){var r;return"\t\t\t"+n.escapeExpression("function"==typeof(r=null!=(r=t.game_button||(null!=e?e.game_button:e))?r:t.helperMissing)?r.call(null!=e?e:n.nullContext||{},{name:"game_button",hash:{},data:l}):r)+"\n"},compiler:[7,">= 4.0.0"],main:function(n,e,t,a,l){var r,o,u,i=null!=e?e:n.nullContext||{},s=t.helperMissing,c='<main class="game">\n\t';return o=null!=(o=t.h1||(null!=e?e.h1:e))?o:s,u={name:"h1",hash:{},fn:n.program(1,l,0),inverse:n.noop,data:l},r="function"==typeof o?o.call(i,u):o,t.h1||(r=t.blockHelperMissing.call(e,r,u)),null!=r&&(c+=r),c+'\n\t<form class="game__dashboard">\n'+(null!=(r=t.each.call(i,null!=e?e.inputs:e,{name:"each",hash:{},fn:n.program(3,l,0),inverse:n.noop,data:l}))?r:"")+"\t\t"+(null!=(r=(t.slider||e&&e.slider||s).call(i,null!=e?e.speedSlider:e,{name:"slider",hash:{},fn:n.program(1,l,0),inverse:n.noop,data:l}))?r:"")+"\n"+(null!=(r=t.each.call(i,null!=e?e.buttons:e,{name:"each",hash:{},fn:n.program(5,l,0),inverse:n.noop,data:l}))?r:"")+"\t</form>\n\t"+(null!=(r=(t.canvas||e&&e.canvas||s).call(i,null!=e?e.field:e,{name:"canvas",hash:{},fn:n.program(1,l,0),inverse:n.noop,data:l}))?r:"")+"\n</main>\n"},useData:!0})}()}});