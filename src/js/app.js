"use strict";

require("../style.styl");

import Model from "./model.js";
import View from "./view.js";
import Controller from "./controller.js";

$(document).ready(function () {
	let model = Model();
	let view = View();
	Controller(view, model);
});