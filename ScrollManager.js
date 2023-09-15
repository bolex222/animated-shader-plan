import { clamp } from './Maths.utils.js'

export class ScrollManager {

  #domElement
  #scrollDistance = 0
  #topDistance = 0

  constructor (querySelector) {
    this.#domElement = document.querySelector(querySelector)
    if (!this.#domElement) {throw new Error('ScrollManager: domElement not found')}
  }

  get scrollProgression () {
    return clamp( (window.scrollY - this.#topDistance) / this.#scrollDistance, 0, 1)
  }

  handleScreenResize = () => {
    const domElementBoundingClient = this.#domElement.getBoundingClientRect()
    this.#scrollDistance = domElementBoundingClient.height - window.innerHeight
    this.#topDistance = domElementBoundingClient.top + window.scrollY
  }
}
