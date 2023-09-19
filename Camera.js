import { PerspectiveCamera } from 'three'
import { calculateAdjacent, calculateHorizontalFov, degToRad } from './Maths.utils.js'

export class Camera extends PerspectiveCamera {

  #__verticalFov

  constructor (verticalFov = 50) {
    super(verticalFov, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.#__verticalFov = verticalFov
    // this.position.y = 2;
    // this.position.z = 2;
    // this.position.x = 2;
    // this.lookAt(0, 0, 0);
  }

  get verticalFov () {
    return this.#__verticalFov
  }

  get horizontalFov () {
    return calculateHorizontalFov(this.#__verticalFov, window.innerWidth / window.innerHeight)
  }

  handleScreenResize = () => {
    this.aspect = window.innerWidth / window.innerHeight;
    this.updateProjectionMatrix();
  }
}
