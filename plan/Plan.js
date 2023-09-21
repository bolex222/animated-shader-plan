import * as THREE from 'three'
import vertexShader from './shaders/vertexShader.glsl'
import fragmentShader from './shaders/fragmentShader.glsl'
import { calculateAdjacent, calculateHorizontalFov, calculateOpposite, degToRad, clamp} from '../Maths.utils.js'

const PLAN_PROPORTION = 0.4375;

export class Plan extends THREE.Group {

  #previousValue = 0;
  #previousValue2 = 0;
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
        uProgress: { value: 0 },
        uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
        uLerpProgression2: { value: 0 },
        uLerpProgression: { value: 0 },
        uSmallScreenDistance: { value: 0 },
        uFullScreenDistance: { value: 0 },
        uSmallScreenSize: { value: 0 },
      }
    })

    const planeGeometry = new THREE.PlaneGeometry(1, ( window.innerHeight / window.innerWidth ) );

    this.planMesh = new THREE.Mesh( planeGeometry, material );
    this.add( this.planMesh );
    this.planMesh.frustumCulled = false;

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
    this.planMesh.material.uniforms.uSmallScreenDistance.value = this.calculateDistanceFromCamera(1 / PLAN_PROPORTION)
    this.planMesh.material.uniforms.uFullScreenDistance.value = this.calculateDistanceFromCamera( 1 )
    this.planMesh.material.uniforms.uSmallScreenSize.value = PLAN_PROPORTION
    this.planMesh.position.y = - 1 * (innerHeight / innerWidth)
  }


  animate = (scrollManager, time) => {
    const scrollProgression = scrollManager.scrollProgression
    const localLerp =  this.#previousValue + ((  scrollProgression - this.#previousValue) * 0.2 )
    const localLerp2 =  this.#previousValue2 + ((  scrollProgression - this.#previousValue2)* 0.1 )

    this.planMesh.material.uniforms.uProgress.value = scrollProgression
    this.planMesh.material.uniforms.uLerpProgression2.value = localLerp2.toFixed(6)
    this.planMesh.material.uniforms.uLerpProgression.value = localLerp.toFixed(6)

    // don't remove de time 1 at the end of the line (here to remember me that it can change depending on the section height)
    this.planMesh.position.y =((1 - scrollProgression) * ( 1.5 * (innerHeight / innerWidth)) ) - 1 * (innerHeight / innerWidth)

    this.#previousValue = localLerp
    this.#previousValue2 = localLerp2
  }

  animateFullScreen = (scrollManager, time) => {
    const progression = scrollManager.fullScrollProgression
    const scrollDistance = scrollManager.fullScrollDistance
    this.position.y = - progression * (( scrollDistance / innerHeight ) * (innerHeight / innerWidth));

  }
}
