precision highp float;

varying vec2 vUv;

void main()
{

    vec3 color = vec3(1.0, 0.,0.);
    float d = 1.;


    gl_FragColor = vec4(color, d);
}
