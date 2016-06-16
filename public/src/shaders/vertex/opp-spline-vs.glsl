
#pragma glslify: cnoise3 = require(glsl-noise/classic/3d)

varying vec3 vPosition;

uniform float iThickness;
uniform float iDistortAmount;

// attribute float timeCreation;
uniform float iTimeDelta;

// varying float vInterval;

uniform vec3 iTransform;

void main() {

    vec3 viTransform = iTransform;

    float xNoise = cnoise3(position) * (iDistortAmount/25.0);
    float yNoise = cnoise3(position) * (iDistortAmount/20.0);
    float zNoise = cnoise3(position) * (iDistortAmount/50.0);

    viTransform.x = (viTransform.x);
    viTransform.y = (viTransform.y);
    viTransform.z = (viTransform.z);

    vPosition = vec3(position.x + viTransform.x + xNoise, position.y + viTransform.y + yNoise, position.z + viTransform.z + zNoise);

    gl_Position = projectionMatrix *
                modelViewMatrix *
                vec4(vPosition, 1.0);

}
