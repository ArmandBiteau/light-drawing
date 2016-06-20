'use strict';

import path from 'path';
import Express from 'express';

import App from './App';

class Routes {

	constructor() {

        App.use(Express.static(path.join( __dirname, '/../public')));

        App.get('/:id/connect', function (req, res) {

            let id = req.params.id;
        
            res.redirect('/'+id);

        });

        App.get('*', function (req, res) {
            res.sendFile(path.join( __dirname, '/../public/index.html'));
        });

    }

}

export default (new Routes());
