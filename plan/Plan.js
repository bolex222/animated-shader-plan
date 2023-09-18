import * as THREE from 'three'
import vertexShader from './shaders/vertexShader.glsl'
import fragmentShader from './shaders/fragmentShader.glsl'
import gui from '../gui.js'
import { clamp } from '../Maths.utils.js'


export class Plan extends THREE.Mesh {

  #debug = {
    x: 0,
  }
  constructor (width, height) {

    const material = new THREE.RawShaderMaterial({
      fragmentShader,
      vertexShader,
      alpha: true,
      uniforms: {
        uTime: { value: 0 },
        uProgress: { value: 0 },
        uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
        uDelay: { value: 0 },
      }
    })

    super(
      new THREE.PlaneGeometry(width, height ),
      material
    )

    gui.add(this.material.uniforms.uDelay, 'value', 0, 0.5, 0.001)
    gui.add(this.#debug, 'x', 0, 1, 0.001)
  }

  handleScreenResize = () => {
    const newPlane = new THREE.PlaneGeometry(1, ( window.innerHeight / window.innerWidth ), 16, 16)
    this.geometry.dispose()
    this.geometry = newPlane
    this.material.uniforms.uResolution.value = new THREE.Vector2(window.innerWidth, window.innerHeight)
  }

  animate = (animationProgression, time) => {
    this.material.uniforms.uTime.value = time
    this.material.uniforms.uProgress.value = animationProgression
  }
}
