AFRAME.registerComponent('bgm', {
  schema: {
    sequence: {default: 'soundBox'},
    volume: {default: 0.0},
    muted: {default: false},
    autoplay: {default: false},
    loop: {default: false},
  },
  init() {
    this.system.initMusic(this.data);
  },
});
