AFRAME.registerComponent('music', {
  schema: {
    sequence: {default: 'default'},
    muted: {default: false},
  },
  init() {
    this.system.initMusic(this.data);
  },
  update() {
    this.system.updateMusic(this.data);
  }
});
