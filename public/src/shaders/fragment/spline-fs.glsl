#pragma glslify: snoise2 = require(glsl-noise/simplex/2d)

uniform vec3 Resolution;
uniform float iThickness;

uniform vec3 iColor1;

varying vec3 vPosition;

varying float vInterval;

void main() {

    float r = iColor1.r + snoise2(vPosition.xy)/16.0;
    float g = iColor1.g + snoise2(vPosition.xz)/10.0;
    float b = iColor1.b + snoise2(vPosition.yz)/20.0;

    float a = min(1.0, pow(vInterval/15.0, 2.0));
    // float a = 1.0;

    gl_FragColor = vec4(r,
                        g,
                        b,
                        a);
}
