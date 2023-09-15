import { PerspectiveCamera } from 'three'
import { calculateAdjacent, calculateHorizontalFov, degToRad } from './Maths.utils.js'

export class Camera extends PerspectiveCamera {

  #__verticalFov

  constructor (verticalFov = 50) {
    super(verticalFov, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.#__verticalFov = verticalFov
  }

  fitScreen = () => {
    const horizontalFov = calculateHorizontalFov(this.#__verticalFov, window.innerWidth / window.innerHeight)
    this.position.z = calculateAdjacent(degToRad( horizontalFov / 2 ), 0.5)
  }

  handleScreenResize = () => {
    this.aspect = window.innerWidth / window.innerHeight;
    this.updateProjectionMatrix();
    this.fitScreen()
  }
}
