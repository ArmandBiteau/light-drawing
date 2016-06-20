
"use strict";

import THREE from 'three';

import States from 'core/States';

import OppLine from '../objects/oppLine';

class OppSpline extends THREE.Object3D {

    constructor(data) {

        // {name:str, user:obj, color:obj}

        super();

        this._splinesCount = States.deviceType == "mobile" ? 12 : 60;
        this._distortAmount = 5.0;
        this._lines = [];

        this.name = data.name;

        for (let i = 0; i < this._splinesCount; i++) {

            let splineColor = data.color.gradient[Math.floor( Math.random() * (data.color.gradient.length-1) )];

            let sign = Math.sign(i - this._splinesCount/2);
            let transform = {
                x: Math.random()*this._distortAmount/40 * sign/2,
                y: Math.random()*this._distortAmount/30 * sign,
                z: Math.random()*this._distortAmount/20
            };

            this._lines.push(new OppLine(transform, this._distortAmount, splineColor));

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
