
// @ts-nocheck
import { generateAudio } from '../../../utils/sound/sound-box';
import { isPlaying } from './../../../utils/util';

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
    if (!isPlaying(this.audio)) {
      this.audio.play();
    }
  },
  pauseAudio() {
    if (isPlaying(this.audio)) {
      this.audio.pause();
    }
  },
});
