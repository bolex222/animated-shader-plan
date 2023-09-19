export const calculateHorizontalFov = (verticalFov, screenRatio) => 2 * Math.atan( Math.tan( verticalFov * Math.PI / 180 / 2 ) * screenRatio ) * 180 / Math.PI;

export const degToRad = (deg) => ( Math.PI / 180 ) * deg;

export const calculateAdjacent = (angle, opposite) => {
  return opposite / Math.tan(angle);
}

export const calculateOpposite = (angle, adjacent) => {
  return adjacent * Math.tan(angle);
}

export const clamp = (value, min, max) => {
  return Math.min(Math.max(value, min), max);
}
