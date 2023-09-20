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
    return clamp( (window.scrollY - this.#topDistance) / ( this.#scrollDistance - window.innerHeight ), 0, 1)
  }
  get fullScrollProgression () {
    return clamp( (window.scrollY - ( this.#topDistance - innerHeight )) / this.#scrollDistance , 0, 1)
  }

  get fullScrollDistance () {
    return this.#scrollDistance
  }

  get fullStartPoint () {
    return ( this.#topDistance - innerHeight )
  }

  handleScreenResize = () => {
    const domElementBoundingClient = this.#domElement.getBoundingClientRect()
    this.#scrollDistance = domElementBoundingClient.height
    this.#topDistance = domElementBoundingClient.top + window.scrollY
  }
}
