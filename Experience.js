import { Camera } from './Camera'
import { ScrollManager } from './ScrollManager.js'
import { ScreenManager } from './ScreenManager.js'
import { Scene } from './Scene.js'
import { Plan } from './plan/Plan.js'
import { VideoManager } from './VideoManager.js'

export class Experience {

  #camera
  #scene
  #rafReference
  #rafCallbacks = []
  #killCallbacks = []
  #video

  constructor () {
    this.setup()
  }

  setup = () => {
    // scene
    this.#scene = new Scene('#canvas')

    // camera
    this.#camera = new Camera()

    // set up scroll managers
    const planScrollManager = new ScrollManager('#scroll_distance')
    const fullScreenVideoScrollManager = new ScrollManager('#full_screen')
    const bodyScrollManager = new ScrollManager('body')

    //video
    this.#video = new VideoManager('/video.mp4', fullScreenVideoScrollManager);

    // set up plan
    const plan = new Plan(1, 0.7, this.#camera, this.#video)

    //RAFs
    this.addRafCallback(plan.animate, planScrollManager, 'plan')
    this.addRafCallback(this.#camera.animate, bodyScrollManager, 'camera')
    this.addRafCallback(plan.animateFullScreen, fullScreenVideoScrollManager, 'fullscreen')
    this.addRafCallback(this.#video.tick, planScrollManager, 'video')

    // resize manager
    const screenManager = new ScreenManager()
    screenManager.addCallBack(this.#camera.handleScreenResize, 'camera')
    screenManager.addCallBack(this.#scene.handleScreenResize, 'scene')
    screenManager.addCallBack(planScrollManager.handleScreenResize, 'scrollManager1')
    screenManager.addCallBack(bodyScrollManager.handleScreenResize, 'scrollManager2')
    screenManager.addCallBack(fullScreenVideoScrollManager.handleScreenResize, 'scrollManager3')
    screenManager.addCallBack(plan.handleScreenResize, 'plan')

    // add plan to scene
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
