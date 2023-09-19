uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
uniform mat4 modelMatrix;
uniform float uProgress;
uniform float uDelay;
uniform float uLerpProgression;
uniform float uSmallScreenDistance;
uniform float uFullScreenDistance;
uniform float uSmallScreenSize;

attribute vec3 position;
attribute vec2 uv;

varying vec2 vUv;

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
    modelPosition.z = -uFullScreenDistance;
    float zDistance = uSmallScreenDistance - uFullScreenDistance;

    modelPosition.z += -(zDistance / 2.) * lerpBalanceY;
    modelPosition.z += -(zDistance / 2.) * lerpBalanceX;

    float m = 1. / uSmallScreenSize;
    float offsetX = m * ((0.5 - uSmallScreenSize) + (uSmallScreenSize / 2.));
    modelPosition.x += progress * offsetX;

    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;

    gl_Position = projectedPosition;
    vUv = uv;
}
