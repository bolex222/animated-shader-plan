import './style.css'
import * as THREE from 'three';
import { calculateAdjacent, calculateHorizontalFov, degToRad } from './Maths.utils.js'

document.querySelector('#app').innerHTML = `
  <div>
    <canvas id="canvas"></canvas>
    <div id="scroll_distance" class="scrollDistance"></div>
  </div>
`

// SETTING UP THE SCENE
const canvas = document.querySelector('#canvas');
const scrollDistance = document.querySelector('#scroll_distance');

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
let screenRatio = window.innerWidth / window.innerHeight;

const renderer = new THREE.WebGLRenderer({
  canvas,
  alpha: true,
});
renderer.setSize( window.innerWidth, window.innerHeight );


const planSizes = {
  width: 2,
  height: 0.5,
}
const geometry = new THREE.PlaneGeometry( planSizes.width, planSizes.height);
const material = new THREE.MeshBasicMaterial( { color: 'red' } );
const plan = new THREE.Mesh( geometry, material );
scene.add( plan );


/**
 * function that calculate the distance between the camera and the plane to make the plan fit the screen vertically
 * @param {number} verticalFov three.js camera vertical fov (natural three.js camera fov)
 * @param {number} aspectRatio three.js camera / canvas aspect ratio
 * @param {number} planWidth width of the plan
 * @return {number} distance from camera
 */
const calculateDistanceFromCamera = (verticalFov, aspectRatio, planWidth) => {
  const hFOV = calculateHorizontalFov(verticalFov, aspectRatio);
  return calculateAdjacent(degToRad(hFOV / 2), planWidth / 2);
}

camera.position.z = calculateDistanceFromCamera(camera.fov, screenRatio, planSizes.width);

const handleResize = () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
  screenRatio = window.innerWidth / window.innerHeight
  camera.position.z = calculateDistanceFromCamera(camera.fov, screenRatio, planSizes.width);
}
addEventListener('resize', handleResize);

camera.position.y = 2;
camera.position.x = 1.5;

const getScrollProgress = () => {
  const scrollableDistance = scrollDistance.getBoundingClientRect() - window.innerHeight;
  return window.scrollY / scrollableDistance;
}

function tick(num) {
  camera.position.z = Math.sin(num / 1000) + 1.5;
  camera.lookAt(0, 0, 0)
  renderer.render( scene, camera );
  requestAnimationFrame( tick );
  console.log(getScrollProgress())
}

tick();
