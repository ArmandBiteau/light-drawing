
#pragma glslify: cnoise3 = require(glsl-noise/classic/3d)

varying vec3 vPosition;

uniform float iThickness;
uniform float iDistortAmount;

attribute float timeCreation;
uniform float iTimeDelta;

varying float vInterval;

uniform vec3 iTransform;

void main() {

    vec3 viTransform = iTransform;

    vInterval = iTimeDelta - timeCreation;

    float xNoise = cnoise3(position) * (iDistortAmount/25.0);
    float yNoise = cnoise3(position) * (iDistortAmount/20.0);
    float zNoise = cnoise3(position) * (iDistortAmount/50.0);

    viTransform.x = (viTransform.x) * min(1.0, 0.1+(vInterval)/10.0);
    viTransform.y = (viTransform.y) * min(1.0, 0.1+(vInterval)/10.0);
    viTransform.z = (viTransform.z) * min(1.0, 0.1+(vInterval)/10.0);

    vPosition = vec3(position.x + viTransform.x + xNoise, position.y + viTransform.y + yNoise, position.z + viTransform.z + zNoise);

    gl_Position = projectionMatrix *
                modelViewMatrix *
                vec4(vPosition, 1.0);

}
