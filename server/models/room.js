'use strict';

class Room {

	constructor(id) {

		this.id = id;

		this.players = [];

	}

    addPlayer(player) {

        this.players.push(player);

    }

	removePlayer(player) {

		let playerToDelete = this.players.indexOf(player);

		console.log(playerToDelete);

	    if (playerToDelete !== -1) {

	    	this.players.splice(playerToDelete, 1);

	    }

	}

}

export default Room;
