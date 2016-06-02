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

import User from './models/User';

var users = [];

class Manager {

    constructor() {

        Server.listen(port);

        this.setEventHandlers();

        console.info(`Listening on port ${port}. Open up http://${ip}:${port}/`);

    }

    setEventHandlers() {

        Socket.sockets.on('connection', (client) => {

            client.on('disconnect', () => {

                if (client.user) {
                    let userToDelete = users.indexOf(client.user);
                    if (userToDelete !== -1) users.splice(userToDelete, 1);
                    client.broadcast.emit(GET_USERS, {users: users});
                }

            });

            client.on(ON_NEW_USER, (data) => {

                client.user = new User(client.id, data.name)
                users.push(client.user);

                client.broadcast.emit(NEW_USER, {user: client.user});

                client.emit(GET_USERS, {users: users});
                client.broadcast.emit(GET_USERS, {users: users});

            });

            client.on(ON_GET_USERS, (data) => {

                client.emit(GET_USERS, {users: users});

            });

		});

    }

}

new Manager();
