import Room from './room';

class Experience {

	constructor() {

		this.rooms = [];

	}

    addRoom() {

    }

    roomById(id) {

        for (var i = 0; i < this.rooms.length; i++) {

            if(this.rooms[i].id == id) return this.rooms[i];

        }

        return false

    }

    checkRoom(id) {

        for (var i = 0; i < this.rooms.length; i++) {

            if(this.rooms[i].id == id) return true;

        }
        return false

    }

}

export default Experience;
