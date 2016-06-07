#pragma glslify: snoise2 = require(glsl-noise/simplex/2d)
#pragma glslify: snoise3 = require(glsl-noise/simplex/3d)

varying vec3 vPosition;

uniform vec3 Resolution;  // viewport resolution (in pixels)
uniform float iTimeDelta; // render time (in seconds)
uniform float iThickness;

uniform vec3 iColor1;
uniform vec3 iColor2;

void main() {

    float r = mix(iColor1.r + snoise2(vPosition.xy)/8.0, iColor2.r + snoise2(vPosition.xy)/8.0, 0.9);
    float g = mix(iColor1.g + snoise2(vPosition.xz)/5.0, iColor2.g + snoise2(vPosition.xz)/5.0, 1.0);
    float b = mix(iColor1.b + snoise2(vPosition.yz)/10.0, iColor2.b + snoise2(vPosition.yz)/8.0, 0.8);

    float a = 1.0;

    gl_FragColor = vec4(r,
                        g,
                        b,
                        a);
}
