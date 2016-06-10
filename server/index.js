"use strict";

import path from 'path';

const isDeveloping = process.env.NODE_ENV !== 'production';
const port = isDeveloping ? 5000 : process.env.PORT;
const ip = 'localhost';

import Server from './core/Server';
import Socket from './core/Socket';

import {
    NEW_USER, ON_NEW_USER, GET_USERS, ON_GET_USERS
} from './config/messages';

import Experience from './models/experience';
import Player from './models/player';
import Room from './models/room';

var users = [];

var Expe = new Experience();

class Manager {

    constructor() {

        Server.listen(port);

        this.setEventHandlers();

        console.info(`Listening on port ${port}. Open up http://${ip}:${port}/`);

    }

    setEventHandlers() {

        let _this = this;

        Socket.sockets.on('connection', (client) => {

            console.log('client connect');

            client.on('disconnect', () => {

                console.log('client disconnect');

                if (client.player) {
                    client.room.removePlayer(client.player);

                    console.log(client.room.players);

                    client.broadcast.to(client.room.id).emit(GET_USERS, {users: client.room.players});
                }

            });

            client.on(ON_NEW_USER, (data) => {

                console.log('client wants to play');

                client.player = new Player(client.id, data.user.name, data.user.color);

                console.log('new player :', client.player);

                client.room = Expe.checkRoom(data.roomId);

                client.room.addPlayer(client.player);

                client.join(client.room.id);

                client.broadcast.to(client.room.id).emit(NEW_USER, client.player);

                client.emit(GET_USERS,{users: client.room.players});
                client.broadcast.to(client.room.id).emit(GET_USERS,{users: client.room.players});

                console.log('player\'s room :', client.room);

            });

            client.on(ON_GET_USERS, (data) => {

                client.emit(GET_USERS, {users: client.room.players});

            });

		});

    }

}

new Manager();
