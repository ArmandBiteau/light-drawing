'use strict';

import THREE from 'three';

export default {

    created() {

		// ground

		this._ground = null;

        this._groundColor = 0xf6f6f6;

        this._groundSize = 3.8;

	},

	methods: {

		groundInitialize() {

            let groundGeometry = new THREE.PlaneGeometry(this._groundSize, this._groundSize, Math.floor(this._groundSize)+1, Math.floor(this._groundSize)+1);
            let groundMaterial = new THREE.MeshBasicMaterial({
                color: this._groundColor,
                side: 2,
                wireframe: true
            });
            this._ground = new THREE.Mesh(groundGeometry, groundMaterial);

            this._ground.position.y = -2.5;

            this._ground.rotation.x = -Math.PI / 2;
			this._scene.add(this._ground);

		},

		groundUpdate() {

		}
	}
};
