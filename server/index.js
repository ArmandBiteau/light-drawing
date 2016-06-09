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

var tmp_room = new Room('fvrvs354tegtrge');

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

            client.on('disconnect', () => {

                // if (client.player) {
                //     client.room.removePlayer(client.player);
                //
                //     let userToDelete = users.indexOf(client.user);
                //     if (userToDelete !== -1) users.splice(userToDelete, 1);
                //     client.broadcast.emit(GET_USERS, {users: users});
                // }

            });

            client.on(ON_NEW_USER, _this.onNewPlayer);

            client.on(ON_GET_USERS, (data) => {

                client.emit(GET_USERS, {users: users});

            });

		});

    }

    onNewPlayer(data) {

        this.player = new Player(this.id, data.name, data.color, data.room);

        console.log(this.player);

        // this.room = Expe.roomById(data.room);
        // this.room = tmp_room;

        // this.room.addPlayer(this.player);

        // this.broadcast.emit(NEW_USER, {user: this.player});

        // this.emit(GET_USERS, {users: users});
        // this.broadcast.emit(GET_USERS, {users: users});

    }

}

new Manager();
