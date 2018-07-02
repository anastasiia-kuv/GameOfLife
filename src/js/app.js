"use strict";

require("../style.styl");

import Model from "./model.js";
import View from "./view.js";
import Controller from "./controller.js";

$(document).ready(function () {
	var model = Model();
	var view = View();
	var controller = Controller(view, model);
});