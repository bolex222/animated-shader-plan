import { WebGLRenderer, Scene as ThreeScene } from 'three'

export class Scene {

  #scene
  #renderer

  constructor (querySelector) {
    this.setUp(querySelector)
  }

  setUp = (querySelector) => {
    const canvas = document.querySelector(querySelector);
    if (!canvas) {throw new Error('Scene: canvas not found')}
    this.#scene = new ThreeScene();
    this.#renderer = new WebGLRenderer({
      canvas,
      alpha: true,
      clearColor: 0xff0000,
      clearAlpha: 0,
    });
  }

  handleScreenResize = () => {
    this.#renderer.setSize( window.innerWidth, window.innerHeight )
  }

  render = (camera) => {
    this.#renderer.render(this.#scene, camera)
  }

  add = (object) => {
    this.#scene.add(object)
  }
}
