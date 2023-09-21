uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
uniform mat4 modelMatrix;
uniform float uDelay;
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

float parabol(float x) {
    x = x * 2. - 1.;
    return pow(cos(Pi * x/ 2.), 2.5);
}

float easeOutSine(float x) {
    return sin((x * Pi) / 2.);
}

float easeInOutCubic(float x) {
    if (x < 0.5) {
       return  4. * x * x * x;
    } else {
       return 1. - pow(-2. * x + 2., 3.) / 2.;
    }
}

float easeInQuart(float x) {
    return x * x * x * x;
}

void main()
{
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    float progress = 1. - uProgress;
    float lerpProgress = 1. - uLerpProgression;
    float lerpProgress2 = 1. - uLerpProgression2;


    // lerp progress for y and x for the z axxis
    float lerpBalanceY = lerpProgress + (easeOutQuad( uv.y ) * (progress - lerpProgress));
    float lerpBalanceX = lerpProgress + (easeOutQuad( 1. - uv.x ) * (progress - lerpProgress));

    modelPosition.z = -uFullScreenDistance;
    float zDistance = uSmallScreenDistance - uFullScreenDistance;

    // effect less z progression so it works and I can work on other effects
//    modelPosition.z += -(zDistance) * (1. - easeInQuart(1. - progress) );
        modelPosition.z += -(zDistance / 2.) * (1. - easeInQuart( 1. -  lerpBalanceY ));
        modelPosition.z += -(zDistance / 2.) * (1. - easeInQuart(1. - lerpBalanceX));

    // lerped z progression
//    modelPosition.z += -(zDistance / 2.) * lerpBalanceY;
//    modelPosition.z += -(zDistance / 2.) * lerpBalanceX;


    // calculate the offset of x axis to make it stick to the right of the screen
    float m = 1. / uSmallScreenSize;
    float offsetX = ( m * ((0.5 - uSmallScreenSize) + (uSmallScreenSize / 2.)) ) * 0.85;


    float a = easeOutSine(lerpProgress);
    float b = easeInOutCubic(lerpProgress);

//    modelPosition.x += offsetX * ( (b - a) * (1. - uv.x) + a );

    float c = lerpProgress + (easeOutQuad( uv.x ) * (lerpProgress - lerpProgress2));
    float d = lerpProgress + (easeOutQuad( uv.y ) * (lerpProgress - lerpProgress2));
    modelPosition.x += (offsetX / 2.) * c;
    modelPosition.x += (offsetX / 2.) * d;




//    modelPosition.x += offsetX * progress * easeOutQuad( progress ) * uv.x;
//    modelPosition.x *= t 1. - uv.x );

    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;

    gl_Position = projectedPosition;
    vUv = uv;
}
