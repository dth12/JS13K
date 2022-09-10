AFRAME.registerComponent('bgm', {
  schema: {
    sequence: {default: 'soundBox'},
    volume: {default: 1.0},
    autoplay: {default: false},
    loop: {default: false},
  },
  init() {
    this.system.generateMusic(this.data);
  },
});
