import { Camera } from './Camera'
import { ScrollManager } from './ScrollManager.js'
import { ScreenManager } from './ScreenManager.js'
import { Scene } from './Scene.js'
import { Plan } from './plan/Plan.js'
import * as THREE from 'three'

export class Experience {

  #camera
  #plan
  #scene
  #sizesManager
  #scrollManager

  #rafReference
  #rafCallbacks = []

  constructor () {
    this.setup()
  }

  setup = () => {
    this.#sizesManager = new ScreenManager()
    this.#scene = new Scene('#canvas')
    this.#sizesManager.addCallBack(this.#scene.handleScreenResize, 'scene')
    this.#camera = new Camera()
    this.#sizesManager.addCallBack(this.#camera.handleScreenResize, 'camera')
    this.#scrollManager = new ScrollManager('#scroll_distance')
    this.#sizesManager.addCallBack(this.#scrollManager.handleScreenResize, 'scrollManager1')
    this.#plan = new Plan(1, 0.7)
    this.#sizesManager.addCallBack(this.#plan.handleScreenResize, 'plan')
    this.#scene.add(this.#plan)
    this.addRafCallback(this.#plan.animate, 'plan')


    const axesHelper = new THREE.AxesHelper( 5 );
    this.#scene.add( axesHelper );
  }


  addRafCallback = (callback, id) => {
    this.#rafCallbacks = [...this.#rafCallbacks, { callback, id }]
  }

  removeRafCallback = (id) => {
    this.#rafCallbacks = [...this.#rafCallbacks].filter((callback) => callback.id !== id)
  }

  playAllCallbacks = (animationProgression) => {
    this.#rafCallbacks.map(callback => callback.callback(animationProgression))
  }

  tick = (num) => {

    const animationProgression = this.#scrollManager.scrollProgression
    this.playAllCallbacks(animationProgression)
    this.#scene.render(this.#camera)
    this.#rafReference = requestAnimationFrame(this.tick)
  }


  startExperience = () => {
    this.#rafReference = requestAnimationFrame(this.tick)
  }

  killExperience = () => {
    cancelAnimationFrame(this.#rafReference)
    this.#sizesManager.killScreenManager()
  }

}
