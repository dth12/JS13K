AFRAME.registerComponent('bgm', {
  schema: {
    sequence: {default: 'soundBox'},
    volume: {default: 1.0},
    muted: {default: false},
    autoplay: {default: false},
    loop: {default: false},
  },
  init() {
    this.system.initMusic(this.data);
  },
  update() {
    if (this.data.muted) {
      this.system.muteMusic();
    }
    else {
      this.system.unmuteMusic();
    }
  }
});
