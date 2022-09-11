// @ts-nocheck
import { music } from '../../../utils/sound/sequences';
import { generateAudio } from '../../../utils/sound/sound-box';

AFRAME.registerSystem('music', {
  init() {
    this.audio = undefined;
  },
  initAudio(data) {
    this.audio = generateAudio(data, music);
  },
  updateAudio(data) {
    this.audio.volume = data.volume;
    this.audio.muted = data.muted;
  },
  playAudio() {
    this.audio.play();
  }
});
