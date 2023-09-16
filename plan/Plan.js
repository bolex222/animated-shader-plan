import * as THREE from 'three'
import vertexShader from './shaders/vertexShader.glsl'
import fragmentShader from './shaders/fragmentShader.glsl'
import gui from '../gui.js'


export class Plan extends THREE.Mesh {

  constructor (width, height) {
    // const material = new THREE.MeshBasicMaterial({
    //   color: 'red',
    //   wireframe: true,
    // })

    const material = new THREE.RawShaderMaterial({
      fragmentShader,
      vertexShader,
      alpha: true,
      uniforms: {
        uTime: { value: 0 },
        uProgress: { value: 0 },
        uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
        uVariable : { value: new THREE.Vector4(0.5, 0.5, 0.5, 0.5)}
      }

    })

    super(
      new THREE.PlaneGeometry(width, height ),
      material
    )
    // gui.add(material.uniforms.uVariable.value, 'x', -1, 1).name('uVariable x')
    // gui.add(material.uniforms.uVariable.value, 'y', -1, 1).name('uVariable y')
    // gui.add(material.uniforms.uVariable.value, 'z', -1, 1).name('uVariable z')
    // gui.add(material.uniforms.uVariable.value, 'w', -1, 1).name('uVariable w')
  }

  handleScreenResize = () => {
    const newPlane = new THREE.PlaneGeometry(1, ( window.innerHeight / window.innerWidth ), 16, 16)
    this.geometry.dispose()
    this.geometry = newPlane
    this.material.uniforms.uResolution.value = new THREE.Vector2(window.innerWidth, window.innerHeight)
  }

  animate = (animationProgression, time) => {
    this.position.z = (1 - animationProgression) * (-3)
    this.rotation.x = ( (1 - animationProgression) / 2 ) * (-Math.PI / 2)
    this.material.uniforms.uTime.value = time
    this.material.uniforms.uProgress.value = animationProgression
    console.log(animationProgression)
  }

}
