AFRAME.registerComponent('footstep', {
  schema: {
    muted: {default: false},
    playbackRate: {default: 1.0},
  },
  init() {
    this.system.initFootstep(this.data);
  },
  update() {
    this.system.updateFootstep(this.data);
  }
});
