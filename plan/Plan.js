import * as THREE from 'three'
import vertexShader from './shaders/vertexShader.glsl'
import fragmentShader from './shaders/fragmentShader.glsl'
import gui from '../gui.js'
import { calculateAdjacent, calculateHorizontalFov, calculateOpposite, degToRad } from '../Maths.utils.js'

export class Plan extends THREE.Mesh {

  #debug = {
    x: 0,
  }
  #previousValue = 0;
  #previousValue2 = 0;
  #smallSize = 0.4375;
  #fullScreenDistance = 0;
  #SmallScreenDistance = 0;
  #camera = null;

  constructor (width, height, camera) {

    const material = new THREE.RawShaderMaterial({
      fragmentShader,
      vertexShader,
      wireframe: false,
      // alpha: true,
      transparent: true,
      uniforms: {
        uTime: { value: 0 },
        uProgress: { value: 0 },
        uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
        uDelay: { value: 0 },
        uLerpProgression: { value: 0 },
        uSmallScreenDistance: { value: 0 },
        uFullScreenDistance: { value: 0 },
        uSmallScreenSize: { value: 0 },
      }
    })

    super(
      new THREE.PlaneGeometry(width, height ),
      material
    )

    this.#camera = camera

    gui.add(this.material.uniforms.uDelay, 'value', 0, 0.5, 0.001)
    gui.add(this.#debug, 'x', 0, 2, 0.001)
  }

  calculateDistanceFromCamera = (planSize) => {
    return calculateAdjacent(degToRad( this.#camera.horizontalFov / 2 ), planSize / 2);
  }

  calculateSizeBasedOnDistance = (distance) => {
    return calculateOpposite(degToRad( this.#camera.horizontalFov / 2 ), distance);
  }

  handleScreenResize = () => {
    const newPlane = new THREE.PlaneGeometry(1, ( window.innerHeight / window.innerWidth ), 16, 16)
    this.geometry.dispose()
    this.geometry = newPlane
    this.material.uniforms.uResolution.value = new THREE.Vector2(window.innerWidth, window.innerHeight)
    this.#fullScreenDistance = this.calculateDistanceFromCamera( 1 )
    this.#SmallScreenDistance = this.calculateDistanceFromCamera(1 / this.#smallSize)
    this.material.uniforms.uSmallScreenDistance.value = this.#SmallScreenDistance
    this.material.uniforms.uFullScreenDistance.value = this.#fullScreenDistance
    this.material.uniforms.uSmallScreenSize.value = this.#smallSize
  }

  animate = (animationProgression, time) => {
    this.material.uniforms.uTime.value = time
    const localLerp = this.#previousValue + ((  animationProgression - this.#previousValue) * 0.2 )
    const localLerp2 = this.#previousValue2 + ((  animationProgression - this.#previousValue2) * 0.1 )
    this.material.uniforms.uProgress.value = localLerp
    this.material.uniforms.uLerpProgression.value = localLerp2
    this.#previousValue = localLerp
    this.#previousValue2 = localLerp2
  }
}
