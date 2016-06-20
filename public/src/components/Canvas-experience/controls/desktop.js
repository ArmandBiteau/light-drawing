'use strict';

import FlyControls from 'core/FlyControls';

export default {

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
			this._controls.autoForward = false;
			this._controls.dragToLook = false;

		},

		controlsUpdate(delta) {

            this._controls.update(delta);

        }

	}
};
