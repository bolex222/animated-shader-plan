import * as THREE from 'three'
import vertexShader from './shaders/vertexShader.glsl'
import fragmentShader from './shaders/fragmentShader.glsl'
import gui from '../gui.js'
import { clamp } from '../Maths.utils.js'


export class Plan extends THREE.Mesh {

  #debug = {
    x: 0,
  }
  #previousValue = 0;
  #previousValue2 = 0;
  constructor (width, height) {

    const material = new THREE.RawShaderMaterial({
      fragmentShader,
      vertexShader,
      alpha: true,
      transparent: true,
      uniforms: {
        uTime: { value: 0 },
        uProgress: { value: 0 },
        uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
        uDelay: { value: 0 },
        uLerpProgression: { value: 0 },
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
    // this.material.uniforms.uProgress.value = animationProgression
    const localLerp = this.#previousValue + ((  animationProgression - this.#previousValue) * 0.2 )
    const localLerp2 = this.#previousValue2 + ((  animationProgression - this.#previousValue2) * 0.1 )
    this.material.uniforms.uProgress.value = localLerp
    this.material.uniforms.uLerpProgression.value = localLerp2
    // console.log(animationProgression, localLerp)
    this.#previousValue = localLerp
    this.#previousValue2 = localLerp2

    console.log(localLerp+ ( (animationProgression - localLerp) * this.#debug.x ))

  }
}
