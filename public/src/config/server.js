'use strict';

const port = process.env.PORT || 5000;

const ip = (process.env.NOED_ENV != 'production') ? 'localhost' : 'light-drawing.herokuapp.com';

const server = {

  URL: 'http://'+ip,

  PORT: port

};

module.exports = server;
