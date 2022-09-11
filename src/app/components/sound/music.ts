AFRAME.registerComponent('music', {
  schema: {
    muted: {default: false},
  },
  init() {
    this.system.initMusic(this.data);
  },
  update() {
    this.system.updateMusic(this.data);
  }
});
