'use strict';

// import THREE from 'three';

import Spline from '../objects/spline';

export default {

    created() {

        this.isDrawing = false;

        this._splines = [];
        this._splinesCount = 60;

        this._distortAmount = 11.0;

        this._colors = [
            0xF6F6F6, //white
            0x6238FF, //purple
            0x283BEF, //blue
            0x6238FF, //purple
            0x4890FF, //cyan
            0x4890FF, //cyan
            0x6DE49B  //green
        ];

	},

	methods: {

		splinesInitialize() {

		},

        splinesDraw() {

            this.isDrawing = true;

            for (let i = 0; i < this._splinesCount; i++) {

                let color = this._colors[Math.floor( Math.random() * (this._colors.length-1) )];

                this._splines.push(new Spline(this._distortAmount, color, this._cursor));

                this._splines[i].position.x = Math.random()/10 + this._splines[i]._lineWidth/this._distortAmount;
                this._splines[i].position.y = Math.random()/5 + this._splines[i]._lineWidth/this._distortAmount;
                this._splines[i].position.z = Math.random()/10 + this._splines[i]._lineWidth/this._distortAmount;

                this._scene.add(this._splines[i]);

            }

        },

        splinesStop() {

            this.isDrawing = false;

            for (let i = 0; i < this._splinesCount; i++) {

                this._splines[i].stop();

            }

            this._splines = [];

        },

        splinesUpdate(delta) {

            if (this.isDrawing) {

                for (let i = 0; i < this._splinesCount; i++) {

                    this._splines[i].update(delta);

                }

            }

		}

	}
};
