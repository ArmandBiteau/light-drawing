
"use strict";

import THREE from 'three';

import OppLine from '../objects/oppLine';

class OppSpline extends THREE.Object3D {

    constructor(data) {

        // {name:str, user:obj, color:obj}

        super();

        this._splinesCount = 60;
        this._distortAmount = 11.0;
        this._lines = [];

        this.name = data.name;

        for (let i = 0; i < this._splinesCount; i++) {

            let splineColor = data.color.gradient[Math.floor( Math.random() * (data.color.gradient.length-1) )];

            this._lines.push(new OppLine(this._distortAmount, splineColor));

            this._lines[i].position.x = Math.random()/10 + this._lines[i]._lineWidth/this._distortAmount;
            this._lines[i].position.y = Math.random()/5 + this._lines[i]._lineWidth/this._distortAmount;
            this._lines[i].position.z = Math.random()/10 + this._lines[i]._lineWidth/this._distortAmount;

            this.add(this._lines[i]);

        }

    }

    update(point) {

        for (let i = 0; i < this._lines.length; i++) {

            this._lines[i].addPoint(point);

        }

    }

    stop() {

        for (let i = 0; i < this._lines.length; i++) {

            this._lines[i].stop();

        }

    }

}


export default OppSpline;
