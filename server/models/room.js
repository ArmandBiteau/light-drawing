'use strict';

class Room {

	constructor(id) {

		this.id = id;

		this.players = [];

	}

    addPlayer(player) {

        this.players.push(player);

    }

}

export default Room;
