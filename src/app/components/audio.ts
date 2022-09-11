AFRAME.registerComponent('audio', {
  multiple: true,
  schema: {
    sequence: {default: 'soundBox'},
    volume: {default: 1.0},
    muted: {default: false},
    autoplay: {default: false},
    loop: {default: false},
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
