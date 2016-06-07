'use strict';

import THREE from 'three';

export default {

    created() {

		// cursor

		this._cursor = null;

        this._cursorColor = 0xffffff;

        this._cursorSize = 0.02;

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
