import { WebGLRenderer, Scene as ThreeScene } from 'three'
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js'
import renderer from 'three/addons/renderers/common/Renderer.js'
import * as THREE from 'three/addons/shaders/FXAAShader.js'
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js'

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
      clearColor: 0x000000,
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
