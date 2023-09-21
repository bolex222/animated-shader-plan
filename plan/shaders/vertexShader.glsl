uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
uniform mat4 modelMatrix;


// setup personal uniforms
uniform float uProgress;
uniform float uLerpProgression;
uniform float uLerpProgression2;
uniform float uSmallScreenDistance;
uniform float uFullScreenDistance;
uniform float uSmallScreenSize;

attribute vec3 position;
attribute vec2 uv;

varying vec2 vUv;

const float Pi = 3.1415926535897932384626433832795;

float easeOutQuad(float x) {
    return 1. - (1. - x) * (1. - x);
}

float easeInQuart(float x) {
    return x * x * x * x;
}

void main()
{
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);

    // revers progress so it goes from 1 to 0
    float progress = 1. - uProgress;
    float lerpProgress = 1. - uLerpProgression;
    float lerpProgress2 = 1. - uLerpProgression2;


    // lerp progress for y and x for the z axxis
    float lerpBalanceY = lerpProgress + (easeOutQuad(uv.y) * (progress - lerpProgress));
    float lerpBalanceX = lerpProgress + (easeOutQuad(1. - uv.x) * (progress - lerpProgress));

    // origin position for the z axis
    modelPosition.z = -uFullScreenDistance;
    float zDistance = uSmallScreenDistance - uFullScreenDistance;

    // effect less z progression so it works and I can work on other effects
    modelPosition.z += -(zDistance / 2.) * (1. - easeInQuart(1. -  lerpBalanceY));
    modelPosition.z += -(zDistance / 2.) * (1. - easeInQuart(1. - lerpBalanceX));

    // calculate the offset of x axis to make it stick to the right of the screen
    float m = 1. / uSmallScreenSize;
    float offsetX = (m * ((0.5 - uSmallScreenSize) + (uSmallScreenSize / 2.))) * 0.85;

    // lerp progress for x axis
    float c = lerpProgress + (easeOutQuad(uv.x) * (lerpProgress - lerpProgress2));
    float d = lerpProgress + (easeOutQuad(uv.y) * (lerpProgress - lerpProgress2));

    // move on x axis depending on offset and lerp progress
    modelPosition.x += (offsetX / 2.) * c;
    modelPosition.x += (offsetX / 2.) * d;

    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;

    gl_Position = projectedPosition;
    vUv = uv;
}
