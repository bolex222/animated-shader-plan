precision highp float;

uniform float uTime;
uniform float uProgress;
uniform vec2 uResolution;

varying vec2 vUv;

float sdBox( in vec2 p, in vec2 b )
{
    vec2 d = abs(p)-b;
    return length(max(d,0.0)) + min(max(d.x,d.y),0.0);
}

void main()
{
    // plan ratio
    float ratio = uResolution.x / uResolution.y;
    // radius size
    float radius = 0.2 * (1. - uProgress );
    // new calculated ratio to make of the recatngle on which the sdf is calculated
    float newRatio = (ratio - radius) / (1. - radius);
    // new position of the pixel
    vec2 p = (vUv * vec2(ratio * 2., 2.) - vec2(ratio, 1.)) /vec2((ratio, 1.));
    // calculate the sdf
    float d = sdBox( p, vec2(newRatio *(1. - radius), 1. - radius));
    // alpha calculated on the sdf and the radius

    gl_FragColor = vec4(vec3(vUv.x, vUv.y, 0.8),1. - step(radius, d));
}
