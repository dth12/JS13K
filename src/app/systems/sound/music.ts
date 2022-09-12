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
    this.audio.playbackRate = data.playbackRate;
    this.audio.volume = data.volume;
    this.audio.loop = data.loop;
    this.audio.muted = data.muted;
  },
  playAudio() {
    this.audio.play();
  },
  pauseAudio() {
    this.audio.pause();
  },
});
