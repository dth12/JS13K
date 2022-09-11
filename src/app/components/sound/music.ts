AFRAME.registerComponent('music', {
  multiple: true,
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
