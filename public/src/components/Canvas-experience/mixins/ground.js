'use strict';

import THREE from 'three';

export default {

    created() {

		// ground

		this._ground = null;

        this._groundColor = 0xf6f6f6;

        this._groundSize = 10;

	},

	methods: {

		groundInitialize() {

            let groundGeometry = new THREE.PlaneGeometry(this._groundSize, this._groundSize);
            let groundMaterial = new THREE.MeshBasicMaterial({
                // color: this._groundColor
                side: 2,
                wireframe: true
            });
            this._ground = new THREE.Mesh(groundGeometry, groundMaterial);

            this._ground.rotation.x = -Math.PI / 2;
			this._scene.add(this._ground);

		},

		groundUpdate() {

		}
	}
};
