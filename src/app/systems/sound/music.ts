// @ts-nocheck
import { music } from '../../../utils/sound/sequences';
import { generateAudio } from '../../../utils/sound/sound-box';

AFRAME.registerSystem('music', {
  init() {
    this.audio = undefined;
  },
  initMusic(data) {
    this.audio = generateAudio(data, music);
  },
  updateMusic(data) {
    this.audio.muted = data.muted;
  },
  playMusic() {
    this.audio.play();
  }
});
