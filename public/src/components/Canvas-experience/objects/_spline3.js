
"use strict";

import THREE from 'three';

class Spline extends THREE.Mesh {

    constructor(cursor) {

        let MAX_FACES = 180;
        let THICKNESS = 0.2;

        let geometry = new THREE.PlaneBufferGeometry(0.1, 0.1, 0.1, MAX_FACES);

        let material = new THREE.ShaderMaterial({
            vertexShader: require('shaders/vertex/spline-vs.glsl'),
            fragmentShader: require('shaders/fragment/spline-fs.glsl'),
            transparent: true,
            side: 2
        });

        super(geometry, material);

        this.cursor = cursor;
        this._pointCount = 0;
        this._centerCount = 0;
        this._thickness = THICKNESS;

        this.geometry.addAttribute('center', new THREE.BufferAttribute(new Float32Array(this.geometry.attributes.position.array.length), 3));
        this.geometry.setDrawRange(0, 2, 0);

    }

    update() {

        // DOUBLE CENTER POSITION ATTRIBUTE
        this.geometry.attributes.center.array[this._centerCount++] = this.cursor.position.x;
        this.geometry.attributes.center.array[this._centerCount++] = this.cursor.position.y;
        this.geometry.attributes.center.array[this._centerCount++] = this.cursor.position.z;

        this.geometry.attributes.center.array[this._centerCount++] = this.cursor.position.x;
        this.geometry.attributes.center.array[this._centerCount++] = this.cursor.position.y;
        this.geometry.attributes.center.array[this._centerCount++] = this.cursor.position.z;

        let leftPoint = this.cursor.clone();
        let rightPoint = this.cursor.clone();

        leftPoint.translateY(-this._thickness/2);
        rightPoint.translateY(this._thickness/2);

        // CREATE LEFT AND RIGHT POINTS
        this.geometry.attributes.position.array[this._pointCount++] = leftPoint.position.x;
        this.geometry.attributes.position.array[this._pointCount++] = leftPoint.position.y;
        this.geometry.attributes.position.array[this._pointCount++] = leftPoint.position.z;

        this.geometry.attributes.position.array[this._pointCount++] = rightPoint.position.x;
        this.geometry.attributes.position.array[this._pointCount++] = rightPoint.position.y;
        this.geometry.attributes.position.array[this._pointCount++] = rightPoint.position.z;

        this.geometry.computeVertexNormals();

        this.geometry.attributes.position.needsUpdate = true;
        this.geometry.attributes.center.needsUpdate = true;

        this.geometry.setDrawRange(0, this._pointCount-6);

    }

    stop() {

        clearInterval(this._interval);

    }

}


export default Spline;
