uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
uniform mat4 modelMatrix;
uniform float uProgress;
uniform float uDelay;

attribute vec3 position;
attribute vec2 uv;

varying vec2 vUv;

void main()
{
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    float progress = 1. - uProgress;


    // working delay = renormalized (progress - delay) where delay is multoplied by uv.y
    float delayedProgress = clamp(( ( progress - (uv.y * uDelay ) ) * (1. + ((uDelay ) / (1. - uDelay)))), 0., 1.);
    modelPosition.z = -3. * delayedProgress;

    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;

    gl_Position = projectedPosition;
    vUv = uv;
}
