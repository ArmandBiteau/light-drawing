'use strict';

// import THREE from 'three';
import WEBVR from 'core/Webvr';

import VRControls from 'core/VRControls';
import VREffect from 'core/VREffect';

export default {

    created() {

		this._controls = null;
        this._vreffect = null;
        this._velocity = 0;

	},

    ready() {

	},

	methods: {

		controlsInitialize() {


            this._controls = new VRControls(this._camera);
            this._vreffect = new VREffect(this._renderer);

            this._controls.moveForward = false;

            this._vreffect.setSize(window.innerWidth, window.innerHeight);

            if (WEBVR.isAvailable() === true) {
				document.body.appendChild(WEBVR.getButton(this._vreffect));
			}

		},

		controlsUpdate(delta) {

            this._controls.update(delta);

            if (this._controls.moveForward) {

                this._velocity = 0.02;
                this._camera.translateZ(this._velocity);

            }

        }

	}
};
