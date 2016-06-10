'use strict';

class Room {

	constructor(id, name) {

		this.id = id;

		this.name = name;

		this.players = [];

	}

    addPlayer(player) {

        this.players.push(player);

    }

	checkPlayer(name) {
		for (var i = 0; i < this.players.length; i++) {
			if (this.players[i].name == name) return true;
		}
		return false;
	}

	removePlayer(player) {

		let playerToDelete = this.players.indexOf(player);

	    if (playerToDelete !== -1) {

	    	this.players.splice(playerToDelete, 1);

	    }

	}

}

export default Room;
