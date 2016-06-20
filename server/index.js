"use strict";

import path from 'path';

const port = process.env.PORT || 5000;
const ip = process.env.IP || 'localhost';

import {
    NEW_USER, GET_USERS, CHECK_ROOM_CONNECTION, CHECK_ROOM_CREATE, GET_ROOM_NAME, GET_MY_ID, NEW_OPP_SPLINE, UPDATE_OPP_SPLINE, STOP_OPP_SPLINE, UPDATE_PLAYER
} from './config/messages';

import Express from 'express';
import Http from 'http';
import io from 'socket.io';

import Experience from './models/experience';
import Player from './models/player';
import Room from './models/room';

import App from './core/app';
import Routes from './core/routes';

var Server = Http.Server(App);
var Socket = io(Server);

var Expe = new Experience();

class Manager {

    constructor() {

        Server.listen(port);

        this.setEventHandlers();

        console.info(`Listening on port ${port}. Open up http://${ip}:${port}/`);

    }

    setEventHandlers() {

        Socket.sockets.on('connection', (client) => {

            client.on('disconnect', () => {

                if (client.player) {
                    client.room.removePlayer(client.player);

                    // Remove room if empty
                    if (!client.room.players.length) Expe.removeRoom(client.room.id);

                    client.broadcast.to(client.room.id).emit(GET_USERS, {users: client.room.players});

                }

            });

            client.on(NEW_USER, (data) => {
                Expe.newPlayer(client, data);

            });

            client.on(GET_MY_ID, (data) => {
                client.emit(GET_MY_ID, {id: client.player.id});

            });

            client.on(UPDATE_PLAYER, (data) => {

                client.room.updatePlayer(data.user);
                client.broadcast.to(client.room.id).emit(GET_USERS,{users: client.room.players});

            });

            client.on(GET_USERS, (data) => {
                client.emit(GET_USERS, {users: client.room.players});

            });

            client.on(GET_ROOM_NAME, (data) => {

                let roomInfos = Expe.roomById(data.roomId);
                if (roomInfos) {
                    client.emit(GET_ROOM_NAME, {status: true, message: roomInfos.name});
                } else {
                    client.emit(GET_ROOM_NAME, {status: false, message: 'This room doesn\'t exist.'});
                }

            });

            client.on(CHECK_ROOM_CONNECTION, (data) => {

                let drawer = data.user;
                let room = data.room;
                let roomInfos = Expe.roomById(room.id);

                if (!roomInfos) {
                    client.emit(CHECK_ROOM_CONNECTION, {status: false, message: 'This room doesn\'t exist.'});

                } else {
                    if (roomInfos.checkPlayer(drawer.name)) {
                        client.emit(CHECK_ROOM_CONNECTION, {status: false, message: 'Username not available.'});
                    } else {
                        client.emit(CHECK_ROOM_CONNECTION, {status: true, message: ''});
                    }

                }

            });

            client.on(CHECK_ROOM_CREATE, (data) => {

                let drawer = data.user;
                let room = data.room;
                let roomInfos = Expe.roomById(room.id);

                if (roomInfos) {
                    client.emit(CHECK_ROOM_CREATE, {status: false, message: 'This room already exists.'});

                } else {
                    client.emit(CHECK_ROOM_CREATE, {status: true, message: ''});

                }

            });

            client.on(NEW_OPP_SPLINE, (data) => {
                client.broadcast.to(client.room.id).emit(NEW_OPP_SPLINE, data);

            });

            client.on(UPDATE_OPP_SPLINE, (data) => {
                client.broadcast.to(client.room.id).emit(UPDATE_OPP_SPLINE, data);

            });

            client.on(STOP_OPP_SPLINE, (data) => {
                client.broadcast.to(client.room.id).emit(STOP_OPP_SPLINE, data);

            });

		});

    }

}

new Manager();
