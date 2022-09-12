import { PlaybackRate } from '../../types';

AFRAME.registerComponent('footstep', {
  schema: {
    volume: {default: 1.0},
    muted: {default: false},
    playbackRate: {default: PlaybackRate.Walk},
  },
  init() {
    this.system.initAudio(this.data);
  },
  update() {
    this.system.updateAudio(this.data);
  }
});
