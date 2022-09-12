AFRAME.registerComponent('onoff', {
  schema: {
    volume: {default: 1.0},
    muted: {default: false},
  },
  init() {
    this.system.initAudio(this.data);
  },
  update() {
    this.system.updateAudio(this.data);
  }
});
