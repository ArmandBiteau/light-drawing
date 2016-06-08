
"use strict";

import THREE from 'three';

import CurveGeometry from './curveGeometry';

class Spline extends THREE.Line {

    constructor(distort, color, cursor) {

        let MAX_POINTS = 600;
        let LINE_WIDTH = Math.random()*3;
        let REDUCE_AMOUNT = 5;

        let geometry = new THREE.BufferGeometry();

        let material = new THREE.ShaderMaterial({
            uniforms: {
                iDistortAmount: {
                    type: 'f',
                    value: distort
                },
                iColor1: {
                    type: 'c',
                    value: new THREE.Color(color)
                },
                iResolution: {
                    type: 'v3',
                    value: new THREE.Vector3(window.innerWidth, window.innerHeight, 0)
                },
                iThickness: {
                    type: 'f',
                    value: LINE_WIDTH
                },
                iTimeDelta: {
                    type: 'f',
                    value: 0
                }
            },
            vertexShader: require('shaders/vertex/spline2-vs.glsl'),
            fragmentShader: require('shaders/fragment/spline2-fs.glsl'),
            linewidth: LINE_WIDTH
        });

        super(geometry, material);

        this.cursor = cursor;
        this._maxPoints = MAX_POINTS;
        this._lineWidth = LINE_WIDTH;
        this._reduceAmount = REDUCE_AMOUNT;

        this._centerCount = 0;
        this._frame = 0.0;

        this.geometry.addAttribute('position', new THREE.BufferAttribute(new Float32Array(this._maxPoints), 3));

        this.geometry.setDrawRange(0, 2);

    }

    update(delta) {

        if (this._centerCount >= this._maxPoints) return;

        this.material.uniforms.iTimeDelta.value = delta;

        this.geometry.attributes.position.array[this._centerCount++] = this.cursor.position.x;
        this.geometry.attributes.position.array[this._centerCount++] = this.cursor.position.y;
        this.geometry.attributes.position.array[this._centerCount++] = this.cursor.position.z;
        this.geometry.attributes.position.needsUpdate = true;

        if (this._centerCount >=3) this.geometry.setDrawRange(0, this._centerCount/3);

        this._frame++;

    }

    stop() {

        clearInterval(this._interval);
        this.geometry = new CurveGeometry(this.geometry.attributes.position.array, this._centerCount);

    }

}


export default Spline;
