'use strict';

// import THREE from 'three';

import Spline from '../objects/spline';

export default {

    created() {

        this.isDrawing = false;

        this._splines = [];
        this._splinesCount = 60;
        this._distortAmount = 11.0;
        this._myColors = this.me.color.gradient;

	},

	methods: {

		splinesInitialize() {              

		},

        splinesDraw() {

            this.isDrawing = true;

            for (let i = 0; i < this._splinesCount; i++) {

                let color = this._myColors[Math.floor( Math.random() * (this._myColors.length-1) )];

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

        splinesUpdate() {

            if (this.isDrawing) {

                for (let i = 0; i < this._splinesCount; i++) {

                    this._splines[i].update();

                }

            }

		}

	}
};
