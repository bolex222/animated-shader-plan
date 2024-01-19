import { loop } from 'three/nodes'

export class VideoManager {

  #videoElement
  #videoIsPlaying = false

  constructor (url) {
    this.#videoElement = document.createElement('video')
    this.#videoElement.muted = true
    this.#videoElement.loop = true
    this.#videoElement.src = url
  }

  playVideo = () => {
    this.#videoIsPlaying = true;
    this.#videoElement.play()
  }

  pauseVideo = () => {
    this.#videoIsPlaying = false;
    this.#videoElement.pause()
  }

  get videoSize () {
    return {
      width: this.#videoElement.videoWidth,
      height: this.#videoElement.videoHeight,
      ratio: this.#videoElement.videoWidth / this.#videoElement.videoHeight
    }
  }

  get videoElement () {
    return this.#videoElement
  }

  tick = (scrollManager) => {
    const p = scrollManager.scrollProgression;

    if (p < 1 && this.#videoIsPlaying) {
      this.pauseVideo();
    }
    if (p >= 1 && !this.#videoIsPlaying) {
      this.playVideo()
    }
  }

}
