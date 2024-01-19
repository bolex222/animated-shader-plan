precision highp float;

uniform float uTime;
uniform float uProgress;
uniform vec2 uResolution;
uniform sampler2D uVideoTexture;

varying vec2 vUv;

#define VIDX 1280.
#define VIDY 720.

float sdBox(in vec2 p, in vec2 b)
{
    vec2 d = abs(p)-b;
    return length(max(d, 0.0)) + min(max(d.x, d.y), 0.0);
}

void main()
{

    float vidRatio = VIDX / VIDY;


    // plan ratio
    float ratio = uResolution.x / uResolution.y;


    vec2 videoPosition = vUv;
    if (vidRatio < ratio) {
        float yr = ratio / vidRatio;
        videoPosition.x = vUv.x;
        videoPosition.y = vUv.y / yr + ((1. - (1. / yr)) / 2.)  ;
    } else {
        float xr =  vidRatio / ratio;
        videoPosition.y = vUv.y;
        videoPosition.x = vUv.x / xr + ((1. - (1. / xr)) / 2.);
    }

    vec4 texture = texture2D(uVideoTexture, videoPosition);

    // radius size
    float radius = 0.2 * (1. - uProgress);
    // new calculated ratio to make of the recatngle on which the sdf is calculated
    float newRatio = (ratio - radius) / (1. - radius);
    // new position of the pixel
    vec2 p = (vUv * vec2(ratio * 2., 2.) - vec2(ratio, 1.)) /vec2((ratio, 1.));
    // calculate the sdf
    float d = sdBox(p, vec2(newRatio *(1. - radius), 1. - radius));
    // alpha calculated on the sdf and the radius

    gl_FragColor = vec4(vec3(texture.r, texture.g, texture.b), (1. - step(radius, d)));
}
