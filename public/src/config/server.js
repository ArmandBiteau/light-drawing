'use strict';

const port = process.env.PORT || 5000;

const ip = (process.env.NODE_ENV != 'development') ? 'light-drawing.herokuapp.com' : 'localhost';

const server = {

  URL: 'http://'+ip,

  PORT: port

};

module.exports = server;
