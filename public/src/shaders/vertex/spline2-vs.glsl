
#pragma glslify: cnoise3 = require(glsl-noise/classic/3d)

varying vec3 vPosition;
uniform float iThickness;
uniform float iDistortAmount;

void main() {

    vec3 vec3noise = position + ( cnoise3(position) * (iDistortAmount/30.0));

    float noise = cnoise3(position) * (2.0*iDistortAmount/30.0);

    vPosition = vec3(position.x - noise, vec3noise.y, position.z + noise);

    gl_Position = projectionMatrix *
                modelViewMatrix *
                vec4(vPosition, 1.0);

}
