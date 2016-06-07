'use strict';

// import THREE from 'three';

// import Spline from '../objects/spline';
import Spline from '../objects/spline2';
// import Spline from '../objects/spline3';


export default {

    created() {

        this.isDrawing = false;

        this._currentSpline = null;
        this._otherSpline = null;

        this._splines = [];
        this._splinesCount = 60;

	},

	methods: {

		splinesInitialize() {

		},

        splinesDraw() {

            this.isDrawing = true;

            for (let i = 0; i < this._splinesCount; i++) {

                this._splines.push(new Spline(this._cursor));

                this._splines[i].position.x = Math.random()/10 + this._splines[i]._lineWidth;
                this._splines[i].position.y = Math.random()/3 + this._splines[i]._lineWidth;
                this._splines[i].position.z = Math.random()/10 + this._splines[i]._lineWidth;

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
