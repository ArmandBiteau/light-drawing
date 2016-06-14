'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Color = function Color(name, gradients) {
	_classCallCheck(this, Color);

	this.name = name;

	this.range = gradients;
};

exports.default = Color;
module.exports = exports['default'];