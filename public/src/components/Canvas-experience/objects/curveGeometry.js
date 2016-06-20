
"use strict";

import THREE from 'three';

class CurveGeometry extends THREE.Geometry {

    constructor(array, count) {

        super();

        this.points = array;
        this.count = count;
        this._reduceAmount = 6;

        let points = this.get3DPoints(this.points);

        let reduced = this.reducePoints(points, this._reduceAmount);

        let curve = new THREE.CatmullRomCurve3(reduced);
        this.vertices = curve.getPoints(count/this._reduceAmount*5);

    }

    reducePoints(points, n) {

        let reducedPoints = [];
        for (let i = 0; i < points.length; i+=n) {
            reducedPoints.push(points[i]);
        }
        return reducedPoints;

    }

    get3DPoints(array) {
        let points = [];
        for (let i = 0; i < this.count; i+=3) {
            let x = array[i];
            let y = array[i+1];
            let z = array[i+2];
            points.push(new THREE.Vector3(x, y, z));
        }
        return points;
    }

}


export default CurveGeometry;
