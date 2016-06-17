'use strict';

Object.defineProperty(exports, "__esModule", {
				value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _room = require('./room');

var _room2 = _interopRequireDefault(_room);

var _player = require('./player');

var _player2 = _interopRequireDefault(_player);

var _messages = require('../config/messages');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Experience = function () {
				function Experience() {
								_classCallCheck(this, Experience);

								this.rooms = [];
				}

				_createClass(Experience, [{
								key: 'newPlayer',
								value: function newPlayer(socket, data) {

												socket.player = new _player2.default(socket.id, data.user.name, data.user.color);

												socket.room = this.checkRoom(data.room);
												socket.room.addPlayer(socket.player);

												socket.join(socket.room.id);

												socket.broadcast.to(socket.room.id).emit(_messages.NEW_USER, socket.player);

												socket.emit(_messages.GET_USERS, { users: socket.room.players });
												socket.broadcast.to(socket.room.id).emit(_messages.GET_USERS, { users: socket.room.players });

												socket.emit(_messages.GET_MY_ID, { id: socket.player.id });
								}
				}, {
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