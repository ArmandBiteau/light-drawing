'use strict';

var http = require('http');

class Server {

	constructor() {

		return http.createServer();

	}

}

export default (new Server());
