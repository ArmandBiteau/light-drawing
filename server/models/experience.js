import Room from './room';

class Experience {

	constructor() {

		this.rooms = [];

	}

    newRoom(id) {

		let room = new Room(id);
		this.rooms.push(room);
		return room;

    }

    roomById(id) {

        for (var i = 0; i < this.rooms.length; i++) {

            if(this.rooms[i].id == id) return this.rooms[i];

        }

        return false

    }

    checkRoom(id) {

        for (var i = 0; i < this.rooms.length; i++) {

            if(this.rooms[i].id == id) return this.rooms[i];

        }

        return this.newRoom(id);

    }

}

export default Experience;
