attribute vec3 center;
attribute float thickness;

varying vec3 vCenter;
varying vec3 vPosition;

void main() {

    vCenter = center;
    vPosition = position;

    gl_Position = projectionMatrix *
                modelViewMatrix *
                vec4(position, 1.0);
}
