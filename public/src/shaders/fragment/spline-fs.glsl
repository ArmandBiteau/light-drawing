varying vec3 vNormal;
varying vec3 vCenter;
varying vec3 vPosition;

void main() {

    float alpha = 1.0 - distance(vPosition, vCenter)/0.2;

    gl_FragColor = vec4(1.0,
                        1.0,
                        1.0,
                        alpha);
}
