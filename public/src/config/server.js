'use strict';

const port = process.env.PORT || 5000;
const ip = process.env.IP || 'localhost';

const server = {

  URL: 'http://'+ip,

  PORT: port

};

module.exports = server;
