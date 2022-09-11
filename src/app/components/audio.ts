AFRAME.registerComponent('audio', {
  multiple: true,
  schema: {
    type: {default: 'music'},
    sequence: {default: 'default'},
    volume: {default: 1.0},
    muted: {default: false},
  },
  init() {
    this.system.initAudio(this.data);
  },
  update() {
    if (this.data.muted) {
      this.system.muteAudio();
    }
    else {
      this.system.unmuteAudio();
    }
  }
});
