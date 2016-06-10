import Room from './room';

class Experience {

	constructor() {

		this.rooms = [];

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
