import * as THREE from 'three'
import vertexShader from './shaders/vertexShader.glsl'
import fragmentShader from './shaders/fragmentShader.glsl'


export class Plan extends THREE.Mesh {

  constructor (width, height) {
    // const material = new THREE.MeshBasicMaterial({
    //   color: 'red',
    //   wireframe: true,
    // })

    const material = new THREE.RawShaderMaterial({
      fragmentShader,
      vertexShader,
    })

    super(
      new THREE.PlaneGeometry(width, height ),
      material
    )
  }

  handleScreenResize = () => {
    const newPlane = new THREE.PlaneGeometry(1, ( window.innerHeight / window.innerWidth ), 16, 16)
    this.geometry.dispose()
    this.geometry = newPlane
  }

  animate = (animationProgression) => {
    this.position.z = (1 - animationProgression) * (-3)
  }

}
