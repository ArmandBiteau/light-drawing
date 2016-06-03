
"use strict";

import THREE from 'three';

class Spline extends THREE.Line {

    constructor(cursor) {

        let MAX_POINTS = 200;

        let geometry = new THREE.BufferGeometry();
        geometry.setDrawRange(0, 2);

        let material = new THREE.LineBasicMaterial({ color: 0x00ff00, linewidth: 2 });

        // DRAW THE LINE
        super(geometry, material);

        let positions = new Float32Array(MAX_POINTS * 3);
        this.geometry.addAttribute('position', new THREE.BufferAttribute(positions, 3));

        this._pointCount = 0;

        this._interval = setInterval(() => {

            this.geometry.setDrawRange(0, this._pointCount);

            this.geometry.attributes.position.array[this._pointCount] = cursor.position.x;
            this.geometry.attributes.position.array[this._pointCount+1] = cursor.position.y;
            this.geometry.attributes.position.array[this._pointCount+2] = cursor.position.z;

            this._pointCount += 3;

            this.geometry.attributes.position.needsUpdate = true;


        }, 1000/30);

    }

    stop() {

        clearInterval(this._interval);

    }

}


export default Spline;
