
#pragma glslify: cnoise3 = require(glsl-noise/classic/3d)

varying vec3 vPosition;
uniform float iThickness;

void main() {

    vec3 vec3noise = position + ( cnoise3(position) * iThickness*5.0)/5.0;

    float noise = cnoise3(position) * iThickness*5.0;

    vPosition = vec3(position.x - noise, vec3noise.y, position.z + noise);

    gl_Position = projectionMatrix *
                modelViewMatrix *
                vec4(vPosition, 1.0);

}
