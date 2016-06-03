'use strict';

// import THREE from 'three';

import FlyControls from 'core/FlyControls';

// import {
//     PATH_GLSL
// } from '../../../core/config';

export default {

    // domEvents: [{
    //     target: document.getElementsByTagName('canvas')[0],
    //     event: 'mousedown',
    //     method: 'requestPointerLock'
    // }],

    created() {

		this._controls = null;

	},

    ready() {

	},

	methods: {

		controlsInitialize() {

            this._controls = new FlyControls(this._camera, this._cursor);
            this._controls.movementSpeed = 2.5;
			this._controls.domElement = this._domElement;
			this._controls.rollSpeed = Math.PI / 8;
            // this._controls.rollSpeed = Math.PI / 1000;
			this._controls.autoForward = false;
			this._controls.dragToLook = false;

		},

		controlsUpdate(delta) {

            this._controls.update(delta);

        }

	}
};
