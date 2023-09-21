import * as dat from 'dat.gui';




export const debug = {
  devMode: false,

  callBack: [],
}

const gui = new dat.GUI();
gui.add(debug, 'devMode', true, false).onChange((value) => {
  debug.callBack.forEach((callBack) => {
    callBack(value)
  })
})

export default gui;
