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

float easeOutQuad(float x) {
    return 1. - (1. - x) * (1. - x);
}

void main()
{
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    float progress = 1. - uProgress;
    float lerpProgress = 1. - uLerpProgression;


    // working delay = renormalized (progress - delay) where delay is multoplied by uv.y
//    float delayedProgress = clamp(( ( progress - (uv.y * uDelay ) ) * (1. + ((uDelay ) / (1. - uDelay)))), 0., 1.);
//    modelPosition.z = -3. * delayedProgress ;

    float lerpBalanceY = lerpProgress + (easeOutQuad( uv.y ) * (progress - lerpProgress));
    float lerpBalanceX = lerpProgress + (easeOutQuad( 1. - uv.x ) * (progress - lerpProgress));

    modelPosition.z = -1.5 * lerpBalanceY;
    modelPosition.z += -1.5 * lerpBalanceX;

    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;

    gl_Position = projectedPosition;
    vUv = uv;
}
