'use strict';

const localPort = process.env.PORT || 5000;

const ip = (process.env.NODE_ENV != 'development') ? 'light-drawing.herokuapp.com' : 'localhost';

const server = {

  URL: (process.env.NODE_ENV != 'development') ? 'http://light-drawing.herokuapp.com' : 'http://localhost',

  PORT: (process.env.NODE_ENV != 'development') ? '' : ':'+localPort

};

module.exports = server;
