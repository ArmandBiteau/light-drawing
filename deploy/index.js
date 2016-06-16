"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _messages = require('./config/messages');

var _experience = require('./models/experience');

var _experience2 = _interopRequireDefault(_experience);

var _player = require('./models/player');

var _player2 = _interopRequireDefault(_player);

var _room = require('./models/room');

var _room2 = _interopRequireDefault(_room);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var port = process.env.PORT || 5000;
var ip = process.env.IP || 'localhost';

// import Server from './core/Server';
// import Socket from './core/Socket';

var app = (0, _express2.default)();
var Server = require('http').Server(app);
var Socket = require('socket.io')(Server);

var users = [];

var Expe = new _experience2.default();

var Manager = function () {
    function Manager() {
        _classCallCheck(this, Manager);

        Server.listen(port);

        app.use(_express2.default.static(_path2.default.join(__dirname, '/public')));

        app.get('/:id/connect', function (req, res) {

            var id = req.params.id;

            res.redirect('/' + id);
        });

        app.get('*', function (req, res) {
            res.sendFile(_path2.default.join(__dirname, '/public/index.html'));
        });

        this.setEventHandlers();

        console.info('Listening on port ' + port + '. Open up http://' + ip + ':' + port + '/');
    }

    _createClass(Manager, [{
        key: 'setEventHandlers',
        value: function setEventHandlers() {

            Socket.sockets.on('connection', function (client) {

                client.on('disconnect', function () {

                    if (client.player) {
                        client.room.removePlayer(client.player);

                        // Remove room if empty
                        if (!client.room.players.length) {
                            Expe.removeRoom(client.room.id);
                        }

                        client.broadcast.to(client.room.id).emit(_messages.GET_USERS, { users: client.room.players });
                    }
                });

                client.on(_messages.NEW_USER, function (data) {

                    client.player = new _player2.default(client.id, data.user.name, data.user.color);

                    client.room = Expe.checkRoom(data.room);
                    client.room.addPlayer(client.player);

                    client.join(client.room.id);

                    client.broadcast.to(client.room.id).emit(_messages.NEW_USER, client.player);

                    client.emit(_messages.GET_USERS, { users: client.room.players });
                    client.broadcast.to(client.room.id).emit(_messages.GET_USERS, { users: client.room.players });

                    client.emit(_messages.GET_MY_ID, { id: client.player.id });
                });

                client.on(_messages.GET_MY_ID, function (data) {

                    client.emit(_messages.GET_MY_ID, { id: client.player.id });
                });

                client.on(_messages.UPDATE_PLAYER, function (data) {

                    client.room.updatePlayer(data.user);

                    client.broadcast.to(client.room.id).emit(_messages.GET_USERS, { users: client.room.players });
                });

                client.on(_messages.GET_USERS, function (data) {

                    client.emit(_messages.GET_USERS, { users: client.room.players });
                });

                client.on(_messages.GET_ROOM_NAME, function (data) {

                    var roomInfos = Expe.roomById(data.roomId);

                    if (roomInfos) {
                        client.emit(_messages.GET_ROOM_NAME, { status: true, message: roomInfos.name });
                    } else {
                        client.emit(_messages.GET_ROOM_NAME, { status: false, message: 'This room doesn\'t exist.' });
                    }
                });

                client.on(_messages.CHECK_ROOM_CONNECTION, function (data) {

                    var drawer = data.user;
                    var room = data.room;
                    var roomInfos = Expe.roomById(room.id);

                    if (!roomInfos) {
                        client.emit(_messages.CHECK_ROOM_CONNECTION, { status: false, message: 'This room doesn\'t exist.' });
                    } else {
                        if (roomInfos.checkPlayer(drawer.name)) {
                            client.emit(_messages.CHECK_ROOM_CONNECTION, { status: false, message: 'Username not available.' });
                        } else {
                            client.emit(_messages.CHECK_ROOM_CONNECTION, { status: true, message: '' });
                        }
                    }
                });

                client.on(_messages.CHECK_ROOM_CREATE, function (data) {

                    var drawer = data.user;
                    var room = data.room;
                    var roomInfos = Expe.roomById(room.id);

                    if (roomInfos) {
                        client.emit(_messages.CHECK_ROOM_CREATE, { status: false, message: 'This room already exists.' });
                    } else {
                        client.emit(_messages.CHECK_ROOM_CREATE, { status: true, message: '' });
                    }
                });

                client.on(_messages.NEW_OPP_SPLINE, function (data) {

                    client.broadcast.to(client.room.id).emit(_messages.NEW_OPP_SPLINE, data);
                });

                client.on(_messages.UPDATE_OPP_SPLINE, function (data) {

                    client.broadcast.to(client.room.id).emit(_messages.UPDATE_OPP_SPLINE, data);
                });

                client.on(_messages.STOP_OPP_SPLINE, function (data) {

                    client.broadcast.to(client.room.id).emit(_messages.STOP_OPP_SPLINE, data);
                });
            });
        }
    }]);

    return Manager;
}();

new Manager();