precision highp float;

uniform float uTime;
uniform float uProgress;
uniform vec2 uResolution;
uniform vec4 uVariable;

varying vec2 vUv;

float sdBox( in vec2 p, in vec2 b )
{
    vec2 d = abs(p)-b;
    return length(max(d,0.0)) + min(max(d.x,d.y),0.0);
}

void main()
{

    vec2 vuCoord = vUv.xy;
    vec2 val = (2.0 * gl_FragCoord.xy) / uResolution.xy;

    float ratio = uResolution.x / uResolution.y;

    float radius = 0.3 * (1. - uProgress );

    float newRatio = (ratio - radius) / (1. - radius);

    vec2 p = (vUv * vec2(ratio * 2., 2.) - vec2(ratio, 1.)) /vec2((ratio, 1.));

    float d = sdBox( p, vec2(newRatio *(1. - radius), 1. - radius));

    gl_FragColor = vec4(vec3(1., 0., 0.),1. - step(radius, d));
//    gl_FragColor = vec4(vec3(1., 1. - step(radius, d) , 0.),1.);
}

//
//
//    vec2 res = vec2(1440., 900.);
//    //    float rounded = roundedBoxSDF(renormalized, vec2(0.5),- 0.4999999 * uProgress);
////    float rounded = roundedBoxSDF(gl_FragCoord.xy / 2., gl_FragCoord.xy / 2., uProgress * 30.);
//    float rounded = sdRoundBox(vUv.xy / 2., vUv.xy / 4. , vec4(0.5, 0.5, 0.5, 0.5));
//    float steped = step(0.5, rounded);
//    vec3 color = vec3(steped);
//    float d = 1.;
//
//
//    gl_FragColor = vec4(color, 1.);
//}
