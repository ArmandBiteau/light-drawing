// @flow

"use strict";

import Application from './containers/Application';

import Router from './core/Router';

import domready from 'domready';

import './stylesheets/main.scss';

class Main {

    router: any;

  constructor() {

    this.bind();

    this.addEventListeners();

    this.router = Router;

    this.start();

  }

  bind() {}

  addEventListeners() {}

  start() {

    //   let str: string = 'test';
    //   let numers: number = [];

      this.router.start(Application, '#application');

  }
}

domready(() => {

  new Main();

});
