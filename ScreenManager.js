export class ScreenManager {

  #callBackFunctions = []

  constructor () {
    window.addEventListener('resize', this.#handleScreenResize)
    this.#handleScreenResize()
  }

  addCallBack = (callBack, id) => {
    this.#callBackFunctions = [...this.#callBackFunctions, { id, callBack }]
    this.#handleScreenResize()
  }

  removeCallBack = (id) => {
    this.#callBackFunctions = [...this.#callBackFunctions].filter((callBack) => callBack.id !== id)
  }

  #handleScreenResize = () => {
    this.#callBackFunctions.map(listener => listener.callBack(this))
  }

  killScreenManager = () => {
    window.removeEventListener('resize', this.#handleScreenResize)
  }
}
