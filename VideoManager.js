import { loop } from 'three/nodes'

export class VideoManager {

  #videoElement
  #videoIsPlaying = false
  #videoSize = {
    width: 0,
    height: 0
  }

  constructor (url) {
    this.#videoElement = document.createElement('video')
    this.#videoElement.addEventListener('loadedmetadata', this.handleLoad)
    this.#videoElement.muted = true
    this.#videoElement.loop = true
    this.#videoElement.src = url;
  }

  handleLoad = (e) => {
    this.#videoSize.width = e.target.videoWidth
    this.#videoSize.height = e.target.videoHeight
  }

  playVideo = () => {
    this.#videoIsPlaying = true
    this.#videoElement.play()
  }

  pauseVideo = () => {
    this.#videoIsPlaying = false
    this.#videoElement.pause()
  }

  get videoSize () {
    return {
      width: this.#videoSize.width,
      height: this.#videoSize.height

    }
  }

  get videoElement () {
    return this.#videoElement
  }

  tick = (scrollManager) => {
    const p = scrollManager.scrollProgression

    if (p < 1 && this.#videoIsPlaying) {
      this.pauseVideo()
    }
    if (p >= 1 && !this.#videoIsPlaying) {
      this.playVideo()
    }
  }

}
