export const calculateHorizontalFov = (verticalFov, screenRatio) => 2 * Math.atan( Math.tan( verticalFov * Math.PI / 180 / 2 ) * screenRatio ) * 180 / Math.PI;
export const degToRad = (deg) => ( Math.PI / 180 ) * deg;
export const calculateAdjacent = (angle, opposite) => {
  return opposite / Math.tan(angle);
}
