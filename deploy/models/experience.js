'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _room = require('./room');

var _room2 = _interopRequireDefault(_room);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Experience = function () {
    function Experience() {
        _classCallCheck(this, Experience);

        this.rooms = [];
    }

    _createClass(Experience, [{
        key: 'newRoom',
        value: function newRoom(room) {

            var newRoom = new _room2.default(room.id, room.name);
            this.rooms.push(newRoom);
            return newRoom;
        }
    }, {
        key: 'removeRoom',
        value: function removeRoom(room) {

            var roomToDelete = this.rooms.indexOf(room);

            if (roomToDelete !== -1) {

                this.rooms.splice(roomToDelete, 1);
            }
        }
    }, {
        key: 'roomById',
        value: function roomById(id) {

            for (var i = 0; i < this.rooms.length; i++) {

                if (this.rooms[i].id == id) return this.rooms[i];
            }

            return false;
        }
    }, {
        key: 'checkRoom',
        value: function checkRoom(room) {

            for (var i = 0; i < this.rooms.length; i++) {

                if (this.rooms[i].id == room.id) return this.rooms[i];
            }

            return this.newRoom(room);
        }
    }]);

    return Experience;
}();

exports.default = Experience;
module.exports = exports['default'];