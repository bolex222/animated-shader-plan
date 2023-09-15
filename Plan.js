import * as THREE from 'three'


export class Plan extends THREE.Mesh {

  constructor (width, height) {
    const material = new THREE.MeshBasicMaterial({
      color: 'red',
      wireframe: true,
    })

    super(
      new THREE.PlaneGeometry(width, height ),
      material
    )
  }

  handleScreenResize = () => {
    const newPlane = new THREE.PlaneGeometry(1, window.innerHeight / window.innerWidth, 16, 16)
    this.geometry.dispose()
    this.geometry = newPlane
  }

  animate = (animationProgression) => {
    this.position.z = (1 - animationProgression) * (-3)
  }

}
