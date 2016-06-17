
"use strict";

import THREE from 'three';

import CurveGeometry from './curveGeometry';

class OppLine extends THREE.Line {

    constructor(transform, distort, color) {

        let MAX_POINTS = 600;
        let LINE_WIDTH = Math.random()*3;
        let REDUCE_AMOUNT = 5;

        let geometry = new THREE.BufferGeometry();

        let material = new THREE.ShaderMaterial({
            uniforms: {
                iTransform: {
                    type: 'v3',
                    value: new THREE.Vector3(transform.x, transform.y, transform.z)
                },
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
            vertexShader: require('shaders/vertex/opp-spline-vs.glsl'),
            fragmentShader: require('shaders/fragment/opp-spline-fs.glsl'),
            linewidth: LINE_WIDTH,
            transparent : true
        });

        super(geometry, material);

        this._maxPoints = MAX_POINTS;
        this._lineWidth = LINE_WIDTH;
        this._reduceAmount = REDUCE_AMOUNT;

        this._centerCount = 0;
        // this._pointCount = 0;
        this._frame = 0.0;

        this.geometry.addAttribute('position', new THREE.BufferAttribute(new Float32Array(this._maxPoints), 3));
        // this.geometry.addAttribute('timeCreation', new THREE.BufferAttribute(new Float32Array(this._maxPoints), 1));

        this.material.index0AttributeName = 'position';

        this.geometry.setDrawRange(0, 2);

    }

    addPoint(point) {

        if (this._centerCount >= this._maxPoints) return;

        this.material.uniforms.iTimeDelta.value = this._frame;

        // this.geometry.attributes.timeCreation.array[this._pointCount++] = this._frame;

        this.geometry.attributes.position.array[this._centerCount++] = point.x;
        this.geometry.attributes.position.array[this._centerCount++] = point.y;
        this.geometry.attributes.position.array[this._centerCount++] = point.z;

        // this.geometry.attributes.timeCreation.needsUpdate = true;
        this.geometry.attributes.position.needsUpdate = true;

        if (this._centerCount >=3) this.geometry.setDrawRange(0, this._centerCount/3);

        this._frame++;

    }

    stop() {

        if (this._centerCount > 24) {
            this.geometry = new CurveGeometry(this.geometry.attributes.position.array, this._centerCount);
        }

    }

}


export default OppLine;
