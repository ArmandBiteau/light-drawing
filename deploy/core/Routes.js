'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _App = require('./App');

var _App2 = _interopRequireDefault(_App);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Routes = function Routes() {
    _classCallCheck(this, Routes);

    _App2.default.use(_express2.default.static(_path2.default.join(__dirname, '/../public')));

    _App2.default.get('/:id/connect', function (req, res) {

        var id = req.params.id;

        res.redirect('/' + id);
    });

    _App2.default.get('*', function (req, res) {
        res.sendFile(_path2.default.join(__dirname, '/../public/index.html'));
    });
};

exports.default = new Routes();
module.exports = exports['default'];