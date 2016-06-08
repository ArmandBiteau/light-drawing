#pragma glslify: snoise2 = require(glsl-noise/simplex/2d)
#pragma glslify: snoise3 = require(glsl-noise/simplex/3d)

varying vec3 vPosition;

uniform vec3 Resolution;  // viewport resolution (in pixels)
uniform float iTimeDelta; // render time (in seconds)
uniform float iThickness;

uniform vec3 iColor1;

void main() {

    float r = iColor1.r + snoise2(vPosition.xy)/8.0;
    float g = iColor1.g + snoise2(vPosition.xz)/5.0;
    float b = iColor1.b + snoise2(vPosition.yz)/10.0;

    float a = 1.0;

    gl_FragColor = vec4(r,
                        g,
                        b,
                        a);
}
