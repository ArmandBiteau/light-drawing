#pragma glslify: snoise2 = require(glsl-noise/simplex/2d)
#pragma glslify: snoise3 = require(glsl-noise/simplex/3d)

varying vec3 vPosition;

uniform vec3 Resolution;  // viewport resolution (in pixels)
uniform float iTimeDelta; // render time (in seconds)
uniform float iThickness;

void main() {

    float r = 98.0/255.0 + snoise2(vPosition.xy)/8.0;
    float g = 56.0/255.0 + snoise2(vPosition.xz)/5.0;
    float b = 255.0/255.0 + snoise2(vPosition.yz)/10.0;
    float a = 1.0;

    gl_FragColor = vec4(r,
                        g,
                        b,
                        a);
}
