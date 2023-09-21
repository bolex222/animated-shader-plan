import './style.css'
import { calculateAdjacent, calculateHorizontalFov, degToRad } from './Maths.utils.js'
import { Experience } from './Experience.js'

document.querySelector('#app').innerHTML = `
  <div>
    <canvas id="canvas"></canvas>
<!--    <div style="height: 200vh;"></div>-->
    <div id="scroll_distance" class="scrollDistance"></div>
    <div id="full_screen"></div>
    <div style="height: 200vh;"></div>
  </div>
`

const experience = new Experience()
experience.startExperience()
