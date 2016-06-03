'use strict';

// import THREE from 'three';

import Spline from '../objects/spline';

export default {

    created() {

		// splines manager

		this._splines = [];

        this._splinesColor = 0xf6f6f6;

        this._splinesSize = 10;

        this._currentSpline = null;

	},

	methods: {

		splinesInitialize() {

		},

		splinesUpdate() {

		},

        splinesDraw() {

            this._currentSpline = new Spline(this._cursor);
            this._scene.add(this._currentSpline);

        },

        splinesStop() {

            this._currentSpline.stop();

        }

	}
};
