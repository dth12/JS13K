AFRAME.registerComponent('audio', {
  multiple: true,
  schema: {
    type: {default: 'music'},
    sequence: {default: 'default'},
    playbackRate: {default: 1.0},
    muted: {default: false},
  },
  init() {
    this.system.initAudio(this.data);
  },
  update() {
    this.system.updateAudio(this.data);
  }
});
