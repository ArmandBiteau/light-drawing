'use strict';

import THREE from 'three';

export default {

    created() {

		// cursor

		this._cursor = null;

        this._cursorColor = 0xff0000;

        this._cursorSize = 0.01;

	},

	methods: {

		cursorInitialize() {

            let cursorGeometry = new THREE.SphereGeometry(this._cursorSize);
            let cursorMaterial = new THREE.MeshBasicMaterial({
                color: this._cursorColor
            });
            this._cursor = new THREE.Mesh(cursorGeometry, cursorMaterial);

			this._scene.add(this._cursor);

		},

		cursorUpdate() {


		}

	}
};
