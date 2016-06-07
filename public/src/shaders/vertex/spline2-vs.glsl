
#pragma glslify: cnoise3 = require(glsl-noise/classic/3d)

varying vec3 vPosition;
uniform float iThickness;

void main() {

    vec3 noise = position + ( cnoise3(position) * iThickness*3.0);

    float zNoise = cnoise3(position) * iThickness*6.0;

    vPosition = vec3(position.x - zNoise, noise.y, position.z + zNoise);

    gl_Position = projectionMatrix *
                modelViewMatrix *
                vec4(vPosition, 1.0);

}
