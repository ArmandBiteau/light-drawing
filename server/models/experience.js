import Room from './room';

import Player from './player';

import {
    NEW_USER, GET_USERS, GET_MY_ID
} from '../config/messages';

class Experience {

	constructor() {

		this.rooms = [];

	}

	newPlayer(socket, data) {

		socket.player = new Player(socket.id, data.user.name, data.user.color);

		socket.room = this.checkRoom(data.room);
		socket.room.addPlayer(socket.player);

		socket.join(socket.room.id);

		socket.broadcast.to(socket.room.id).emit(NEW_USER, socket.player);

		socket.emit(GET_USERS,{users: socket.room.players});
		socket.broadcast.to(socket.room.id).emit(GET_USERS,{users: socket.room.players});

		socket.emit(GET_MY_ID, {id: socket.player.id});

	}

    newRoom(room) {

		let newRoom = new Room(room.id, room.name);
		this.rooms.push(newRoom);
		return newRoom;

    }

	removeRoom(room) {

		let roomToDelete = this.rooms.indexOf(room);

	    if (roomToDelete !== -1) {

	    	this.rooms.splice(roomToDelete, 1);

	    }

    }

    roomById(id) {

        for (var i = 0; i < this.rooms.length; i++) {

            if(this.rooms[i].id == id) return this.rooms[i];

        }

        return false

    }

    checkRoom(room) {

        for (var i = 0; i < this.rooms.length; i++) {

            if(this.rooms[i].id == room.id) return this.rooms[i];

        }

        return this.newRoom(room);

    }

}

export default Experience;
