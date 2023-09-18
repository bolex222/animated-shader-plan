uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
uniform mat4 modelMatrix;
uniform float uProgress;
uniform float uDelay;
uniform float uLerpProgression;

attribute vec3 position;
attribute vec2 uv;

varying vec2 vUv;

#define PI 3.1415926535897932384626433832795

float easeInExpo(float x) {
    return x == 0. ? 0. : pow(2., 10. * x - 10.);
}

float easeInSine(float x) {
    return 1. - cos((x * PI) / 2.);
}

float easeOutSine(float x) {
    return sin((x * PI) / 2.);
}


void main()
{
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    float progress = 1. - uProgress;
    float lerpProgress = 1. - uLerpProgression;


    // working delay = renormalized (progress - delay) where delay is multoplied by uv.y
//    float delayedProgress = clamp(( ( progress - (uv.y * uDelay ) ) * (1. + ((uDelay ) / (1. - uDelay)))), 0., 1.);
//    modelPosition.z = -3. * delayedProgress ;

    float lerpBalance = lerpProgress + (easeOutSine( uv.y ) * (progress - lerpProgress));
    modelPosition.z = -3. * lerpBalance;
//    modelPosition.z -= ( z - modelPosition.z ) * 0.10;


    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;

    gl_Position = projectedPosition;
    vUv = uv;
}
