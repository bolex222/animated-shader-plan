import * as THREE from 'three'
import vertexShader from './shaders/vertexShader.glsl'
import fragmentShader from './shaders/fragmentShader.glsl'
import {debug} from '../gui.js'

import { calculateAdjacent, calculateHorizontalFov, calculateOpposite, degToRad, clamp} from '../Maths.utils.js'

export class Plan extends THREE.Group {

  #previousValue = 0;
  #previousValue2 = 0;
  #smallSize = 0.4375;
  #fullScreenDistance = 0;
  #SmallScreenDistance = 0;
  #camera = null;
  planMesh

  constructor (width, height, camera) {

    super()
    const material = new THREE.RawShaderMaterial({
      fragmentShader,
      vertexShader,
      wireframe: false,
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
    const planeGeometry = new THREE.PlaneGeometry(1, ( window.innerHeight / window.innerWidth ) );

    this.planMesh = new THREE.Mesh( planeGeometry, material );
    this.add( this.planMesh );

    var geometry2 = new THREE.WireframeGeometry( planeGeometry ); // or EdgesGeometry
    var material2 = new THREE.LineBasicMaterial( { color: 0x000000, transparent: true } );
    var wireframe = new THREE.LineSegments( geometry2, material2 );

    debug.callBack.push((value) => {
      this.planMesh.material.wireframe = value
      if (value) {
        this.planMesh.add( wireframe );
      } else {
        this.planMesh.remove( wireframe );
      }
    })

    this.#camera = camera

  }

  calculateDistanceFromCamera = (planSize) => {
    return calculateAdjacent(degToRad( this.#camera.horizontalFov / 2 ), planSize / 2);
  }

  handleScreenResize = () => {
    const newPlane = new THREE.PlaneGeometry(1, ( window.innerHeight / window.innerWidth ), 16, 16)
    this.planMesh.geometry.dispose()
    this.planMesh.geometry = newPlane
    this.planMesh.material.uniforms.uResolution.value = new THREE.Vector2(window.innerWidth, window.innerHeight)
    this.#fullScreenDistance = this.calculateDistanceFromCamera( 1 )
    this.#SmallScreenDistance = this.calculateDistanceFromCamera(1 / this.#smallSize)
    this.planMesh.material.uniforms.uSmallScreenDistance.value = this.#SmallScreenDistance
    this.planMesh.material.uniforms.uFullScreenDistance.value = this.#fullScreenDistance
    this.planMesh.material.uniforms.uSmallScreenSize.value = this.#smallSize
    this.planMesh.position.y = - 1 * (innerHeight / innerWidth)
  }


  animate = (scrollManager, time) => {
    const scrollProgression = scrollManager.scrollProgression
    this.planMesh.material.uniforms.uTime.value = time
    const localLerp =  this.#previousValue + ((  scrollProgression - this.#previousValue) * 0.2 )
    const localLerp2 =  this.#previousValue2 + ((  scrollProgression - this.#previousValue2)* 0.1 )

    this.planMesh.material.uniforms.uProgress.value = localLerp.toFixed(6)
    this.planMesh.material.uniforms.uLerpProgression.value = localLerp2.toFixed(6)
    // const distZ = this.#SmallScreenDistance - this.#fullScreenDistance
    const y = ( (1 - scrollProgression) * ( 1.5 * (innerHeight / innerWidth)) ) - 1 * (innerHeight / innerWidth)
    this.planMesh.position.y = y

    this.#previousValue = localLerp
    this.#previousValue2 = localLerp2
  }

  animateFullScreen = (scrollManager, time) => {
    const progression = scrollManager.fullScrollProgression
    const scrollDistance = scrollManager.fullScrollDistance
    this.position.y = - progression * (( scrollDistance / innerHeight ) * (innerHeight / innerWidth));

  }
}
