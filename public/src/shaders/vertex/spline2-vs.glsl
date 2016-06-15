
#pragma glslify: cnoise3 = require(glsl-noise/classic/3d)

varying vec3 vPosition;
uniform float iThickness;
uniform float iDistortAmount;

void main() {

    float xNoise = cnoise3(position) * (iDistortAmount/25.0);
    float yNoise = cnoise3(position) * (iDistortAmount/20.0);
    float zNoise = cnoise3(position) * (iDistortAmount/50.0);

    vPosition = vec3(position.x + xNoise, position.y + yNoise, position.z + zNoise);

    gl_Position = projectionMatrix *
                modelViewMatrix *
                vec4(vPosition, 1.0);

}
