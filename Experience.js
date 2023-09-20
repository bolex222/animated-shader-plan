import { Camera } from './Camera'
import { ScrollManager } from './ScrollManager.js'
import { ScreenManager } from './ScreenManager.js'
import { Scene } from './Scene.js'
import { Plan } from './plan/Plan.js'
import * as THREE from 'three'

export class Experience {

  #camera
  #scene
  #sizesManager
  #rafReference
  #rafCallbacks = []
  #killCallbacks = []

  constructor () {
    this.setup()
  }

  setup = () => {
    // scene
    this.#scene = new Scene('#canvas')

    // camera
    this.#camera = new Camera()


    const planScrollManager = new ScrollManager('#scroll_distance')
    const fullScreenVideoScrollManager = new ScrollManager('#full_screen')
    const bodyScrollManager = new ScrollManager('body')

    const plan = new Plan(1, 0.7, this.#camera)

    //RAFs
    this.addRafCallback(plan.animate, planScrollManager, 'plan')
    this.addRafCallback(this.#camera.animate, bodyScrollManager, 'camera')
    this.addRafCallback(plan.animateFullScreen, fullScreenVideoScrollManager, 'fullscreen')

    // resize manager
    this.#sizesManager = new ScreenManager()
    this.#sizesManager.addCallBack(this.#camera.handleScreenResize, 'camera')
    this.#sizesManager.addCallBack(this.#scene.handleScreenResize, 'scene')
    this.#sizesManager.addCallBack(planScrollManager.handleScreenResize, 'scrollManager1')
    this.#sizesManager.addCallBack(bodyScrollManager.handleScreenResize, 'scrollManager2')
    this.#sizesManager.addCallBack(fullScreenVideoScrollManager.handleScreenResize, 'scrollManager3')
    this.#sizesManager.addCallBack(plan.handleScreenResize, 'plan')


    const axesHelper = new THREE.AxesHelper( 5 );
    this.#scene.add( axesHelper );
    this.#scene.add(plan)
  }


  addRafCallback = (callback, scrollManager, id) => {
    this.#rafCallbacks = [...this.#rafCallbacks, { callback, scrollManager, id }]
  }

  addKillCallback = (callback) => {
    this.#killCallbacks = [...this.#killCallbacks, callback]
  }

  removeRafCallback = (id) => {
    this.#rafCallbacks = [...this.#rafCallbacks].filter((callback) => callback.id !== id)
  }

  playAllCallbacks = (num) => {
    this.#rafCallbacks.map(callback => {
      callback.callback(callback.scrollManager, num)
    })
  }

  tick = (num) => {
    this.playAllCallbacks(num)
    this.#scene.render(this.#camera)
    this.#rafReference = requestAnimationFrame(this.tick)
  }


  startExperience = () => {
    this.#rafReference = requestAnimationFrame(this.tick)
  }

  killExperience = () => {
    cancelAnimationFrame(this.#rafReference)
    this.#killCallbacks.map(callback => callback())
  }
}
