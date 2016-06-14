'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Server = require('./Server');

var _Server2 = _interopRequireDefault(_Server);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var io = require('socket.io')();

var Socket = function Socket() {
    _classCallCheck(this, Socket);

    return io.listen(_Server2.default);
};

exports.default = new Socket();
module.exports = exports['default'];