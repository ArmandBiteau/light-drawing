'use strict';

import THREE from 'three';

import Spline from '../objects/spline';

import {
    NEW_OPP_SPLINE, UPDATE_OPP_SPLINE, STOP_OPP_SPLINE
} from 'config/messages';

export default {

    created() {

        this.isDrawing = false;
        this.currentSpline = null;

        this._splinesCount = window.mobile ? 12 : 60;

        this._distortAmount = 5.0;

        this._splines = [];

        this._myColors = null;

	},

	methods: {

		splinesInitialize() {

		},

        splinesDraw() {

            this._myColors = this.me.color.gradient;

            this.isDrawing = true;

            this.currentSpline = new THREE.Object3D();

            this.currentSpline.name = this.me.id + '-' + Math.random().toString(36).substring(7);

            for (let i = 0; i < this._splinesCount; i++) {

                let color = this._myColors[Math.floor( Math.random() * (this._myColors.length-1) )];

                let sign = Math.sign(i - this._splinesCount/2);
                let transform = {
                    x: Math.random()*this._distortAmount/40 * sign/2,
                    y: Math.random()*this._distortAmount/30 * sign,
                    z: Math.random()*this._distortAmount/20
                };

                this._splines.push(new Spline(transform, this._distortAmount, color, this._cursor));

                // this._splines[i].position.x = Math.random()*this._distortAmount/40 * sign/2;
                //
                // this._splines[i].position.y = Math.random()*this._distortAmount/30 * sign;
                //
                // this._splines[i].position.z = Math.random()*this._distortAmount/20;

                this.currentSpline.add(this._splines[i]);

            }

            this._scene.add(this.currentSpline);

            this.socketEmitter.emit(NEW_OPP_SPLINE, {name:this.currentSpline.name, user: this.me, color: this.me.color});

        },

        splinesStop() {

            this.isDrawing = false;

            this.socketEmitter.emit(STOP_OPP_SPLINE, {name:this.currentSpline.name});

            for (let i = 0; i < this._splinesCount; i++) {

                if (this._splines[i]) this._splines[i].stop();

            }

            this._splines = [];

        },

        splinesUpdate() {

            // let half = true;

            if (this.isDrawing) {

                let currentPoint = {
                    x: this._cursor.position.x,
                    y: this._cursor.position.y,
                    z: this._cursor.position.z
                };

                // if (half) {
                    this.socketEmitter.emit(UPDATE_OPP_SPLINE, {name:this.currentSpline.name, point: currentPoint});
                    // half ^= true;
                // }

                for (let i = 0; i < this._splinesCount; i++) {

                    if (this._splines[i]) this._splines[i].update();

                }

            }

		}

	}
};
