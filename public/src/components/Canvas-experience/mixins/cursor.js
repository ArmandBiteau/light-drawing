'use strict';

import THREE from 'three';

export default {

    created() {

		// cursor

		this._cursor = null;

        this._cursorColor = 0xffffff;

        this._cursorSize = 0.015;

	},

	methods: {

		cursorInitialize() {

            this._cursorColor = this.me.color.gradient[0];

            let cursorGeometry = new THREE.SphereGeometry(this._cursorSize*2, 4, 4);
            let cursorMaterial = new THREE.MeshBasicMaterial({
                color: this._cursorColor,
                wireframe: true
            });
            this._cursor = new THREE.Mesh(cursorGeometry, cursorMaterial);

			this._scene.add(this._cursor);

            let cursorWireGeometry = new THREE.SphereGeometry(this._cursorSize);
            let cursorWireMaterial = new THREE.MeshBasicMaterial({
                color: 0xffffff
            });
            this._wireCursor = new THREE.Mesh(cursorWireGeometry, cursorWireMaterial);

            this._cursor.add(this._wireCursor);

            if (window.mobile) {

                this._cursor.visible = false;

            }

		},

		cursorUpdate() {

            if (window.mobile) {
                this._cursor.position.copy(this._camera.position);
            }

		},

        cursorUpdateColor(color) {

            this._cursor.material.color = new THREE.Color(color.gradient[0]);

        }

	}
};
