// @ts-nocheck
import { generateAudio } from '../../../utils/sound/sound-box';

AFRAME.registerSystem('coin', {
  init() {
    this.audio = undefined;
    this.sequence = undefined;
  },
  initAudio(data) {
    this.audio = generateAudio(data);
    this.sequence = data.sequence;
  },
  updateAudio(data) {
    if (this.sequence === data.sequence) {
      this.audio.playbackRate = data.playbackRate;
      this.audio.volume = data.volume;
      this.audio.loop = data.loop;
      this.audio.muted = data.muted;
    } else {
      this.initAudio(data);
    }
  },
  playAudio() {
    if (!(this.audio.currentTime > 0 && !this.audio.paused && !this.audio.ended && this.audio.readyState > 2)) {
      this.audio.play();
    }
  },
  pauseAudio() {
    if (this.audio.currentTime > 0 && !this.audio.paused && !this.audio.ended && this.audio.readyState > 2) {
      this.audio.pause();
    }
  },
});
