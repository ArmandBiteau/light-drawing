'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var http = require('http');

var Server = function Server() {
	_classCallCheck(this, Server);

	return http.createServer();
};

exports.default = new Server();
module.exports = exports['default'];