'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Room = function () {
	function Room(id, name) {
		_classCallCheck(this, Room);

		this.id = id;

		this.name = name;

		this.players = [];
	}

	_createClass(Room, [{
		key: 'addPlayer',
		value: function addPlayer(player) {

			this.players.push(player);
		}
	}, {
		key: 'getPlayerByName',
		value: function getPlayerByName(name) {
			for (var i = 0; i < this.players.length; i++) {
				if (this.players[i].name == name) return this.players[i];
			}
			return false;
		}
	}, {
		key: 'checkPlayer',
		value: function checkPlayer(name) {
			for (var i = 0; i < this.players.length; i++) {
				if (this.players[i].name == name) return true;
			}
			return false;
		}
	}, {
		key: 'updatePlayer',
		value: function updatePlayer(user) {

			var player = this.getPlayerByName(user.name);
			player.color = user.color;
		}
	}, {
		key: 'removePlayer',
		value: function removePlayer(player) {

			var playerToDelete = this.players.indexOf(player);

			if (playerToDelete !== -1) {

				this.players.splice(playerToDelete, 1);
			}
		}
	}]);

	return Room;
}();

exports.default = Room;
module.exports = exports['default'];