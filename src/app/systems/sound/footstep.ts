// @ts-nocheck
import { footstep } from '../../../utils/sound/sequences';
import { generateAudio } from '../../../utils/sound/sound-box';

AFRAME.registerSystem('music', {
  init() {
    this.audio = undefined;
  },
  initFootstep(data) {
    this.audio = generateAudio(data, footstep);
  },
  updateFootstep(data) {
    this.audio.muted = data.muted;
    this.audio.playbackRate = data.playbackRate;
  },
  playMusic() {
    this.audio.play();
  }
});
