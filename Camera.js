import { PerspectiveCamera } from 'three'
import { calculateAdjacent, calculateHorizontalFov, degToRad } from './Maths.utils.js'
import gui from './gui.js'

export class Camera extends PerspectiveCamera {

  #__verticalFov
  #screenHeightIn3d = 0;
  #totalHeight
  debug = {
    r: 0,
  }

  constructor (verticalFov = 50) {
    super(verticalFov, window.innerWidth / window.innerHeight, 0.001, 1000);
    this.#__verticalFov = verticalFov
    // this.position.y = 2;
    // this.position.z = 2;
    // this.position.x = 2;
    //
    // this.lookAt(0, 0, 0);

    // gui.add(this.debug, 'r', 0, 0.5, 0.001)

  }

  get verticalFov () {
    return this.#__verticalFov
  }

  get horizontalFov () {
    return calculateHorizontalFov(this.#__verticalFov, window.innerWidth / window.innerHeight)
  }

  animate = (progression, timeSet) => {
    this.position.y = - (scrollY / innerHeight) * (innerHeight / innerWidth)
  }

  handleScreenResize = () => {
    this.aspect = window.innerWidth / window.innerHeight;
    this.#screenHeightIn3d = (window.innerHeight / window.innerHeight)
    this.#totalHeight = window.document.body.clientHeight
    this.updateProjectionMatrix();
  }
}
